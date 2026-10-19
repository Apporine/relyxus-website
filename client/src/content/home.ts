/**
 * Homepage copy: a hero and nine sections, each saying one thing. Voice: an
 * experienced incident lead talking to a peer. Sentence case, no taglines.
 */
import type { FaqItem } from "@/components/ui/Accordion";
import type { CompareRow } from "@/components/ui/CompareTable";

export const hero = {
  label: "Incident response for regulated payments firms",
  title: "Know why payments failed, before the regulator asks.",
  sub: "Relyxus pulls logs, changes and alerts into one record, ranks the likely cause and waits for a named approver before anything changes.",
  primary: { label: "Book a 30-minute demo", href: "/demo" },
  secondary: { label: "See the product", href: "/product" },
  frameNote:
    "Product preview built from the Relyxus interface. INC-2207 is an example incident.",
};

export const problem = {
  label: "The problem",
  title: "The alert is fast. Finding the cause is not.",
  text: "During a SEV1 the evidence is in five tabs, the cause is whatever the loudest voice says, and the regulator’s 4-hour clock is already running.",
};

export const howItWorks = {
  label: "How it works",
  title: "How an incident runs with Relyxus",
  intro:
    "Four steps, one record. Your team does the deciding; Relyxus does the gathering and the writing down.",
  steps: [
    {
      title: "Pull the evidence",
      text: "Logs, deploys and alerts, in one record instead of five tabs.",
      crop: "evidence",
    },
    {
      title: "Rank the likely cause",
      text: "Each candidate cause carries its sources, with recent changes beside it.",
      crop: "causes",
    },
    {
      title: "A named person approves",
      text: "Nothing changes in production until a named person approves it.",
      crop: "approval",
    },
    {
      title: "The record writes itself",
      text: "Your audit record is written while you work, not rebuilt the next morning.",
      crop: "record",
    },
  ],
} as const;

export const clockBand = {
  label: "Built for the 4-hour clock",
  title: "The draft starts at the first alert",
  intro:
    "Under DORA a major incident is reported in stages. Relyxus keeps the record from the first alert, so each notice starts as a draft.",
};

export const audiences = {
  label: "Who it’s for",
  title: "Built for the people in the incident call",
};

export const proof = {
  label: "Proof",
  title: "Early access, with payments teams",
};

export const compare = {
  label: "What we sell",
  title: "Relyxus vs. the usual way",
  columns: ["Relyxus", "Manual war room", "Generic AIOps"],
  rows: [
    {
      label: "Evidence",
      cells: ["Every source linked", "Screenshots in chat", "Alerts only"],
    },
    {
      label: "Likely cause",
      cells: ["Ranked, with sources", "Loudest voice", "A score, no sources"],
    },
    {
      label: "Changes",
      cells: [
        "Wait for named approvers",
        "Run from a terminal",
        "Can run unattended",
      ],
    },
    {
      label: "Record",
      cells: ["Written as you go", "Rebuilt afterwards", "Not its job"],
    },
    {
      label: "Regulator draft",
      cells: ["Ready within 4 hours", "Blank page", "Not covered"],
    },
  ] satisfies CompareRow[],
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
    question: "What does Relyxus need access to?",
    answer:
      "Read-only access. For a replay pilot, that means the sources for one closed incident: typically alerts, deploy history and logs. Investigating never changes anything in your systems, and any change Relyxus proposes in production waits for the approvers your policy names.",
  },
  {
    question: "How long does setup take?",
    answer:
      "We agree the scope of a pilot on the first call. How long connecting takes depends on your tools and your security review, so we give you a written plan with dates before you start.",
  },
  {
    question: "Which tools does it connect to?",
    answer:
      "PagerDuty, Datadog, Splunk, GitHub, GitLab, Jira, ServiceNow, Okta, Slack and AWS CloudWatch today. If yours isn’t listed, ask; we’ll tell you plainly whether it’s supported.",
  },
  {
    question: "How is it priced?",
    answer:
      "A read-only replay pilot first, then an annual licence with no per-seat fees. What you pay for the pilot comes off the licence if you go ahead, and the price is agreed in writing before you start.",
  },
  {
    question: "Where is our data hosted?",
    answer:
      "Relyxus runs as a dedicated environment or self-hosted by you, so incident evidence stays in your environment. Hosting regions and assurance status are in the security pack.",
  },
];

export const demoForm = {
  title: "Book a 30-minute demo",
  text: "Tell us a little about your team. A named person from Relyxus replies, not a no-reply sequence.",
};
