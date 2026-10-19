/** Guides for incident and resilience teams. Gated guides go to the enquiry form. */
export type Guide = {
  slug: string;
  title: string;
  description: string;
  time: string;
  /** When set, the guide is shared on request instead of published. */
  gatedType?: string;
};

export const guides: readonly Guide[] = [
  {
    slug: "dora-major-incident-reports",
    title: "DORA major incident reports: what to have ready for each deadline",
    description:
      "The three reporting stages, and what to capture while the incident is still running.",
    time: "5 minute read",
  },
  {
    slug: "post-incident-report-audit",
    title: "A post-incident report that stands up to audit",
    description:
      "Five sections every report needs, and the evidence that belongs behind each one.",
    time: "4 minute read",
  },
  {
    slug: "what-makes-incident-response-controlled",
    title:
      "Controlled incident response: 4 things to separate before you automate",
    description:
      "Keep evidence, suggestions, approvals and verified outcomes apart before you add automation.",
    time: "4 minute read",
  },
  {
    slug: "deployment-guide",
    title: "Self-hosted vs dedicated: a checklist for your architecture review",
    description:
      "Who operates what, where data goes and what to ask before you decide. Shared with teams in an evaluation.",
    time: "On request",
    gatedType: "Deployment",
  },
];

export const articles: Record<
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
