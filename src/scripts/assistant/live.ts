// A live voice call with Vigil over Gemini Live. Both directions stream at
// once: the visitor's microphone goes up in 100 ms pieces while Vigil's voice
// comes back and plays as it arrives. If the visitor talks over Vigil, the
// model stops and the queued audio is dropped, like a real conversation.

import { GoogleGenAI, Modality, type LiveServerMessage, type Session } from "@google/genai";
import { fixNames } from "./names";

export type CallState = "connecting" | "idle" | "listening" | "thinking" | "speaking" | "ended";
export type CallEvents = {
  state(s: CallState, why?: string): void;
  user(text: string, done: boolean): void;
  vigil(text: string, done: boolean): void;
  tool(name: string, args: Record<string, unknown>): Promise<unknown> | unknown;
};

const WORKLET = `class C extends AudioWorkletProcessor{process(i){const c=i[0]&&i[0][0];if(c)this.port.postMessage(c.slice(0));return true}}registerProcessor('vigil-cap',C);`;
const RATE_IN = 16000, RATE_OUT = 24000;

function b64(bytes: Uint8Array) { let s = ""; for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000)); return btoa(s); }
function unb64(s: string) { const b = atob(s), u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }

export class LiveCall {
  level = 0;
  muted = false;
  private session?: Session;
  private inCtx?: AudioContext;
  private outCtx?: AudioContext;
  private stream?: MediaStream;
  private outGain?: GainNode;
  private analyser?: AnalyserNode;
  private next = 0;
  private playing = new Set<AudioBufferSourceNode>();
  private pend: number[] = [];
  private micLevel = 0;
  private you = "";
  private me = "";
  private waiting = false;
  private ended = false;
  private buf = new Uint8Array(512);

  constructor(private ev: CallEvents) {}

  // Speaker on starts the call with the microphone off; Mic on switches it on.
  async start(page: string, history: { who: "visitor" | "vigil"; text: string }[] = [], mic = false) {
    this.muted = !mic;
    this.ev.state("connecting");
    const r = await fetch("/api/vigil-token", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
    if (!r.ok) throw new Error(r.status === 503 ? "not_configured" : r.status === 429 ? "busy" : "unavailable");
    const { token, model } = await r.json();

    this.outCtx = new AudioContext();
    this.outGain = this.outCtx.createGain();
    this.analyser = this.outCtx.createAnalyser(); this.analyser.fftSize = 1024;
    this.outGain.connect(this.analyser); this.analyser.connect(this.outCtx.destination);

    const ai = new GoogleGenAI({ apiKey: token, httpOptions: { apiVersion: "v1alpha" } });
    this.session = await ai.live.connect({
      model,
      config: { responseModalities: [Modality.AUDIO] },
      callbacks: {
        onmessage: (m: LiveServerMessage) => this.onMessage(m),
        onerror: () => this.finish("error"),
        onclose: () => this.finish("closed"),
      },
    });

    if (mic) await this.setMic(true);
    const past = history.filter((l) => l.text).slice(-12);
    const turns = past.map((l) => ({ role: l.who === "vigil" ? "model" : "user", parts: [{ text: l.text }] }));
    const cue = past.length > 1
      ? `(The visitor just switched on your voice on the page ${page}. The conversation above happened by text. Do not greet again or repeat yourself: in one short, warm sentence, say you can talk now and pick up where you left off.)`
      : `(The visitor just switched on your voice on the page ${page} of relyxus.com. Greet them warmly and cheerfully in one or two short sentences as the Relyxus assistant, say what you can help with, and ask what brings them here today. ${mic ? "Their microphone is on." : "Their microphone is off for now, so they may type or switch it on."})`;
    this.session.sendClientContent({ turns: [...turns, { role: "user", parts: [{ text: cue }] }], turnComplete: true });
    this.waiting = true;
    this.ev.state("thinking");
  }

  get micLive() { return !!this.stream && !this.muted; }

  async setMic(on: boolean) {
    if (on && !this.stream) {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 } });
      await this.micOn();
    }
    this.muted = !on;
    if (!on) this.pend.length = 0;
  }

  private async micOn() {
    this.inCtx = new AudioContext();
    const url = URL.createObjectURL(new Blob([WORKLET], { type: "application/javascript" }));
    await this.inCtx.audioWorklet.addModule(url); URL.revokeObjectURL(url);
    const src = this.inCtx.createMediaStreamSource(this.stream!);
    const node = new AudioWorkletNode(this.inCtx, "vigil-cap");
    const ratio = this.inCtx.sampleRate / RATE_IN;
    let pos = 0;
    node.port.onmessage = (e: MessageEvent<Float32Array>) => {
      const f = e.data;
      let peak = 0;
      for (; pos < f.length; pos += ratio) { const v = f[Math.floor(pos)]; this.pend.push(v); peak = Math.max(peak, Math.abs(v)); }
      pos -= f.length;
      this.micLevel = Math.max(this.micLevel * 0.85, Math.min(1, peak * 3));
      if (this.pend.length >= 1600) this.flush();
    };
    src.connect(node);
  }

  private flush() {
    const n = this.pend.splice(0, this.pend.length);
    if (!this.session || this.ended || this.muted) return;
    const pcm = new Int16Array(n.length);
    for (let i = 0; i < n.length; i++) pcm[i] = Math.max(-1, Math.min(1, n[i])) * 0x7fff;
    this.session.sendRealtimeInput({ audio: { data: b64(new Uint8Array(pcm.buffer)), mimeType: `audio/pcm;rate=${RATE_IN}` } });
  }

  private play(data: string) {
    const ctx = this.outCtx!, bytes = unb64(data), pcm = new Int16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength >> 1);
    const buf = ctx.createBuffer(1, pcm.length, RATE_OUT), ch = buf.getChannelData(0);
    for (let i = 0; i < pcm.length; i++) ch[i] = pcm[i] / 0x8000;
    const s = ctx.createBufferSource(); s.buffer = buf; s.connect(this.outGain!);
    const at = Math.max(ctx.currentTime + 0.04, this.next);
    s.start(at); this.next = at + buf.duration;
    this.playing.add(s); s.onended = () => this.playing.delete(s);
  }

  private hush() { this.playing.forEach((s) => { try { s.stop(); } catch {} }); this.playing.clear(); this.next = 0; }

  private async onMessage(m: LiveServerMessage) {
    const sc = m.serverContent;
    if (sc?.interrupted) { this.hush(); this.closeVigil(); }
    if (sc?.inputTranscription?.text) { this.you += sc.inputTranscription.text; this.ev.user(fixNames(this.you.trim()), false); this.waiting = true; }
    for (const p of sc?.modelTurn?.parts || []) {
      if (p.inlineData?.data) { this.closeYou(); this.waiting = false; this.play(p.inlineData.data); }
    }
    if (sc?.outputTranscription?.text) { this.closeYou(); this.me += sc.outputTranscription.text; this.ev.vigil(fixNames(this.me.trim()), false); }
    if (sc?.turnComplete) { this.closeYou(); this.closeVigil(); }
    for (const fc of m.toolCall?.functionCalls || []) {
      let result: unknown;
      try { result = await this.ev.tool(fc.name || "", (fc.args || {}) as Record<string, unknown>); } catch { result = { ok: false }; }
      this.session?.sendToolResponse({ functionResponses: [{ id: fc.id, name: fc.name, response: { result } }] });
    }
    if (m.goAway) this.finish("time");
  }

  private closeYou() { if (this.you.trim()) this.ev.user(fixNames(this.you.trim()), true); this.you = ""; }
  private closeVigil() { if (this.me.trim()) this.ev.vigil(fixNames(this.me.trim()), true); this.me = ""; }

  // Typed text during a call goes into the same conversation.
  say(text: string) {
    if (!this.session || this.ended) return;
    this.hush(); this.waiting = true;
    this.session.sendClientContent({ turns: [{ role: "user", parts: [{ text }] }], turnComplete: true });
  }

  // Called every frame: drives the Halo and the state line.
  tick(): CallState {
    if (this.ended) return "ended";
    const ctx = this.outCtx;
    const speaking = !!ctx && this.playing.size > 0 && ctx.currentTime < this.next;
    let out = 0;
    if (speaking && this.analyser) { this.analyser.getByteTimeDomainData(this.buf); for (const v of this.buf) out = Math.max(out, Math.abs(v - 128)); out = Math.min(1, out / 50); }
    const target = speaking ? 0.35 + out * 0.65 : this.muted ? 0 : this.micLevel;
    this.level += (target - this.level) * 0.25;
    this.micLevel *= 0.94;
    if (speaking) return "speaking";
    if (this.waiting) return "thinking";
    return this.muted ? "idle" as CallState : "listening";
  }

  end() { this.finish("ended"); }

  private finish(why: string) {
    if (this.ended) return;
    this.ended = true;
    this.closeYou(); this.closeVigil();
    try { this.session?.close(); } catch {}
    this.hush();
    this.stream?.getTracks().forEach((t) => t.stop());
    this.inCtx?.close().catch(() => {}); this.outCtx?.close().catch(() => {});
    this.ev.state("ended", why);
  }
}
