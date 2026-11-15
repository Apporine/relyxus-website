// What Vigil, the website assistant, knows. Every answer here comes from the
// approved website copy and the product's real behaviour. Nothing is invented:
// if a visitor asks something not covered here, Vigil says it does not know
// and offers a person. Keep copy free of hyphens and em dashes.

export type Show = { src: string; caption: string; href?: string };
export type Topic = {
  id: string;
  words: string[];          // words and short phrases that point to this topic
  answer: string;           // spoken and written answer, plain sentences
  show?: Show;              // a real product screen to put on the stage
  link?: { label: string; href: string };
  follow?: string[];        // suggested next questions
  capture?: "demo" | "replay" | "quote" | "human";  // starts collecting name and email
};

const shot = (f: string) => `/media/console/${f}.jpg`;

export const TOPICS: Topic[] = [
  {
    id: "what",
    words: ["what is relyxus", "what do you do", "what does it do", "what it does", "what is this", "what this product", "this product", "the product", "product about", "overview", "explain", "tell me about", "relyxus"],
    answer: "Relyxus is incident response for banks, payment firms, fintechs and the SaaS companies that serve them. When production breaks, it finds what broke, proposes the fix and runs it once the right people approve. It checks the fix worked, rolls back if it did not, and drafts your regulator report as it goes. It runs inside your own cloud.",
    show: { src: shot("home"), caption: "The command centre, in the demo workspace", href: "/product" },
    link: { label: "Take the product tour", href: "/product" },
    follow: ["How does it fix an incident?", "Where does it run?", "Can I see a demo?"],
  },
  {
    id: "resolve",
    words: ["fix", "resolve", "remediate", "remediation", "rollback", "roll back", "automate", "autonomous", "autonomy", "run the fix", "self heal", "auto"],
    answer: "Here is how a fix happens. Relyxus proposes the action, checks it against your policy, and asks the right people to approve. Once they do, an agent inside your cloud runs it, then Relyxus checks that it worked and rolls it back if it did not. Automatic actions stop at level 3, with two approvers. Database failover and backup restore always stay with a person.",
    show: { src: shot("approvals_approval-restart-payments-api"), caption: "A proposed fix waiting for two approvals", href: "/approvals" },
    link: { label: "See approvals and safe change", href: "/approvals" },
    follow: ["Who approves a fix?", "What if the fix fails?", "Does it work with our change process?"],
  },
  {
    id: "approve",
    words: ["approve", "approval", "approver", "four eyes", "two people", "passkey", "sign off", "who decides", "permission"],
    answer: "Every risky fix needs two approvers from different roles, and the person who proposed it can never approve it. Approvals use passkeys and expire after 15 minutes. Every decision is recorded with a name and a time, in a hash chained log your auditors can check.",
    show: { src: shot("approvals"), caption: "The approvals queue", href: "/approvals" },
    link: { label: "See how approvals work", href: "/approvals" },
    follow: ["What if the fix fails?", "Can I see the audit log?"],
  },
  {
    id: "verify",
    words: ["what if the fix fails", "change process", "itsm", "change record", "fails", "failed", "goes wrong", "verify", "verification", "check it worked", "undo", "kill switch"],
    answer: "After a fix runs, Relyxus watches the signals it was meant to change. If they do not recover, it rolls the change back and tells the people who approved it. There is also a kill switch that stops every automatic action at once, and Relyxus can raise a change record in your ITSM tool for every approved fix.",
    show: { src: shot("services_change-preflight"), caption: "Change preflight, before anything runs", href: "/approvals#preflight" },
    follow: ["Who approves a fix?", "Where does it run?"],
  },
  {
    id: "vigil",
    words: ["vigil", "ai", "artificial intelligence", "llm", "model", "machine learning", "root cause", "find the cause", "cause", "investigat", "hallucinat", "evidence", "cite"],
    answer: "Vigil is the AI investigator inside Relyxus. It ranks the likely causes, cites the evidence for each one, a release, a metric or a log line, and drafts the fix. It cannot run anything on its own. Card, sort code, account and NI numbers are redacted before anything reaches the model, and the model runs in your cloud with your own provider.",
    show: { src: shot("vigil_ask"), caption: "Asking Vigil about a live incident", href: "/vigil" },
    link: { label: "Meet Vigil", href: "/vigil" },
    follow: ["Which AI model does it use?", "Can it run a fix on its own?"],
  },
  {
    id: "model",
    words: ["which model", "which ai", "ai model", "openai", "anthropic", "claude", "gpt", "bedrock", "azure openai", "provider", "our own model"],
    answer: "Vigil uses the AI provider you choose, running in your own cloud account, so prompts and answers stay inside your network. Sensitive numbers are redacted first, and every answer shows the evidence it was based on.",
    link: { label: "Read about Vigil's controls", href: "/vigil" },
    follow: ["Where does it run?", "What data leaves our network?"],
  },
  {
    id: "deploy",
    words: ["where does it run", "deploy", "deployment", "install", "self host", "self hosted", "on prem", "cloud", "aws", "azure", "kubernetes", "helm", "air gap", "saas", "hosted"],
    answer: "Relyxus is installed in your own AWS or Azure account, or on your Kubernetes with Helm. It can run air gapped. Apporine has no standing access: your admins approve any support session, for four hours at most.",
    show: { src: shot("settings_status-pages"), caption: "Every screen runs inside your install" },
    link: { label: "Read the Trust Center", href: "/trust#your-data" },
    follow: ["What data leaves our network?", "Do you have a security pack?"],
  },
  {
    id: "data",
    words: ["data leave", "leaves our network", "privacy", "gdpr", "personal data", "pii", "redact", "store our data", "who holds the data", "residency"],
    answer: "Your incident data stays in your cloud. Relyxus redacts card, sort code, account and NI numbers before any AI sees them. Apporine cannot reach your systems unless your admins open a support session, which lasts four hours at most.",
    link: { label: "What leaves your network", href: "/trust#your-data" },
    follow: ["Do you have a security pack?", "Is there a DPA?"],
  },
  {
    id: "security",
    words: ["security", "soc 2", "soc2", "iso", "pen test", "penetration", "certif", "audit", "due diligence", "questionnaire", "security pack", "dpa", "vendor review"],
    answer: "The Trust Center has the security pack, due diligence answers, pre filled questionnaires and the Data Processing Agreement. Every claim there has a date and a test result you can check. For documents under NDA, leave your work email and the team will send them.",
    show: { src: shot("compliance_auditor-room"), caption: "The read only auditor room", href: "/trust" },
    link: { label: "Open the Trust Center", href: "/trust" },
    capture: "human",
    follow: ["Where does it run?", "Can auditors see the record?"],
  },
  {
    id: "reporting",
    words: ["regulator", "report", "fca", "pra", "dora", "mas", "notification", "notify", "occ", "deadline", "clock", "24 hours", "major incident", "compliance"],
    answer: "Relyxus starts each regulator clock from the incident record and drafts every report as the incident unfolds. A named person reviews and signs, and the receipt is sealed. In the UK, the FCA and PRA rules from 18 March 2027 generally expect the first report within 24 hours. DORA expects an initial notification within 4 hours of classifying a major incident, and never later than 24 hours after detection.",
    show: { src: shot("compliance_reports_report-inc-2041-dora-initial"), caption: "A DORA initial report, drafted from the incident", href: "/reporting" },
    link: { label: "See reporting and resilience", href: "/reporting" },
    follow: ["Show me all the deadlines", "Who signs the report?"],
  },
  {
    id: "deadlines",
    words: ["all the deadlines", "how fast", "how many hours", "which rules", "mas", "singapore", "united states", "us banks", "36 hours"],
    answer: "The main clocks are these. MAS in Singapore, one hour from discovery. DORA in the EU, four hours from classification and at most 24 hours from detection. The FCA and PRA from 18 March 2027, generally 24 hours from deciding the threshold is met. US banking agencies, 36 hours, and bank service providers tell their banks after four hours of material disruption. This is a summary, not legal advice.",
    link: { label: "Open the deadline calculator", href: "/deadline-calculator" },
    follow: ["How does Relyxus draft the report?", "We are a SaaS serving banks"],
  },
  {
    id: "oncall",
    words: ["on call", "oncall", "paging", "page", "rota", "pager", "wake", "alert", "noise", "alert fatigue", "quiet hours", "escalat"],
    answer: "Relyxus groups the alerts from all your tools into one incident and pages one person, by Slack, text and a phone call, with escalation if nobody answers. In our sample incident, 412 alerts became one. Rotas and quiet hours live in the same place.",
    show: { src: shot("on-call"), caption: "On call rotas in the demo workspace", href: "/respond" },
    link: { label: "See respond", href: "/respond" },
    follow: ["How does it find the cause?", "Does it work with our tools?"],
  },
  {
    id: "status",
    words: ["status page", "customers", "customer update", "notice", "communicat", "tell customers", "partner"],
    answer: "Relyxus drafts status page updates and customer notices from the live incident. Someone other than the author approves each one, and it refuses updates that mention IP addresses, internal host names or email addresses.",
    show: { src: shot("settings_status-pages"), caption: "Public and staff status pages", href: "/respond#customer-updates" },
    follow: ["How does reporting work?", "Can I see a demo?"],
  },
  {
    id: "integrations",
    words: ["integrat", "connector", "connect", "tools", "datadog", "splunk", "prometheus", "dynatrace", "slack", "teams", "servicenow", "jira", "sentinel", "pagerduty", "grafana", "api", "mcp", "webhook"],
    answer: "Relyxus has 36 ready made connectors for clouds, monitoring, logs, tickets and chat, and a kit to connect any tool with an API, from a definition or an OpenAPI file. It also speaks MCP both ways. Nothing to rip out, nothing to retrain.",
    link: { label: "See integrations", href: "/integrations" },
    follow: ["Do you connect to our ITSM?", "Can I see a demo with my stack?"],
    capture: "demo",
  },
  {
    id: "pricing",
    words: ["price", "pricing", "cost", "how much", "licence", "license", "per seat", "per user", "budget", "quote", "expensive", "cheap", "included", "what is included"],
    answer: "One annual licence covers your whole organisation, with every feature and every user. There are no seat fees, no add ons, no charges per incident and no exit fees. Your price depends on the estate you run, so the team sends a written quote. I can arrange that now.",
    link: { label: "See how pricing works", href: "/pricing" },
    capture: "quote",
    follow: ["What is a founding partner?", "Can I see a demo?"],
  },
  {
    id: "founding",
    words: ["founding partner", "founder pricing", "early access", "pilot", "trial", "proof of concept", "poc"],
    answer: "The first five banks, building societies and payment firms become founding partners. They get founder pricing for as long as they stay, a direct line to the people who build Relyxus, and a say in what comes next. Each place is confirmed in writing.",
    link: { label: "Read about founding partners", href: "/pricing#founding" },
    capture: "demo",
  },
  {
    id: "replay",
    words: ["replay", "what do you need", "past incident", "postmortem", "outage we had", "try it", "free", "prove it"],
    answer: "Send us one past incident, the postmortem, the timeline or the chat export, with anything sensitive removed. Our engineers replay it through Relyxus and send you a report: where every minute went, and how many Relyxus would have saved. It is free and nothing is installed.",
    show: { src: shot("incidents_INC-2041_replay"), caption: "An incident, replayed minute by minute", href: "/replay" },
    link: { label: "Replay my outage", href: "/replay" },
    capture: "replay",
  },
  {
    id: "demo",
    words: ["demo", "see it", "walkthrough", "meeting", "book", "talk to sales", "speak to", "schedule"],
    answer: "The team runs the live demo for you: Harbour Bank, a sample bank, in the middle of a real incident, running on real servers. In forty five minutes you see every step from the first alert to the signed regulator report, with your own questions answered. Shall I book one for you?",
    show: { src: shot("incidents_INC-2041"), caption: "INC 2041, the live demo incident", href: "/demo" },
    link: { label: "See what happens on the call", href: "/demo" },
    capture: "demo",
  },
  {
    id: "banks",
    words: ["bank", "building society", "lender", "credit union", "impact tolerance", "operational resilience", "important business service", "smcr", "senior manager"],
    answer: "For banks, Relyxus maps each system to the important business service it supports, starts impact tolerance clocks with the incident, and records who decided what, with passkeys. Every regulator report is drafted while you recover.",
    show: { src: shot("compliance_dora-register"), caption: "The DORA register, drafted from the dependency map", href: "/banks" },
    link: { label: "Relyxus for banks", href: "/banks" },
    follow: ["How does reporting work?", "Where does it run?"],
  },
  {
    id: "payments",
    words: ["payment", "fintech", "emoney", "e money", "electronic money", "psp", "acquirer", "card scheme", "merchant", "small team"],
    answer: "For payment firms and fintechs, Relyxus links each incident to the payments, customers and partners it touches, drafts partner and merchant notices, and keeps every regulator deadline. One person is paged, and everyone else sleeps.",
    show: { src: shot("settings_status-pages"), caption: "Telling customers first", href: "/payments-and-fintechs" },
    link: { label: "Relyxus for payments and fintechs", href: "/payments-and-fintechs" },
  },
  {
    id: "saasco",
    words: ["we are a saas", "saas serving banks", "our clients are banks", "vendor to banks", "ict third party", "supplier", "register of information", "contract notice"],
    answer: "When you serve banks, each of them has a clock running when you go down, set by their regulator and written into your contract. Relyxus tracks each client's notice terms, drafts each notice from the live incident, and gives every client its own trust page.",
    link: { label: "Relyxus for SaaS that serves banks", href: "/saas" },
    follow: ["How does reporting work?", "Can I see a demo?"],
  },
  {
    id: "company",
    words: ["who built relyxus", "who makes", "apporine", "your company", "the company behind", "team behind", "founder", "about apporine", "where are you based"],
    answer: "Relyxus is built by Apporine, a software company building serious tools for regulated businesses. Our engineers have run on call, incident response and cloud platforms for large regulated organisations. Our UK office is in Park Royal, London.",
    link: { label: "About Apporine", href: "/about" },
  },
  {
    id: "built",
    words: ["how is it built", "how this platform", "how you built", "how did you build", "built on", "technology", "tech stack", "architecture", "how does it work under", "containers"],
    answer: "Relyxus runs as containers on Kubernetes inside your own cloud, installed with Helm, or in your AWS or Azure account. Every action goes into a hash chained audit log that nobody can edit, and its AI investigator, Vigil, uses the model provider you choose. It is built by Apporine's engineers, who have run incident response for large regulated organisations.",
    link: { label: "Read the Trust Center", href: "/trust" },
    follow: ["Where does it run?", "What data leaves our network?", "Can I see a demo?"],
  },
  {
    id: "contact",
    words: ["contact", "email", "human", "person", "someone", "real person", "support", "help me", "speak to someone"],
    answer: "Of course. Tell me your name and work email and someone from the team will reply by email. You can also write to support@relyxus.com.",
    capture: "human",
  },
  {
    id: "competitors",
    words: ["compare", "versus", " vs ", "alternative", "better than", "competitor", "instead of", "difference between"],
    answer: "I would rather not compare us with other products, because I can only speak for Relyxus with evidence. What makes it different is that it runs in your own cloud, never runs a fix without two named approvers, and drafts every regulator report from the same record.",
    follow: ["Where does it run?", "How does reporting work?"],
  },
];

export const SMALL = {
  greet: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "hiya"],
  thanks: ["thanks", "thank you", "cheers", "great", "perfect", "brilliant"],
  bot: ["are you a bot", "are you human", "are you real", "are you ai", "is this ai"],
  bye: ["bye", "goodbye", "that is all", "that's all", "no thanks", "nothing else"],
};

// Opening line per page, so Vigil knows where the visitor is.
export function opener(path: string): { text: string; chips: string[] } {
  const p = path.replace(/\/$/, "") || "/";
  const by: Record<string, [string, string[]]> = {
    "/": ["Hi, I'm the Relyxus assistant. I can walk you through Relyxus, show you the product, or set up a demo. What brings you here today?", ["What is Relyxus?", "How does it fix an incident?", "Show me the product", "Book a demo"]],
    "/pricing": ["Hi, I'm the Relyxus assistant. Pricing is one annual licence with every feature and every user. Would you like a written quote?", ["Get a quote", "What is included?", "What is a founding partner?"]],
    "/trust": ["Hi, I'm the Relyxus assistant. I can point you to the security pack, the DPA or how Relyxus keeps your data in your cloud.", ["Where does it run?", "What data leaves our network?", "Do you have a security pack?"]],
    "/banks": ["Hi, I'm the Relyxus assistant. Are you looking at Relyxus for a bank or building society? I can show you how it handles the new reporting rules.", ["How does reporting work?", "Where does it run?", "Book a demo"]],
    "/payments-and-fintechs": ["Hi, I'm the Relyxus assistant. I can show you how Relyxus keeps payments, partners and regulators covered during an outage.", ["Show me the product", "How does it fix an incident?", "Book a demo"]],
    "/saas": ["Hi, I'm the Relyxus assistant. If you serve banks, I can show you how Relyxus handles each client's notice deadline.", ["We are a SaaS serving banks", "How does reporting work?", "Book a demo"]],
    "/replay": ["Hi, I'm the Relyxus assistant. Want to replay one of your past outages for free? I can start that for you.", ["Replay my outage", "What do you need from us?"]],
  };
  const [text, chips] = by[p] || by["/"];
  return { text, chips };
}

export const FALLBACK = "I don't have a confirmed answer to that, and I would rather not guess. If you leave your name and work email, someone from the team will reply by email.";

// Short text the optional AI service is allowed to draw on. Kept small so the
// free tier stretches further.
export function factsFor(ids: string[]): string {
  return TOPICS.filter((t) => ids.includes(t.id)).map((t) => t.answer).join("\n");
}
