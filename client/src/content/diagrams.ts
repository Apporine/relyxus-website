/**
 * Dotted flow diagrams beside the "bad night" stories and the DORA log.
 * Coordinates are in a 600-wide viewBox; nodes are centred on x, y. Red
 * marks the slow path from the story, lime the path Relyxus gives you.
 */
export type DiagramTone = "plain" | "muted" | "alert" | "signal";

export type DiagramNode = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  tone?: DiagramTone;
};

export type Diagram = {
  title: string;
  caption: string;
  height: number;
  nodes: readonly DiagramNode[];
  edges: readonly { from: string; to: string; tone?: DiagramTone }[];
};

export const nightDiagrams: Record<string, Diagram> = {
  engineering: {
    title: "Five tabs, three theories, one deploy",
    caption:
      "The deploy was on screen from 14:02. Relyxus puts it beside the alert from the first minute.",
    height: 360,
    nodes: [
      { id: "alert", label: "Alert fires", sub: "PagerDuty", x: 100, y: 50 },
      {
        id: "dash",
        label: "Two dashboards",
        sub: "errors, latency",
        x: 100,
        y: 130,
      },
      {
        id: "deploy",
        label: "Deploy log",
        sub: "api-gw v3.2, 14:02",
        x: 100,
        y: 210,
      },
      {
        id: "slack",
        label: "Slack thread",
        sub: "three theories",
        x: 100,
        y: 290,
      },
      {
        id: "guess",
        label: "Loudest theory",
        sub: "40 minutes lost",
        x: 310,
        y: 130,
        tone: "alert",
      },
      {
        id: "cause",
        label: "It was the deploy",
        sub: "found last",
        x: 505,
        y: 130,
        tone: "muted",
      },
      {
        id: "relyxus",
        label: "Ranked first",
        sub: "3 sources attached",
        x: 505,
        y: 250,
        tone: "signal",
      },
    ],
    edges: [
      { from: "alert", to: "guess", tone: "muted" },
      { from: "dash", to: "guess", tone: "muted" },
      { from: "slack", to: "guess", tone: "muted" },
      { from: "guess", to: "cause", tone: "alert" },
      { from: "deploy", to: "relyxus", tone: "signal" },
      { from: "alert", to: "relyxus", tone: "signal" },
    ],
  },
  resilience: {
    title: "Where the timeline lives at T+2 hours",
    caption:
      "Evidence scattered across chat, calls and memory. Relyxus records each step as it happens, so the notice starts as a draft.",
    height: 360,
    nodes: [
      { id: "slack", label: "Slack scrollback", sub: "partial", x: 100, y: 60 },
      {
        id: "bridge",
        label: "Bridge call",
        sub: "not recorded",
        x: 100,
        y: 150,
      },
      {
        id: "memory",
        label: "Three memories",
        sub: "engineers on call",
        x: 100,
        y: 240,
      },
      {
        id: "shots",
        label: "Screenshots",
        sub: "pasted by hand",
        x: 310,
        y: 105,
        tone: "alert",
      },
      {
        id: "notice",
        label: "First notice",
        sub: "due at T+4h",
        x: 505,
        y: 105,
        tone: "muted",
      },
      {
        id: "record",
        label: "Relyxus record",
        sub: "timestamped, attributed",
        x: 310,
        y: 300,
        tone: "signal",
      },
      {
        id: "draft",
        label: "Notice draft",
        sub: "ready for review",
        x: 505,
        y: 300,
        tone: "signal",
      },
    ],
    edges: [
      { from: "slack", to: "shots", tone: "muted" },
      { from: "bridge", to: "shots", tone: "muted" },
      { from: "memory", to: "shots", tone: "muted" },
      { from: "shots", to: "notice", tone: "alert" },
      { from: "bridge", to: "record", tone: "signal" },
      { from: "memory", to: "record", tone: "signal" },
      { from: "record", to: "draft", tone: "signal" },
    ],
  },
  leadership: {
    title: "From 23:00 to the 08:00 board question",
    caption:
      "The decision not to roll back was made on the bridge and never written down. Relyxus logs who decided, when, and on what evidence.",
    height: 360,
    nodes: [
      {
        id: "fail",
        label: "23:00 Payments failing",
        sub: "how many, how much?",
        x: 115,
        y: 70,
        tone: "alert",
      },
      {
        id: "bridge",
        label: "Bridge call",
        sub: "one more voice",
        x: 310,
        y: 70,
      },
      {
        id: "decide",
        label: "Hold the rollback",
        sub: "decided verbally",
        x: 500,
        y: 70,
      },
      {
        id: "board",
        label: "08:00 Board asks",
        sub: "who decided?",
        x: 500,
        y: 290,
        tone: "alert",
      },
      {
        id: "centre",
        label: "Command Centre",
        sub: "money at risk, live",
        x: 115,
        y: 290,
        tone: "signal",
      },
      {
        id: "log",
        label: "Decision log",
        sub: "name, time, evidence",
        x: 310,
        y: 290,
        tone: "signal",
      },
    ],
    edges: [
      { from: "fail", to: "bridge", tone: "muted" },
      { from: "bridge", to: "decide", tone: "muted" },
      { from: "decide", to: "board", tone: "alert" },
      { from: "fail", to: "centre", tone: "signal" },
      { from: "centre", to: "log", tone: "signal" },
      { from: "decide", to: "log", tone: "signal" },
      { from: "log", to: "board", tone: "signal" },
    ],
  },
};

export const doraLogDiagram: Diagram = {
  title: "One log, three reports",
  caption:
    "Capture each entry as it happens. Every DORA stage is then a summary of the same log.",
  height: 400,
  nodes: [
    { id: "detect", label: "Detection time", x: 105, y: 50 },
    {
      id: "classify",
      label: "Classification",
      sub: "and who decided",
      x: 105,
      y: 125,
    },
    {
      id: "cause",
      label: "Working cause",
      sub: "and its evidence",
      x: 105,
      y: 200,
    },
    {
      id: "actions",
      label: "Actions",
      sub: "and their approvers",
      x: 105,
      y: 275,
    },
    {
      id: "comms",
      label: "Communications",
      sub: "customers, regulator",
      x: 105,
      y: 350,
    },
    {
      id: "log",
      label: "The running log",
      sub: "from the first alert",
      x: 310,
      y: 200,
      tone: "signal",
    },
    {
      id: "initial",
      label: "Initial notice",
      sub: "within 4 hours",
      x: 505,
      y: 105,
    },
    {
      id: "inter",
      label: "Intermediate report",
      sub: "within 72 hours",
      x: 505,
      y: 200,
    },
    {
      id: "final",
      label: "Final report",
      sub: "within 1 month",
      x: 505,
      y: 295,
    },
  ],
  edges: [
    { from: "detect", to: "log", tone: "muted" },
    { from: "classify", to: "log", tone: "muted" },
    { from: "cause", to: "log", tone: "muted" },
    { from: "actions", to: "log", tone: "muted" },
    { from: "comms", to: "log", tone: "muted" },
    { from: "log", to: "initial", tone: "signal" },
    { from: "log", to: "inter", tone: "signal" },
    { from: "log", to: "final", tone: "signal" },
  ],
};
