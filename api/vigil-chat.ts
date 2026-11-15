// Vigil text chat: the same brain as the live voice, for typed messages.
// Gemini answers from the approved facts and can use the same tools; this
// function carries out the tools and returns the reply plus what the chat
// window should show (a product screen, a booking button, a page link, a
// saved lead). The API key stays here, in GEMINI_API_KEY.

import { GoogleGenAI, ThinkingLevel, type Content, type Part } from "@google/genai";
import { SYSTEM_PROMPT_TEXT, TOOLS } from "./_vigil-config.js";

// Fast models first, tried in order; the first that answers wins. Thinking is
// kept to a minimum so replies come back in a second or two. (The 2.5 models
// are closed to new Google accounts, so they are not listed.)
const MODELS = [process.env.VIGIL_CHAT_MODEL, "gemini-flash-lite-latest", "gemini-flash-latest"].filter((m, i, a): m is string => !!m && a.indexOf(m) === i);
const LEADS = process.env.PUBLIC_VIGIL_LEADS_URL || "";
const ALLOWED = /^https:\/\/((www\.)?relyxus\.com|relyxus-website[a-z0-9-]*\.vercel\.app)$|^http:\/\/localhost(:\d+)?$/;
const FREE = /@(gmail|googlemail|yahoo|hotmail|outlook|live|msn|icloud|me|aol|proton|protonmail|gmx|mail|yandex|zoho)\./i;
const SCREENS = new Set(["command_centre", "incident", "timeline", "vigil", "approvals", "preflight", "on_call", "regulator_report", "board_report", "auditor_room", "dora_register", "status_pages", "replay"]);
const seen = new Map<string, number[]>();

type Line = { who: "visitor" | "vigil"; text: string };
type Action = { type: "screen"; screen: string } | { type: "form"; prefill: Record<string, string> } | { type: "booking" } | { type: "page"; path: string } | { type: "lead"; saved: boolean; lead: Record<string, string> };

function json(body: unknown, status: number, origin: string) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", "Access-Control-Allow-Origin": origin, Vary: "Origin" } });
}

async function runTool(name: string, a: Record<string, unknown>, actions: Action[], page: string) {
  if (name === "show_screen") { const s = String(a.screen); if (!SCREENS.has(s)) return { ok: false }; actions.push({ type: "screen", screen: s }); return { ok: true, shown: true }; }
  if (name === "open_contact_form") { const pre: Record<string, string> = {}; for (const k of ["email", "first_name", "last_name", "company", "notes"]) if (a[k]) pre[k] = String(a[k]); actions.push({ type: "form", prefill: pre }); return { ok: true, note: "The form is open beside the chat." }; }
  if (name === "open_booking") { actions.push({ type: "booking" }); return { ok: true, note: "A Pick a time button is now in the chat." }; }
  if (name === "open_page") { actions.push({ type: "page", path: String(a.path || "/product") }); return { ok: true }; }
  if (name === "save_lead") {
    const email = String(a.email || "").trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, reason: "The email is not valid. Ask the visitor to repeat it." };
    if (FREE.test(email) && !a.personal_email_confirmed) return { ok: false, reason: "Personal email. Ask once for a work email. If they prefer this one, call save_lead again with personal_email_confirmed true." };
    const lead = { name: String(a.name || ""), email, company: String(a.company || ""), interest: String(a.interest || ""), sector: String(a.sector || ""), regulators: String(a.regulators || ""), notes: String(a.notes || "") };
    let saved = false;
    if (LEADS) {
      try {
        await fetch(LEADS, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ kind: "lead", lead: { ...lead, questions: lead.notes ? [lead.notes] : [], page, startedAt: new Date().toISOString() }, page, transcript: "", sentAt: new Date().toISOString() }) });
        saved = true;
      } catch { saved = false; }
    }
    actions.push({ type: "lead", saved, lead });
    return saved ? { ok: true, saved: true } : { ok: true, saved: false, note: "A Send my details to the team button is now in the chat. Ask them to press it, which opens an email to the team." };
  }
  return { ok: false };
}

export async function POST(req: Request): Promise<Response> {
  const origin = req.headers.get("origin") || "";
  if (!ALLOWED.test(origin)) return new Response("Forbidden", { status: 403 });
  if (!process.env.GEMINI_API_KEY) return json({ error: "not_configured" }, 503, origin);

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  const now = Date.now(), recent = (seen.get(ip) || []).filter((t) => now - t < 30 * 60e3);
  if (recent.length >= 60) return json({ error: "too_many" }, 429, origin);
  seen.set(ip, [...recent, now]);

  let body: { history?: Line[]; page?: string };
  try { body = await req.json(); } catch { return json({ error: "bad_request" }, 400, origin); }
  const page = String(body.page || "/").slice(0, 120);
  const history = (body.history || []).slice(-24).filter((l) => l && l.text).map((l) => ({ role: l.who === "vigil" ? "model" : "user", parts: [{ text: String(l.text).slice(0, 1500) }] })) as Content[];
  while (history.length && history[0].role === "model") history.shift();
  if (!history.length) return json({ error: "bad_request" }, 400, origin);

  // Google's shortest allowed deadline is 10 seconds.
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, httpOptions: { timeout: 12000, retryOptions: { attempts: 1 } } });
  const started = Date.now();
  let lastCode = 0;
  for (const model of MODELS) {
    if (Date.now() - started > 9000) break;
    for (const think of [true, false]) {
      const actions: Action[] = [];
      const contents: Content[] = [{ role: "user", parts: [{ text: `(The visitor is on the page ${page} of relyxus.com.)` }] }, { role: "model", parts: [{ text: "Understood." }] }, ...history];
      try {
        for (let round = 0; round < 4; round++) {
          const r = await ai.models.generateContent({ model, contents, config: { systemInstruction: SYSTEM_PROMPT_TEXT, tools: TOOLS as never, temperature: 0.5, maxOutputTokens: 500, ...(think ? { thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL } } : {}) } });
          const calls = r.functionCalls || [];
          if (!calls.length) return json({ text: (r.text || "").trim(), actions, model, ms: Date.now() - started }, 200, origin);
          const modelParts = (r.candidates?.[0]?.content?.parts || []) as Part[];
          contents.push({ role: "model", parts: modelParts });
          const responses: Part[] = [];
          for (const c of calls) responses.push({ functionResponse: { id: c.id, name: c.name, response: { result: await runTool(c.name || "", (c.args || {}) as Record<string, unknown>, actions, page) } } });
          contents.push({ role: "user", parts: responses });
        }
        return json({ text: "", actions, model }, 200, origin);
      } catch (e) {
        lastCode = (e as { status?: number }).status || 0;
        console.error("vigil-chat", model, think ? "minimal" : "default", lastCode, String(e).slice(0, 300));
        // A lead already handed over is not sent again with another model.
        if (actions.some((x) => x.type === "lead")) return json({ text: "Thank you, I have passed your details to the team.", actions, model }, 200, origin);
        // If this model does not accept the thinking setting, try it once without.
        if (!(think && lastCode === 400 && /think/i.test(String(e)))) break;
      }
    }
  }
  return json({ error: "unavailable", code: lastCode }, 502, origin);
}

export function OPTIONS(req: Request): Response {
  const origin = req.headers.get("origin") || "";
  if (!ALLOWED.test(origin)) return new Response(null, { status: 403 });
  return new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Methods": "POST", "Access-Control-Allow-Headers": "Content-Type", Vary: "Origin" } });
}
