/**
 * What Relyxus is and what we sell. This block is shown word for word on
 * the homepage, Product and About; reuse it in decks and on LinkedIn.
 */
export const whatWeSell = [
  {
    term: "What it is",
    text: "Relyxus is incident-response software for payments firms in regulated markets.",
  },
  {
    term: "What it does",
    text: "It pulls logs, deploys and alerts into one incident record, ranks the likely cause with the evidence attached, and holds every fix for a named approver.",
  },
  {
    term: "What you get at the end",
    text: "A timestamped audit record and a first draft of the regulator notice (DORA, UK FCA/PRA), ready within the 4-hour window.",
  },
  {
    term: "Who it’s for",
    text: "Payments engineering, resilience and risk, and payments leadership at processors, issuers, payments banks and cross-border platforms.",
  },
  {
    term: "What it replaces",
    text: "Five browser tabs, a Slack thread of guesses, terminal rollbacks and a regulator report rebuilt from screenshots.",
  },
  {
    term: "What it is not",
    text: "An autonomous AI that changes production on its own, or another monitoring tool. It works with the monitoring you already have.",
  },
  {
    term: "How you buy it",
    text: "Start with a read-only replay pilot on a closed incident, then an annual subscription.",
  },
] as const;

export type ModuleKey = "war-room" | "approvals" | "command-centre";

export type Screenshot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Numbered notes beside the screen; x and y place a marker on it, in %. */
  callouts: readonly { text: string; x: number; y: number }[];
};

/** One product, three named modules, each with a real screen. */
export const modules: readonly {
  key: ModuleKey;
  name: string;
  job: string;
  line: string;
  points: readonly string[];
  screen: Screenshot;
}[] = [
  {
    key: "war-room",
    name: "War Room",
    job: "Investigation and causes",
    line: "One incident, one record. Alerts, deploys, tickets and people land on a single timeline, and the likely causes are ranked with the evidence for and against each.",
    points: [
      "Ranked causes, each with supporting and refuting evidence",
      "Recent changes linked to the incident automatically",
      "Every step timestamped and attributed as it happens",
    ],
    screen: {
      src: "/product/overview-investigation.png",
      width: 1024,
      height: 728,
      alt: "The Relyxus War Room for incident INC-2041, card authorisation failures in the UK. A timeline on the left, two ranked hypotheses in the centre, and a pending production action on the right.",
      callouts: [
        {
          text: "Timeline from Prometheus, ServiceNow and the people on the call",
          x: 17.5,
          y: 27,
        },
        {
          text: "Hypothesis 1 at 82%: six pieces of supporting evidence, one against",
          x: 37.5,
          y: 42,
        },
        {
          text: "The proposed restart waits as a pending decision, with its policy",
          x: 75.5,
          y: 27,
        },
      ],
    },
  },
  {
    key: "approvals",
    name: "Approvals",
    job: "Named sign-off",
    line: "Nothing changes in production until a named person approves it. Each request shows the exact action, the evidence behind it, the policy that applies and how the result will be checked.",
    points: [
      "Approvers set by your policy, never by the tool",
      "Blast radius, rollback and verification on every request",
      "Requests expire; nothing waits forever or runs by default",
    ],
    screen: {
      src: "/product/overview-approvals.png",
      width: 1024,
      height: 728,
      alt: "The Relyxus Approvals screen showing a production action, restart payments-api, with its exact command, evidence, effective policy and a consequence ladder. One of two approvals given.",
      callouts: [
        {
          text: "The exact command, cluster and namespace, before anyone says yes",
          x: 44,
          y: 34,
        },
        {
          text: "Policy Payments PROD v18: two approvers, proposer excluded",
          x: 44,
          y: 80,
        },
        {
          text: "Consequence ladder: target, blast radius, rollback and verification",
          x: 77.5,
          y: 16,
        },
      ],
    },
  },
  {
    key: "command-centre",
    name: "Command Centre",
    job: "Money at risk and status for leadership",
    line: "What needs attention right now: money at risk, decisions waiting, and the clock on the first regulator notice. Readable without joining the incident call.",
    points: [
      "Money and transactions at risk, per incident",
      "Pending decisions with time left",
      "The DORA first-notice deadline and its owner",
    ],
    screen: {
      src: "/product/overview-command-centre.png",
      width: 1024,
      height: 728,
      alt: "The Relyxus Command Centre listing four active incidents with severity, state, impact and age. A pending production approval and a DORA initial notice countdown sit on the right.",
      callouts: [
        {
          text: "£184k at risk on the SEV1, shown before anything else",
          x: 46,
          y: 19,
        },
        {
          text: "A production approval waiting, with 3 minutes 18 seconds left",
          x: 78.6,
          y: 28,
        },
        {
          text: "DORA initial notice countdown, with a named owner",
          x: 78.6,
          y: 48,
        },
      ],
    },
  },
];

export const moduleByKey = (key: ModuleKey) =>
  modules.find(module => module.key === key)!;

export const securityCommitments = [
  {
    title: "Read-only by default",
    text: "Investigating an incident never changes anything in your systems.",
  },
  {
    title: "Your data stays in your environment",
    text: "Run Relyxus as a dedicated environment or self-hosted by you.",
  },
  {
    title: "A named person approves every action",
    text: "Proposed changes wait for the approvers your policy names.",
  },
] as const;
