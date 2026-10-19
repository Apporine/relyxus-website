/**
 * Homepage copy deck (EcoOnline structure, Plum and Lime).
 * Voice: an experienced incident lead talking to a peer.
 */
import type { FaqItem } from "@/components/ui/Accordion";

export const announcement = {
  text: "New: 12 public payment outages, and where the hours went.",
  href: "/resources/incidents",
  linkLabel: "Read the incident files",
};

export const hero = {
  tag: "Incident response",
  titleBefore: "Know why payments failed,",
  titleAccent: "before the regulator asks",
  para1:
    "Relyxus pulls your logs, changes and alerts into one incident record and ranks the likely cause, with the evidence attached.",
  para2:
    "Every fix waits for a named approver, and the regulator notice starts as a draft at the first alert.",
  primary: { label: "Book Demo", href: "/demo" },
  secondary: { label: "Watch it work", href: "#walkthrough" },
  badge: "Built for DORA and the UK regime",
  frameNote:
    "Product preview built from the Relyxus interface. INC-2207 is an example incident.",
};

export const modulesBand = {
  title: "Confidently meet the 4-hour clock",
  intro: "One product, three modules.",
  cards: [
    {
      key: "war-room",
      title: "War Room",
      text: "Alerts, deploys, tickets and chat on one timeline, with the likely causes ranked by evidence.",
      href: "/product#war-room",
    },
    {
      key: "approvals",
      title: "Approvals",
      text: "Proposed fixes wait for the approvers your policy names.",
      href: "/product#approvals",
    },
    {
      key: "command-centre",
      title: "Command Centre",
      text: "Money at risk, minutes to cause and decisions pending, for leaders.",
      href: "/product#command-centre",
    },
  ],
} as const;

export const walkthrough = {
  title: "See an incident run, step by step",
  steps: [
    {
      title: "Pull the evidence",
      text: "Logs, deploys and alerts, in one record instead of five tabs.",
      crop: "evidence" as const,
    },
    {
      title: "Rank the likely cause",
      text: "Each candidate cause carries its sources, with recent changes beside it.",
      crop: "causes" as const,
    },
    {
      title: "A named person approves",
      text: "Nothing changes in production until a named person approves it.",
      crop: "approval" as const,
    },
    {
      title: "The record writes itself",
      text: "Your audit record is written while you work, not rebuilt the next morning.",
      crop: "record" as const,
    },
  ],
  side: {
    title: "Prefer to see it live?",
    text: "30 minutes with an engineer, on an incident like yours.",
    cta: { label: "Book a 30-minute demo", href: "/demo" },
  },
};

export const featureRows = [
  {
    id: "evidence",
    title: "Pull every signal into one record",
    text: "Logs, deploys, alerts and chat, linked to the incident the moment they arrive.",
    crop: "evidence" as const,
    tint: "tint-1" as const,
    showQuote: true,
  },
  {
    id: "cause",
    title: "See the likely cause, with the evidence attached",
    text: "Every candidate cause carries the sources for and against it. Open any source and check.",
    crop: "causes" as const,
    tint: "paper" as const,
    showQuote: false,
  },
  {
    id: "approval",
    title: "Nothing changes until a named person approves",
    text: "Relyxus never runs a change on its own.",
    crop: "approval" as const,
    tint: "tint-2" as const,
    showQuote: false,
  },
  {
    id: "report",
    title: "Report with confidence",
    text: "Your audit record is written while you work, so the first notice starts as a draft, not a blank page.",
    crop: "record" as const,
    tint: "paper" as const,
    showQuote: false,
    cta: { label: "Book Demo", href: "/demo" },
  },
] as const;

export const statement = "Incident response, made accountable.";

export const benefits = {
  title: "Built for the regulated payments teams who answer for every incident",
  items: [
    "DORA stages built in",
    "Ready for the UK regime from 18 March 2027",
    "Read-only by default",
    "A named approver on every change",
    "Every cause links to its sources",
    "Your incident data stays in your environment",
  ],
};

export const reportBanner = {
  title: "12 payment incidents: where the hours went",
  text: "Public outages across the UK, US and Australia, from their own post-incident reports.",
  cta: { label: "Get your copy", href: "/resources/incidents" },
};

export const carouselNote =
  "Public incident research. These firms are not Relyxus customers.";

export const demoForm = {
  title: "Ready to see the record your last incident would have left?",
  text: "Bring one closed incident. We’ll replay it read-only and show you the ranked cause, the approvals it would have asked for, and the notice draft.",
  submit: "Book a 30-minute demo",
  under: "We reply within one working day.",
};

export const insights = {
  title: "Be in the know",
  items: [
    {
      category: "Guide",
      title: "DORA and UK reporting: every deadline explained",
      href: "/dora",
      tint: "tint-1" as const,
    },
    {
      category: "Checklist",
      title: "Payments incident reporting checklist",
      href: "/dora/checklist",
      tint: "tint-2" as const,
    },
    {
      category: "Incident file",
      title: "Cloudflare: the alert fired in 3 minutes",
      href: "/resources/incidents/cloudflare-18-november-2025",
      tint: "tint-1" as const,
    },
  ],
};

/** Kept for Pilot page steps. */
export const pilot = {
  label: "Start with a closed incident",
  title: "Bring the incident that hurt most",
  intro: "We’ll show you the record it would have left.",
  steps: [
    {
      title: "Pick one you closed",
      text: "A SEV1 your team knows well. Include one where the first theory was wrong.",
    },
    {
      title: "We replay it, read-only",
      text: "We connect read-only to the sources for that incident. Nothing in your systems changes.",
    },
    {
      title: "Compare the record",
      text: "The cause it ranked and the evidence for it, the approvals it would have asked for, and the notice draft.",
    },
  ],
};

export const faq: readonly FaqItem[] = [
  {
    question: "What does Relyxus do?",
    answer:
      "When payments fail, Relyxus pulls your logs, deploys, alerts and chat into one incident record, ranks the likely causes with the evidence attached, holds every fix for a named approver, and drafts the regulator notice from the record.",
  },
  {
    question: "Does Relyxus change anything in our systems?",
    answer:
      "Investigating is read-only. A fix only runs after the approvers your policy names have said yes, and every approval is timestamped.",
  },
  {
    question: "Which tools does it connect to?",
    answer:
      "The tools in the product today include GitHub, Datadog, PagerDuty, Splunk and Slack. Ask for the full connector list; we’ll tell you plainly whether yours is supported.",
  },
  {
    question: "How long does setup take?",
    answer:
      "A replay pilot needs read-only access to the sources for one closed incident. We give you a written plan with dates before you start.",
  },
  {
    question: "Where is our data hosted?",
    answer:
      "Your incident data stays in your environment. Hosting regions and assurance status are in the security pack.",
  },
  {
    question: "How is it priced?",
    answer:
      "Start with a read-only replay pilot, then an annual subscription. The price is agreed in writing before you start.",
  },
  {
    question: "Does Relyxus send the regulator notice for us?",
    answer:
      "No. It drafts the first notice from the record so you are not starting from a blank page. Your resilience team reviews, completes and sends it.",
  },
  {
    question: "Which regulations does it cover?",
    answer:
      "The EU DORA major-incident reporting stages and the single UK FCA, PRA and Bank of England regime that applies from 18 March 2027.",
  },
  {
    question: "How is the likely-cause score worked out?",
    answer:
      "Each candidate cause is ranked from 0 to 1 by how strongly the linked evidence supports it, including evidence against it. Every source can be opened, so your team can check the ranking. It is a guide, not a verdict.",
  },
  {
    question: "Is Relyxus an autonomous AI?",
    answer:
      "No. It gathers evidence, ranks causes and writes things down. People decide, approve and send.",
  },
  {
    question: "Who is behind Relyxus?",
    answer: "Relyxus is built by Apporine.",
  },
];

/** Alias for Product page HowItWorks section. */
export const howItWorks = {
  label: "How it works",
  title: walkthrough.title,
  intro: "Four steps, one record.",
  steps: walkthrough.steps,
};

/** Used by the DORA page ClockBand. */
export const clockBand = {
  label: "Built for the 4-hour clock",
  title: "The draft starts at the first alert",
  intro:
    "Under DORA a major incident is reported in stages. Relyxus keeps the record from the first alert, so each notice starts as a draft.",
};

export const proof = {
  label: "Proof",
  title: "Early access, with payments teams",
};

export const audiences = {
  label: "Who it’s for",
  title: "Built for the people in the incident call",
};
