/**
 * The three Solutions pages. One template, different content: each has its
 * own bad night, promise, screen, proof, FAQ and next step.
 */
import type { FaqItem } from "@/components/ui/Accordion";
import type { ModuleKey } from "./product";

export type RoleSlug = "engineering" | "resilience" | "leadership";

export type Role = {
  slug: RoleSlug;
  name: string;
  who: string;
  /** Homepage audience card. */
  card: { pain: string; outcome: string };
  title: string;
  lede: string;
  badNight: readonly [string, string, string];
  screen: { module: ModuleKey; title: string; intro: string };
  outcomes: readonly { title: string; text: string }[];
  reassurance: string;
  /** Matching public incident, by slug. */
  incident: string;
  proof: "replay" | "regulation" | "quote";
  faq: readonly FaqItem[];
  cta: { title: string; text: string; label: string; href: string };
};

export const roles: readonly Role[] = [
  {
    slug: "engineering",
    name: "Payments engineering",
    who: "SRE, on-call and platform teams",
    card: {
      pain: "Five tabs open, a Slack thread of guesses, and nobody sure which deploy did it.",
      outcome:
        "One record with the likely cause ranked and the evidence beside it.",
    },
    title: "Find the cause in minutes, with the evidence beside it",
    lede: "Relyxus puts the alert, the last few hours of changes and the affected service in one record, and ranks the likely causes with their sources attached.",
    badNight: [
      "It’s 2 a.m. and card declines are climbing. You have the alerting tool, two dashboards, the deploy log and a Slack thread open.",
      "Three people have three theories. The loudest one wins the first 40 minutes.",
      "Someone eventually asks what shipped this afternoon. It was the deploy.",
    ],
    screen: {
      module: "war-room",
      title: "The War Room: causes ranked, sources linked",
      intro:
        "Every candidate cause shows the evidence for it and against it. Open any source and check.",
    },
    outcomes: [
      {
        title: "One record instead of five tabs",
        text: "Alerts, deploys, logs and the call itself on a single timeline.",
      },
      {
        title: "Recent changes next to every cause",
        text: "Cloudflare’s November 2025 outage began with a permissions change 23 minutes before impact. Relyxus lines up recent changes for you.",
      },
      {
        title: "Fixes wait for a named approver",
        text: "Propose the rollback in Relyxus; it runs only when the people your policy names say yes.",
      },
    ],
    reassurance:
      "Read-only by default, and it works with the tools you already run.",
    incident: "cloudflare-18-november-2025",
    proof: "replay",
    faq: [
      {
        question: "Does Relyxus replace our monitoring or alerting?",
        answer:
          "No. It reads from the monitoring, alerting, deploy and ticketing tools you already have and builds the incident record from them.",
      },
      {
        question: "Can it run a rollback on its own?",
        answer:
          "No. Relyxus can propose a change and show its evidence, blast radius and rollback plan. It runs only after the approvers named in your policy approve it.",
      },
      {
        question: "How is a cause ranked?",
        answer:
          "By the evidence attached to it: matching changes, correlated errors and timing. Each cause lists its supporting and refuting evidence, so your team can check the ranking rather than trust it.",
      },
    ],
    cta: {
      title: "Bring a closed incident",
      text: "Pick the SEV1 that still bothers you. We’ll replay it read-only and show you the record it would have left.",
      label: "Start a replay pilot",
      href: "/pilot",
    },
  },
  {
    slug: "resilience",
    name: "Resilience and risk",
    who: "Operational resilience and compliance",
    card: {
      pain: "Rebuilding the timeline from screenshots to meet a 4-hour first notice.",
      outcome:
        "A timestamped record and a first-notice draft that start at the first alert.",
    },
    title: "The regulator notice starts at the first alert",
    lede: "Every step is timestamped and attributed while the incident runs, so the DORA or UK first notice begins as a draft, not a blank page.",
    badNight: [
      "Two hours into a SEV1, someone asks you for the timeline.",
      "It lives in Slack, a bridge call nobody recorded and three engineers’ memories.",
      "The 4-hour first notice is already running, and you’re pasting screenshots into a template.",
    ],
    screen: {
      module: "approvals",
      title: "Every decision on the record, with its approver",
      intro:
        "Approvals, the DORA notice and policy changes sit in one queue, each with its deadline, evidence and named approvers.",
    },
    outcomes: [
      {
        title: "Every step timestamped and attributed",
        text: "Who saw what, who decided what, and when. Written as it happens.",
      },
      {
        title: "First-notice draft from the live record",
        text: "Classification time, affected services, working cause and actions so far, ready for your review.",
      },
      {
        title: "Export-ready for audit",
        text: "The record is in event order with sources linked, the way an auditor will read it.",
      },
    ],
    reassurance:
      "People still classify, review and submit anything that goes to a regulator.",
    incident: "rba-rits-27-january-2026",
    proof: "regulation",
    faq: [
      {
        question: "Does Relyxus submit notices to the regulator?",
        answer:
          "No. It drafts them from the record. Your team classifies the incident, reviews the draft and submits it through your usual channel.",
      },
      {
        question: "Which regimes does the draft cover?",
        answer:
          "DORA’s initial, intermediate and final reports, and the UK FCA, PRA and Bank of England regime that applies from 18 March 2027.",
      },
      {
        question: "Can we export the record?",
        answer:
          "Yes. The record exports in event order with every source linked, for your post-incident review and for audit.",
      },
    ],
    cta: {
      title: "Check your reporting before the next incident",
      text: "A one-page checklist for DORA and the UK regime: what to have ready before the incident, in the first hour, and before each deadline.",
      label: "Get the reporting checklist",
      href: "/dora/checklist",
    },
  },
  {
    slug: "leadership",
    name: "Leadership",
    who: "CTO, COO and Head of Payments",
    card: {
      pain: "Money at risk is unknown, and the board wants an answer by morning.",
      outcome:
        "Money at risk, minutes to cause and decisions pending, while it happens.",
    },
    title: "Know what’s at risk, and who decided what, while it’s happening",
    lede: "The Command Centre shows money at risk, the decisions waiting and the regulator clock, without you joining the incident call.",
    badNight: [
      "Your phone lights up at 11 p.m. Payments are failing, and nobody can tell you how many or how much.",
      "You join the bridge to find out and become one more voice on it.",
      "At 8 a.m. the board asks who decided not to roll back sooner. Nobody wrote it down.",
    ],
    screen: {
      module: "command-centre",
      title: "The Command Centre: exposure and decisions",
      intro:
        "Every active incident with its money at risk, every decision waiting and the time left on the first notice.",
    },
    outcomes: [
      {
        title: "Money at risk while it runs",
        text: "Failed transactions and value at risk per incident, updated as it develops.",
      },
      {
        title: "Every decision with a name and a time",
        text: "Including the decisions not to act, and what was known when they were made.",
      },
      {
        title: "A summary the board can read",
        text: "What happened, what it cost and who decided, in plain words the next morning.",
      },
    ],
    reassurance: "No change runs without a named approver your policy defines.",
    incident: "lloyds-12-march-2026",
    proof: "quote",
    faq: [
      {
        question: "Where does the money-at-risk figure come from?",
        answer:
          "From your own transaction and payments data, connected read-only. It is shown as an estimate while the incident runs and labelled as one.",
      },
      {
        question: "Who decides who can approve a change?",
        answer:
          "You do. Approval policies are set by your organisation; Relyxus enforces them and records every decision against them.",
      },
      {
        question: "How is Relyxus priced?",
        answer:
          "A read-only replay pilot first, then an annual licence with no per-seat fees. The price is agreed in writing before you start.",
      },
    ],
    cta: {
      title: "See it on an incident like yours",
      text: "Thirty minutes with an engineer: one incident from first alert to board summary.",
      label: "Book a 30-minute demo",
      href: "/demo",
    },
  },
];

export const roleBySlug = (slug: string) =>
  roles.find(role => role.slug === slug);
