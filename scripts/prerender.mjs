/**
 * Writes one static HTML file per public route into dist/public so search
 * engines and link previews get a real title, description and text before any
 * JavaScript runs. React replaces the placeholder content when it mounts.
 * Copy comes from client/src/content/pageMeta.json, shared with the pages.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dist = path.resolve(import.meta.dirname, "../dist/public");
// SITE_URL wins; on Vercel fall back to the production domain it exposes.
const siteUrl = (
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "")
).replace(/\/$/, "");
const image = `${siteUrl}/og-cover.png`;

const meta = JSON.parse(
  await readFile(
    path.resolve(import.meta.dirname, "../client/src/content/pageMeta.json"),
    "utf8"
  )
);
const pages = Object.entries(meta).map(([route, copy]) => ({
  path: route,
  title: `${copy.title} | Relyxus`,
  description: copy.description,
  h1: copy.h1,
  body: copy.body,
}));

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
  const pattern = new RegExp(
    String.raw`(<meta\s+${attr}="${key}"\s+content=")[^"]*(")`
  );
  return pattern.test(html)
    ? html.replace(pattern, `$1${esc(content)}$2`)
    : html;
}

for (const page of pages) {
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, "<title>relyxus</title>");
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
