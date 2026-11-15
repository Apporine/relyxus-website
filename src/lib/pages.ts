// Inner pages are built from the approved design files in src/pagedata, the
// same files the Figma exports were made from, so every size and position
// matches. This module turns their static buttons into working links and
// adds the anchors the navbar and footer point at.

const files = import.meta.glob("../pagedata/*.html", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

const LIVE_DEMO = (import.meta.env.PUBLIC_LIVE_DEMO_URL as string | undefined) || "/demo#live";
const mail = (subject: string) => `mailto:support@relyxus.com?subject=${encodeURIComponent(subject)}`;

// Where each button goes. "ask:" opens Vigil with that question.
const LINKS: Record<string, string> = {
  "Book a demo": "/demo#book",
  "Book a demo with my stack": "/demo#book",
  "Book a security call": "/demo#book",
  "Apply to be a founding partner": "ask:I'd like to be a founding partner",
  "Get your quote": "ask:Get a quote",
  "Request a connector": "ask:I'd like to request a connector",
  "Ask about a connector": "ask:Do you have a connector for our tool?",
  "Download the procurement pack": mail("Procurement pack request"),
  "Download the security pack": mail("Security pack request"),
  "Request documents": mail("Trust Center documents request"),
  "Open the deadline calculator": "/deadline-calculator",
  "Open the live demo": LIVE_DEMO,
  "Replay my outage free": "/replay#send",
  "Replay one of your outages": "/replay",
  "Visit the Trust Center": "/trust",
  "See a sample report": "/reporting#board",
  "See every deadline we track": "/incident-reporting-rules",
  "See your contract clocks": "#clocks",
  "Watch one night in Relyxus": "/#one-night",
  "Meet Vigil": "/vigil",
  "See reporting and resilience": "/reporting",
};

// Anchors the menus use that the design files do not carry yet.
const IDS: Record<string, [string, string][]> = {
  vigil: [['aria-label="Ranked causes"', "evidence"]],
  saas: [['aria-label="Contract clocks"', "clocks"]],
  demo: [['aria-label="Live demo"', "live"]],
  replay: [['aria-label="What we need"', "send"]],
  trust: [['aria-label="Security, privacy and AI"', "security"], ['aria-label="Responsible AI"', "ai"], ['aria-label="Controls"', "controls"], ['aria-label="Audit log"', "audit"], ['aria-label="Resilience"', "trust-resilience"]],
};

// Phone and tablet: the designs are drawn at 1440 px. Below 1024 px every
// multi column grid becomes one column (small icon or label columns stay),
// big type scales with the screen and wide fixed boxes fit the screen.
function keepGrid(v: string, sel = ""): boolean {
  const t = v.trim();
  if (/cal|-sl\b|dots|seats|bars?\b|week/.test(sel)) return true;
  const parts = t.replace(/minmax\([^)]*\)/g, "1fr").replace(/repeat\((\d+),[^)]*\)/g, (_m, n) => Array(+n).fill("1fr").join(" ")).split(/\s+/);
  if (parts.length < 2) return true;
  const fr = parts.filter((x) => /fr$/.test(x)).length, px = parts.filter((x) => /px$/.test(x)).reduce((a, x) => a + parseFloat(x), 0);
  if (fr <= 1 && px <= 170) return true;
  if (fr <= 1 && parts.every((x) => /fr$|auto/.test(x))) return true;
  return false;
}
const fluid = (n: number) => `clamp(${Math.round(n * 0.52)}px,${(n / 14.4).toFixed(3)}vw,${n}px)`;

export function fit(css: string): string {
  const phone: string[] = [];
  const out = css.replace(/([^{}@]+)\{([^{}]*)\}/g, (all, sel: string, body: string) => {
    const extra: string[] = [];
    const g = body.match(/grid-template-columns:([^;}]+)/);
    if (g && !keepGrid(g[1].replace(/!important/, ""), sel)) extra.push("grid-template-columns:minmax(0,1fr)!important");
    const w = body.match(/(?:^|;)\s*width:(\d+)px/);
    if (w && +w[1] >= 360) extra.push("max-width:100%!important");
    const mh = body.match(/min-height:(\d+)px/);
    if (mh && +mh[1] >= 480) extra.push("min-height:0!important");
    if (extra.length) phone.push(`${sel.trim()}{${extra.join(";")}}`);
    return `${sel}{${body.replace(/font-size:(\d+(?:\.\d+)?)px/g, (m, n) => (+n >= 40 ? `font-size:${fluid(+n)}` : m))}}`;
  });
  return out + (phone.length ? `\n@media (max-width:1023px){${phone.join("\n")}}` : "");
}

function fitHtml(html: string): string {
  html = html.replace(/<style>([\s\S]*?)<\/style>/g, (_m, css) => `<style>${fit(css)}</style>`);
  return html.replace(/<([a-z0-9]+)([^>]*?)style="([^"]*)"([^>]*)>/g, (all, tag, a, st: string, b) => {
    let style = st.replace(/font-size:(\d+(?:\.\d+)?)px/g, (m, n) => (+n >= 40 ? `font-size:${fluid(+n)}` : m));
    const g = style.match(/grid-template-columns:([^;]+)/);
    let attrs = a + b;
    if (g && !keepGrid(g[1])) attrs = /class="/.test(attrs) ? attrs.replace(/class="/, 'class="pg-1 ') : attrs + ' class="pg-1"';
    return `<${tag}${attrs} style="${style}">`;
  });
}

export type Page = { title: string; head: string; rest: string };

export function page(slug: string): Page {
  const key = Object.keys(files).find((k) => k.endsWith(`/${slug}.html`));
  if (!key) throw new Error(`No design file for ${slug}`);
  let html = files[key];
  const title = html.match(/<!--\s*title:\s*(.*?)\s*-->/)?.[1] ?? "Relyxus";
  html = html.replace(/<!--\s*title:.*?-->\s*/, "");
  html = html.replace(/src="media\//g, 'src="/media/');
  for (const [marker, id] of IDS[slug] || []) html = html.replace(marker, `${marker} id="${id}"`);
  html = html.replace(/<span class="(b1|b2|lk)"([^>]*)>([^<]+)<\/span>/g, (all, cls, attrs, text) => {
    const to = LINKS[text.trim()];
    if (!to) return all;
    if (to.startsWith("ask:")) return `<a class="${cls}"${attrs} href="/demo#book" data-ask="${to.slice(4)}">${text}</a>`;
    return `<a class="${cls}"${attrs} href="${to}">${text}</a>`;
  });
  if (slug === "trust") {
    const to = ["promises", "security", "your-data", "ai", "controls", "audit", "compliance", "trust-resilience", "documents", "disclosure"];
    let i = 0;
    html = html.replace(/<div class="pbar">([\s\S]*?)<\/div>/, (_, inner: string) => `<nav class="pbar" aria-label="On this page">${inner.replace(/<span>([^<]+)<\/span>/g, (_a: string, t: string) => `<a href="#${to[i++]}">${t}</a>`)}</nav>`);
  }
  html = fitHtml(html);
  const m = html.match(/<section[^>]*>/);
  if (!m || m.index === undefined) throw new Error(`No section in ${slug}`);
  const cut = m.index + m[0].length;
  return { title, head: html.slice(0, cut), rest: html.slice(cut) };
}
