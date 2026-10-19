/**
 * Mixed-font headlines: wrap one phrase in *asterisks* for Instrument Serif
 * italic (Apporine-style contrast inside a single sentence).
 */
export function parseAccent(text: string): { text: string; accent: boolean }[] {
  const parts: { text: string; accent: boolean }[] = [];
  const re = /\*([^*]+)\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    if (match.index > last) {
      parts.push({ text: text.slice(last, match.index), accent: false });
    }
    parts.push({ text: match[1], accent: true });
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), accent: false });
  return parts.length ? parts : [{ text, accent: false }];
}

export const stripAccent = (text: string) => text.replaceAll("*", "");

export function Accent({ text }: { text: string }) {
  return (
    <>
      {parseAccent(text).map((part, index) =>
        part.accent ? (
          <em key={index} className="accent-phrase">
            {part.text}
          </em>
        ) : (
          <span key={index}>{part.text}</span>
        )
      )}
    </>
  );
}
