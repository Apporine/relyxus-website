export type NavItem = { label: string; href: string; description?: string };
export type NavGroup = { label: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    label: "Product",
    items: [
      {
        label: "Product overview",
        href: "/product",
        description: "Follow evidence from first signal to reviewed outcome.",
      },
      {
        label: "Investigation",
        href: "/product/investigation",
        description: "See how hypotheses stay tied to their sources.",
      },
      {
        label: "Governed actions",
        href: "/product/governed-actions",
        description: "Keep proposed changes behind policy and approval.",
      },
      {
        label: "Reporting",
        href: "/product/reporting",
        description: "Prepare an evidence-linked draft for human review.",
      },
      {
        label: "Integrations",
        href: "/integrations",
        description: "Explore source categories and release status.",
      },
      {
        label: "Security",
        href: "/security",
        description: "Understand boundaries, controls and review needs.",
      },
    ],
  },
  {
    label: "Solutions",
    items: [
      {
        label: "Financial services",
        href: "/solutions/financial-services",
        description: "Explore an example payments incident.",
      },
      {
        label: "For engineering",
        href: "/solutions/financial-services#engineering",
        description: "Trace evidence and decision ownership.",
      },
      {
        label: "For resilience",
        href: "/solutions/financial-services#resilience",
        description: "Keep reporting and human review visible.",
      },
    ],
  },
  {
    label: "Deployment",
    items: [
      {
        label: "Deployment options",
        href: "/deployment",
        description: "Compare the documented boundary models.",
      },
      {
        label: "Data boundaries",
        href: "/security#data-boundaries",
        description: "Ask what may leave an environment.",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        label: "Resource library",
        href: "/resources",
        description: "Read practical evaluation explainers.",
      },
      {
        label: "Incident Replay",
        href: "/replay",
        description: "Evaluate on incidents your team already knows.",
      },
      {
        label: "Pricing approach",
        href: "/pricing",
        description: "Understand the factors in an enterprise discussion.",
      },
    ],
  },
  {
    label: "Company",
    items: [
      {
        label: "About Relyxus",
        href: "/company",
        description: "The product and its operating principles.",
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
    key: "investigate",
    label: "Investigate",
    eyebrow: "01 / Evidence first",
    title: "A likely cause, with its sources attached.",
    summary:
      "Bring approved evidence into one investigation, show what supports a hypothesis, and keep alternatives visible.",
    detail:
      "Investigation stays read-only by default. A suggested explanation is still a hypothesis until someone reviews the evidence behind it.",
    href: "/product/investigation",
    visual: "trace",
  },
  {
    key: "govern",
    label: "Govern actions",
    eyebrow: "02 / Permission visible",
    title: "A proposal is not an execution.",
    summary:
      "Policy limits, scope and the required human approvals stay in view before an action can proceed.",
    detail:
      "A proposed change waits at an explicit approval gate. Your policies decide who can move it forward.",
    href: "/product/governed-actions",
    visual: "gate",
  },
  {
    key: "report",
    label: "Prepare reporting",
    eyebrow: "03 / Human reviewed",
    title: "Keep the evidence with the draft.",
    summary:
      "A source-linked timeline can help people prepare a report without taking over classification, review or submission.",
    detail:
      "Anything that might go to a regulator stays a draft until people classify, review and submit it.",
    href: "/product/reporting",
    visual: "record",
  },
  {
    key: "replay",
    label: "Learn with Replay",
    eyebrow: "04 / Evaluate honestly",
    title: "Test the reasoning on incidents you know.",
    summary:
      "Agree an evaluation scope, review evidence quality, and include misses and exclusions in the discussion.",
    detail:
      "Replay scope is agreed with your team—what incidents, which sources, and how misses will be reviewed.",
    href: "/replay",
    visual: "replay",
  },
] as const;

export type DeploymentMode = {
  key: string;
  label: string;
  availability: string;
  operator: string;
  model: string;
  path: string;
  updates: string;
  responsibility: string;
  topology: "dedicated" | "customer";
};

export const deploymentModes: DeploymentMode[] = [
  {
    key: "dedicated",
    label: "Dedicated",
    availability: "Discuss isolation needs",
    operator: "Isolated vendor cloud environment",
    model: "Approved regional or customer model route",
    path: "Your sources connect through a dedicated boundary; confirm region and support routes.",
    updates:
      "Lifecycle and update ownership agreed for the dedicated environment.",
    responsibility:
      "A dedicated vendor environment with clear isolation, region and customer responsibilities.",
    topology: "dedicated",
  },
  {
    key: "self-hosted",
    label: "Self-hosted",
    availability: "Common evaluation path",
    operator: "Customer Kubernetes in its cloud or data centre",
    model: "Approved customer-cloud model or local model",
    path: "You control the platform and model routes. Self-hosted does not automatically mean local inference.",
    updates:
      "You own platform updates; we help validate installation compatibility.",
    responsibility:
      "You operate the hosting environment. Model location and outbound paths are separate choices.",
    topology: "customer",
  },
];

export type SourceCategory = {
  slug: string;
  title: string;
  group: string;
  summary: string;
  keywords: string;
  detail: string;
};

export const sourceCategories: SourceCategory[] = [
  {
    slug: "monitoring-alerts",
    title: "Monitoring and alerts",
    group: "Monitoring and alerts",
    summary:
      "Alert context is one possible starting point for an incident investigation.",
    keywords: "monitor alert signal event observability",
    detail:
      "Confirm which alert fields are read, their supported versions, freshness, scope and deployment availability before enabling a source.",
  },
  {
    slug: "logs-traces",
    title: "Logs and traces",
    group: "Logs and traces",
    summary:
      "Trace and log evidence can help explain a likely cause when approved and available.",
    keywords: "log trace telemetry observability",
    detail:
      "A product owner must confirm which records are queried, the available time window, redaction, retention and permissions for each supported source.",
  },
  {
    slug: "infrastructure",
    title: "Infrastructure",
    group: "Infrastructure",
    summary:
      "Infrastructure context may help a responder understand an affected dependency.",
    keywords: "kubernetes infrastructure dependency service",
    detail:
      "Confirm read scope, environment targeting, version support and whether any separate action permission exists.",
  },
  {
    slug: "changes",
    title: "Changes and deployments",
    group: "Changes",
    summary:
      "A recent change can be evidence to inspect—not proof of causation by itself.",
    keywords: "change deploy release version rollout",
    detail:
      "Verify the supported change-event fields, source permissions, timing, limitations and any action boundary in the current release catalogue.",
  },
  {
    slug: "collaboration",
    title: "Collaboration",
    group: "Collaboration",
    summary:
      "Human-reviewed updates may fit into existing collaboration workflows.",
    keywords: "slack collaboration communication message",
    detail:
      "Confirm whether the release reads, drafts or writes, which permission is required, and how a human review is preserved.",
  },
  {
    slug: "tickets",
    title: "Tickets and work tracking",
    group: "Tickets",
    summary:
      "Work items can provide context when their scope and access are approved.",
    keywords: "jira ticket task issue workflow",
    detail:
      "Confirm supported operations, read/write distinctions, project scope, version compatibility and the responsible policy owner.",
  },
  {
    slug: "identity",
    title: "Identity and access",
    group: "Identity",
    summary:
      "Identity context belongs in an explicit access and permission review.",
    keywords: "identity sso user permissions roles",
    detail:
      "An integration catalogue must state exact identity scope and authorization boundaries before any connection is represented as available.",
  },
];

export const resources = [
  {
    slug: "governed-incident-response",
    title: "What makes incident response governed?",
    category: "Field guide",
    description:
      "Separate evidence, suggestions, approvals and verified outcomes before extending automation.",
    time: "6 minute read",
  },
  {
    slug: "deployment-choices",
    title: "A practical way to compare deployment boundaries",
    category: "Technical explainer",
    description:
      "Ask who operates the platform, where inference runs and what paths still need review.",
    time: "7 minute read",
  },
  {
    slug: "replay-methodology",
    title: "How to evaluate reasoning on historical incidents",
    category: "Evaluation method",
    description:
      "Agree a scope, document known causes, review misses and be explicit about exclusions.",
    time: "5 minute read",
  },
] as const;

export const articleBodies: Record<
  string,
  {
    title: string;
    intro: string;
    sections: { heading: string; body: string }[];
  }
> = {
  "governed-incident-response": {
    title: "What makes incident response governed?",
    intro:
      "A useful incident workflow keeps a clear line between what the evidence suggests and what a person is allowed to change.",
    sections: [
      {
        heading: "Start with evidence, not certainty",
        body: "An alert identifies where to look; it does not establish a root cause. Bring the relevant service context and recent changes into one investigation, then show which sources support a likely explanation and which alternatives remain open. A responder should be able to inspect the evidence behind any suggested statement.",
      },
      {
        heading: "Put permission between a proposal and an action",
        body: "Read-only investigation and action execution are different capabilities. A proposal should name its target and scope, show the policy that applies, and identify the human approvals required. A waiting or blocked decision is a valid outcome—not an inconvenient state to hide.",
      },
      {
        heading: "Keep the outcome verifiable",
        body: "After an approved action, distinguish the request from the system response and the evidence used to verify a result. Preserve an ordered record. Where a report is prepared, people still classify, review, approve and submit it.",
      },
      {
        heading: "Questions for an evaluation",
        body: "Ask which data sources are in scope, what access is required, how incomplete evidence is presented, who can approve an action, and what is recorded when verification fails. Confirm each answer against the current product release and your own policies.",
      },
    ],
  },
  "deployment-choices": {
    title: "A practical way to compare deployment boundaries",
    intro:
      "The hosting location is only one part of a deployment decision. Platform operator, model route, support path and update process matter too.",
    sections: [
      {
        heading: "Name the operator",
        body: "For each option, write down who runs the platform and the underlying infrastructure. A dedicated vendor environment and a customer-operated cluster shift responsibilities differently; neither label alone answers how support or updates work.",
      },
      {
        heading: "Locate the model separately",
        body: "A self-hosted platform does not automatically imply local inference. Identify whether the model is hosted by an approved provider, runs in a customer cloud account or is local. Review the path used for each model call.",
      },
      {
        heading: "Map every relevant flow",
        body: "Review evidence, model requests, notifications, backups, support access and licensing metadata. A diagram should show direction and ownership. An isolated deployment must not silently depend on an external route for normal operation.",
      },
      {
        heading: "Confirm the actual release",
        body: "Treat a deployment architecture as a description, not an availability promise. Validate prerequisites, supported versions, maintenance and recovery procedures with the product owner before using it as a production decision.",
      },
    ],
  },
  "replay-methodology": {
    title: "How to evaluate reasoning on historical incidents",
    intro:
      "A credible evaluation starts with incidents a team already understands—and leaves room for incomplete evidence and misses.",
    sections: [
      {
        heading: "Agree scope before connecting sources",
        body: "Choose a relevant incident set, define time windows, establish which records may be read and document exclusions. The scope should be agreed for the evaluation rather than treated as a universal package entitlement.",
      },
      {
        heading: "Record the known answer carefully",
        body: "For each incident, document how the confirmed cause was established, which evidence was available at the time and what counts as a correct hypothesis. Preserve the model route and evaluation conditions so comparisons have context.",
      },
      {
        heading: "Look at the misses",
        body: "Review cases with unavailable sources, incomplete evidence, ambiguous causes or a hypothesis that appears too late in the ranking. Report denominators and exclusions alongside any numerical results; do not turn an internal target into a public achievement.",
      },
      {
        heading: "Decide what the evidence supports",
        body: "Use the findings to decide whether the workflow fits the team's investigation needs and deployment boundaries. A successful replay does not prove every future incident will be diagnosed or remediated correctly.",
      },
    ],
  },
};
