// Vigil live voice: creates a one use, short lived key for a single call with
// Gemini Live. The instructions, tools and voice are locked into the key, so
// the visitor's browser can start one call and nothing else. The real API
// key stays here, in the GEMINI_API_KEY environment variable on Vercel.

import { GoogleGenAI, Modality } from "@google/genai";
import { SYSTEM_PROMPT, TOOLS } from "./_vigil-config.js";

// Tried in order until one connects: the one set in Vercel, then the newest
// live voice models, then older ones that are widely available.
const MODELS = [process.env.VIGIL_LIVE_MODEL, "gemini-3.8-live", "gemini-3.1-flash-live-preview", "gemini-2.5-flash-native-audio-preview-09-2025", "gemini-live-2.5-flash-preview"].filter((m, i, a): m is string => !!m && a.indexOf(m) === i);
const VOICE = process.env.VIGIL_VOICE || "Leda";
const CALL_MINUTES = Number(process.env.VIGIL_CALL_MINUTES || 10);
const ALLOWED = /^https:\/\/((www\.)?relyxus\.com|relyxus-website[a-z0-9-]*\.vercel\.app)$|^http:\/\/localhost(:\d+)?$/;
const seen = new Map<string, number[]>();

function json(body: unknown, status = 200, origin = "") {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...(origin ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" } : {}) } });
}

export async function POST(req: Request): Promise<Response> {
  const origin = req.headers.get("origin") || "";
  if (!ALLOWED.test(origin)) return json({ error: "forbidden" }, 403);
  if (!process.env.GEMINI_API_KEY) return json({ error: "voice_not_configured" }, 503, origin);

  // At most 12 key requests per visitor address every 30 minutes.
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  const now = Date.now(), recent = (seen.get(ip) || []).filter((t) => now - t < 30 * 60e3);
  if (recent.length >= 12) return json({ error: "too_many_calls" }, 429, origin);
  seen.set(ip, [...recent, now]);

  let attempt = 0;
  try { attempt = Math.max(0, Math.min(MODELS.length - 1, Number((await req.json()).attempt) || 0)); } catch {}
  const MODEL = MODELS[attempt];
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, httpOptions: { apiVersion: "v1alpha", timeout: 8000, retryOptions: { attempts: 1 } } });
    const token = await ai.authTokens.create({
      config: {
        uses: 1,
        expireTime: new Date(now + CALL_MINUTES * 60e3).toISOString(),
        newSessionExpireTime: new Date(now + 60e3).toISOString(),
        liveConnectConstraints: {
          model: MODEL,
          config: {
            responseModalities: [Modality.AUDIO],
            systemInstruction: SYSTEM_PROMPT,
            tools: TOOLS as never,
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE } } },
            inputAudioTranscription: {},
            outputAudioTranscription: {},
          },
        },
      },
    });
    return json({ token: token.name, model: MODEL, minutes: CALL_MINUTES, more: attempt < MODELS.length - 1 }, 200, origin);
  } catch (e) {
    console.error("vigil-token", e);
    return json({ error: "voice_unavailable", code: (e as { status?: number }).status || 0 }, 502, origin);
  }
}

export function OPTIONS(req: Request): Response {
  const origin = req.headers.get("origin") || "";
  if (!ALLOWED.test(origin)) return new Response(null, { status: 403 });
  return new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Methods": "POST", "Access-Control-Allow-Headers": "Content-Type", Vary: "Origin" } });
}
