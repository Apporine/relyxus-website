// Vigil's conversation engine. It runs in the visitor's browser and costs
// nothing. It answers only from knowledge.ts, asks a few qualifying questions,
// collects name, work email and company when the visitor wants a demo, a
// replay, a quote or a person, and hands the result to leads.ts.

import { TOPICS, SMALL, FALLBACK, type Topic, type Show } from "./knowledge";

export type Reply = {
  text: string;
  show?: Show;
  link?: { label: string; href: string };
  chips?: string[];
  book?: boolean;          // offer the booking page
  leadReady?: boolean;     // name, email and company are complete
  unknown?: boolean;       // no confirmed answer; the AI service may try
  topics?: string[];       // closest topics, for the AI service
};

export type Lead = {
  name?: string; email?: string; company?: string;
  sector?: string; regulators?: string; interest?: string;
  questions: string[]; page: string; startedAt: string;
};

type Step = "name" | "email" | "company";
type Kind = "demo" | "replay" | "quote" | "human";

const FREE_MAIL = ["gmail", "googlemail", "yahoo", "hotmail", "outlook", "live", "msn", "icloud", "me", "aol", "proton", "protonmail", "gmx", "mail", "yandex", "zoho"];
const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const SECTORS = ["Bank or building society", "Payment firm or fintech", "SaaS serving banks", "Something else"];
const REGS = ["FCA and PRA", "DORA", "MAS", "US banking agencies", "Not sure yet"];
const START_CAPTURE: Record<string, Kind> = { demo: "demo", replay: "replay", pricing: "quote", contact: "human" };

const norm = (s: string) => " " + s.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9@.' ]+/g, " ").replace(/\s+/g, " ").trim() + " ";

function score(t: Topic, q: string): number {
  let s = 0;
  for (const w of t.words) {
    const k = w.toLowerCase().trim();
    const re = new RegExp("\\b" + k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + (k.length < 5 ? "\\b" : ""));
    if (re.test(q)) s += k.includes(" ") ? 3 : 2;
  }
  return s;
}

export function rank(q: string): { t: Topic; s: number }[] {
  const n = norm(q);
  return TOPICS.map((t) => ({ t, s: score(t, n) })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s);
}

const has = (q: string, list: string[]) => list.some((w) => new RegExp("\\b" + w + "\\b").test(q));
const first = (n?: string) => (n || "").split(" ")[0];

// "bisma 744 at the rate gmail dot com" becomes "bisma744@gmail.com".
export function spokenEmail(raw: string): string | null {
  const direct = raw.match(EMAIL)?.[0]; if (direct) return direct;
  let t = " " + raw.toLowerCase() + " ";
  t = t.replace(/\s(at the rate( of)?|at sign|at)\s/g, "@").replace(/\s(dot|point)\s/g, ".").replace(/\s(underscore)\s/g, "_").replace(/\s(dash|hyphen)\s/g, "-");
  const m = t.match(/([a-z0-9._%+ -]{1,60})@\s*([a-z0-9 -]+(?:\.[a-z0-9 -]+)+)/);
  if (!m) return null;
  const local = m[1].trim().split(/\s+/).filter((w) => !/^(it'?s|it|is|my|email|address|note|down|to|but|the|please|can|you|write|put|use|mail|e)$/.test(w)).slice(-2).join("");
  const dom = m[2].replace(/\s+/g, "").replace(/\.+$/, "");
  const e = `${local}@${dom}`;
  return EMAIL.test(e) ? e : null;
}

export class Engine {
  lead: Lead;
  private step: Step | null = null;
  private kind: Kind | null = null;
  private pending: "sector" | "regs" | null = null;
  private emailWarned = false;
  private turns = 0;
  private sectorAsked = false;
  private regsAsked = false;

  constructor(page: string) {
    this.lead = { questions: [], page, startedAt: new Date().toISOString() };
  }

  get capturing() { return this.step; }
  get complete() { return !!(this.lead.name && this.lead.email && this.lead.company); }

  reply(input: string): Reply {
    const raw = input.trim();
    const q = norm(raw);
    this.turns++;

    if (/\?\s*$/.test(raw) || raw.split(" ").length > 3) this.lead.questions.push(raw);

    const mail = spokenEmail(raw);
    if (mail && !this.lead.email && this.step !== "email") { this.step = "email"; this.kind ||= "human"; }

    if (this.step) {
      const r = this.capture(raw, q);
      if (r) return r;
    }

    if (this.pending) {
      const r = this.qualify(raw, q);
      if (r) return r;
    }

    if (/\b(can|do) you hear me\b|\bare you there\b|\bhello\?/.test(q)) return { text: "Yes, I can hear you. What would you like to know about Relyxus?", chips: ["What is Relyxus?", "Show me the product", "Book a demo"] };
    if (/\bhow are you\b|\bhow'?s it going\b/.test(q)) return { text: "I'm very well, thank you for asking. How can I help you with Relyxus today?", chips: ["What is Relyxus?", "Show me the product", "Book a demo"] };
    if (/\byour name\b|\bwho are you\b|\b(are you|you are) (a )?(male|female|man|woman|boy|girl|human|person|real|bot|robot|ai)\b|\bmale\b|\bfemale\b/.test(q)) return { text: "I'm the Relyxus assistant, an AI. I don't have a gender, just a voice. I answer from what Relyxus has published, and a person from the team is always one message away. What would you like to know?", chips: ["What is Relyxus?", "Show me the product", "Talk to a person"] };
    if (has(q, SMALL.bot)) return { text: "I'm the Relyxus assistant, an AI for the Relyxus website. I answer from what Relyxus has published, and I'll tell you when I don't know. A person from the team is always one message away.", chips: ["What is Relyxus?", "Talk to a person"] };
    const ranked = rank(raw);
    if (!ranked.length && has(q, SMALL.greet)) return { text: "Hello. I can explain Relyxus, show you the product or set up a demo. What would help most?", chips: ["What is Relyxus?", "Show me the product", "Book a demo"] };
    if (!ranked.length && has(q, SMALL.thanks)) return { text: "You're welcome. Is there anything else you'd like to see?", chips: ["Show me the product", "Book a demo"] };
    if (!ranked.length && has(q, SMALL.bye)) return { text: this.lead.email ? `Thank you${this.lead.name ? ", " + first(this.lead.name) : ""}. The team will be in touch at ${this.lead.email}.` : "Thank you for stopping by. If you'd like the team to follow up, just leave your work email here any time." };

    if (/\b(show|see)\b.*\b(incident|outage)\b/.test(q)) {
      return { text: "Here is a live incident in our demo workspace: card authorisation failing, with the likely cause, who is on it and what is waiting for approval. Want to see how the fix was approved?", show: { src: "/media/console/incidents_INC-2041.jpg", caption: "A live incident, INC 2041", href: "/respond" }, chips: ["Show me the approval", "How does reporting work?", "Book a demo"] };
    }
    if (/show me|see the product|screens?|interface|what does it look like/.test(q) && !ranked.length) {
      const t = TOPICS.find((x) => x.id === "what")!;
      return { text: "Here is the command centre, from our demo workspace. Every screen I show you is the real product. What would you like to see next?", show: t.show, chips: ["How does it fix an incident?", "Show me Vigil", "Show me a regulator report"] };
    }

    const corr = raw.match(/\b(?:it'?s|its|company is|we are|we're|the company is)\s+([A-Za-z0-9&' .-]{2,60})$/i);
    if (this.complete && corr && !ranked.length) {
      this.lead.company = corr[1].trim();
      return { text: `Got it, ${this.lead.company}. I have updated your details.`, leadReady: true };
    }
    if ((!ranked.length || ranked[0].s < 2) && this.lead.email) {
      this.lead.questions.push(raw);
      return { text: `I don't have a confirmed answer to that, so I have noted your question for the team. They will reply to ${this.lead.email}.`, chips: ["What is Relyxus?", "Show me the product"], unknown: true, topics: ranked.slice(0, 3).map((x) => x.t.id) };
    }
    if (!ranked.length || ranked[0].s < 2) {
      return { text: FALLBACK, chips: ["Leave my email", "Book a demo"], unknown: true, topics: ranked.slice(0, 3).map((x) => x.t.id) };
    }

    const t = ranked[0].t;
    this.lead.interest = this.lead.interest ? Array.from(new Set([...this.lead.interest.split(", "), t.id])).join(", ") : t.id;
    const out: Reply = { text: t.answer, show: t.show, link: t.link, chips: t.follow };

    const kind = START_CAPTURE[t.id];
    if (kind) {
      this.kind = kind;
      if (this.complete) return this.finish(out.text);
      this.step = this.lead.name ? (this.lead.email ? "company" : "email") : "name";
      out.text += " " + this.prompt();
      out.chips = ["Not right now"];
      return out;
    }
    if (t.capture && !this.lead.email) out.chips = [...(t.follow || []).slice(0, 2), "Book a demo"];

    if (this.turns >= 2 && !this.sectorAsked && !this.lead.sector) {
      this.sectorAsked = true; this.pending = "sector";
      out.text += " May I ask, which best describes your company?";
      out.chips = SECTORS;
    } else if (this.turns >= 4 && this.lead.sector && !this.regsAsked && !this.lead.regulators) {
      this.regsAsked = true; this.pending = "regs";
      out.text += " Which regulators do you report to? Then I can be specific about your deadlines.";
      out.chips = REGS;
    }
    return out;
  }

  private prompt(): string {
    if (this.step === "name") return "Could I take your name?";
    if (this.step === "email") return `Thanks${this.lead.name ? ", " + first(this.lead.name) : ""}. What is your work email?`;
    return "And which company are you with?";
  }

  private capture(raw: string, q: string): Reply | null {
    if (/\b(not right now|no thanks|skip|cancel|later|don't want|dont want|no$)\b/.test(q.trim())) {
      this.step = null; this.kind = null;
      return { text: "No problem. What else would you like to know?", chips: ["Show me the product", "How does it fix an incident?"] };
    }
    if (this.step === "name") {
      if (/\?/.test(raw) || (rank(raw)[0]?.s ?? 0) >= 3) return null;
      const corrected = /\b(not|isn'?t)\b/i.test(raw) ? raw.trim().split(/\s+/).pop()?.replace(/[^A-Za-zÀ-ÿ'-]/g, "") : undefined;
      const name = (corrected || raw).replace(/^(yes|yeah|yep|sure|ok|okay|hi|hello|hey)[,. ]+/i, "").replace(/^(my name is|my name's|i am|i'm|im|it's|its|this is|call me|it is)\s+/i, "").replace(/[^A-Za-zÀ-ÿ' -]/g, "").trim();
      if (!name || name.split(" ").length > 4) return { text: "Sorry, I didn't catch your name. What should I call you?" };
      this.lead.name = name.split(" ").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ");
      this.step = this.lead.email ? "company" : "email";
      return { text: this.prompt() };
    }
    if (this.step === "email") {
      const m = spokenEmail(raw);
      const fix = /\b(not|isn'?t)\b.*\b(say|said|it'?s|is)\b/i.test(raw) ? raw.trim().split(/\s+/).pop()?.replace(/[^A-Za-zÀ-ÿ'-]/g, "") : undefined;
      if (!m && fix) { this.lead.name = fix[0].toUpperCase() + fix.slice(1); return { text: `Sorry, ${this.lead.name}. What is your work email?` }; }
      if (!m) {
        if (/\?/.test(raw)) return null;
        return { text: "That doesn't look like an email address. Could you type your work email?" };
      }
      const dom = m.split("@")[1].toLowerCase().split(".")[0];
      if (FREE_MAIL.includes(dom) && !this.emailWarned) {
        this.emailWarned = true;
        return { text: "Could you share your work email instead? It helps the team prepare for your company. If this is the best address, just send it again." };
      }
      this.lead.email = m.toLowerCase();
      this.step = this.lead.company ? null : "company";
      if (this.step) return { text: this.prompt() };
      return this.finish();
    }
    if (this.step === "company") {
      if (/\?/.test(raw)) return null;
      this.lead.company = raw.replace(/^(i work (at|for)|we are|we're|it's|its|at)\s+/i, "").trim().slice(0, 80);
      this.step = null;
      return this.finish();
    }
    return null;
  }

  private qualify(raw: string, q: string): Reply | null {
    const p = this.pending; this.pending = null;
    if (/\?/.test(raw)) return null;
    const fits = p === "sector" ? /bank|building|credit|payment|fintech|money|saas|software|insur|else|other|none|lender|startup/.test(q)
      : /fca|pra|dora|mas|us |occ|fed|fdic|none|not sure|unsure|eba|central bank|regulat/.test(q);
    if (!fits) return null;
    if (p === "sector") {
      this.lead.sector = raw.slice(0, 60);
      const line = /saas|software|serv(e|ing) banks/.test(q) ? "Good to know. When you serve banks, each one has its own notice deadline, and Relyxus tracks every one and drafts each notice for you."
        : /payment|fintech|money/.test(q) ? "Good to know. For payment firms, every minute down is money lost, so Relyxus links each incident to the payments and partners it touches."
        : /bank|building|credit/.test(q) ? "Good to know. Relyxus was built for the night a bank goes down, and the new FCA and PRA rules are a big part of it."
        : "Thanks, that helps.";
      return { text: line + " What would you like to look at next?", chips: ["How does it fix an incident?", "How does reporting work?", "Book a demo"] };
    }
    this.lead.regulators = raw.slice(0, 80);
    return { text: "Thank you. Relyxus starts each of those clocks from the incident record and drafts every report for a named person to sign. Would you like to see one?", chips: ["Show me a regulator report", "Book a demo"] };
  }

  private finish(prefix = ""): Reply {
    const n = first(this.lead.name), e = this.lead.email, ty = n ? `Thank you, ${n}.` : "Thank you.";
    const by: Record<Kind, Reply> = {
      demo: { text: `${ty} Pick a time that suits you, and the team will be ready for you.`, book: true, chips: ["Show me the product"] },
      replay: { text: `${ty} The team will email ${e} with a safe way to send your incident. Remove anything you would rather not share.`, chips: ["What do you need from us?"] },
      quote: { text: `${ty} The team will send a written quote to ${e}. They may ask a few questions about what you run, so it is accurate.`, chips: ["Book a demo too"] },
      human: { text: `${ty} Someone from the team will reply to ${e}.`, chips: ["Show me the product"] },
    };
    const r = by[this.kind || "human"];
    this.kind = null;
    return { ...r, text: (prefix ? prefix + " " : "") + r.text, leadReady: true };
  }
}
