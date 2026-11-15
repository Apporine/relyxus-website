// Optional: a free AI service for questions the built in knowledge does not
// cover. It is a Cloudflare Worker (agent/worker) set in PUBLIC_VIGIL_AI_URL.
// It may only use the facts it is sent, and must say when it does not know.
// With no address set, Vigil uses its built in answers only.

const URL = import.meta.env.PUBLIC_VIGIL_AI_URL as string | undefined;
export const remoteOn = !!URL;

export async function askRemote(question: string, facts: string, history: { role: "user" | "assistant"; content: string }[]): Promise<string | null> {
  if (!URL) return null;
  const ctl = new AbortController(); const to = setTimeout(() => ctl.abort(), 12000);
  try {
    const r = await fetch(URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question, facts, history: history.slice(-6) }), signal: ctl.signal });
    if (!r.ok) return null;
    const j = await r.json();
    const a = typeof j.answer === "string" ? j.answer.trim() : "";
    return a && a.length < 900 ? a : null;
  } catch { return null; } finally { clearTimeout(to); }
}
