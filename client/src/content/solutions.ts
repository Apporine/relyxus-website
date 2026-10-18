/**
 * The six Solutions pages: three by team, three by incident. Every page uses
 * the same six blocks (hero, question, flow, proof, demo checklist, call to
 * action) with its own content, so no two pages repeat.
 */
export type SolutionProof =
  | "evidence-board"
  | "regulator-clock"
  | "cost-calculator"
  | "payment-path"
  | "split-timeline"
  | "change-timeline";

export type Solution = {
  slug: string;
  column: "team" | "incident";
  label: string;
  line: string;
  eyebrow: string;
  title: string;
  paragraph: string;
  question: string;
  questionNote: string;
  flow: readonly string[];
  proof: SolutionProof;
  proofTitle: string;
  proofNote: string;
  checklist: readonly string[];
  cta: { label: string; href: string };
  closing: string;
};

export const solutions: readonly Solution[] = [
  {
    slug: "engineering",
    column: "team",
    label: "Engineering and SRE",
    line: "From alert to cause, every source in one view",
    eyebrow: "For engineering and SRE",
    title: "From alert to cause, without the tab hunt.",
    paragraph:
      "The alert, the last two hours of changes and the affected service land in one investigation, ranked by evidence.",
    question: "What changed, and is it the cause?",
    questionNote:
      "The on call engineer starts from the evidence that points to a cause, and what still doesn’t fit, instead of eight open tabs.",
    flow: [
      "Alert",
      "Recent changes",
      "Ranked causes",
      "Proposed fix",
      "Approval",
    ],
    proof: "evidence-board",
    proofTitle: "Click a cause. See its evidence side by side.",
    proofNote:
      "Example incident. Each cause carries the log lines, the change and the ticket behind it.",
    checklist: [
      "Pick any likely cause and open its logs, change and ticket.",
      "Check the timeline covers the two hours before the alert.",
      "Propose a fix and watch it wait for the approver.",
    ],
    cta: { label: "Replay your last SEV1", href: "/demo?type=Replay%20pilot" },
    closing: "Bring the SEV1 you still argue about. We’ll replay it.",
  },
  {
    slug: "resilience",
    column: "team",
    label: "Risk and resilience",
    line: "The regulator report starts as a draft",
    eyebrow: "For risk and resilience",
    title: "The report starts writing itself while the incident runs.",
    paragraph:
      "Timeline, owners and decisions are logged from the first alert, so each regulatory deadline starts with a draft.",
    question: "What do we tell the regulator, and by when?",
    questionNote:
      "The clock starts before anyone knows the cause. The record should start then too.",
    flow: [
      "Classified",
      "Clock starts",
      "Timeline builds",
      "Draft notice",
      "Person reviews and submits",
    ],
    proof: "regulator-clock",
    proofTitle: "Set the times. See every deadline it starts.",
    proofNote:
      "DORA major incident reporting stages. Which rules apply depends on your firm.",
    checklist: [
      "Classify an incident and see when each clock starts.",
      "Ask for the first notice draft while the incident is still open.",
      "Check who reviewed and submitted it, and when.",
    ],
    cta: {
      label: "Get the readiness checklist",
      href: "/demo?type=Readiness%20checklist",
    },
    closing: "Could you file a first notice within 4 hours today?",
  },
  {
    slug: "leadership",
    column: "team",
    label: "Technology leadership",
    line: "What it cost, and who decided what",
    eyebrow: "For technology leadership",
    title: "Know what an outage costs, and who decided what.",
    paragraph:
      "Money at risk, live. Every decision with a name and a time. A summary the board can read the next morning.",
    question: "What did this cost us, and who made the call?",
    questionNote:
      "The board asks the morning after. The answer should already be written down.",
    flow: ["Money at risk", "Decision log", "Board summary"],
    proof: "cost-calculator",
    proofTitle: "What a minute of downtime puts at risk.",
    proofNote:
      "Your own numbers. Value of payments at risk, not a forecast of lost revenue.",
    checklist: [
      "Watch money at risk update while the incident runs.",
      "Open the decision log: every call with a name and a time.",
      "Read the board summary the morning after.",
    ],
    cta: { label: "Book a 30 minute demo", href: "/demo?type=Demo" },
    closing: "See the summary your board would read after your last outage.",
  },
  {
    slug: "payment-failures",
    column: "incident",
    label: "Card authorisation failures",
    line: "When payments fail at the worst moment",
    eyebrow: "Card authorisation failures",
    title: "Every failed payment is a customer you might not get back.",
    paragraph:
      "Relyxus follows the authorisation path through router and ledger to the point it broke.",
    question: "Where in the payment path did it break?",
    questionNote:
      "Declines look the same from the outside. The cause sits at one hop.",
    flow: ["App", "Router", "Ledger", "Cause found"],
    proof: "payment-path",
    proofTitle: "Follow the payment. Find the hop that failed.",
    proofNote:
      "Example incident. Each hop shows the evidence Relyxus read from it.",
    checklist: [
      "Trace a failed authorisation hop by hop.",
      "See which hop broke, with the evidence for it.",
      "Compare it with what your team found at the time.",
    ],
    cta: {
      label: "Show us your worst payments incident",
      href: "/demo?type=Demo",
    },
    closing: "Tell us the payments incident that hurt most.",
  },
  {
    slug: "third-party-outages",
    column: "incident",
    label: "Third party outages",
    line: "Your vendor broke. Prove what was yours",
    eyebrow: "Third party outages",
    title: "Your vendor went down. Your regulator still asks you.",
    paragraph:
      "Relyxus separates what failed at the supplier from what failed in your own systems, with sources for both.",
    question: "Was it them, or was it us?",
    questionNote:
      "Outsourcing the service doesn’t outsource the accountability.",
    flow: ["Vendor alert", "Your impact", "Your response", "Record"],
    proof: "split-timeline",
    proofTitle: "Their incident and yours, on one view.",
    proofNote:
      "Example incident. The vendor’s timeline on one side, yours on the other, each with its sources.",
    checklist: [
      "Split a vendor incident from your own impact.",
      "Check each side has its own sources.",
      "Open the record your regulator would ask for.",
    ],
    cta: { label: "Start a Replay pilot", href: "/demo?type=Replay%20pilot" },
    closing: "Replay a vendor outage you already lived through.",
  },
  {
    slug: "change-incidents",
    column: "incident",
    label: "Bad changes and deployments",
    line: "Trace it to the change, roll back with approval",
    eyebrow: "Bad changes and deployments",
    title: "Most incidents start with a change. Find which one.",
    paragraph:
      "Every deploy and config change sits on the incident timeline, so the cause is a click, not a meeting.",
    question: "Which change did this?",
    questionNote:
      "The deploy log, the config history and the error graph usually live in three tools.",
    flow: [
      "Change shipped",
      "Errors rise",
      "Change matched",
      "Rollback proposed",
      "Approved",
    ],
    proof: "change-timeline",
    proofTitle: "From the change to the impact, with the rollback at the gate.",
    proofNote:
      "Example incident. The rollback is ready, and waits for the approver your policy names.",
    checklist: [
      "Match an error spike to the change that caused it.",
      "See the rollback wait at the approval gate.",
      "Check the change and the approval sit on one timeline.",
    ],
    cta: { label: "Replay your last SEV1", href: "/demo?type=Replay%20pilot" },
    closing: "Bring a change that went wrong. We’ll trace it.",
  },
];

export const solutionBySlug = (slug: string) =>
  solutions.find(solution => solution.slug === slug);
