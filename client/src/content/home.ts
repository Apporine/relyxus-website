/**
 * Homepage copy deck (Website Redesign Strategy). Six pinned stages around
 * the signal core, an Explore stage, then four resolved sections. Budget:
 * 450 words for the whole homepage. Headlines use `*accent*` for the one
 * Instrument Serif phrase; display text is written in sentence case and set
 * in caps by CSS.
 */

export type StageId =
  | "hero"
  | "signals"
  | "chain"
  | "cause"
  | "approval"
  | "record"
  | "explore"
  | "exit";

export type StageMeta = {
  id: StageId;
  number: string;
  name: string;
  clock: string;
  status: string;
  /** Scroll length of the stage, in viewport heights. */
  length: number;
};

/** Stage order, clocks and scroll lengths (stage 3 is 123vh, the exit 55vh). */
export const stages: readonly StageMeta[] = [
  {
    id: "hero",
    number: "01",
    name: "Hero",
    clock: "T+00:00",
    status: "First alert",
    length: 100,
  },
  {
    id: "signals",
    number: "02",
    name: "Signals",
    clock: "T+00:01",
    status: "Signals in",
    length: 100,
  },
  {
    id: "chain",
    number: "03",
    name: "Incident chain",
    clock: "T+00:02",
    status: "Correlating",
    length: 123,
  },
  {
    id: "cause",
    number: "04",
    name: "Cause",
    clock: "T+00:04",
    status: "Cause found",
    length: 100,
  },
  {
    id: "approval",
    number: "05",
    name: "Approval",
    clock: "T+00:06",
    status: "Awaiting approval",
    length: 100,
  },
  {
    id: "record",
    number: "06",
    name: "Record",
    clock: "T+00:09",
    status: "Recorded",
    length: 100,
  },
  {
    id: "explore",
    number: "07",
    name: "Explore",
    clock: "T+00:09",
    status: "Choose a view",
    length: 100,
  },
  {
    id: "exit",
    number: "07",
    name: "Explore",
    clock: "T+00:09",
    status: "Resolving",
    length: 55,
  },
];

export const hero = {
  eyebrow: "Incident response for regulated firms",
  title: "Know why payments failed *before the regulator asks.*",
  line: "Relyxus pulls your logs, changes and alerts into one record, ranks the likely cause and waits for a person’s yes.",
  primary: { label: "Book a 30 minute demo", href: "/demo" },
  secondary: { label: "Watch an incident unfold", href: "#stage-signals" },
};

export const signals = {
  title: "Every signal, *one core.*",
  line: "Every signal, pulled into one record.",
  cards: [
    { key: "logs", label: "Logs", sample: "api-gw 502 ×412" },
    { key: "changes", label: "Changes", sample: "deploy api-gw v3.2" },
    { key: "alerts", label: "Alerts", sample: "declines up 8×" },
    { key: "approvals", label: "Approvals", sample: "2 of 2 required" },
  ],
} as const;

/** The incident chain. Tool chips are categories, not vendor claims. */
export const chain = {
  title: "Six steps. *None of them guesswork.*",
  steps: [
    {
      name: "Alert",
      line: "The page fires. The clock starts.",
      tools: ["Alerts"],
    },
    {
      name: "Correlate",
      line: "Logs, metrics and traces line up.",
      tools: ["Logs", "Metrics", "Traces"],
    },
    {
      name: "Cause",
      line: "Likely causes ranked by evidence.",
      tools: ["Changes", "Deploys"],
    },
    { name: "Approve", line: "A named person says yes.", tools: ["Identity"] },
    { name: "Fix", line: "The change runs and is verified.", tools: [] },
    {
      name: "Record",
      line: "Every step timestamped, ready to file.",
      tools: ["Tickets"],
    },
  ],
} as const;

export const cause = {
  title: "The cause, *ranked by evidence.*",
  line: "Each cause carries its sources. Open them and check.",
  hypotheses: [
    { name: "Deploy api-gw v3.2", score: 0.86, sources: "3 sources" },
    { name: "Card network latency", score: 0.41, sources: "2 sources" },
    { name: "Ledger write lag", score: 0.08, sources: "1 source" },
  ],
} as const;

export const approval = {
  title: "Nothing runs *until someone says yes.*",
  change: "Rollback api-gw v3.2 → v3.1",
  approvers: [
    { initials: "PO", role: "Head of Payments Ops" },
    { initials: "IL", role: "Incident lead" },
  ],
  audit: "14:26:08 Approved by 2 of 2. Rollback ran under policy PAY-2.",
} as const;

export const record = {
  title: "The audit record *writes itself.*",
  lines: [
    { at: "14:02:11", text: "Deploy api-gw v3.2 rolled out" },
    { at: "14:05:12", text: "Card declines up 8×, SEV1 opened" },
    { at: "14:11:40", text: "Likely cause: api-gw v3.2, 3 sources" },
    { at: "14:26:08", text: "Rollback approved by 2 of 2" },
    { at: "14:31:02", text: "Error rate back to baseline" },
  ],
  stamp: "DORA first notice · draft ready",
} as const;

export const explore = {
  title: "Find *your team’s view.*",
  links: [
    { label: "Engineering", href: "/solutions/engineering" },
    { label: "Resilience", href: "/solutions/resilience" },
    { label: "Leadership", href: "/solutions/leadership" },
    { label: "Product", href: "/product" },
    { label: "Company", href: "/company" },
  ],
} as const;

/** Resolved half: paper sections. */
export const deadline = {
  title: "DORA gives you *4 hours.*",
  line: "From classifying a major incident to the first notice. Relyxus starts the draft at the first alert.",
  numbers: [
    { value: 24, unit: "hours", label: "latest first notice, from awareness" },
    { value: 72, unit: "hours", label: "to the intermediate report" },
    { value: 1, unit: "month", label: "to the final report" },
  ],
  uk: "UK firms report under one FCA, PRA and Bank of England regime from 18 March 2027.",
} as const;

export const compare = {
  title: "Relyxus *against the usual way.*",
  columns: ["Relyxus", "Manual war room", "Generic AIOps"],
  rows: [
    {
      label: "Evidence",
      cells: ["Every source linked", "Screenshots in chat", "Alerts only"],
    },
    {
      label: "Likely cause",
      cells: ["Ranked, with sources", "Loudest voice", "Score, no sources"],
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
  ],
} as const;

export const prove = {
  title: "Bring a *closed incident.*",
  steps: [
    { name: "Pick one you closed", line: "Include a miss or two." },
    { name: "We replay it, read only", line: "No change to live systems." },
    {
      name: "Test three things",
      line: "Evidence behind each cause. An approver before each change. The record, in order.",
    },
  ],
  cta: { label: "Start a Replay pilot", href: "/demo?type=Replay%20pilot" },
} as const;

export const closing = {
  title: "Show us *the incident that hurt most.*",
  line: "We’ll show you how Relyxus would have handled it.",
  cta: { label: "Book a 30 minute demo", href: "/demo" },
} as const;
