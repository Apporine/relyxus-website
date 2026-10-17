import type { VercelRequest, VercelResponse } from "@vercel/node";
import { deliverContactEmail, validateContactPayload } from "../shared/contact";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const validated = validateContactPayload(req.body);
  if (!validated.ok) {
    return res.status(400).json({ ok: false, errors: validated.errors });
  }

  try {
    const result = await deliverContactEmail(validated.data);
    if (!result.ok) {
      return res.status(502).json({ ok: false, error: result.error });
    }
    return res.status(200).json({ ok: true, provider: result.provider });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected delivery error";
    return res.status(500).json({ ok: false, error: message });
  }
}
