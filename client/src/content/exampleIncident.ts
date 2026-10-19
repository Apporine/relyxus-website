/**
 * INC-2207, the example incident behind every product crop on the site. It
 * is deliberately a little untidy (a three-minute gap while someone finds the
 * runbook, a typo in chat) because real incidents are. Shown as a product
 * preview, built from the Relyxus interface, never as a customer incident.
 */
export const exampleIncident = {
  ref: "INC-2207",
  title: "Card declines, UK debit",
  severity: "SEV1",
  record: [
    { at: "14:02:11", source: "GitHub", text: "Deploy api-gw v3.2 rolled out" },
    {
      at: "14:05:12",
      source: "PagerDuty",
      text: "Card declines up 8×, SEV1 opened",
    },
    {
      at: "14:08:47",
      source: "Slack",
      text: "M. Khan: “found the runbok, joining the bridge”",
    },
    {
      at: "14:11:40",
      source: "Relyxus",
      text: "Likely cause: api-gw v3.2 (3 sources)",
      callout: "Cause #1, 3 sources attached",
      highlight: true,
    },
    {
      at: "14:26:08",
      source: "Approvals",
      text: "Rollback to v3.1 approved, 2 of 2",
      callout: "2 of 2 named approvers",
    },
    {
      at: "14:31:02",
      source: "Datadog",
      text: "Error rate back to baseline",
    },
  ],
  notice: "DORA first notice: draft ready",
  noticeCallout: "Draft ready at 14:33, inside the 4 hour window",
  evidence: [
    {
      source: "GitHub",
      at: "14:02",
      text: "Deploy api-gw v3.2, pool size 64 → 16",
    },
    { source: "Datadog", at: "14:04", text: "api-gw 502s ×412 in 60 s" },
    { source: "PagerDuty", at: "14:05", text: "Declines up 8× on UK debit" },
    { source: "Splunk", at: "14:06", text: "Router timeouts on the card path" },
  ],
  causes: [
    { name: "Deploy api-gw v3.2", score: 86, sources: 3 },
    { name: "Card network latency", score: 41, sources: 2 },
    { name: "Ledger write lag", score: 8, sources: 1 },
  ],
  approval: {
    change: "Rollback api-gw v3.2 → v3.1",
    policy: "Policy PAY-2: two approvers, proposer excluded",
    approvers: [
      { initials: "PO", role: "Head of Payments Ops", at: "14:24:51" },
      { initials: "IL", role: "Incident lead", at: "14:26:08" },
    ],
    verify: "Verify: 5xx under 0.5% for 5 minutes",
  },
} as const;
