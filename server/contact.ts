import type { Express, Request, Response } from "express";
import { deliverContactEmail, validateContactPayload } from "../shared/contact";

export function registerContactRoutes(app: Express) {
  app.post("/api/contact", async (req: Request, res: Response) => {
    res.set("Cache-Control", "no-store");
    const validated = validateContactPayload(req.body);
    if (!validated.ok) {
      res.status(400).json({ ok: false, errors: validated.errors });
      return;
    }

    try {
      const result = await deliverContactEmail(validated.data);
      if (!result.ok) {
        res.status(502).json({ ok: false, error: result.error });
        return;
      }
      res.status(200).json({ ok: true, provider: result.provider });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected delivery error";
      res.status(500).json({ ok: false, error: message });
    }
  });
}
