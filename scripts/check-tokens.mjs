/**
 * Fails if a raw colour (hex, rgb, hsl) appears in client/src outside
 * styles/tokens.css. Colours belong in tokens; everything else uses var().
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../client/src");
const allowed = new Set([path.join(root, "styles", "tokens.css")]);

const cssColour = /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?)\(/i;
// In scripts, only flag hex inside a string, so "#bad-night" anchors pass.
const scriptColour =
  /["'`\s(]#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})["'`;\s)]|\b(?:rgba?|hsla?)\(/i;

async function* files(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* files(full);
    else if (/\.(css|tsx?)$/.test(entry.name)) yield full;
  }
}

const problems = [];
for await (const file of files(root)) {
  if (allowed.has(file)) continue;
  const pattern = file.endsWith(".css") ? cssColour : scriptColour;
  const lines = (await readFile(file, "utf8")).split("\n");
  lines.forEach((line, index) => {
    if (pattern.test(line))
      problems.push(
        `${path.relative(root, file)}:${index + 1}  ${line.trim()}`
      );
  });
}

if (problems.length) {
  console.error(
    "Raw colours outside styles/tokens.css:\n" + problems.join("\n")
  );
  process.exit(1);
}
console.log("Tokens check passed: no raw colours outside tokens.css");
