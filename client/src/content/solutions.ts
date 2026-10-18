/**
 * Solutions (Website Redesign Strategy): three team pages on one template.
 * The three incident types are tabs inside each page's diagram, not pages.
 * Budget: 200 words a page. Example figures are labelled as examples.
 */
import type { CoreTint } from "@/components/core/coreRenderer";

export type CaseKey =
  | "payment-failures"
  | "third-party-outages"
  | "change-incidents";
export type TeamView = "evidence" | "timeline" | "exposure";

export type UseCase = {
  key: CaseKey;
  label: string;
  /** One short caption per chain step: Alert, Correlate, Cause, Approve, Fix, Record. */
  steps: readonly string[];
  causes: readonly { name: string; score: number }[];
  /** Minutes after the alert that the incident was classified as major. */
  classifiedAfter: number;
  exposure: { atRisk: number; minutes: number; failed: number };
};

export type Team = {
  slug: "engineering" | "resilience" | "leadership";
  label: string;
  line: string;
  clock: string;
  status: string;
  tint: CoreTint;
  title: string;
  lede: string;
  cta: { label: string; href: string };
  /** Chain steps this team owns; the rest are dimmed. */
  lit: readonly number[];
  view: TeamView;
  viewTitle: string;
  outcomes: readonly { value: string; line: string }[];
};

export const chainSteps = [
  "Alert",
  "Correlate",
  "Cause",
  "Approve",
  "Fix",
  "Record",
] as const;

export const useCases: readonly UseCase[] = [
  {
    key: "payment-failures",
    label: "Payment failures",
    steps: [
      "Declines up 8× on UK cards",
      "Router timeouts match the spike",
      "api-gw v3.2 cut the pool",
      "Payments Ops signs off",
      "Rollback to v3.1",
      "Draft first notice ready",
    ],
    causes: [
      { name: "Deploy api-gw v3.2", score: 0.86 },
      { name: "Card network latency", score: 0.41 },
      { name: "Ledger write lag", score: 0.08 },
    ],
    classifiedAfter: 35,
    exposure: { atRisk: 184000, minutes: 47, failed: 18400 },
  },
  {
    key: "third-party-outages",
    label: "Third party outages",
    steps: [
      "Processor status: degraded",
      "Your declines track theirs",
      "Your retries doubled load",
      "Failover approved",
      "Second processor live",
      "Both timelines, sourced",
    ],
    causes: [
      { name: "Card processor outage", score: 0.78 },
      { name: "Retry policy amplifying load", score: 0.52 },
      { name: "Network path loss", score: 0.12 },
    ],
    classifiedAfter: 50,
    exposure: { atRisk: 96000, minutes: 38, failed: 9700 },
  },
  {
    key: "change-incidents",
    label: "Change incidents",
    steps: [
      "Errors jump to 6.1%",
      "Spike starts after deploy",
      "Config change in v3.2",
      "Rollback waits at the gate",
      "v3.1 restored",
      "Change and approval, one line",
    ],
    causes: [
      { name: "Deploy api-gw v3.2", score: 0.91 },
      { name: "Upstream DNS change", score: 0.22 },
      { name: "Traffic surge", score: 0.06 },
    ],
    classifiedAfter: 20,
    exposure: { atRisk: 41000, minutes: 19, failed: 4100 },
  },
];

export const teams: readonly Team[] = [
  {
    slug: "engineering",
    label: "Engineering and SRE",
    line: "From alert to cause, every source in one view",
    clock: "T+00:02",
    status: "Correlating",
    tint: "signal",
    title: "From alert to cause, *without the tab hunt.*",
    lede: "The alert, the last two hours of changes and the affected service, in one investigation ranked by evidence.",
    cta: { label: "Replay your last SEV1", href: "/demo?type=Replay%20pilot" },
    lit: [0, 1, 2],
    view: "evidence",
    viewTitle: "Causes, *ranked by evidence.*",
    outcomes: [
      { value: "1", line: "investigation, every source linked to it" },
      { value: "2h", line: "of changes lined up before alert" },
      { value: "0", line: "changes run without a named approver" },
    ],
  },
  {
    slug: "resilience",
    label: "Risk and resilience",
    line: "The regulator report starts as a draft",
    clock: "T+00:09",
    status: "Recorded",
    tint: "paper",
    title: "The report starts *while the incident runs.*",
    lede: "Timeline, owners and decisions are logged from the first alert, so each deadline starts with a draft.",
    cta: {
      label: "Get the readiness checklist",
      href: "/demo?type=Readiness%20checklist",
    },
    lit: [0, 3, 5],
    view: "timeline",
    viewTitle: "Every deadline, *already drafting.*",
    outcomes: [
      { value: "4h", line: "first notice, drafted from the record" },
      { value: "72h", line: "intermediate report, built from what happened" },
      { value: "1", line: "record per incident, ordered and sourced" },
    ],
  },
  {
    slug: "leadership",
    label: "Technology leadership",
    line: "What it cost, and who decided what",
    clock: "T+04:00",
    status: "First notice due",
    tint: "dense",
    title: "Know what it cost, *and who decided.*",
    lede: "Money at risk while it runs, every decision with a name and a time, and a summary the board can read.",
    cta: { label: "Book a 30 minute demo", href: "/demo?type=Demo" },
    lit: [2, 3, 4],
    view: "exposure",
    viewTitle: "Exposure, *in money and minutes.*",
    outcomes: [
      { value: "£/min", line: "at risk, updated while it runs" },
      { value: "1", line: "decision log, every call with a name" },
      { value: "8am", line: "board summary ready the next morning" },
    ],
  },
];

export const teamBySlug = (slug: string) =>
  teams.find(team => team.slug === slug);
export const caseByKey = (key: string | null) =>
  useCases.find(useCase => useCase.key === key) ?? useCases[0];
