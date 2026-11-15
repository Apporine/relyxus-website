// Articles shown on the homepage spotlight. Only mark an article ready once it is
// written, sourced and published at its href.
export type Article = { slug: string; title: string; topic: string; colour: string; a: string; b: string; read: string; summary: string; ready: boolean; piece: "inc" | "ai" | "aud" | "cld" };
export const articles: Article[] = [
  { slug: "the-first-hour-decides-the-fine", title: "The first hour decides the fine", topic: "Regulation", colour: "#E5482A", a: "#FF8A6B", b: "#FFC4A8", read: "8 min read", summary: "What went wrong at TSB, and what the first sixty minutes of a serious outage need to look like now.", ready: true, piece: "inc" },
  { slug: "should-ai-touch-production", title: "Should AI be allowed to touch production?", topic: "Vigil and AI", colour: "#5C4EE5", a: "#B4A9FF", b: "#9FC2F0", read: "6 min read", summary: "Only with two named people approving, a rollback ready and every step logged.", ready: false, piece: "ai" },
  { slug: "what-an-auditor-wants-after-an-outage", title: "What an auditor wants after an outage", topic: "Audit", colour: "#17694A", a: "#8FE0BC", b: "#BFE8F0", read: "6 min read", summary: "A timeline nobody edited, the evidence behind each decision and proof the fix was approved.", ready: false, piece: "aud" },
  { slug: "incident-data-inside-your-own-cloud", title: "Keeping incident data inside your own cloud", topic: "Security", colour: "#3F66B0", a: "#9FC2F0", b: "#CFE0F7", read: "5 min read", summary: "How self hosting, data residency and customer managed keys work, and what never leaves your network.", ready: false, piece: "cld" },
];
