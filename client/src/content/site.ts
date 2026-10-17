export type NavItem = { label: string; href: string; description?: string };
export type NavGroup = { label: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    label: "Product",
    items: [
      {
        label: "Product overview",
        href: "/product",
        description: "From first alert to a record you can hand to audit.",
      },
      {
        label: "Security",
        href: "/security",
        description: "Read-only by default. Request the security pack.",
      },
    ],
  },
  {
    label: "Solutions",
    items: [
      {
        label: "Financial services",
        href: "/solutions/financial-services",
        description: "Payments incidents, from alert to audit.",
      },
      {
        label: "For engineering",
        href: "/solutions/financial-services#engineering",
        description: "Get to the cause with every source in one view.",
      },
      {
        label: "For resilience",
        href: "/solutions/financial-services#resilience",
        description: "Have the record ready before anyone asks.",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        label: "Resource library",
        href: "/resources",
        description: "Short reads for incident and resilience teams.",
      },
      {
        label: "Readiness checklist",
        href: "/demo?type=Readiness%20checklist",
        description: "Check your incident readiness before the next one.",
      },
      {
        label: "Replay pilot",
        href: "/demo?type=Replay%20pilot",
        description: "Try Relyxus on past incidents, read-only.",
      },
    ],
  },
  {
    label: "Company",
    items: [
      {
        label: "About Relyxus",
        href: "/company",
        description: "Who builds it and why.",
      },
      {
        label: "Contact",
        href: "/contact",
        description: "Email the team or send an enquiry.",
      },
    ],
  },
];

export const productOutcomes = [
  {
    key: "cause",
    label: "Faster cause",
    eyebrow: "Investigate",
    title: "Start from a likely cause, with its sources attached.",
    summary:
      "Alerts, changes and service context land in one investigation. Your team sees what points to a cause and what still doesn’t fit.",
    detail:
      "Investigation is read-only by default, so looking never changes anything.",
    href: "/product",
    visual: "trace",
  },
  {
    key: "action",
    label: "Controlled action",
    eyebrow: "Act",
    title: "Nothing runs until the right people say so.",
    summary:
      "Every proposed fix names its target and waits for approval under your own policy.",
    detail:
      "You decide who can approve what. Relyxus keeps the request and the decision together.",
    href: "/product",
    visual: "gate",
  },
  {
    key: "record",
    label: "Audit-ready record",
    eyebrow: "Report",
    title: "The write-up is half done before the incident closes.",
    summary:
      "Every step, source and decision is logged in order, ready for your report draft.",
    detail:
      "People still classify, review and submit anything that goes to a regulator.",
    href: "/product",
    visual: "record",
  },
] as const;

export const pathCards = [
  {
    key: "engineering",
    label: "Engineering and SRE",
    title: "Get to the cause without hunting through tabs.",
    text: "One investigation per incident, with every source linked.",
    href: "/solutions/financial-services#engineering",
  },
  {
    key: "resilience",
    label: "Risk and resilience",
    title: "Have the record ready before anyone asks.",
    text: "A timeline you can hand to audit, built while the incident runs.",
    href: "/solutions/financial-services#resilience",
  },
  {
    key: "security",
    label: "Security review",
    title: "See what Relyxus can touch before you approve it.",
    text: "Read-only by default. Your data stays in your environment.",
    href: "/security",
  },
] as const;

/**
 * Clocks set by regulators. Public rules, not Relyxus performance claims.
 * DORA: Regulation (EU) 2022/2554, applicable from 17 January 2025, incident
 * reporting timelines per the adopted technical standards.
 * UK: FCA PS21/3 and PRA SS1/21 operational resilience, transition ended
 * 31 March 2025. Have compliance re-check wording before launch.
 */
export const regulatoryClocks = [
  {
    value: "4 hours",
    label:
      "to send DORA’s first notice once an incident is classed as major, and 24 hours at most from first awareness",
  },
  {
    value: "72 hours",
    label: "after that first notice, to file the DORA intermediate report",
  },
  {
    value: "1 month",
    label: "to file the final DORA report on a major ICT incident",
  },
  {
    value: "Always",
    label:
      "UK firms must stay within impact tolerance for every important business service (FCA and PRA)",
  },
] as const;

export const regulatorySources = [
  {
    label: "DORA, Regulation (EU) 2022/2554",
    href: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj",
  },
  {
    label: "FCA operational resilience",
    href: "https://www.fca.org.uk/firms/operational-resilience",
  },
] as const;

/** One line wherever a Replay pilot is offered. */
export const replayExplainer =
  "Replay pilot: we replay a few past incidents with read-only access, so you can compare what Relyxus finds with what you know. No change to live systems.";

export type DataPoint = { value: string; label: string };
export type DataSource = { label: string; href: string };

/** Uptime Institute, annual outage analysis (2025 survey, published 2026). */
export const outageData = {
  items: [
    {
      value: "57%",
      label:
        "of operators said their latest major outage cost more than $100,000",
    },
    { value: "1 in 5", label: "said it cost more than $1 million" },
  ] as DataPoint[],
  sources: [
    {
      label: "Uptime Institute, Annual Outage Analysis 2026",
      href: "https://www.itweb.co.za/article/uptime-announces-annual-outage-analysis-report-2026/o1Jr5MxPNOwMKdWL",
    },
  ] as DataSource[],
};

/** One public fact per audience, shown under the matching tab. */
export const perspectiveFacts = {
  engineering: {
    value: "#1",
    label:
      "cause of operational incidents reported to the FCA in 2022 to 2023: third-party issues",
    payoff:
      "Relyxus puts recent changes next to your own alerts in the same timeline.",
    source: {
      label: "FCA, CrowdStrike outage: lessons for operational resilience",
      href: "https://www.fca.org.uk/firms/operational-resilience/crowdstrike-outage-lessons-operational-resilience",
    },
  },
  resilience: {
    value: "17 Jan 2025",
    label:
      "DORA applies: major ICT-related incidents must be reported to your regulator in stages",
    payoff:
      "Relyxus logs the timeline as the incident runs, so the report starts as a draft.",
    source: {
      label: "Regulation (EU) 2022/2554 (DORA)",
      href: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj",
    },
  },
} as const;

/** The enquiry page changes its pitch to match what the visitor asked for. */
export const demoVariants: Record<
  string,
  {
    eyebrow: string;
    title: string;
    summary: string;
    asideTitle: string;
    asideText: string;
    agenda: readonly { title: string; text: string }[];
  }
> = {
  Demo: {
    eyebrow: "Request a demo",
    title: "See Relyxus on an incident like yours",
    summary:
      "Tell us which tools your team uses and we’ll walk through an incident from alert to record.",
    asideTitle: "What the demo covers",
    asideText: "About 30 minutes, with your questions first.",
    agenda: [
      {
        title: "An incident, start to finish",
        text: "Alert, cause, approval, record.",
      },
      { title: "Your tools", text: "Where your evidence lives today." },
      {
        title: "What a pilot would look like",
        text: "Scope and who is involved.",
      },
    ],
  },
  "Replay pilot": {
    eyebrow: "Replay pilot",
    title: "Try Relyxus on incidents you already solved",
    summary:
      "Pick past incidents your team knows well and compare what Relyxus finds with what you know.",
    asideTitle: "How a pilot starts",
    asideText: "We agree the incidents first, then connect read-only sources.",
    agenda: [
      { title: "Choose the incidents", text: "Include a miss or two." },
      { title: "Agree the sources", text: "Read-only access only." },
      { title: "Review together", text: "What it found and what it missed." },
    ],
  },
  "Security pack": {
    eyebrow: "Security pack",
    title: "Get the security pack for your reviewers",
    summary:
      "Tell us who is reviewing and what they need. We share the pack with teams in an evaluation.",
    asideTitle: "What reviewers get",
    asideText: "Written for security and architecture teams.",
    agenda: [
      { title: "Data flows and identity", text: "Who can see and do what." },
      { title: "AI data handling", text: "What leaves, and what does not." },
      { title: "Assurance status", text: "Current, with dates." },
    ],
  },
  "Readiness checklist": {
    eyebrow: "Readiness checklist",
    title: "Get the incident-readiness checklist",
    summary:
      "A short checklist for regulated teams: evidence, ownership and record-keeping before the next incident.",
    asideTitle: "What’s in it",
    asideText: "Questions you can answer in an afternoon.",
    agenda: [
      { title: "Evidence", text: "Can you find it in one place?" },
      { title: "Ownership", text: "Who decides, and who signs off?" },
      { title: "Record", text: "Could you hand it to audit today?" },
    ],
  },
  Deployment: {
    eyebrow: "Deployment",
    title: "Talk through how you would run Relyxus",
    summary:
      "Tell us about your environment and we’ll go through the options with you.",
    asideTitle: "What we discuss",
    asideText: "Your constraints first.",
    agenda: [
      { title: "Where it runs", text: "Dedicated, or self-hosted by you." },
      { title: "Where data goes", text: "Before you decide." },
      { title: "Who looks after it", text: "Updates and support." },
    ],
  },
  Pricing: {
    eyebrow: "Pricing",
    title: "Talk to us about pricing",
    summary:
      "Pricing depends on your setup. Tell us a little and we’ll come back with a proposal.",
    asideTitle: "What shapes a quote",
    asideText: "We keep it simple and put it in writing.",
    agenda: [
      { title: "Your setup", text: "How you would run it." },
      { title: "Your scale", text: "Teams and incidents." },
      { title: "Your timeline", text: "Pilot first, or straight in." },
    ],
  },
};

/** A note in the team’s voice. Add name, role and photo when you want it signed. */
export const founderNote: {
  heading: string;
  paragraphs: readonly string[];
  signature: string;
  name?: string;
  photo?: string;
} = {
  heading: "Why we built Relyxus",
  paragraphs: [
    "An incident gets decided in the first hour and explained for weeks afterwards. The people on call carry both jobs.",
    "We built Relyxus so the explanation exists by the time the incident is over: what we saw, what we believed, who said yes. We keep a person in charge of every change, and we keep the record honest about what we didn’t know.",
  ],
  signature: "The Relyxus team at Apporine",
};

/**
 * Proof points. Add only items that are true and approved for publication.
 * Each needs a precise status and, where it exists, a date.
 */
export const proofPoints: readonly {
  title: string;
  detail: string;
  image?: { src: string; alt: string };
}[] = [
  {
    title: "Incidents",
    detail:
      "Every incident with its severity, owner and age, so nothing sits unowned.",
    image: {
      src: "/product/overview-incidents.png",
      alt: "The Relyxus incidents list showing severity, status, owner and age",
    },
  },
  {
    title: "Command centre",
    detail:
      "What needs attention and what is waiting on a decision, before anyone asks.",
    image: {
      src: "/product/overview-command-centre.png",
      alt: "The Relyxus command centre with active incidents, approvals and service health",
    },
  },
  {
    title: "Incident war room",
    detail:
      "The timeline, ranked causes and the approval waiting on someone, so nobody asks for a status update.",
    image: {
      src: "/product/overview-investigation.png",
      alt: "A Relyxus incident with its timeline, ranked hypotheses and a production approval waiting",
    },
  },
];

export const resources: readonly {
  slug: string;
  title: string;
  category: string;
  description: string;
  time: string;
  /** When set, the guide is shared on request instead of published. */
  gatedType?: string;
}[] = [
  {
    slug: "what-makes-incident-response-controlled",
    title:
      "Controlled incident response: 4 things to separate before you automate",
    category: "Field guide",
    description:
      "Keep evidence, suggestions, approvals and verified outcomes apart before you add automation.",
    time: "4 minute read",
  },
  {
    slug: "dora-major-incident-reports",
    title: "DORA major incident reports: what to have ready for each deadline",
    category: "Checklist",
    description:
      "The three reporting stages, and what to capture while the incident is still running.",
    time: "5 minute read",
  },
  {
    slug: "post-incident-report-audit",
    title: "A post-incident report that stands up to audit",
    category: "Template",
    description:
      "Five sections every report needs, and the evidence that belongs behind each one.",
    time: "4 minute read",
  },
  {
    slug: "deployment-guide",
    title: "Self-hosted vs dedicated: a checklist for your architecture review",
    category: "Guide",
    description:
      "Who operates what, where data goes and what to ask before you decide. Shared with teams in an evaluation.",
    time: "Request access",
    gatedType: "Deployment",
  },
  {
    slug: "replay-guide",
    title: "Replay pilot: prove value on past incidents",
    category: "Guide",
    description:
      "How a pilot is scoped and reviewed, from choosing incidents to comparing results. Shared with teams in an evaluation.",
    time: "Request access",
    gatedType: "Replay pilot",
  },
];

export const articleBodies: Record<
  string,
  {
    title: string;
    intro: string;
    sections: { heading: string; body: string }[];
  }
> = {
  "what-makes-incident-response-controlled": {
    title:
      "Controlled incident response: 4 things to separate before you automate",
    intro:
      "A good incident workflow keeps a clear line between what the evidence suggests and what a person is allowed to change.",
    sections: [
      {
        heading: "Start with evidence",
        body: "An alert tells you where to look. It doesn’t tell you the cause. Bring the service context and recent changes into one investigation, then show which sources support a likely explanation and which alternatives are still open. A responder should be able to open the evidence behind any statement.",
      },
      {
        heading: "Put a person between a proposal and an action",
        body: "Reading and changing are different permissions. A proposal should name its target, show the policy that applies and list the approvals it needs. Waiting for approval is a normal outcome.",
      },
      {
        heading: "Keep the outcome checkable",
        body: "After an approved action, record the request, the system’s response and how the result was verified, in order. Where a report is needed, people still classify, review and submit it.",
      },
      {
        heading: "Questions to ask in an evaluation",
        body: "Which sources are in scope? What access does each need? How is incomplete evidence shown? Who can approve an action? What is recorded when verification fails? Check each answer against the release you will run and your own policies.",
      },
    ],
  },
  "dora-major-incident-reports": {
    title: "DORA major incident reports: what to have ready for each deadline",
    intro:
      "Under DORA, a major ICT-related incident is reported in stages. Knowing what each stage needs before an incident starts makes the clock far easier to live with.",
    sections: [
      {
        heading: "The three deadlines",
        body: "The initial notification is due within 4 hours of classifying the incident as major, and no later than 24 hours after you become aware of it. An intermediate report follows within 72 hours of the initial notification. The final report closes the incident out within one month. Check the current technical standards and your regulator’s guidance for what applies to your firm.",
      },
      {
        heading: "Classify early, and write down when",
        body: "The 4-hour clock starts at classification, but the 24-hour limit runs from awareness, so waiting does not buy time. Record the time of detection and the time of classification, and who made the call.",
      },
      {
        heading: "Capture as you go",
        body: "Keep a running log from the first alert: services and customers affected, the working cause and the evidence behind it, what was ruled out, actions proposed and who approved them, and every customer or regulator communication. Each stage of the report is then a summary of the log, not a reconstruction.",
      },
      {
        heading: "Practise on a past incident",
        body: "Take an incident you closed last year and fill in each stage from your records. The gaps you find, such as a missing timestamp or an unclear owner, are the ones that would cost you hours during a real one.",
      },
    ],
  },
  "post-incident-report-audit": {
    title: "A post-incident report that stands up to audit",
    intro:
      "A report is useful when someone who wasn’t there can follow what happened, what was decided and why.",
    sections: [
      {
        heading: "The timeline, in order",
        body: "List detection, classification, each decision and each action with its time and source. Use the time the event happened, not the time it was written up.",
      },
      {
        heading: "The impact, in your own numbers",
        body: "Say who was affected, for how long and what it cost, using figures you can show. If a number is an estimate, label it as one.",
      },
      {
        heading: "The cause, and the evidence behind it",
        body: "State the cause you settled on and link the evidence. Include the alternatives you ruled out and how, because that is what a reviewer asks about first.",
      },
      {
        heading: "Decisions and approvals",
        body: "Record each change that was proposed, who approved it, under which policy, and how the result was verified. A change with no named approver is a finding waiting to happen.",
      },
      {
        heading: "Follow-ups with owners and dates",
        body: "Every action gets a named owner and a date. Review them at the next incident review so the list does not go stale.",
      },
    ],
  },
};

/** Topics on the Contact page. Each links to the enquiry form with the type preselected. */
export const contactTopics = [
  {
    key: "demo",
    label: "See a demo",
    hint: "On an incident like yours",
    type: "Demo",
    title: "See Relyxus on an incident like yours",
    text: "Tell us which tools your team uses and we’ll walk through an incident from alert to record.",
    points: ["Your tools, your kind of incident", "Your questions come first"],
    cta: "Request a demo",
  },
  {
    key: "replay",
    label: "Try a Replay pilot",
    hint: "On incidents you already solved",
    type: "Replay pilot",
    title: "Replay incidents you already solved",
    text: "We replay a few past incidents with read-only access, so you can compare what Relyxus finds with what you know. No change to live systems.",
    points: ["You choose the incidents", "Read-only access only"],
    cta: "Start a pilot enquiry",
  },
  {
    key: "security",
    label: "Get the security pack",
    hint: "For your reviewers",
    type: "Security pack",
    title: "Get the pack your reviewers need",
    text: "Written for security and architecture teams, and shared with teams in an evaluation.",
    points: ["Data flows and identity", "Assurance status, with dates"],
    cta: "Request the security pack",
  },
  {
    key: "pricing",
    label: "Talk pricing",
    hint: "A proposal in writing",
    type: "Pricing",
    title: "Talk to us about pricing",
    text: "Pricing depends on how you would run Relyxus. Tell us a little and we’ll come back with a proposal.",
    points: ["Shaped by your setup", "A proposal in writing"],
    cta: "Ask about pricing",
  },
] as const;

/** Service promises. Change here once, used everywhere. */
export const replyPromise = "within one business day";
export const packPromise = "typically within two business days";

/**
 * Real-world proof. Everything below renders only when filled in, so nothing
 * appears until it is true. Add only facts you can show a buyer.
 */
export const proofStrip: {
  logos: readonly { name: string; src?: string }[];
  quote: { text: string; name: string; role: string } | null;
  metric: {
    value: string;
    label: string;
    source: string;
    href?: string;
  } | null;
} = {
  logos: [],
  quote: null,
  // Public regulatory fact, not a Relyxus result. Replace with a pilot metric when you have one.
  metric: {
    value: "18 Mar 2027",
    label:
      "UK operational incident reporting rules apply, with one standard regime across the FCA, PRA and Bank of England",
    source: "FCA Policy Statement PS26/2, published 18 March 2026",
    href: "https://www.fca.org.uk/publication/policy/ps26-2.pdf",
  },
};

/** Tools Relyxus really connects to today, by name. */
export const integrations: readonly string[] = [
  "Alerts",
  "Logs",
  "Metrics",
  "Traces",
  "Changes",
  "Deploys",
  "Tickets",
  "Identity",
];

/** Assurance status shown on the Security page, e.g. { label: "SOC 2 Type II", status: "In progress, target Q3 2027" }. */
export const assurance: readonly { label: string; status: string }[] = [
  { label: "Data flows and identity", status: "Included" },
  { label: "How AI data is handled", status: "Included" },
  { label: "Action safety and approvals", status: "Included" },
  { label: "Assurance status", status: "Included" },
  { label: "Support and continuity", status: "Included" },
];

export const founders: readonly {
  name: string;
  role: string;
  background: string;
  photo?: string;
}[] = [];

export const companyDetails: {
  registration?: string;
  location?: string;
  email?: string;
  linkedin?: string;
} = {};
