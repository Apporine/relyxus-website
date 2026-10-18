import type { ElementType } from "react";

/**
 * Headlines are display caps plus one accent phrase in Instrument Serif
 * italic, written as `*phrase*` in the copy. Copy is authored in sentence
 * case and CSS sets the caps, so screen readers read words, not letters:
 *   "Know why payments failed *before the regulator asks.*"
 */
export function parseAccent(text: string): { text: string; accent: boolean }[] {
  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map(part =>
      part.startsWith("*") && part.endsWith("*")
        ? { text: part.slice(1, -1), accent: true }
        : { text: part, accent: false }
    );
}

/** Plain text for titles, meta tags and screen reader labels. */
export const stripAccent = (text: string) => text.replaceAll("*", "");

/** Inline version: renders the accent phrase as <em> with no reveal. */
export function Accent({ text }: { text: string }) {
  return (
    <>
      {parseAccent(text).map((part, index) =>
        part.accent ? (
          <em key={index} className="rx-accent">
            {part.text}
          </em>
        ) : (
          part.text
        )
      )}
    </>
  );
}

/**
 * A headline whose parts reveal line by line (6 px blur to sharp, 12 px rise,
 * 80 ms apart) once `in` is true. With `underline`, the accent phrase gets a
 * hand drawn underline that draws in after it. It is a background image
 * rather than a positioned SVG so it follows the phrase when it wraps.
 */
export function Headline({
  as: Tag = "h2",
  text,
  in: isIn = true,
  underline = false,
  className = "",
  id,
}: {
  as?: ElementType;
  text: string;
  in?: boolean;
  underline?: boolean;
  className?: string;
  id?: string;
}) {
  const parts = parseAccent(text);
  return (
    <Tag id={id} className={`rx-headline ${isIn ? "is-in" : ""} ${className}`}>
      {parts.map((part, index) => (
        <span
          key={index}
          className="rx-line"
          style={{ "--i": index } as React.CSSProperties}
        >
          {part.accent ? (
            <em className={`rx-accent ${underline ? "rx-underlined" : ""}`}>
              {part.text}
            </em>
          ) : (
            part.text
          )}
        </span>
      ))}
    </Tag>
  );
}
