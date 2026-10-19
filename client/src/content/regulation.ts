/**
 * Clocks set by regulators. Public rules, not Relyxus performance claims.
 * DORA: Regulation (EU) 2022/2554, applicable from 17 January 2025. Time
 * limits from Commission Delegated Regulation (EU) 2025/301, Article 5,
 * checked 18 October 2026. UK: FCA PS26/2, published 18 March 2026, in force
 * 18 March 2027. Have compliance re-check wording before launch.
 */
import type { SourceLink } from "@/components/ui/Sources";

export type Clock = {
  at: string;
  title: string;
  text: string;
  /** Index into regulatorySources, shown as a footnote marker. */
  note: number;
};

export const regulatorySources: readonly SourceLink[] = [
  {
    label: "DORA, Regulation (EU) 2022/2554",
    href: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj",
  },
  {
    label: "Delegated Regulation (EU) 2025/301, Article 5",
    href: "https://eur-lex.europa.eu/eli/reg_del/2025/301/oj",
  },
  {
    label: "FCA Policy Statement PS26/2",
    href: "https://www.fca.org.uk/publications/policy-statements/ps26-2-operational-incident-third-party-reporting",
  },
];

/** The DORA major-incident timeline, from the first alert. */
export const doraClocks: readonly Clock[] = [
  {
    at: "First alert",
    title: "Relyxus starts the record",
    text: "Timeline, owners, evidence and decisions are logged from here, so each notice below starts as a draft.",
    note: -1,
  },
  {
    at: "4 hours",
    title: "Initial notification",
    text: "Due within 4 hours of classifying the incident as major, and no later than 24 hours after you became aware of it.",
    note: 1,
  },
  {
    at: "72 hours",
    title: "Intermediate report",
    text: "Due within 72 hours of the initial notification.",
    note: 1,
  },
  {
    at: "1 month",
    title: "Final report",
    text: "Due within one month of the latest intermediate report.",
    note: 1,
  },
];

export const ukRegime = {
  date: "18 March 2027",
  text: "UK firms start reporting operational incidents under one FCA, PRA and Bank of England regime.",
  note: 2,
} as const;

/** The printable checklist, also emailed on request. */
export const checklist: readonly { stage: string; items: readonly string[] }[] =
  [
    {
      stage: "Before the incident",
      items: [
        "Your criteria for a major ICT-related incident are written down, with who applies them.",
        "Each critical service has a named owner and a deputy.",
        "You know which regulator and which template each notice goes to.",
        "Alerts, deploy history and logs can be read from one place.",
      ],
    },
    {
      stage: "In the first hour",
      items: [
        "The time you became aware is recorded, with its source.",
        "The time you classified the incident, and who decided, are recorded.",
        "Affected services, clients and payment volumes are logged as estimates, labelled as such.",
        "Every proposed change names an approver before it runs.",
      ],
    },
    {
      stage: "Before the 4-hour notice",
      items: [
        "A working cause is stated, with the evidence for it and what was ruled out.",
        "Actions taken so far are listed with their time and approver.",
        "The draft notice has been reviewed by the person who will submit it.",
      ],
    },
    {
      stage: "Before the 72-hour and final reports",
      items: [
        "The timeline is in event order, using the time each event happened.",
        "Impact figures are updated, with estimates still labelled.",
        "Follow-up actions each have an owner and a date.",
        "The record shows what you didn’t know, and when you found out.",
      ],
    },
  ];
