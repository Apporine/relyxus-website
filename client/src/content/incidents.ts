/**
 * Incident files, mapped from "Relyxus Enterprise Incident Evidence
 * Dossiers" v2.0 (APP-RX-IR-002, 19 Oct 2026). Public incident facts only,
 * scoped to the cited source; the Relyxus lines are bounded hypotheses, not
 * results. These firms do not use, endorse or were assessed by Relyxus, and
 * their logos are never used. Say "this is the gap Relyxus is built for",
 * never "Relyxus would have prevented this". The dossier is pending internal,
 * source and legal sign-off before public reuse.
 */
import type { SourceLink } from "@/components/ui/Sources";

export type EvidenceTier = "A+" | "B";

export type IncidentKind =
  | "bank"
  | "cloud"
  | "cloud-platform"
  | "edge"
  | "market"
  | "clearing"
  | "airline"
  | "air-traffic";

export type IncidentFile = {
  slug: string;
  firm: string;
  date: string;
  region: "UK" | "US" | "Global";
  /** What kind of organisation it is; picks the card icon (never a logo). */
  kind: IncidentKind;
  sector: string;
  /** A+ = first-party, regulator or securities filing. B = credible relay only. */
  tier: EvidenceTier;
  /** Where the evidence comes from, shown in place of a logo. */
  sourceType: string;
  /** Shown on the homepage carousel. */
  featured: boolean;
  title: string;
  /** The dossier's headline impact line. */
  highlight: string;
  /** One sentence for cards. */
  short: string;
  /** The dossier's verified account. */
  summary: string;
  established: readonly string[];
  timeline: readonly { at: string; text: string }[];
  financial: string;
  caveat: string;
  /** Bounded hypothesis: where Relyxus might help. Not a proven outcome. */
  approach: string;
  /** What Relyxus cannot do in this case. */
  boundary: string;
  sources: readonly SourceLink[];
};

export const incidentFiles: readonly IncidentFile[] = [
  {
    slug: "barclays-31-january-2025",
    kind: "bank",
    firm: "Barclays UK",
    date: "31 Jan to 2 Feb 2025",
    region: "UK",
    sector: "UK retail and corporate banking",
    tier: "A+",
    sourceType: "UK Parliament",
    featured: true,
    title:
      "A critical mainframe software problem disrupted digital payments and servicing.",
    highlight:
      "56% of attempted online payments failed among users who reached the payment step.",
    short:
      "One mainframe defect showed up as separate login, app and payment failures on payday.",
    summary:
      "In a written response to Parliament, Barclays identified a software problem in a critical module of its UK mainframe operating system, causing progressive processing degradation on 31 January. It hit several payment and servicing channels at a sensitive point for wages and self assessment tax payments.",
    established: [
      "A critical mainframe OS module caused the degradation: a software issue, not a cyberattack.",
      "5% of logins failed on the Friday; of successful logins, 17% attempted a payment, and 56% of those failed.",
      "12% of retail and business customers and 45% of UK and international corporate clients were affected.",
    ],
    timeline: [
      {
        at: "31 Jan ~09:48",
        text: "Incident began; mainframe processing progressively degraded.",
      },
      { at: "31 Jan 11:34", text: "Barclays notified UK regulators." },
      {
        at: "1 Feb 01:30",
        text: "App and online banking returned; intermittent issues continued.",
      },
      {
        at: "1 Feb midday",
        text: "Most renewed login and payment issues resolved; stable by Sunday.",
      },
      {
        at: "9 Apr",
        text: "Follow up letter clarified affected client proportions.",
      },
    ],
    financial:
      "Initial £5m to £7.5m compensation expectation for this incident; later amounts not established.",
    caveat:
      "The widely repeated “up to £12.5m” mixes in an earlier estimate for other incidents that was later corrected. It is not used here.",
    approach:
      "Correlate mainframe throughput, queue latency, payment failure rates and channel alerts, so a shared back end defect is told apart from separate app failures, and build an approval gated mitigation timeline.",
    boundary:
      "Relyxus cannot fix a proprietary mainframe defect or prevent compensation. It needs customer granted connectors and a governed link to mainframe operating procedures.",
    sources: [
      {
        label: "Barclays UK CEO letter to the Treasury Committee, 26 Feb 2025",
        href: "https://committees.parliament.uk/publications/46937/documents/242221/default/",
      },
      {
        label: "Barclays UK CEO correction, 9 Apr 2025",
        href: "https://committees.parliament.uk/publications/47505/standard/pdf/",
      },
      {
        label: "Treasury Committee on bank IT outages, 6 Mar 2025",
        href: "https://committees.parliament.uk/committee/158/treasury-committee/news/205611/more-than-one-months-worth-of-it-failures-at-major-banks-and-building-societies-in-the-last-two-years/",
      },
    ],
  },
  {
    slug: "lloyds-12-march-2026",
    kind: "bank",
    firm: "Lloyds Banking Group",
    date: "12 March 2026",
    region: "UK",
    sector: "UK retail banking / data confidentiality",
    tier: "A+",
    sourceType: "UK Parliament",
    featured: true,
    title:
      "An overnight software change showed customers other people’s transactions.",
    highlight:
      "Up to 447,936 customers implicated; £139,000 paid for distress and inconvenience.",
    short:
      "The app stayed up while confidentiality failed: a change defect that uptime checks would miss.",
    summary:
      "An overnight software update introduced a defect that displayed customer transaction data incorrectly in the Lloyds, Halifax and Bank of Scotland apps. Services stayed responsive while data integrity and confidentiality controls failed.",
    established: [
      "Up to 447,936 people were exposed to, or saw, other people’s information.",
      "114,182 clicked into visible transactions and might have seen more detail.",
      "£139,000 was paid to 3,625 customers for distress; no customer financial loss was identified.",
      "The root cause was a software defect following an overnight update.",
    ],
    timeline: [
      {
        at: "11 to 12 Mar",
        text: "Overnight update introduced a defect in the service handling transaction data.",
      },
      {
        at: "12 Mar",
        text: "Customers could see other users’ transactions in the app.",
      },
      {
        at: "27 Mar",
        text: "Treasury Committee published the quantified impact and goodwill payments.",
      },
      {
        at: "Later",
        text: "Regulator enquiries continued; no final outcome is asserted here.",
      },
    ],
    financial:
      "£139,000 goodwill paid to 3,625 customers; no customer financial loss identified at the time of reporting.",
    caveat:
      "Principally a data confidentiality incident, not a prolonged outage. Spotting unauthorised data visibility needs dedicated, privacy safe instrumentation.",
    approach:
      "With safe cross account anomaly signals and release history connected, relate a sudden isolation failure to the overnight deployment, assemble the evidence for incident command and the regulator, and propose a rollback for approval.",
    boundary:
      "Relyxus could not have spotted this without data segregation tests and safe telemetry. Detection depends on what is instrumented.",
    sources: [
      {
        label:
          "Treasury Committee: nearly half a million Lloyds customers affected, 27 Mar 2026",
        href: "https://committees.parliament.uk/committee/158/treasury-committee/news/212885/nearly-half-a-million-lloyds-banking-group-customers-affected-by-personal-data-glitch/",
      },
    ],
  },
  {
    slug: "aws-us-east-1-october-2025",
    kind: "cloud",
    firm: "Amazon Web Services",
    date: "19 to 20 October 2025",
    region: "US",
    sector: "Cloud infrastructure / third party concentration",
    tier: "A+",
    sourceType: "First party post mortem",
    featured: true,
    title: "DNS was fixed. Then the recovery caused a second failure.",
    highlight:
      "DynamoDB API errors for about 2h 52m; wider regional disruption ran into the next day.",
    short:
      "Restoring DNS did not restore the business: dependent services recovered on separate clocks.",
    summary:
      "AWS documented a latent race condition between DNS management components that left the DynamoDB regional endpoint resolving to an empty record. Fixing DNS did not restore every dependent service: EC2 and load balancers had their own backlogs.",
    established: [
      "AWS’s own root cause: a stale DNS plan race left the DynamoDB endpoint record empty.",
      "Three overlapping impact periods across DynamoDB, EC2 and Network Load Balancer.",
      "DNS restoration was not the same as workload recovery.",
    ],
    timeline: [
      {
        at: "19 Oct 23:48 PDT",
        text: "DynamoDB API impact began in us-east-1.",
      },
      {
        at: "20 Oct 02:40",
        text: "DynamoDB primary API error window ended.",
      },
      {
        at: "20 Oct 10:36",
        text: "New EC2 launches began succeeding again.",
      },
      {
        at: "20 Oct 14:09 to 14:20",
        text: "Load balancer errors and the last scoped effects resolved.",
      },
    ],
    financial:
      "No AWS verified consolidated financial loss for affected customers.",
    caveat:
      "Customer losses are not published. The root cause is provider side knowledge a customer’s own telemetry may not show.",
    approach:
      "For an AWS dependent bank, link multi service symptoms and provider health to one shared dependency, stop duplicate investigations, and offer pre agreed alternate region steps for approval.",
    boundary:
      "Recognising a third party incident and supporting the customer’s contingency plan; not repairing AWS owned infrastructure.",
    sources: [
      {
        label: "AWS post event summary, DynamoDB us-east-1, Oct 2025",
        href: "https://aws.amazon.com/message/101925/",
      },
    ],
  },
  {
    slug: "cloudflare-18-november-2025",
    kind: "edge",
    firm: "Cloudflare",
    date: "18 November 2025",
    region: "Global",
    sector: "Internet edge infrastructure",
    tier: "A+",
    sourceType: "First party post mortem",
    featured: true,
    title: "The alert fired in 3 minutes. The right cause took over 2 hours.",
    highlight:
      "Core traffic largely back by 14:30 UTC; all systems normal by 17:06 UTC.",
    short:
      "The team first suspected a DDoS attack. The cause was a permissions change 23 minutes before impact.",
    summary:
      "A database permissions change altered a query that builds a Bot Management configuration file. Duplicate rows pushed the file past a hard limit and proxies began failing. Fluctuating errors first looked like a major DDoS attack; later evidence pointed at the change.",
    established: [
      "Cloudflare’s own post mortem documents the permissions change, duplicate rows and hard size limit.",
      "Cloudflare acknowledges the initial DDoS misdiagnosis.",
      "A known good configuration was restored; a login backlog took longer to clear.",
    ],
    timeline: [
      { at: "11:05 UTC", text: "Database access control change deployed." },
      {
        at: "11:28 to 11:35",
        text: "Customer HTTP errors, automated detection and incident bridge.",
      },
      {
        at: "13:37",
        text: "Investigators focus on the bad Bot Management configuration.",
      },
      {
        at: "14:24 to 14:30",
        text: "Bad file propagation stopped; core traffic largely restored.",
      },
      { at: "17:06", text: "All Cloudflare systems operating normally." },
    ],
    financial: "No company published, verified total customer loss.",
    caveat:
      "Online estimates of hundreds of millions of dollars in losses have no stated method and are not used here.",
    approach:
      "Link 5xx spikes to recent config publishes, file size and the permissions change; show alternative hypotheses with the evidence against them; propose stopping propagation and restoring the known good file under change control.",
    boundary:
      "Without Cloudflare’s internal telemetry, a customer’s Relyxus can recognise an upstream incident, not inspect Cloudflare’s own systems.",
    sources: [
      {
        label: "Cloudflare post mortem, 18 Nov 2025",
        href: "https://blog.cloudflare.com/18-november-2025-outage/",
      },
    ],
  },
  {
    slug: "cme-27-november-2025",
    kind: "market",
    firm: "CME Group / CyrusOne",
    date: "27 to 28 November 2025",
    region: "US",
    sector: "Financial market infrastructure",
    tier: "A+",
    sourceType: "SEC Form 10-K",
    featured: true,
    title:
      "A data centre cooling failure forced a temporary halt to electronic markets.",
    highlight:
      "Global futures markets halted and reopened the next day on a delayed basis.",
    short:
      "Early information pointed to a brief outage, so CME did not fail over. The halt ran past 10 hours.",
    summary:
      "CME reported in its SEC annual filing that a critical cooling failure, caused by human error at CyrusOne’s data centre, led it to halt markets temporarily. Trading resumed the following day after a delayed opening.",
    established: [
      "The 10-K names the external provider, the cooling failure, human error, the halt and the delayed reopening.",
      "CME states the event was not material to its business.",
    ],
    timeline: [
      {
        at: "27 Nov 2025",
        text: "Critical cooling failure at the CyrusOne data centre.",
      },
      {
        at: "After detection",
        text: "CME elected to halt electronic markets.",
      },
      { at: "28 Nov 2025", text: "Markets reopened later than scheduled." },
      {
        at: "2025 10-K",
        text: "CME described the impact to its own business as limited and not material.",
      },
    ],
    financial:
      "CME called its business impact limited and not material; no company reported loss total.",
    caveat:
      "Notional trading volume is not realised loss. Industry disruption can be large even when the issuer calls its own impact non material.",
    approach:
      "Identify a shared external data centre failure, show which trading dependencies are hit, keep crisis communications in step, and record each disaster recovery decision with who made it and on what information.",
    boundary:
      "Relyxus cannot repair cooling plant, change CME’s operations or reopen regulated markets. Its role is advisory and record keeping.",
    sources: [
      {
        label: "CME Group 2025 Form 10-K (SEC)",
        href: "https://www.sec.gov/Archives/edgar/data/1156375/000115637526000009/cme-20251231.htm",
      },
      {
        label: "Fortune: the CME outage and the CyrusOne data centre",
        href: "https://fortune.com/2025/11/30/cme-outage-financial-markets-data-center-cyrusone-aurora-illinois",
      },
    ],
  },
  {
    slug: "google-cloud-12-june-2025",
    kind: "cloud-platform",
    firm: "Google Cloud",
    date: "12 June 2025",
    region: "Global",
    sector: "Hyperscale cloud / worldwide dependencies",
    tier: "A+",
    sourceType: "First party incident report",
    featured: true,
    title:
      "Blank policy metadata crashed a global control service. Recovery created its own tail.",
    highlight:
      "Primary API outage about 3 hours; some product level effects lasted longer.",
    short:
      "Code shipped in May without being exercised; a June metadata update set it off worldwide.",
    summary:
      "Google’s report: a new Service Control quota policy path shipped in May without being exercised. A June metadata update with blank fields replicated globally and caused null pointer crashes. A red button disable began recovery, but task restarts caused resource contention, and Google’s own monitoring and status paths were impaired.",
    established: [
      "Google’s report explains the null pointer crash loop, global replication and incomplete feature gating.",
      "Recovery caused a herd effect; monitoring and incident communications were affected.",
      "The status page separates the three hour primary event from longer product specific effects.",
    ],
    timeline: [
      {
        at: "29 May 2025",
        text: "New quota policy code deployed without sufficient protection.",
      },
      {
        at: "12 Jun ~10:45 PDT",
        text: "Malformed policy metadata replicated; global API errors began.",
      },
      {
        at: "Within 10 to 40 min",
        text: "Cause identified; red button mitigation started and completed.",
      },
      {
        at: "~13:49 PDT",
        text: "Main regional API serving restored, with residual product effects.",
      },
    ],
    financial:
      "No verified Google reported aggregate customer financial loss total.",
    caveat:
      "The broad status page interval and the shorter main mitigation window are different clocks; there is no single customer downtime figure.",
    approach:
      "Trace a global API error storm to one shared cloud dependency, compare it with config and policy changes, and keep the evidence even when the provider’s monitoring is impaired.",
    boundary:
      "A bank’s Relyxus cannot change Google’s control plane. Its value is third party attribution, local mitigation and incident governance.",
    sources: [
      {
        label: "Google Cloud Service Health incident report, 12 Jun 2025",
        href: "https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW",
      },
    ],
  },
  {
    slug: "tsb-april-2018",
    kind: "bank",
    firm: "TSB Bank",
    date: "April 2018",
    region: "UK",
    sector: "UK banking migration / historical benchmark",
    tier: "A+",
    sourceType: "Company results and FCA",
    featured: true,
    title:
      "A core banking migration led to weeks of disruption and itemised costs.",
    highlight:
      "£330.2m in post migration costs and foregone income; £153m provisional recovery from the IT provider.",
    short:
      "The UK benchmark for itemised cost: remediation, fraud, extra staff and lost income, all reported by the bank.",
    summary:
      "After a major banking platform migration, TSB suffered prolonged service disruption and paid for remediation, extra staff, fraud and operational losses, and lost income. It is the one historical case here, included because TSB reported categorised costs.",
    established: [
      "£125.2m redress and remediation; £49.1m fraud and operational losses; £122.4m extra resource; £33.5m foregone income.",
      "A provisional £153m recovery from the IT provider is disclosed separately.",
      "The 2022 regulatory fines are a separate, later event, not part of the 2018 cost.",
    ],
    timeline: [
      {
        at: "Apr 2018",
        text: "Platform migration and customer service disruption.",
      },
      {
        at: "2018 year end",
        text: "TSB recognised £330.2m in post migration costs and foregone income.",
      },
      {
        at: "1 Feb 2019",
        text: "Results disclosed the £153m provisional provider recovery.",
      },
      {
        at: "Dec 2022",
        text: "FCA and PRA fined TSB £48.65m for operational resilience failings.",
      },
    ],
    financial:
      "Company reported 2018 costs; the 2022 penalties of £48.65m are a separate later event.",
    caveat:
      "This predates current cloud operations and is a historical lesson in control failure, not a measure of today’s banks.",
    approach:
      "During a cutover, collect evidence across core services, compare migration change records with channel health, and keep rollback and escalation decisions on the record.",
    boundary:
      "Relyxus is not a replacement for migration assurance and cannot undo a data migration; that needs vendor support and signed change authority.",
    sources: [
      {
        label: "TSB 2018 full year results, 1 Feb 2019",
        href: "https://www.tsb.co.uk/news-releases/tsb-announces-2018-full-year-results.html",
      },
      {
        label: "FCA: TSB fined £48.65m for operational resilience failings",
        href: "https://www.fca.org.uk/news/press-releases/tsb-fined-48m-operational-resilience-failings",
      },
    ],
  },
  {
    slug: "fedach-3-march-2026",
    kind: "clearing",
    firm: "Federal Reserve FedACH",
    date: "3 March 2026",
    region: "US",
    sector: "US payments clearing and settlement",
    tier: "B",
    sourceType: "Processor relay of a Fed notice",
    featured: false,
    title:
      "ACH file delivery, settlement windows and acknowledgements were delayed.",
    highlight:
      "Clients were told not to resend unacknowledged files, to avoid duplicates.",
    short:
      "The right move was to wait: resending files would have caused duplicate payments.",
    summary:
      "A credit union technology provider archived a Federal Reserve message saying FedACH services were delayed by internal systems processing, affecting file distribution, settlement and acknowledgements. It is a relay, not a full root cause report.",
    established: [
      "A processor published a dated relay quoting the Federal Reserve’s service notice.",
      "The notice covered acknowledgement handling and settlement windows.",
      "The Federal Reserve’s status site is a general hub, not an incident report.",
    ],
    timeline: [
      {
        at: "2 to 3 Mar",
        text: "Earlier ACH file availability delays reported by the processor.",
      },
      {
        at: "3 Mar 11:00 CT",
        text: "Relayed FedACH alert describes internal processing delays.",
      },
      {
        at: "During",
        text: "Clients told not to resend unacknowledged files.",
      },
      { at: "4 Mar", text: "Processor notice marked resolved." },
    ],
    financial:
      "No disclosed event wide financial loss; no primary engineering post mortem located.",
    caveat:
      "Conditional evidence: the original Federal Reserve bulletin was not recovered. This does not imply Fedwire or FedNow were affected.",
    approach:
      "Separate an upstream ACH delay from a bank’s own integration fault, track pending files and acknowledgements, and enforce a “do not resend without reconciliation” runbook.",
    boundary:
      "Relyxus cannot change FedACH processing. Automatic retransmission could cause duplicates, so it stays blocked without dual approval.",
    sources: [
      {
        label: "CU*SOUTH relay of the Federal Reserve notice, 3 Mar 2026",
        href: "https://cusouth.zendesk.com/hc/en-us/articles/49585654524307-RESOLVED-Delayed-3-2-3-3-ACH-Files",
      },
      {
        label: "Federal Reserve Financial Services status page",
        href: "https://www.frbservices.org/service-status/",
      },
    ],
  },
  {
    slug: "delta-19-july-2024",
    kind: "airline",
    firm: "Delta Air Lines",
    date: "19 to 24 July 2024",
    region: "US",
    sector: "US aviation / large scale endpoint recovery",
    tier: "A+",
    sourceType: "SEC filings",
    featured: false,
    title:
      "A faulty third party update turned into five days of operational disruption.",
    highlight:
      "About 7,000 cancelled flights; $380m revenue impact, $170m extra expense, $50m lower fuel cost.",
    short:
      "Restoring the computers did not restore the operation: crews and aircraft took days longer.",
    summary:
      "A faulty CrowdStrike update disrupted Windows systems worldwide. In SEC filings, Delta reported about 7,000 cancellations over five days, lower revenue and higher costs. Restored IT did not instantly unwind crew, aircraft and customer backlogs.",
    established: [
      "10-K: $380m revenue impact, $170m extra operating costs, $50m lower fuel cost.",
      "About 1.4 million customers affected.",
      "A legal claim of at least $500m is a claim, not a court award.",
    ],
    timeline: [
      {
        at: "19 Jul 2024",
        text: "Faulty third party update caused widespread Windows outages.",
      },
      {
        at: "Next five days",
        text: "About 7,000 flight cancellations.",
      },
      {
        at: "Aug 2024 8-K",
        text: "Preliminary financial effects and legal claim disclosed.",
      },
      {
        at: "2024 10-K",
        text: "Revenue, expense and fuel effects reiterated.",
      },
    ],
    financial:
      "Roughly $500m net direct 2024 impact as estimated by Delta; the separate litigation claim is not added to it.",
    caveat:
      "Outside payments, included for its company reported figures. A “$550m loss” ignores the $50m fuel saving.",
    approach:
      "Connect third party update events to fleet host health, map affected operational apps, and keep approved, staged recovery waves on the record.",
    boundary:
      "Relyxus cannot stop faulty vendor updates or recover crew logistics, and there is no basis to claim it would save the disclosed cost.",
    sources: [
      {
        label: "Delta 2024 Form 10-K (SEC)",
        href: "https://www.sec.gov/Archives/edgar/data/27904/000002790425000004/dal-20241231.htm",
      },
      {
        label: "Delta Form 8-K on the July 2024 outage (SEC)",
        href: "https://www.sec.gov/Archives/edgar/data/27904/000168316824005369/delta_8k.htm",
      },
    ],
  },
  {
    slug: "nats-28-august-2023",
    kind: "air-traffic",
    firm: "NATS (UK air traffic)",
    date: "28 August 2023",
    region: "UK",
    sector: "UK safety critical aviation infrastructure",
    tier: "A+",
    sourceType: "Operator, CAA and UK Government",
    featured: false,
    title:
      "One rare flight plan pushed primary and backup systems into fail safe.",
    highlight:
      "More than 700,000 travellers affected; £75m to £100m estimated combined industry and passenger cost.",
    short:
      "A safety first failure: the system stopped rather than risk a wrong answer.",
    summary:
      "NATS described a flight plan with two identically named waypoints that triggered a critical exception, sending both primary and backup systems into safe fail safe operation. The CAA commissioned an independent review.",
    established: [
      "NATS explained the duplicate waypoint failure and that safety was maintained.",
      "UK Government: more than 700,000 travellers affected; £75m to £100m estimated combined cost.",
      "The CAA hosts the final review and follow up reports.",
    ],
    timeline: [
      {
        at: "28 Aug 2023",
        text: "Rare input triggered a processing exception and fail safe.",
      },
      {
        at: "Early Sep 2023",
        text: "NATS published its preliminary root cause and mitigations.",
      },
      {
        at: "Nov 2024",
        text: "Independent review released, with 34 recommendations.",
      },
      {
        at: "2025 to 2026",
        text: "CAA continues reporting on the recommendations.",
      },
    ],
    financial:
      "An independent estimate of ecosystem wide impact, not NATS’s own booked loss.",
    caveat:
      "Outside payments, included as a lesson in evidence led diagnosis. Relyxus is not certified for air traffic control.",
    approach:
      "Read only correlation of incoming file anomalies and exception logs, fast evidence collation, and a complete record for authorised engineers.",
    boundary:
      "No action issuance at all: human safety authority keeps every decision. This is not an aviation product claim.",
    sources: [
      {
        label: "UK CAA: independent NATS August 2023 failure review",
        href: "https://www.caa.co.uk/commercial-industry/airspace/air-traffic-management-and-air-navigational-services/air-navigation-services/nats-august-2023-failure-review/",
      },
      {
        label: "UK Government statement on the NATS review, Nov 2024",
        href: "https://www.gov.uk/government/speeches/caa-publication-of-independent-report-into-nats-technical-failure",
      },
      {
        label: "NATS root cause statement, 6 Sep 2023",
        href: "https://www.nats.aero/news/nats-report-into-air-traffic-control-incident-details-root-cause-and-solution-implemented/",
      },
    ],
  },
];

export const featuredIncidents = incidentFiles.filter(file => file.featured);

export const incidentBySlug = (slug: string) =>
  incidentFiles.find(file => file.slug === slug);

/** The one-line sourced fact used where the problem is introduced. */
export const headlineFact = {
  text: "At Cloudflare, the alert fired in 3 minutes; the right cause took more than 2 hours. That gap is where incidents get expensive.",
  file: "cloudflare-18-november-2025",
  source: incidentBySlug("cloudflare-18-november-2025")!.sources[0],
} as const;
