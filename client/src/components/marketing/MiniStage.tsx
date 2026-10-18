import type { CSSProperties, ReactNode } from "react";
import { Headline } from "./Headline";
import { StageVisual, type StageMotif, type StageTint } from "./StageVisual";
import { SolutionMotion, type SolutionMotionKind } from "./SolutionMotion";
import { useReveal } from "@/lib/motion";

/**
 * One screen of stage above an inner page. Motif varies by page so the
 * homepage SignalCore is not repeated. Solutions pass a distinct motion
 * kind per team (not a shared card).
 */
export function MiniStage({
  eyebrow,
  title,
  lede,
  clock = "T+00:00",
  status = "",
  tint = "signal",
  visual = "mesh",
  solutionMotion,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  clock?: string;
  status?: string;
  tint?: StageTint;
  visual?: StageMotif;
  /** Solutions-only: distinct animated panel per team. */
  solutionMotion?: SolutionMotionKind;
  children?: ReactNode;
}) {
  const [ref, inView] = useReveal<HTMLElement>(0.1);
  return (
    <section
      ref={ref}
      className={`rx-ink rx-mini-stage ${solutionMotion ? "has-feed" : ""} ${inView ? "is-in" : ""}`}
      data-readout
      data-readout-clock={clock}
      data-readout-status={status}
    >
      {solutionMotion ? (
        <SolutionMotion kind={solutionMotion} className="rx-mini-feed" />
      ) : (
        <StageVisual motif={visual} tint={tint} className="rx-mini-core" />
      )}
      <div className="rx-grain" aria-hidden="true" />
      <div className="container rx-mini-copy">
        {eyebrow && <p className="rx-eyebrow rx-reveal">{eyebrow}</p>}
        <Headline as="h1" text={title} in={inView} underline />
        {lede && (
          <p
            className="rx-mini-lede rx-reveal"
            style={{ "--i": 2 } as CSSProperties}
          >
            {lede}
          </p>
        )}
        {children && (
          <div
            className="rx-mini-actions rx-reveal"
            style={{ "--i": 3 } as CSSProperties}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
