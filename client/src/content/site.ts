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
        description: "Try Relyxus on incidents you already solved.",
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
      {
        label: "Accessibility",
        href: "/accessibility",
        description: "Read the accessibility approach.",
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

/** Countable facts about the product as it is described today. */
export const productFacts = [
  {
    value: "3",
    label: "outcomes: faster cause, controlled action, audit-ready record",
  },
  {
    value: "1",
    label: "human approval gate between a proposal and any action",
  },
  { value: "2", label: "ways to run it: dedicated, or self-hosted by you" },
  { value: "0", label: "changes made to your systems while investigating" },
] as const;

/**
 * Proof points. Add only items that are true and approved for publication.
 * Each needs a precise status and, where it exists, a date.
 */
export const proofPoints: readonly {
  title: string;
  detail: string;
  status: string;
}[] = [
  {
    title: "Replay pilots",
    detail:
      "Run Relyxus against incidents your team already solved and compare the result with what you know.",
    status: "Open to regulated teams",
  },
  {
    title: "Built by Apporine",
    detail: "Relyxus is built by the Apporine product and engineering team.",
    status: "Apporine",
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
    title: "What makes incident response controlled?",
    category: "Field guide",
    description:
      "Keep evidence, suggestions, approvals and verified outcomes apart before you add automation.",
    time: "4 minute read",
  },
  {
    slug: "deployment-guide",
    title: "Choosing how to run Relyxus",
    category: "Guide",
    description:
      "Who operates what, where data goes and what to ask before you decide. Shared with teams in an evaluation.",
    time: "Request access",
    gatedType: "Deployment",
  },
  {
    slug: "replay-guide",
    title: "Trying Relyxus on incidents you already solved",
    category: "Guide",
    description:
      "How a Replay pilot is scoped and reviewed. Shared with teams in an evaluation.",
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
    title: "What makes incident response controlled?",
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
};
