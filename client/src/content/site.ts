/**
 * Site-wide facts: navigation, company details, promises and proof. Add only
 * what is true and approved for publication; empty values stay hidden.
 */
import type { SourceLink } from "@/components/ui/Sources";

export type NavItem = { label: string; href: string; description?: string };
export type NavEntry = { label: string; href?: string; items?: NavItem[] };

export const APPORINE_URL = "https://apporine.com";

/** Five top-level entries. Dropdowns only where they hold three links. */
export const nav: NavEntry[] = [
  { label: "Product", href: "/product" },
  {
    label: "Solutions",
    items: [
      {
        label: "Payments engineering",
        href: "/solutions/engineering",
        description: "SRE, on-call and platform teams",
      },
      {
        label: "Resilience and risk",
        href: "/solutions/resilience",
        description: "Operational resilience and compliance",
      },
      {
        label: "Leadership",
        href: "/solutions/leadership",
        description: "CTO, COO and Head of Payments",
      },
    ],
  },
  { label: "Pilot", href: "/pilot" },
  {
    label: "Resources",
    items: [
      {
        label: "DORA and UK reporting",
        href: "/dora",
        description: "Every deadline, with the rules behind it",
      },
      {
        label: "Reporting checklist",
        href: "/dora/checklist",
        description: "One page for DORA and the UK regime",
      },
      {
        label: "Incident files",
        href: "/resources/incidents",
        description: "Public outages, and where the hours went",
      },
    ],
  },
  {
    label: "Company",
    items: [
      {
        label: "About",
        href: "/about",
        description: "Who builds Relyxus, and why",
      },
      {
        label: "Security",
        href: "/security",
        description: "How we handle your data",
      },
      {
        label: "Contact",
        href: "/contact",
        description: "Email the team",
      },
    ],
  },
];

export const footerColumns: { label: string; items: NavItem[] }[] = [
  {
    label: "Product",
    items: [
      { label: "Overview", href: "/product" },
      { label: "Replay pilot", href: "/pilot" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    label: "Solutions",
    items: nav[1].items ?? [],
  },
  {
    label: "Resources",
    items: [
      { label: "DORA and UK reporting", href: "/dora" },
      { label: "Reporting checklist", href: "/dora/checklist" },
      { label: "Incident files", href: "/resources/incidents" },
      { label: "Guides", href: "/resources" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Book a demo", href: "/demo" },
    ],
  },
];

export const legalLinks: NavItem[] = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

/** Fill these in to show them; empty values stay hidden. */
export const companyDetails: {
  registration?: string;
  location?: string;
  email?: string;
  linkedin?: string;
  securityEmail?: string;
  statusUrl?: string;
  /** Shows "Log in" in the nav once the product has a public login. */
  loginUrl?: string;
} = {};

/** Service promises. Change here once, used everywhere. */
export const replyPromise = "We reply within one working day.";
export const demoMicrocopy = "30 minutes with an engineer, not a sales script";
export const packPromise = "typically within two working days";

/** Tools Relyxus connects to today, by name. */
export const integrations: readonly string[] = [
  "PagerDuty",
  "Datadog",
  "Splunk",
  "GitHub",
  "GitLab",
  "Jira",
  "ServiceNow",
  "Okta",
  "Slack",
  "AWS CloudWatch",
];

/**
 * Early-access proof. Sectors, not invented brands; swap in names and logos
 * as partners approve.
 */
export const designPartners = {
  label: "Design partners in early access",
  sectors: [
    "UK payments processor",
    "EU card issuer",
    "Specialist payments bank",
    "Cross-border payments platform",
  ],
  note: "We’re working with a small group of payments firms in early access. We’ll name them when they say so.",
  badges: [
    "Read-only replay pilots",
    "Built for DORA and the UK FCA/PRA regime",
  ],
} as const;

/** Replace with a named quote (name, role, company, logo) once approved. */
export const partnerQuote: {
  text: string;
  name: string;
  role: string;
  logo?: string;
} = {
  text: "We finally had one place for the alert, the deploy and the approval, and a draft notice that wasn’t a blank page.",
  name: "Head of SRE",
  role: "Design partner, UK payments processor (anonymised)",
};

/** Composite evaluation data. Must stay labelled as illustrative. */
export const replayResult = {
  value: "47 → 12 min",
  label: "time to a ranked cause on a closed SEV1, replayed read-only",
  disclaimer:
    "Illustrative. A composite from read-only replay evaluations, not a published customer result or a guarantee.",
} as const;

/** How pricing works. Confirm each line with the client before launch. */
export const pricingTerms: readonly { title: string; text: string }[] = [
  {
    title: "Start with a replay pilot",
    text: "Read-only, on one closed incident. What you pay for the pilot comes off the licence if you go ahead.",
  },
  {
    title: "Then an annual licence",
    text: "One price, agreed in writing before you start.",
  },
  {
    title: "No per-seat fees",
    text: "Bring everyone who works the incident, from on-call to the board.",
  },
];

export const founderNote = {
  title: "Why we built Relyxus",
  paragraphs: [
    "An incident gets decided in the first hour and explained for weeks afterwards. The people on call carry both jobs.",
    "We built Relyxus so the explanation exists by the time the incident is over: what we saw, what we believed, and who said yes.",
    "One rule shapes it most. The record is honest about what we didn’t know, because that is what a regulator, an auditor and your own team will ask about first.",
  ],
  /** Replace with a real name and role, and add a photo, when approved. */
  signature: "The Relyxus team at Apporine",
  photo: undefined as string | undefined,
};

/**
 * The people building Relyxus. Initials avatars until photos exist; nothing
 * renders while this is empty.
 */
export const team: readonly {
  name: string;
  role: string;
  line: string;
  linkedin?: string;
  photo?: string;
}[] = [];

/** Public rules your buyers work to. Named, not claimed as certifications. */
export const standards: readonly SourceLink[] = [
  {
    label: "DORA, Regulation (EU) 2022/2554",
    href: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj",
  },
  {
    label: "FCA and PRA operational resilience (PS21/3)",
    href: "https://www.fca.org.uk/publications/policy-statements/ps21-3-building-operational-resilience",
  },
  {
    label: "FCA, PRA and Bank of England incident reporting (PS26/2)",
    href: "https://www.fca.org.uk/publications/policy-statements/ps26-2-operational-incident-third-party-reporting",
  },
];
