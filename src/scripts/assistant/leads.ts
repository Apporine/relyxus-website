// Sends Vigil's leads and transcripts to a free Google Sheet through a Google
// Apps Script web app (agent/apps-script/Code.gs). The address is set in
// PUBLIC_VIGIL_LEADS_URL. With no address set, nothing leaves the browser.

import type { Lead } from "./engine";

const URL = import.meta.env.PUBLIC_VIGIL_LEADS_URL as string | undefined;
export const leadsOn = !!URL;

// Until the sheet is connected, the visitor sends their details by email.
export function mailto(lead: Lead) {
  const body = `Name: ${lead.name || ""}\nWork email: ${lead.email || ""}\nCompany: ${lead.company || ""}\nInterested in: ${lead.interest || ""}\n\nMy questions:\n${lead.questions.join("\n")}`;
  return `mailto:support@relyxus.com?subject=${encodeURIComponent("Relyxus enquiry from " + (lead.company || lead.name || "the website"))}&body=${encodeURIComponent(body)}`;
}
export type Line = { who: "visitor" | "vigil"; text: string; at: string };

function payload(kind: "lead" | "transcript", lead: Lead, lines: Line[]) {
  return JSON.stringify({
    kind, lead, page: location.pathname, referrer: document.referrer || "",
    transcript: lines.map((l) => `${l.at.slice(11, 16)} ${l.who === "vigil" ? "Vigil" : "Visitor"}: ${l.text}`).join("\n"),
    sentAt: new Date().toISOString(),
  });
}

// text/plain avoids a preflight request, which Apps Script cannot answer.
export async function sendLead(lead: Lead, lines: Line[]) {
  if (!URL) return false;
  try { await fetch(URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: payload("lead", lead, lines) }); return true; }
  catch { return false; }
}

// When the visitor leaves, the full conversation is added to their row.
export function sendTranscript(lead: Lead, lines: Line[]) {
  if (!URL || !lead.email || !lines.length) return;
  const body = new Blob([payload("transcript", lead, lines)], { type: "text/plain;charset=utf-8" });
  navigator.sendBeacon?.(URL, body);
}
