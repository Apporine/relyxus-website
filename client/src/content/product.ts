/**
 * What Relyxus is and what we sell. Shown word for word on the Product page
 * only; reuse in decks and on LinkedIn.
 */
export const whatWeSell = [
  {
    term: "What it is",
    text: "Incident-response software for payments firms in regulated markets",
  },
  {
    term: "What it does",
    text: "Pulls logs, deploys and alerts into one incident record, ranks the likely cause with the evidence attached, and holds every fix for a named approver",
  },
  {
    term: "What you get",
    text: "A timestamped audit record and a first draft of the regulator notice (DORA, UK FCA/PRA), ready within the 4-hour window",
  },
  {
    term: "Who it’s for",
    text: "Payments engineering, resilience and risk, and payments leadership at processors, issuers, payments banks and cross-border platforms",
  },
  {
    term: "What it replaces",
    text: "Five browser tabs, a chat thread of guesses, unrecorded rollbacks and a regulator report rebuilt from screenshots",
  },
  {
    term: "What it is not",
    text: "An autonomous AI that changes production, or another monitoring tool",
  },
  {
    term: "How you buy it",
    text: "A read-only replay pilot on one closed incident, then an annual subscription",
  },
  {
    term: "The modules",
    text: "War Room (investigate and rank causes), Approvals (named sign-off), Command Centre (risk and status for leaders)",
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
    job: "Named sign-off before any change",
    line: "Every proposed fix names its target, blast radius and rollback plan, then waits for the approvers your policy names. Nothing runs until they say yes.",
    points: [
      "The exact command and target, before anyone says yes",
      "Your policy: who must approve, and who cannot",
      "Consequence ladder: blast radius, rollback and verification",
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
    job: "Risk and status for leaders",
    line: "Every active incident with its money at risk, every decision waiting and the time left on the first notice — without joining the incident call.",
    points: [
      "Money at risk while the incident runs",
      "Decisions waiting, with time left",
      "Regulator clock for the first notice",
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
  modules.find(module => module.key === key);

export const securityCommitments: readonly {
  title: string;
  text: string;
  status: "in-place" | "in-progress";
}[] = [
  {
    title: "Read-only by default",
    text: "Investigating never changes anything in your systems.",
    status: "in-place",
  },
  {
    title: "Your data stays in your environment",
    text: "Dedicated or self-hosted. Incident evidence does not leave for a shared tenancy.",
    status: "in-place",
  },
  {
    title: "A named person approves every action",
    text: "No change runs until the approvers your policy names say yes.",
    status: "in-place",
  },
  {
    title: "Assurance certifications",
    text: "SOC 2 and similar certifications: status and target dates are in the security pack.",
    status: "in-progress",
  },
];
