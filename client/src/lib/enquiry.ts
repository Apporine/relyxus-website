import type { ContactPayload } from "@shared/contact";
import { track } from "./analytics";

export type EnquiryResult =
  | { ok: true }
  | { ok: false; error: string; errors?: Record<string, string> };

/** Posts to /api/contact, which emails the team. */
export async function sendEnquiry(
  payload: ContactPayload
): Promise<EnquiryResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    const body = (await response.json().catch(() => null)) as {
      ok?: boolean;
      error?: string;
      errors?: Record<string, string>;
    } | null;
    if (!response.ok || !body?.ok) {
      return {
        ok: false,
        error: body?.errors
          ? "Please check the highlighted fields."
          : "We couldn’t send that just now. Please try again, or email us directly.",
        errors: body?.errors,
      };
    }
    track("enquiry_sent", { type: payload.enquiry });
    return { ok: true };
  } catch {
    return {
      ok: false,
      error:
        "We couldn’t reach our server. Check your connection and try again.",
    };
  }
}

export const isEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
