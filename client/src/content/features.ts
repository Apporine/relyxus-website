/**
 * Product clarity deck: what buyers get, how it works, before/after,
 * and which screen owns each feature. Keep this the inventory of record.
 */

export const howItWorks = [
  {
    step: "01",
    name: "Alert",
    line: "The clock starts the moment the page fires.",
  },
  {
    step: "02",
    name: "Correlate",
    line: "Logs, changes and alerts land in one investigation.",
  },
  {
    step: "03",
    name: "Cause",
    line: "Likely causes ranked, each with its sources.",
  },
  {
    step: "04",
    name: "Approve",
    line: "A named person says yes before anything runs.",
  },
  {
    step: "05",
    name: "Record",
    line: "The audit write up drafts while you work.",
  },
] as const;

export const featureMap = [
  {
    name: "One investigation",
    line: "Pull logs, changes and alerts into a single incident record.",
    screen: "War room",
    href: "/product#screens",
  },
  {
    name: "Causes ranked by evidence",
    line: "Every likely cause links to the sources behind it, so your team can check.",
    screen: "War room",
    href: "/product#screens",
  },
  {
    name: "Named approval gate",
    line: "Proposed fixes wait for the approvers your policy names. Nothing runs unattended.",
    screen: "Approvals",
    href: "/product#screens",
  },
  {
    name: "Audit record as you go",
    line: "Timeline, owners and decisions are logged in order, ready for the notice draft.",
    screen: "War room",
    href: "/product#screens",
  },
  {
    name: "Exposure while it runs",
    line: "Money at risk and minutes to cause, updated on the command centre.",
    screen: "Command centre",
    href: "/product#screens",
  },
  {
    name: "Replay, read only",
    line: "Prove the workflow on a closed incident without touching live systems.",
    screen: "Pilot",
    href: "/demo?type=Replay%20pilot",
  },
] as const;

export const beforeAfter = [
  {
    without: "Tabs across logs, chat and tickets",
    with: "One investigation, every source linked",
    feature: "One investigation",
  },
  {
    without: "Loudest voice picks the cause",
    with: "Causes ranked with evidence attached",
    feature: "Causes ranked by evidence",
  },
  {
    without: "Rollback from a terminal",
    with: "Named approvers before any change",
    feature: "Named approval gate",
  },
  {
    without: "Blank page for the regulator",
    with: "Draft notice from the live record",
    feature: "Audit record as you go",
  },
] as const;

/** Tools named for buyers who ask “does it fit our stack?” */
export const namedIntegrations = [
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
] as const;

export const securityFeatures = [
  {
    title: "Read only by default",
    text: "Looking at an incident never changes anything in your systems.",
  },
  {
    title: "Your data stays put",
    text: "Run Relyxus dedicated or self hosted. Evidence stays in your environment.",
  },
  {
    title: "A person approves every action",
    text: "Proposed changes wait for the approvers your policy names.",
  },
] as const;

/** Screen tour: one feature line locked to each product surface. */
export const screenFeatures: Record<string, { feature: string; line: string }> =
  {
    command: {
      feature: "Exposure while it runs",
      line: "Severity and money at risk before anything else.",
    },
    incidents: {
      feature: "One investigation",
      line: "Every active incident, owner and impact in one list.",
    },
    "war room": {
      feature: "Causes ranked by evidence",
      line: "Ranked causes with sources, and the change waiting for yes.",
    },
    approvals: {
      feature: "Named approval gate",
      line: "Every pending decision, and what the change touches.",
    },
    services: {
      feature: "One investigation",
      line: "Follow the incident to the services it hit.",
    },
  };
