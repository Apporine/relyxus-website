/**
 * Writes the incident-file routes into pageMeta.json and rebuilds the
 * sitemap from it, so prerendered pages always match content/incidents.ts.
 * Run with: npx tsx scripts/gen-incident-meta.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { incidentFiles } from "../client/src/content/incidents";

const metaPath = "client/src/content/pageMeta.json";
const meta = JSON.parse(readFileSync(metaPath, "utf8"));

for (const key of Object.keys(meta))
  if (key.startsWith("/resources/incidents/")) delete meta[key];

for (const file of incidentFiles) {
  meta[`/resources/incidents/${file.slug}`] = {
    title: `${file.firm}, ${file.date}: ${file.title.replace(/\.$/, "")}`,
    description: `${file.highlight} ${file.short}`,
    h1: file.title,
    body: file.summary,
  };
}
meta["/resources/incidents"].description =
  `${incidentFiles.length} production incidents at banks, cloud providers and market infrastructure, from operator, regulator and securities filing sources.`;
writeFileSync(metaPath, JSON.stringify(meta, null, 2) + "\n");

const priority = (route: string) =>
  route === "/"
    ? "1.0"
    : /^\/(product|demo|pilot|dora)$/.test(route)
      ? "0.9"
      : /^\/(privacy|terms)$/.test(route)
        ? "0.3"
        : "0.7";
const urls = Object.keys(meta)
  .map(r => `  <url><loc>${r}</loc><priority>${priority(r)}</priority></url>`)
  .join("\n");
writeFileSync(
  "client/public/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
console.log(`Wrote ${incidentFiles.length} incident routes`);
