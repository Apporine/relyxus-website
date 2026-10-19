import type { CSSProperties } from "react";
import { useRevealOnce } from "@/lib/useRevealOnce";

export type Bar = { label: string; value: number; note?: string };

/** Cause-score bars that draw in once — EcoOnline-style chart motion. */
export function DrawBars({
  title,
  bars,
  max = 1,
}: {
  title?: string;
  bars: readonly Bar[];
  max?: number;
}) {
  const [ref, state] = useRevealOnce<HTMLDivElement>();
  return (
    <div className="draw-bars card" ref={ref} data-reveal={state}>
      {title && <p className="card-label">{title}</p>}
      <ol className="draw-bars-list">
        {bars.map((bar, index) => (
          <li key={bar.label} style={{ "--i": index } as CSSProperties}>
            <div className="draw-bars-meta">
              <strong>{bar.label}</strong>
              <span className="mono">{bar.value.toFixed(2)}</span>
            </div>
            <div className="draw-bars-track" aria-hidden="true">
              <span
                className="draw-bars-fill"
                style={
                  {
                    "--w": `${Math.round((bar.value / max) * 100)}%`,
                  } as CSSProperties
                }
              />
            </div>
            {bar.note && <p className="small muted">{bar.note}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}
