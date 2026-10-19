/**
 * Incident files: public outages from published post-incident reports.
 * Evidence for the problem, never case studies. These firms do not use,
 * endorse or were assessed by Relyxus. Say "this is the gap Relyxus is built
 * for", never "Relyxus would have prevented this". Primary sources first.
 * Get client (and ideally legal) sign-off before naming firms publicly.
 */
import type { SourceLink } from "@/components/ui/Sources";

export type IncidentFile = {
  slug: string;
  firm: string;
  date: string;
  title: string;
  summary: string;
  timeline: readonly { at: string; text: string }[];
  slowed: string;
  gap: string;
  sources: readonly SourceLink[];
  caveat?: string;
};

export const incidentFiles: readonly IncidentFile[] = [
  {
    slug: "cloudflare-18-november-2025",
    firm: "Cloudflare",
    date: "18 November 2025",
    title: "The alert fired in 3 minutes. The right cause took over 2 hours.",
    summary:
      "A database permissions change doubled the size of a configuration file, and the proxy that read it started returning errors across Cloudflare’s network.",
    timeline: [
      { at: "11:05", text: "Database access control change deployed." },
      { at: "11:28", text: "First errors on customer HTTP traffic." },
      { at: "11:31", text: "First automated test detects the issue." },
      {
        at: "11:32",
        text: "Manual investigation starts; the team first works on Workers KV and suspects an attack.",
      },
      {
        at: "13:37",
        text: "Team confident the Bot Management configuration file is the trigger.",
      },
      { at: "14:30", text: "Main impact resolved with a correct file." },
    ],
    slowed:
      "Detection was fast. The time went on the cause: the first theories pointed at Workers KV and a large attack, and the status page going down at the same time reinforced the wrong theory.",
    gap: "The trigger was a change made 23 minutes before impact. Putting recent changes beside each candidate cause, with the evidence for and against it, is the gap Relyxus is built for.",
    sources: [
      {
        label: "Cloudflare, outage on 18 November 2025 (post-incident report)",
        href: "https://blog.cloudflare.com/18-november-2025-outage/",
      },
    ],
    caveat: "Times are UTC, as published by Cloudflare.",
  },
  {
    slug: "aws-us-east-1-october-2025",
    firm: "AWS",
    date: "19–20 October 2025",
    title: "DNS was fixed. Then the recovery caused a second failure.",
    summary:
      "An empty DNS record for DynamoDB’s regional endpoint broke services in us-east-1. After DNS was restored, the EC2 system that manages host leases could not catch up and collapsed under its own backlog.",
    timeline: [
      { at: "23:48", text: "DynamoDB endpoint starts failing DNS lookups." },
      {
        at: "00:38",
        text: "Engineers identify DynamoDB’s DNS state as the cause.",
      },
      { at: "02:25", text: "All DNS information restored." },
      {
        at: "02:25",
        text: "EC2’s lease manager tries to re-establish leases and enters congestive collapse.",
      },
      { at: "04:14", text: "Engineers throttle work and restart hosts." },
      { at: "13:50", text: "All EC2 APIs and launches operating normally." },
    ],
    slowed:
      "It took 50 minutes to identify the DNS state. The longer tail came after the fix, when recovery itself put load on a dependent system.",
    gap: "A fix is a change too. Holding each recovery step for a named approver, with its expected effect and how it will be verified, is the gap Relyxus is built for.",
    sources: [
      {
        label: "AWS, summary of the Amazon DynamoDB service disruption",
        href: "https://aws.amazon.com/message/101925/",
      },
    ],
    caveat: "Times are PDT, as published by AWS.",
  },
  {
    slug: "rba-rits-27-january-2026",
    firm: "Reserve Bank of Australia",
    date: "27 January 2026",
    title:
      "An expired certificate stopped low-value settlement for almost 7 hours.",
    summary:
      "An expired intermediate certificate on the database platform behind several RITS applications disrupted the Low Value Clearing and Settlement Services. A separate issue that evening interrupted property settlement.",
    timeline: [
      { at: "09:49", text: "LVCS and LVSS disruption begins." },
      {
        at: "16:38",
        text: "Service restored after a valid certificate is installed and RITS processing restarted.",
      },
      {
        at: "Evening",
        text: "A separate issue interrupts property settlement for about 2 hours 52 minutes.",
      },
    ],
    slowed:
      "Two disruptions on one day, with different causes, each needing its own timeline for the regulator and for participants.",
    gap: "When two incidents overlap, each needs its own ordered, sourced record. Keeping that record as the incident runs is the gap Relyxus is built for.",
    sources: [
      {
        label: "RBA, payments settlement outage report, 27 January 2026",
        href: "https://www.rba.gov.au/payments-and-infrastructure/rits/system-availability-statistics/2026/pdf/payments-settlement-outage-20260127.pdf",
      },
    ],
    caveat:
      "The RBA’s annual report refers to the outage as 26 January; the incident report says 27 January. Times are AEDT.",
  },
  {
    slug: "cme-27-november-2025",
    firm: "CME Group",
    date: "27–28 November 2025",
    title:
      "Early information said the outage would be brief. It ran past 10 hours.",
    summary:
      "A cooling failure at a CyrusOne data centre near Chicago halted CME’s markets. CME chose not to move to its backup site because early information suggested a short outage.",
    timeline: [
      {
        at: "Thu evening",
        text: "Cooling failure at the CyrusOne CHI1 facility.",
      },
      {
        at: "Early",
        text: "CME decides not to fail over to its New York-area backup site.",
      },
      { at: "Fri", text: "Markets halted for more than 10 hours." },
      { at: "Sun 18:00", text: "Futures trading opens normally." },
    ],
    slowed:
      "The decision not to fail over was made on early information. Whether that was right depends on what was known, and when.",
    gap: "Leadership decisions need a timestamped record of what was known when they were made, and who made them. That record is the gap Relyxus is built for.",
    sources: [
      {
        label: "Fortune, CME outage and the CyrusOne data centre",
        href: "https://fortune.com/2025/11/30/cme-outage-financial-markets-data-center-cyrusone-aurora-illinois",
      },
      {
        label: "Insurance Journal, CME data centre bolsters backup cooling",
        href: "https://amp.insurancejournal.com/news/midwest/2025/12/01/849319.htm",
      },
    ],
    caveat:
      "No primary post-incident report has been published. Details are from news reports citing CME and CyrusOne.",
  },
];

export const incidentBySlug = (slug: string) =>
  incidentFiles.find(file => file.slug === slug);

/** The one-line sourced fact used on the homepage problem section. */
export const headlineFact = {
  text: "At Cloudflare, the alert fired in 3 minutes; the right cause took more than 2 hours. That gap is where incidents get expensive.",
  file: "cloudflare-18-november-2025",
  source: incidentFiles[0].sources[0],
} as const;
