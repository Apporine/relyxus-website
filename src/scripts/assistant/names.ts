// Speech engines do not know the word Relyxus, so they write the nearest
// English word ("relaxes", "relax us", "relics us"). Every transcript passes
// through here before Vigil reads it or shows it.

const MISHEARD = [
  /\brel+ax(?:es|is|us|as|uss)\b/gi,
  /\brelax\s+(?:us|is|as)\b/gi,
  /\brel+i[cx]s?\s*(?:us|is|as)\b/gi,
  /\brelics?\s+us\b/gi,
  /\breli(?:xis|xes|xus|xas|ksis|kses|ccess|access)\b/gi,
  /\brel+y?(?:xis|xes|xus|kses|ksus)\b/gi,
  /\breal\s*ix\s*us\b/gi,
  /\breflexes\b(?=.{0,40}\b(incident|outage|bank|demo|vigil|platform|price|pricing|product)\b)/gi,
];

export function fixNames(text: string): string {
  let t = text;
  for (const re of MISHEARD) t = t.replace(re, "Relyxus");
  return t.replace(/\bvigil\b/gi, "Vigil");
}
