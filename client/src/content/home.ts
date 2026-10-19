/**
 * Homepage copy deck (EcoOnline structure, Plum and Lime).
 * Each section says one new thing — no restating the hero.
 */
import type { FaqItem } from "@/components/ui/Accordion";
import { incidentFiles } from "./incidents";

/** Counts come from the files themselves, so the copy can never disagree. */
const fileCount = incidentFiles.length;

export const announcement = {
  text: `New research: ${fileCount} production incidents, from the operators’ and regulators’ own reports.`,
  href: "/resources/incidents",
  linkLabel: "Open the incident files",
};

export const hero = {
  tag: "Incident response for payments",
  titleBefore: "Know why payments failed,",
  titleAccent: "before the regulator asks",
  para1:
    "When card declines spike, Relyxus pulls logs, deploys and alerts into one live record and ranks the likely cause, with every source one click away.",
  para2:
    "Nothing changes in production until a named approver says yes. The DORA or UK first notice starts as a draft at the first alert.",
  primary: { label: "Book Demo", href: "/demo" },
  secondary: { label: "Watch it work", href: "#walkthrough" },
  badge: "Built for DORA and the UK regime from 18 March 2027",
  frameNote:
    "Product preview. INC-2207 is an example incident, not a customer case.",
  /** Alert 14:05:12 → likely cause 14:11:40 in the example record. */
  stat: { value: "6 min", label: "alert to likely cause", note: "Example" },
};

export const modulesBand = {
  label: "One product, three modules",
  title: "Confidently meet the 4 hour clock",
  intro:
    "Three modules, one incident. From the bridge call to the board summary, without rebuilding the timeline from Slack.",
  cards: [
    {
      key: "war-room",
      title: "War Room",
      text: "The investigation screen: ranked causes, linked evidence, and the people on the call in one place.",
      href: "/product#war-room",
    },
    {
      key: "approvals",
      title: "Approvals",
      text: "Every proposed fix waits for the approvers your policy names, with blast radius and rollback visible.",
      href: "/product#approvals",
    },
    {
      key: "command-centre",
      title: "Command Centre",
      text: "Money at risk, decisions pending and the regulator countdown, without joining the bridge.",
      href: "/product#command-centre",
    },
  ],
} as const;

export const walkthrough = {
  title: "See an incident run, step by step",
  steps: [
    {
      title: "Pull the evidence",
      text: "Four sources land on one timeline in the first minutes, not after the call ends.",
      crop: "evidence" as const,
    },
    {
      title: "Rank the likely cause",
      text: "Scores from 0 to 1, with evidence for and against. A guide for the team, not a verdict.",
      crop: "causes" as const,
    },
    {
      title: "A named person approves",
      text: "Rollback stays pending until the people your policy names both say yes.",
      crop: "approval" as const,
    },
    {
      title: "The record writes itself",
      text: "Detection, decisions and recovery stay in order, ready for the first notice draft.",
      crop: "record" as const,
    },
  ],
  side: {
    title: "Prefer to see it live?",
    text: "30 minutes with an engineer on an incident like yours, not a slide deck.",
    cta: { label: "Book a 30 minute demo", href: "/demo" },
  },
};

export const featureRows = [
  {
    id: "evidence",
    title: "Stop hunting five tabs at 2 a.m.",
    text: "PagerDuty, Datadog, GitHub and Slack feed one incident the moment they fire. Your team debates the cause, not where the logs live.",
    crop: "evidence" as const,
    tint: "tint-1" as const,
    showQuote: true,
  },
  {
    id: "cause",
    title: "Replace the loudest voice with ranked evidence",
    text: "Each candidate cause carries supporting and refuting sources. Open any one and check, the score is a guide, never a black box.",
    crop: "causes" as const,
    tint: "paper" as const,
    showQuote: false,
  },
  {
    id: "approval",
    title: "Keep a human between proposal and production",
    text: "Relyxus never runs a change on its own. The exact command, policy and consequence ladder wait for named approvers.",
    crop: "approval" as const,
    tint: "tint-2" as const,
    showQuote: false,
  },
  {
    id: "report",
    title: "Hand the regulator a draft, not a blank page",
    text: "Classification time, affected services, working cause and actions so far, filled from the live record inside the 4 hour window.",
    crop: "record" as const,
    tint: "paper" as const,
    showQuote: false,
    cta: { label: "Book Demo", href: "/demo" },
  },
] as const;

export const statement = "Incident response, made accountable.";

export const benefits = {
  title: "Built for the teams who answer for every incident",
  items: [
    "DORA initial, intermediate and final stages built in",
    "Ready for the UK FCA/PRA/BoE regime from 18 March 2027",
    "Read only by default, investigating never changes production",
    "A named approver on every proposed fix",
    "Every cause links to openable sources",
    "Incident data stays in your environment",
  ],
};

export const reportBanner = {
  title: `${fileCount} production incidents: where the hours went`,
  text: "Banks, cloud providers and market infrastructure in the UK and US. Each timeline comes from a post incident report, regulator or securities filing, with the money stated exactly as disclosed.",
  cta: { label: "Read the incident files", href: "/resources/incidents" },
};

export const carouselNote =
  "Public incident research. These firms are not Relyxus customers and have not endorsed Relyxus.";

export const demoForm = {
  title: "Ready to see the record your last SEV1 would have left?",
  text: "Bring one closed incident. We replay it read only and show the ranked cause, the approvals it would have asked for, and the notice draft.",
  submit: "Book a 30 minute demo",
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
      title: "Cloudflare: alert in 3 minutes, cause in 2 hours",
      href: "/resources/incidents/cloudflare-18-november-2025",
      tint: "tint-1" as const,
    },
  ],
};

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
      title: "We replay it, read only",
      text: "We connect read only to the sources for that incident. Nothing in your systems changes.",
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
      "Investigating is read only. A fix only runs after the approvers your policy names have said yes, and every approval is timestamped.",
  },
  {
    question: "Which tools does it connect to?",
    answer:
      "GitHub, Datadog, PagerDuty, Splunk and Slack today. Ask for the full connector list; we’ll tell you plainly whether yours is supported.",
  },
  {
    question: "How long does setup take?",
    answer:
      "A replay pilot needs read only access to the sources for one closed incident. We give you a written plan with dates before you start.",
  },
  {
    question: "Where is our data hosted?",
    answer:
      "Your incident data stays in your environment. Hosting regions and assurance status are in the security pack.",
  },
  {
    question: "How is it priced?",
    answer:
      "Start with a read only replay pilot, then an annual subscription. The price is agreed in writing before you start.",
  },
  {
    question: "Does Relyxus send the regulator notice for us?",
    answer:
      "No. It drafts the first notice from the record. Your resilience team reviews, completes and sends it.",
  },
  {
    question: "Which regulations does it cover?",
    answer:
      "EU DORA major incident stages and the UK FCA, PRA and Bank of England regime from 18 March 2027.",
  },
  {
    question: "How is the likely cause score worked out?",
    answer:
      "Each cause is ranked 0 to 1 by how strongly linked evidence supports it, including evidence against. Every source is openable. It is a guide, not a verdict.",
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

export const howItWorks = {
  label: "How it works",
  title: walkthrough.title,
  intro:
    "Four steps, one record, your team decides; Relyxus gathers and writes down.",
  steps: walkthrough.steps,
};

export const clockBand = {
  label: "Built for the 4 hour clock",
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
