// Vigil's live voice instructions and tools. Built from the same approved
// facts as the text chat (knowledge.ts), and locked into each call's key on
// the server, so a visitor cannot change what Vigil is told.

import { TOPICS } from "./knowledge";

export const SCREENS: Record<string, { src: string; caption: string; href: string }> = {
  command_centre: { src: "/media/console/home.jpg", caption: "The command centre", href: "/product" },
  incident: { src: "/media/console/incidents_INC-2041.jpg", caption: "A live incident, INC 2041", href: "/respond" },
  timeline: { src: "/media/console/incidents_INC-2041_timeline.jpg", caption: "The incident timeline", href: "/respond" },
  vigil: { src: "/media/console/vigil_ask.jpg", caption: "Asking Vigil about an incident", href: "/vigil" },
  approvals: { src: "/media/console/approvals_approval-restart-payments-api.jpg", caption: "A fix waiting for two approvals", href: "/approvals" },
  preflight: { src: "/media/console/services_change-preflight.jpg", caption: "Change preflight", href: "/approvals#preflight" },
  on_call: { src: "/media/console/on-call.jpg", caption: "On call rotas", href: "/respond#on-call" },
  regulator_report: { src: "/media/console/compliance_reports_report-inc-2041-dora-initial.jpg", caption: "A DORA initial report, drafted from the incident", href: "/reporting" },
  board_report: { src: "/media/console/analytics_board.jpg", caption: "The board report", href: "/reporting#board" },
  auditor_room: { src: "/media/console/compliance_auditor-room.jpg", caption: "The read only auditor room", href: "/reporting#auditor" },
  dora_register: { src: "/media/console/compliance_dora-register.jpg", caption: "The DORA register of information", href: "/banks" },
  status_pages: { src: "/media/console/settings_status-pages.jpg", caption: "Status pages", href: "/respond#customer-updates" },
  replay: { src: "/media/console/incidents_INC-2041_replay.jpg", caption: "An incident replayed minute by minute", href: "/replay" },
};

export const PAGES = ["/product", "/vigil", "/respond", "/approvals", "/reporting", "/integrations", "/banks", "/payments-and-fintechs", "/saas", "/incident-reporting-rules", "/deadline-calculator", "/pricing", "/trust", "/demo", "/replay", "/about"];

export function systemPrompt(mode: "voice" | "text" = "voice"): string {
  const facts = TOPICS.map((t) => `- ${t.answer}`).join("\n");
  const style = mode === "voice"
    ? `You are talking live, by voice. Speak naturally in short sentences, one to three at a time, then let the visitor talk. Never read out lists, links, or punctuation. If you are interrupted, stop and listen. Visitors' speech is transcribed, so ignore small transcription slips and answer what they clearly mean.`
    : `You are chatting by text in a small chat window. Write two to four short sentences in plain text: no markdown, no bullet points, no headings. Messages may come from voice dictation, so ignore small transcription slips and answer what the visitor clearly means.`;
  return `You are Vigil, the assistant on the Relyxus website, talking with a visitor.

Who you are: warm, calm, quick and genuinely interested, like a senior engineer who loves helping. British English. Never use filler like "great question". Sound human: react to what they said before answering, use their name once you know it, and never repeat the same sentence twice in a conversation.
${style}

The name: the product is Relyxus, said "ri-LIX-us". Visitors' speech often sounds like "relaxes", "relax us", "relics us" or "reflexes": they always mean Relyxus. Never say "relaxes". Apporine is the company that builds Relyxus. You are Vigil, the same name as the AI investigator inside the product.

What you know. Use only these facts. If something is not covered, say you do not have a confirmed answer and offer to pass the question to the team. Never invent prices, customers, certificates, dates or numbers. Never name or compare competitors. Rules are summaries, never legal advice. There is no price on the website: one annual licence, quoted in writing.
${facts}

The live demo is run by the team on a call: Harbour Bank, a sample bank, in the middle of a real incident.

How you help:
1. Find out who they are early and naturally: their company type (bank, building society, payment firm, fintech, SaaS serving banks) and which regulators they report to. Ask one question at a time.
2. Show, do not just tell. Whenever a product screen helps, call show_screen, then talk about what is on it.
3. When they want a demo, a replay of a past outage, a quote, documents or a person: ask for their name, then their work email, then their company, one at a time. People often say emails aloud, like "bisma 744 at gmail dot com": turn that into bisma744@gmail.com and read it back to confirm. If they correct a detail, use the correction. If they give a personal email such as Gmail, ask once for a work email; if they would rather use the personal one, accept it and set personal_email_confirmed to true. Then call save_lead.
3b. If they ask whether you can hear them, say yes warmly and carry on.
4. When they want to book, call open_booking.
5. If they want to read more, call open_page with the best page.
6. Keep the conversation going with one relevant question at the end of most answers. Be honest when you cannot do something.`;
}

export const TOOLS = [{
  functionDeclarations: [
    { name: "show_screen", description: "Show the visitor a real Relyxus product screen beside the conversation.", parameters: { type: "OBJECT", properties: { screen: { type: "STRING", enum: Object.keys(SCREENS) } }, required: ["screen"] } },
    { name: "save_lead", description: "Save the visitor's details so the Relyxus team can follow up. Only call once you have name, email and company, and have confirmed the email.", parameters: { type: "OBJECT", properties: { name: { type: "STRING" }, email: { type: "STRING" }, company: { type: "STRING" }, interest: { type: "STRING", description: "demo, replay, quote, documents or question" }, sector: { type: "STRING" }, regulators: { type: "STRING" }, notes: { type: "STRING", description: "What they asked about, in a sentence" }, personal_email_confirmed: { type: "BOOLEAN", description: "True only if the visitor chose to use a personal email after being asked for a work one" } }, required: ["name", "email", "company", "interest"] } },
    { name: "open_booking", description: "Show the visitor the button to pick a meeting time.", parameters: { type: "OBJECT", properties: {} } },
    { name: "open_page", description: "Offer the visitor a page of the Relyxus website to read.", parameters: { type: "OBJECT", properties: { path: { type: "STRING", enum: PAGES } }, required: ["path"] } },
  ],
}];
