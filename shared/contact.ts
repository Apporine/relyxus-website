export const CONTACT_RECIPIENTS = [
  "aoon.syed@apporine.com",
  "bisma.idrees@apporine.com",
] as const;

export const ENQUIRY_TYPES = ["Demo", "Replay pilot", "Deployment", "Pricing"] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number];

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  enquiry: EnquiryType;
  role?: string;
  deployment?: string;
  message?: string;
  marketing?: boolean;
};

export type ContactValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; errors: Record<string, string> };

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactPayload(body: unknown): ContactValidationResult {
  const input = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};
  const name = asString(input.name);
  const email = asString(input.email);
  const company = asString(input.company);
  const enquiry = asString(input.enquiry);
  const role = asString(input.role);
  const deployment = asString(input.deployment);
  const message = asString(input.message);
  const marketing = Boolean(input.marketing);
  const errors: Record<string, string> = {};

  if (name.length < 2) errors.name = "Enter your name (at least 2 characters).";
  else if (name.length > 100) errors.name = "Name must be 100 characters or fewer.";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid work email address.";
  else if (email.length > 254) errors.email = "Email address must be 254 characters or fewer.";

  if (company.length < 2) errors.company = "Enter your company name.";
  else if (company.length > 160) errors.company = "Company must be 160 characters or fewer.";

  if (!ENQUIRY_TYPES.includes(enquiry as EnquiryType)) errors.enquiry = "Choose an enquiry type.";
  if (message.length > 2000) errors.message = "Message must be 2,000 characters or fewer.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      email,
      company,
      enquiry: enquiry as EnquiryType,
      role: role || undefined,
      deployment: deployment || undefined,
      message: message || undefined,
      marketing,
    },
  };
}

export function buildContactEmail(data: ContactPayload) {
  const subject = `Relyxus website enquiry: ${data.enquiry} — ${data.company}`;
  const lines = [
    "New enquiry from the Relyxus website",
    "",
    `Enquiry type: ${data.enquiry}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company}`,
    `Role: ${data.role || "Not provided"}`,
    `Deployment interest: ${data.deployment || "Not sure yet"}`,
    `Marketing updates: ${data.marketing ? "Yes" : "No"}`,
    "",
    "Message:",
    data.message || "(No additional message)",
  ];
  const text = lines.join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111827">
      <h2 style="margin:0 0 12px">New Relyxus website enquiry</h2>
      <p><strong>Enquiry type:</strong> ${escapeHtml(data.enquiry)}</p>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
      <p><strong>Role:</strong> ${escapeHtml(data.role || "Not provided")}</p>
      <p><strong>Deployment interest:</strong> ${escapeHtml(data.deployment || "Not sure yet")}</p>
      <p><strong>Marketing updates:</strong> ${data.marketing ? "Yes" : "No"}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(data.message || "(No additional message)")}</p>
    </div>
  `.trim();
  return { subject, text, html };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function deliverContactEmail(
  data: ContactPayload,
  env: NodeJS.ProcessEnv = process.env
): Promise<{ ok: true; provider: string } | { ok: false; error: string }> {
  const { subject, text, html } = buildContactEmail(data);
  const from = env.CONTACT_FROM_EMAIL || "Relyxus Website <onboarding@resend.dev>";
  const apiKey = env.RESEND_API_KEY?.trim();

  if (apiKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [...CONTACT_RECIPIENTS],
        reply_to: data.email,
        subject,
        text,
        html,
      }),
    });
    if (!response.ok) {
      const detail = await response.text();
      return { ok: false, error: `Email provider rejected the message (${response.status}). ${detail}` };
    }
    return { ok: true, provider: "resend" };
  }

  // Fallback that works without a Resend key after FormSubmit activates the inbox once.
  const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_RECIPIENTS[0]}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      company: data.company,
      enquiry: data.enquiry,
      role: data.role || "Not provided",
      deployment: data.deployment || "Not sure yet",
      marketing: data.marketing ? "Yes" : "No",
      message: data.message || "(No additional message)",
      _subject: subject,
      _template: "table",
      _captcha: "false",
      _cc: CONTACT_RECIPIENTS[1],
      _replyto: data.email,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    return { ok: false, error: `Unable to deliver enquiry (${response.status}). ${detail}` };
  }

  return { ok: true, provider: "formsubmit" };
}
