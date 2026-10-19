import type { CSSProperties } from "react";
import { useRevealOnce } from "@/lib/useRevealOnce";

type Row = { at: string; text: string; highlight?: boolean };

/** Compact incident timeline that draws in — for Resources and hero visuals. */
export function TimelineDiagram({
  title,
  rows,
  gapLabel,
}: {
  title: string;
  rows: readonly Row[];
  gapLabel?: string;
}) {
  const [ref, state] = useRevealOnce<HTMLOListElement>();
  return (
    <div className="timeline-diagram card on-console">
      <p className="timeline-diagram-title">{title}</p>
      {gapLabel && <p className="timeline-gap">{gapLabel}</p>}
      <ol className="timeline-diagram-list" ref={ref} data-reveal={state}>
        {rows.map((row, index) => (
          <li
            key={`${row.at}-${row.text}`}
            className={row.highlight ? "is-gap" : undefined}
            style={{ "--i": index } as CSSProperties}
          >
            <time className="mono">{row.at}</time>
            <span>{row.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
