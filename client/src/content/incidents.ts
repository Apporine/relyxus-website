/**
 * Incident files: public outages from published post-incident reports /
 * Apporine research dossiers (Relyxus_case_studies.pdf v2.0).
 * Evidence for the problem, never customer success stories. These firms do
 * not use, endorse or were assessed by Relyxus. Say "this is the gap Relyxus
 * is built for", never "Relyxus would have prevented this". Legal/client
 * sign-off before naming firms publicly.
 */
import type { SourceLink } from "@/components/ui/Sources";

export type IncidentFile = {
  slug: string;
  firm: string;
  date: string;
  title: string;
  /** One-line impact fact for cards (from the dossier headline). */
  highlight: string;
  summary: string;
  sector: string;
  logo: string;
  timeline: readonly { at: string; text: string }[];
  slowed: string;
  gap: string;
  sources: readonly SourceLink[];
  caveat?: string;
};

export const incidentFiles: readonly IncidentFile[] = [
  {
    slug: "barclays-31-january-2025",
    firm: "Barclays",
    date: "31 Jan–2 Feb 2025",
    title:
      "A critical mainframe software problem disrupted digital payments and servicing.",
    highlight:
      "56% of attempted online payments failed among users who reached the payment step.",
    summary:
      "Barclays told Parliament a software problem in a critical UK mainframe module caused progressive processing degradation from 31 January — affecting payments and servicing at a sensitive point for wages and self-assessment tax. Regulators were notified the same morning; apps and online banking largely returned overnight, with intermittent issues into the weekend.",
    sector: "UK retail and corporate banking",
    logo: "/incidents/barclays.svg",
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
        text: "Most renewed login/payment issues largely resolved; systems stable by Sunday.",
      },
      {
        at: "9 Apr letter",
        text: "Follow-up clarified affected client proportions and corrected prior-period compensation figures.",
      },
    ],
    slowed:
      "A shared back-end defect looked like separate channel failures. Crisis staffing and provider-assisted mitigation followed — after the cause was already in the mainframe path.",
    gap: "Correlate mainframe throughput, payment failure rates and channel alerts so a shared back-end defect is ranked before teams chase app-only theories — the gap Relyxus is built for.",
    sources: [
      {
        label:
          "Barclays / UK Parliament written evidence (S01–S03 in research pack)",
        href: "https://committees.parliament.uk/",
      },
    ],
    caveat:
      "Initial £5m–£7.5m compensation was an early forecast for this incident. Do not use the later-corrected “up to £12.5m” figure, which mixed earlier periods.",
  },
  {
    slug: "lloyds-12-march-2026",
    firm: "Lloyds Banking Group",
    date: "12 March 2026",
    title:
      "An overnight change introduced a defect. Nearly half a million customers saw other people’s transactions.",
    highlight:
      "Up to 447,936 customers implicated; £139,000 paid for distress and inconvenience.",
    summary:
      "An overnight mobile-app update introduced a software defect in an API. Between about 03:28 and 08:08, up to 447,936 Lloyds, Halifax and Bank of Scotland customers could see other customers’ transaction lists. Services stayed up — confidentiality failed. Lloyds notified the FCA, PRA and ICO; Parliament published the quantified impact.",
    sector: "UK retail banking / data confidentiality",
    logo: "/incidents/lloyds.svg",
    timeline: [
      {
        at: "11–12 Mar",
        text: "Overnight software update introduced a defect in transaction information handling.",
      },
      {
        at: "12 Mar",
        text: "Lloyds, Halifax and Bank of Scotland customers could see other users’ transactions.",
      },
      {
        at: "Same morning",
        text: "Lloyds notified the FCA, PRA and ICO; formal ICO notification followed within 72 hours.",
      },
      {
        at: "27 Mar",
        text: "Treasury Committee published the initial quantified impact and compensation.",
      },
    ],
    slowed:
      "Uptime monitoring would have looked fine. The failure was data integrity and confidentiality after a change — not a prolonged full-bank outage.",
    gap: "Most causes in the public record start with a change. Linking deploys to the incident record, with evidence for and against each theory, is the shortest path to the cause — the gap Relyxus is built for.",
    sources: [
      {
        label:
          "UK Parliament Treasury Committee, nearly half a million customers affected",
        href: "https://committees.parliament.uk/committee/158/treasury-committee/news/212885/nearly-half-a-million-lloyds-banking-group-customers-affected-by-personal-data-glitch/",
      },
      {
        label: "BBC News, Lloyds Banking Group IT glitch",
        href: "https://www.bbc.co.uk/news/articles/c70dqk2vjv8o",
      },
    ],
  },
  {
    slug: "aws-us-east-1-october-2025",
    firm: "AWS",
    date: "19–20 October 2025",
    title: "DNS was fixed. Then the recovery caused a second failure.",
    highlight:
      "DynamoDB, EC2 and NLB recovered on different clocks — restoration was not business recovery.",
    summary:
      "AWS documented a latent race between DNS management components that left DynamoDB’s regional endpoint resolving to an empty record. Restoring DNS did not restore every dependent service: EC2’s lease manager and load balancers had separate backlogs. A high-quality demonstration of a triggering cause versus secondary symptoms.",
    sector: "US hyperscale cloud / payments concentration",
    logo: "/incidents/aws.svg",
    timeline: [
      {
        at: "19 Oct 23:48 PDT",
        text: "DynamoDB API impact began in us-east-1.",
      },
      {
        at: "20 Oct 00:38",
        text: "Engineers identify DynamoDB’s DNS state as the cause.",
      },
      { at: "20 Oct 02:25", text: "All DNS information restored." },
      {
        at: "02:25 onward",
        text: "EC2 lease manager tries to catch up and enters congestive collapse.",
      },
      {
        at: "10:36–14:20",
        text: "EC2 launches and NLB errors resolve across staggered windows.",
      },
    ],
    slowed:
      "It took about 50 minutes to identify the DNS state. The longer tail came after the fix, when recovery itself put load on dependent systems.",
    gap: "A fix is a change too. Holding each recovery step for a named approver, with its expected effect and how it will be verified, is the gap Relyxus is built for.",
    sources: [
      {
        label: "AWS, summary of the Amazon DynamoDB service disruption",
        href: "https://aws.amazon.com/message/101925/",
      },
    ],
    caveat:
      "Times are PDT, as published by AWS. No AWS-verified consolidated customer financial loss.",
  },
  {
    slug: "cloudflare-18-november-2025",
    firm: "Cloudflare",
    date: "18 November 2025",
    title: "The alert fired in 3 minutes. The right cause took over 2 hours.",
    highlight:
      "Main traffic largely recovered by 14:30 UTC; all systems normal by 17:06 UTC.",
    summary:
      "A database permissions change altered a query used to build a Bot Management configuration file. Duplicate entries enlarged the file past a hard limit and proxies started failing. Fluctuating errors first looked like a major DDoS; later evidence pointed at the change. Propagation was stopped and a known-good configuration restored.",
    sector: "US internet-edge infrastructure",
    logo: "/incidents/cloudflare.svg",
    timeline: [
      { at: "11:05 UTC", text: "Database access-control change deployed." },
      { at: "11:28", text: "First errors on customer HTTP traffic." },
      { at: "11:31", text: "First automated test detects the issue." },
      {
        at: "11:32",
        text: "Manual investigation starts; early theories include Workers KV and a large attack.",
      },
      {
        at: "13:37",
        text: "Team confident the Bot Management configuration file is the trigger.",
      },
      {
        at: "14:24–14:30",
        text: "Stopped bad configuration propagation; core traffic largely restored.",
      },
      {
        at: "17:06",
        text: "All Cloudflare systems reported operating normally.",
      },
    ],
    slowed:
      "Detection was fast. The time went on the cause: the first theories pointed at Workers KV and a large attack, and the status page failing at the same time reinforced the wrong story.",
    gap: "The trigger was a change made 23 minutes before impact. Putting recent changes beside each candidate cause, with evidence for and against it, is the gap Relyxus is built for.",
    sources: [
      {
        label: "Cloudflare, outage on 18 November 2025 (post-incident report)",
        href: "https://blog.cloudflare.com/18-november-2025-outage/",
      },
    ],
    caveat:
      "Times are UTC, as published by Cloudflare. Do not present unverified aggregate-loss estimates as Cloudflare or customer loss.",
  },
  {
    slug: "google-cloud-12-june-2025",
    firm: "Google Cloud",
    date: "12 June 2025",
    title:
      "A global Service Control error — policy metadata and missing exception handling.",
    highlight:
      "Primary widespread API outage ~3 hours; some product-level effects persisted longer.",
    summary:
      "Google’s RCA: a new Service Control quota-policy path shipped in May without being exercised. A June metadata update with blank fields replicated globally and caused null-pointer crashes. A red-button disable began recovery, but task restarts created resource contention and a longer tail. Monitoring and incident communications were themselves impaired.",
    sector: "US hyperscale cloud / worldwide dependencies",
    logo: "/incidents/google-cloud.svg",
    timeline: [
      {
        at: "29 May",
        text: "New Service Control quota-policy code deployed without sufficient protection.",
      },
      {
        at: "12 Jun ~10:45 PDT",
        text: "Malformed policy metadata replicated; global API errors started.",
      },
      {
        at: "+10–40 min",
        text: "RCA identified; red-button mitigation initiated and completed.",
      },
      {
        at: "~13:49 PDT",
        text: "Main regional API serving restored, with residual product effects.",
      },
      {
        at: "Later same day",
        text: "Some downstream products and model-serving resources finished recovery.",
      },
    ],
    slowed:
      "The primary mitigation window and the longer product-level residual effects are not the same clock. Status and monitoring paths were impaired during the event.",
    gap: "Preserve evidence even when a cloud provider’s own monitoring is impaired, and attribute a global API storm to a shared dependency before local theories multiply — the gap Relyxus is built for.",
    sources: [
      {
        label: "Google Cloud Service Health / official incident RCA (S08)",
        href: "https://status.cloud.google.com/",
      },
    ],
    caveat:
      "Label product-level recovery separately from the main mitigation window. No verified Google-reported aggregate customer financial-loss total.",
  },
  {
    slug: "cme-27-november-2025",
    firm: "CME Group",
    date: "27–28 November 2025",
    title:
      "A data-centre cooling failure forced a temporary halt to electronic markets.",
    highlight:
      "Global futures markets halted and reopened the next day on a delayed basis.",
    summary:
      "CME’s SEC Form 10-K states a critical cooling failure — caused by human error at a CyrusOne data centre — led CME to halt electronic markets temporarily. Trading resumed the following day after a delayed opening. A third-party resilience and crisis-decision case, not an AI product repairing cooling plant.",
    sector: "US financial-market infrastructure",
    logo: "/incidents/cme.svg",
    timeline: [
      {
        at: "27 Nov 2025",
        text: "Critical cooling failure at the CyrusOne data centre.",
      },
      {
        at: "Following detection",
        text: "CME elected to halt electronic markets.",
      },
      { at: "28 Nov 2025", text: "Markets reopened later than scheduled." },
      {
        at: "2025 Form 10-K",
        text: "CME characterised impact to its own business as limited and not material.",
      },
    ],
    slowed:
      "Early information shaped the failover decision. Whether that was right depends on what was known, and when — and the record of that decision.",
    gap: "Leadership decisions need a timestamped record of what was known when they were made, and who made them. That record is the gap Relyxus is built for.",
    sources: [
      {
        label: "CME Group / SEC Form 10-K (S07 in research pack)",
        href: "https://www.sec.gov/",
      },
      {
        label: "Fortune, CME outage and the CyrusOne data centre",
        href: "https://fortune.com/2025/11/30/cme-outage-financial-markets-data-center-cyrusone-aurora-illinois",
      },
    ],
    caveat:
      "Do not conflate notional trading volume with realised loss. CME called its own business impact limited and not material.",
  },
];

export const incidentBySlug = (slug: string) =>
  incidentFiles.find(file => file.slug === slug);

/** The one-line sourced fact used on the homepage problem section. */
export const headlineFact = {
  text: "At Cloudflare, the alert fired in 3 minutes; the right cause took more than 2 hours. That gap is where incidents get expensive.",
  file: "cloudflare-18-november-2025",
  source: incidentFiles.find(f => f.slug === "cloudflare-18-november-2025")!
    .sources[0],
} as const;
