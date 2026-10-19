/**
 * Company / About page: people, trust ledger, evidence links.
 * Founders match Apporine (Bisma Idrees) plus Relyxus co-founder Syed Aoon.
 */

export const companyHero = {
  label: "Company",
  title: "Accountable people. *Not a faceless vendor.*",
  lead: "Relyxus is built by Apporine. You will always know who is shipping the product, who answers for it, and what we will — and will not — claim.",
};

export const founders = [
  {
    name: "Bisma Idrees",
    role: "Founder",
    line: "DevOps and AIOps engineer who has built production platforms and the automation that keeps them running.",
    quote:
      "I know what the first hour of an outage feels like. Relyxus exists so the systems payments depends on leave a record you can defend.",
    initials: "BI",
  },
  {
    name: "Syed Aoon",
    role: "Founder · AI & full-stack",
    line: "AI engineer and full-stack developer building the models, product surfaces and evidence trails behind every ranked cause.",
    quote:
      "A model can propose a cause in seconds. A person still has to say yes — and the record has to prove why. That is the product I want to ship.",
    initials: "SA",
  },
] as const;

export const companyStory = {
  label: "Why Relyxus",
  title: "Built for the hour *you have to explain.*",
  paragraphs: [
    "An incident is decided in the first hour and explained for weeks afterwards. The people on call carry both jobs.",
    "We built Relyxus so the explanation exists by the time the incident is over: what we saw, what we believed, and who said yes.",
    "One rule shapes it most. The record is honest about what we didn’t know, because that is what a regulator, an auditor and your own team ask about first.",
  ],
};

export const principles = [
  {
    title: "A person decides",
    text: "Nothing changes in your systems until the approvers you name say yes.",
  },
  {
    title: "Evidence on every claim",
    text: "Every likely cause links to the sources behind it, so your team can check our work.",
  },
  {
    title: "Honest about gaps",
    text: "The record says what we didn’t know, because that is what an auditor asks about first.",
  },
] as const;

/** Honest assurance status — never invent certifications. */
export const assurance = {
  label: "Trust ledger",
  title: "Built to be *examined.*",
  intro:
    "Enterprises trust what they can verify. Here is what is in place today, and what is still on the roadmap — no green ticks we have not earned.",
  rows: [
    {
      item: "Human approval on every action",
      meaning: "Named approvers; nothing mutates without a yes",
      status: "In product" as const,
    },
    {
      item: "Evidence-linked causes",
      meaning: "Every ranked cause opens its sources",
      status: "In product" as const,
    },
    {
      item: "Read-only replay pilots",
      meaning: "Evaluate on a closed SEV1 without write access",
      status: "In product" as const,
    },
    {
      item: "Security policy framework",
      meaning: "Written policies for security, data, incidents and access",
      status: "In progress" as const,
    },
    {
      item: "Independent penetration testing",
      meaning: "Third-party test of the product surface",
      status: "Planned" as const,
    },
    {
      item: "ISO/IEC 27001 · SOC 2 Type II",
      meaning: "Formal attestations when the controls are ready to audit",
      status: "Planned" as const,
    },
  ],
};

export const evidenceLinks = {
  label: "Evidence, not a blog",
  title: "Check our work *before* you book a call.",
  intro:
    "No content calendar. Public incident files, regulatory deadlines you can verify, and one checklist for the clock.",
  items: [
    {
      href: "/resources/incidents",
      title: "Incident files",
      text: "Public outages and where the hours went — from their own reports.",
    },
    {
      href: "/dora",
      title: "DORA and UK reporting",
      text: "Every stage and deadline, with the rules linked.",
    },
    {
      href: "/dora/checklist",
      title: "Reporting checklist",
      text: "One page: before, in the first hour, and before each deadline.",
    },
    {
      href: "/security",
      title: "Security",
      text: "How we handle data, and what is not claimed yet.",
    },
  ],
};

export const parentNote = {
  text: "Relyxus is a product of",
  href: "https://apporine.com",
  label: "Apporine",
};
