/**
 * Writes one static HTML file per public route into dist/public so search
 * engines and link previews get a real title, description and text before any
 * JavaScript runs. React replaces the placeholder content when it mounts.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dist = path.resolve(import.meta.dirname, "../dist/public");
const siteUrl = (process.env.SITE_URL ?? "").replace(/\/$/, "");
const image = `${siteUrl}/og-cover.png`;

const pages = [
  {
    path: "/",
    title:
      "Relyxus | Find the cause of an incident, with every step on the record",
    description:
      "Relyxus pulls evidence from your existing tools into one investigation for incident, SRE and resilience teams. Nothing runs until the right people approve it.",
    h1: "Find the cause of a payments incident, with every step on the record.",
    body: "Relyxus pulls evidence from the tools you already run into one investigation. Nothing changes in your systems until the right people approve it.",
  },
  {
    path: "/product",
    title: "Product | Relyxus",
    description:
      "One investigation per incident, an approval step before any change, and a record ready for audit.",
    h1: "From first alert to a record you can hand to audit",
    body: "One investigation per incident. A person approves every change. The write-up is half done before the incident closes.",
  },
  {
    path: "/security",
    title: "Security | Relyxus",
    description:
      "Read-only by default, your data stays in your environment, and a person approves every action. Request the security pack for detail.",
    h1: "Made for your security review",
    body: "Read-only by default. Your data stays in your environment. A person approves every action. Request the security pack for the detail.",
  },
  {
    path: "/solutions/financial-services",
    title: "Financial services | Relyxus",
    description:
      "Help engineering and resilience teams at regulated financial firms find the cause of a payments incident and keep every step on the record.",
    h1: "When a payment fails, the whole firm is asking why",
    body: "Engineering needs the cause. Resilience needs the record. Relyxus gives both the same evidence.",
  },
  {
    path: "/resources",
    title: "Resources | Relyxus",
    description:
      "Short reads for incident, SRE and resilience teams at regulated firms.",
    h1: "Short reads for teams who run incidents",
    body: "One guide you can read now, and two we share when you start an evaluation.",
  },
  {
    path: "/resources/what-makes-incident-response-controlled",
    title: "What makes incident response controlled? | Relyxus",
    description:
      "A good incident workflow keeps a clear line between what the evidence suggests and what a person is allowed to change.",
    h1: "What makes incident response controlled?",
    body: "A good incident workflow keeps a clear line between what the evidence suggests and what a person is allowed to change.",
  },
  {
    path: "/demo",
    title: "Request a demo | Relyxus",
    description:
      "Request a Relyxus demo, Replay pilot, security pack, readiness checklist or pricing conversation.",
    h1: "Tell us what you want to explore",
    body: "Share a little context about your team and we will follow up.",
  },
  {
    path: "/company",
    title: "Company | Relyxus",
    description:
      "Relyxus is built by Apporine for incident, SRE and resilience teams at regulated firms.",
    h1: "We build Relyxus at Apporine",
    body: "We make incident response easier to explain, for the teams who have to explain it.",
  },
  {
    path: "/contact",
    title: "Contact | Relyxus",
    description:
      "Talk to the Relyxus team about a demo, a Replay pilot, the security pack or pricing.",
    h1: "Talk to the people behind Relyxus",
    body: "Use the enquiry form to start a conversation with the team.",
  },
  {
    path: "/privacy",
    title: "Privacy policy | Relyxus",
    description: "How Relyxus handles enquiry and website data.",
    h1: "Privacy policy",
    body: "How Relyxus handles enquiry and website data.",
  },
  {
    path: "/terms",
    title: "Terms | Relyxus",
    description: "Terms for using the Relyxus website.",
    h1: "Terms",
    body: "Terms for using the Relyxus website.",
  },
  {
    path: "/accessibility",
    title: "Accessibility | Relyxus",
    description: "The accessibility approach for the Relyxus website.",
    h1: "Accessibility",
    body: "The accessibility approach for the Relyxus website.",
  },
];

const esc = value =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const nav = [
  ["/product", "Product"],
  ["/security", "Security"],
  ["/solutions/financial-services", "Financial services"],
  ["/resources", "Resources"],
  ["/company", "Company"],
  ["/demo", "Request a demo"],
]
  .map(([href, label]) => `<a href="${href}">${label}</a>`)
  .join(" ");

const template = await readFile(path.join(dist, "index.html"), "utf8");

function setMeta(html, attr, key, content) {
  const pattern = new RegExp(`(<meta ${attr}="${key}"\s+content=")[^"]*(")`);
  return pattern.test(html)
    ? html.replace(pattern, `$1${esc(content)}$2`)
    : html;
}

for (const page of pages) {
  let html = template;
  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${esc(page.title)}</title>`
  );
  html = setMeta(html, "name", "description", page.description);
  html = setMeta(html, "property", "og:title", page.title);
  html = setMeta(html, "property", "og:description", page.description);
  html = setMeta(html, "name", "twitter:title", page.title);
  html = setMeta(html, "name", "twitter:description", page.description);
  html = setMeta(html, "property", "og:image", image);
  html = setMeta(html, "name", "twitter:image", image);
  const canonical = `<link rel="canonical" href="${siteUrl}${page.path}" />`;
  html = html.replace("</head>", `    ${canonical}\n  </head>`);
  const content = `<div id="root"><div style="max-width:720px;margin:0 auto;padding:96px 24px;color:#f4f6fb;font-family:Inter,system-ui,sans-serif"><p>${nav}</p><h1>${esc(page.h1)}</h1><p>${esc(page.body)}</p></div></div>`;
  html = html.replace('<div id="root"></div>', content);
  const dir = path.join(dist, page.path);
  if (page.path !== "/") await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), html);
}
console.log(`Prerendered ${pages.length} routes`);
