import { useEffect, useState, type CSSProperties } from "react";
import { useLessMotion } from "@/lib/motion";

export type SolutionMotionKind = "evidence" | "timeline" | "exposure";

/**
 * Distinct right-side motion per Solutions team — not the same card three times.
 *  - evidence  → ranked cause nodes + linking sparks
 *  - timeline  → regulator deadline arc with sweeping hand
 *  - exposure  → climbing £ ticker + decision stamps
 */
export function SolutionMotion({
  kind,
  className = "",
  compact = false,
}: {
  kind: SolutionMotionKind;
  className?: string;
  compact?: boolean;
}) {
  const less = useLessMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (less) return;
    const id = window.setInterval(() => setTick(t => t + 1), 1200);
    return () => window.clearInterval(id);
  }, [less]);

  return (
    <div
      className={`rx-sol-motion rx-sol-motion--${kind} ${compact ? "is-compact" : ""} ${className}`}
      aria-hidden="true"
      data-tick={tick}
    >
      {kind === "evidence" && <CauseNodes tick={tick} less={less} />}
      {kind === "timeline" && <DeadlineArc tick={tick} less={less} />}
      {kind === "exposure" && <ExposureTicker tick={tick} less={less} />}
    </div>
  );
}

const causes = [
  { name: "Deploy api-gw v3.2", score: 0.86, sources: 4 },
  { name: "Card network latency", score: 0.41, sources: 2 },
  { name: "Ledger write lag", score: 0.08, sources: 1 },
] as const;

function CauseNodes({ tick, less }: { tick: number; less: boolean }) {
  const active = less ? causes.length - 1 : tick % causes.length;
  return (
    <>
      <div className="rx-sol-head">
        <span>CAUSES</span>
        <span>ranked by evidence</span>
      </div>
      <div className="rx-sol-nodes">
        <span className="rx-sol-spark" />
        <span className="rx-sol-spark rx-sol-spark-2" />
        {causes.map((cause, i) => (
          <div
            key={cause.name}
            className={`rx-sol-node ${i === active ? "is-active" : ""} ${i === 0 ? "is-top" : ""}`}
            style={
              {
                "--score": cause.score,
                "--i": i,
              } as CSSProperties
            }
          >
            <span className="rx-sol-rank">#{i + 1}</span>
            <strong>{cause.name}</strong>
            <span className="rx-sol-score">{cause.score.toFixed(2)}</span>
            <span
              className="rx-sol-ring"
              style={{ "--score": cause.score } as CSSProperties}
            />
            <span className="rx-sol-src">{cause.sources} sources</span>
          </div>
        ))}
      </div>
    </>
  );
}

const deadlines = [
  { at: "T+0", label: "Alert", done: true },
  { at: "T+35m", label: "Classified major", done: true },
  { at: "4h", label: "First notice", due: true },
  { at: "72h", label: "Intermediate" },
  { at: "1mo", label: "Final report" },
] as const;

function DeadlineArc({ tick, less }: { tick: number; less: boolean }) {
  const lit = less
    ? deadlines.length
    : Math.min(deadlines.length, 2 + (tick % 4));
  return (
    <>
      <div className="rx-sol-head">
        <span>DEADLINES</span>
        <span>drafting as it runs</span>
      </div>
      <div className="rx-sol-arc-wrap">
        <svg className="rx-sol-arc" viewBox="0 0 240 140" fill="none">
          <path
            className="rx-sol-arc-track"
            d="M20 120 A100 100 0 0 1 220 120"
          />
          <path
            className="rx-sol-arc-fill"
            d="M20 120 A100 100 0 0 1 220 120"
            style={
              {
                strokeDashoffset: less
                  ? 0
                  : 314 - (lit / deadlines.length) * 314,
              } as CSSProperties
            }
          />
          <line
            className="rx-sol-hand"
            x1="120"
            y1="120"
            x2="120"
            y2="28"
            style={
              {
                transform: `rotate(${less ? 48 : -70 + lit * 28}deg)`,
              } as CSSProperties
            }
          />
          <circle cx="120" cy="120" r="5" className="rx-sol-hub" />
        </svg>
        <ol className="rx-sol-deadlines">
          {deadlines.map((d, i) => (
            <li
              key={d.label}
              className={`${"due" in d && d.due ? "is-due" : ""} ${i < lit ? "is-lit" : ""}`}
              style={{ "--i": i } as CSSProperties}
            >
              <time>{d.at}</time>
              <span>{d.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

const stamps = [
  { who: "CTO", what: "failover yes", at: "14:41" },
  { who: "Payments Ops", what: "rollback yes", at: "14:52" },
  { who: "Board pack", what: "queued 08:00", at: "T+18h" },
] as const;

function ExposureTicker({ tick, less }: { tick: number; less: boolean }) {
  const steps = [0, 41000, 96000, 184000];
  const idx = less ? steps.length - 1 : tick % steps.length;
  const value = steps[idx];
  const shown = less ? stamps.length : Math.min(stamps.length, 1 + (tick % 3));
  return (
    <>
      <div className="rx-sol-head">
        <span>EXPOSURE</span>
        <span>while it runs</span>
      </div>
      <div className="rx-sol-money">
        <span className="rx-sol-currency">GBP at risk</span>
        <strong className="rx-sol-figure">
          £{value.toLocaleString("en-GB")}
        </strong>
        <div className="rx-sol-bars">
          {steps.slice(1).map((step, i) => (
            <span
              key={step}
              className={value >= step ? "is-on" : ""}
              style={{ "--h": `${40 + i * 22}%` } as CSSProperties}
            />
          ))}
        </div>
      </div>
      <ul className="rx-sol-stamps">
        {stamps.slice(0, shown).map((s, i) => (
          <li key={s.who} style={{ "--i": i } as CSSProperties}>
            <strong>{s.who}</strong>
            <span>{s.what}</span>
            <time>{s.at}</time>
          </li>
        ))}
      </ul>
    </>
  );
}
