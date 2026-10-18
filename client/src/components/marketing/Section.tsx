import type { ReactNode } from "react";
import { Headline } from "./Headline";
import { useReveal } from "@/lib/motion";

/**
 * A page section after the stage: one idea, a display + accent headline,
 * at most one line under it, then its diagram or content. Paper by default,
 * since inner pages resolve from the ink stage to paper.
 */
export function Section({
  title,
  sub,
  ground = "paper",
  id,
  clock,
  status,
  className = "",
  children,
}: {
  title: string;
  sub?: ReactNode;
  ground?: "paper" | "ink";
  id?: string;
  clock?: string;
  status?: string;
  className?: string;
  children?: ReactNode;
}) {
  const [ref, inView] = useReveal<HTMLElement>(0.15);
  return (
    <section
      ref={ref}
      id={id}
      className={`rx-${ground} rx-section ${inView ? "is-in" : ""} ${className}`}
      data-readout={clock ? "" : undefined}
      data-readout-clock={clock}
      data-readout-status={status}
    >
      <div className="container">
        <Headline text={title} in={inView} />
        {sub && (
          <p
            className="rx-section-sub rx-reveal"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {sub}
          </p>
        )}
        {children && (
          <div
            className="rx-section-body rx-reveal"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
