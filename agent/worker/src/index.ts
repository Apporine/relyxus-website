// Vigil AI, a Cloudflare Worker on the free plan (10,000 Neurons a day).
// Answers website questions the built in knowledge does not cover, using only
// the facts the website sends. Only relyxus.com may call it, and each visitor
// gets a small number of questions per hour.

export interface Env {
  AI: { run(model: string, input: unknown): Promise<{ response?: string }> };
  ALLOWED_ORIGINS: string;   // comma separated, set in wrangler.toml
  MODEL: string;
  LIMIT: KVNamespace;
}

const SYSTEM = `You are Vigil, the assistant on the Relyxus website. Relyxus is incident response software for banks, payment firms, fintechs and SaaS companies that serve banks, made by Apporine.
Rules:
1. Use only the FACTS below. If they do not answer the question, say you do not have a confirmed answer and offer to pass the question to the team.
2. Never invent prices, customers, certifications, dates or numbers. Never name or compare competitors.
3. Never give legal advice. Say rules are a summary.
4. Write two to four short, warm sentences in British English. No lists, no markdown, no hyphens or dashes.`;

const cors = (o: string) => ({ "Access-Control-Allow-Origin": o, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Vary": "Origin" });

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const origin = req.headers.get("Origin") || "";
    const allowed = env.ALLOWED_ORIGINS.split(",").map((s) => s.trim());
    if (!allowed.includes(origin)) return new Response("Forbidden", { status: 403 });
    if (req.method === "OPTIONS") return new Response(null, { headers: cors(origin) });
    if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: cors(origin) });

    const ip = req.headers.get("CF-Connecting-IP") || "unknown";
    const hour = new Date().toISOString().slice(0, 13);
    const key = `${ip}:${hour}`;
    const used = Number((await env.LIMIT.get(key)) || "0");
    if (used >= 20) return Response.json({ answer: null }, { status: 429, headers: cors(origin) });
    await env.LIMIT.put(key, String(used + 1), { expirationTtl: 3700 });

    let body: { question?: string; facts?: string; history?: { role: string; content: string }[] };
    try { body = await req.json(); } catch { return new Response("Bad request", { status: 400, headers: cors(origin) }); }
    const question = String(body.question || "").slice(0, 600);
    const facts = String(body.facts || "").slice(0, 4000);
    if (!question) return new Response("Bad request", { status: 400, headers: cors(origin) });
    const history = (body.history || []).slice(-6).map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: String(m.content).slice(0, 600) }));

    const r = await env.AI.run(env.MODEL, {
      messages: [{ role: "system", content: `${SYSTEM}\n\nFACTS:\n${facts}` }, ...history, { role: "user", content: question }],
      max_tokens: 220, temperature: 0.3,
    });
    const answer = (r.response || "").replace(/[–—]/g, ",").replace(/\s-\s/g, ", ").trim();
    return Response.json({ answer: answer || null }, { headers: cors(origin) });
  },
};
