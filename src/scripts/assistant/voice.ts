// Voice for Vigil, free and in the browser. Listening uses the browser's own
// speech recognition (Chrome, Edge and Safari). Speaking uses the browser's
// own voices, choosing the most natural British voice the device has.
// A level from 0 to 1 drives the Halo while Vigil listens or speaks.

type Rec = { lang: string; interimResults: boolean; continuous: boolean; start(): void; stop(): void; abort(): void;
  onresult: ((e: any) => void) | null; onend: (() => void) | null; onerror: ((e: any) => void) | null };

const PREFERRED = [/sonia.*natural/i, /libby.*natural/i, /maisie.*natural/i, /natural.*en-gb/i, /google uk english female/i, /serena/i, /kate/i, /martha/i, /stephanie/i, /hazel/i, /en-gb.*female/i];

export class Voice {
  level = 0;
  speaking = false;
  listening = false;
  private rec: Rec | null = null;
  private voice: SpeechSynthesisVoice | null = null;
  private analyser: AnalyserNode | null = null;
  private stream: MediaStream | null = null;
  private buf = new Uint8Array(256);
  private pulse = 0;

  get canListen() { return !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition); }
  get canSpeak() { return "speechSynthesis" in window; }

  constructor() {
    if (!this.canSpeak) return;
    const pick = () => {
      const all = speechSynthesis.getVoices().filter((v) => /^en/i.test(v.lang));
      for (const re of PREFERRED) { const v = all.find((x) => re.test(x.name + " " + x.lang)); if (v) { this.voice = v; return; } }
      this.voice = all.find((v) => /en-GB/i.test(v.lang)) || all[0] || null;
    };
    pick(); speechSynthesis.onvoiceschanged = pick;
  }

  get voiceName() { return this.voice?.name || "your browser's voice"; }

  // Speaks the text. Resolves when finished or interrupted.
  speak(text: string): Promise<void> {
    if (!this.canSpeak) return Promise.resolve();
    this.stopSpeaking();
    return new Promise((res) => {
      const parts = text.match(/[^.!?]+[.!?]*/g) || [text];
      let i = 0;
      this.speaking = true;
      const next = () => {
        if (!this.speaking || i >= parts.length) { this.speaking = false; res(); return; }
        const u = new SpeechSynthesisUtterance(parts[i++].trim());
        if (this.voice) u.voice = this.voice;
        u.lang = this.voice?.lang || "en-GB"; u.rate = 1.02; u.pitch = 1.05;
        u.onboundary = () => { this.pulse = 1; };
        u.onend = next; u.onerror = () => { this.speaking = false; res(); };
        speechSynthesis.speak(u);
      };
      next();
    });
  }

  stopSpeaking() { if (this.canSpeak) speechSynthesis.cancel(); this.speaking = false; }

  // Listens for one turn. onPartial shows words as they are heard.
  listen(onPartial: (t: string) => void): Promise<string> {
    const C = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!C) return Promise.reject(new Error("unsupported"));
    this.stopSpeaking();
    this.meter();
    return new Promise((res, rej) => {
      const r: Rec = new C();
      r.lang = "en-GB"; r.interimResults = true; r.continuous = false;
      let final = "";
      r.onresult = (e: any) => {
        let t = "";
        for (let k = 0; k < e.results.length; k++) { t += e.results[k][0].transcript; if (e.results[k].isFinal) final = t; }
        onPartial(t);
      };
      r.onerror = (e: any) => { this.listening = false; this.unmeter(); rej(new Error(e?.error || "error")); };
      r.onend = () => { this.listening = false; this.unmeter(); res(final.trim()); };
      this.rec = r; this.listening = true; r.start();
    });
  }

  stopListening() { try { this.rec?.stop(); } catch {} this.listening = false; }

  private async meter() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new AudioContext(), src = ctx.createMediaStreamSource(this.stream);
      this.analyser = ctx.createAnalyser(); this.analyser.fftSize = 512; src.connect(this.analyser);
    } catch { this.analyser = null; }
  }
  private unmeter() { this.stream?.getTracks().forEach((t) => t.stop()); this.stream = null; this.analyser = null; }

  // Called every frame by the Halo.
  tick(t: number): number {
    let target = 0;
    if (this.listening) {
      if (this.analyser) {
        this.analyser.getByteTimeDomainData(this.buf);
        let s = 0; for (const v of this.buf) s = Math.max(s, Math.abs(v - 128));
        target = Math.min(1, s / 40);
      } else target = 0.4 + 0.3 * Math.abs(Math.sin(t * 7));
    } else if (this.speaking) {
      this.pulse *= 0.9; target = 0.45 + 0.5 * this.pulse + 0.1 * Math.sin(t * 9);
    }
    this.level += (target - this.level) * 0.2;
    return this.level;
  }
}
