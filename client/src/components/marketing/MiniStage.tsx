import type { ReactNode } from "react";
import { SignalCore } from "@/components/core/SignalCore";
import type { CoreTint } from "@/components/core/coreRenderer";
import { Headline } from "./Headline";
import { useReveal } from "@/lib/motion";

/**
 * One screen of stage: the signal core beside a display + accent headline,
 * one line and the actions. Used by every page below the homepage so the
 * same object carries the whole site.
 */
export function MiniStage({
  eyebrow,
  title,
  lede,
  clock = "T+00:00",
  status = "",
  tint = "signal",
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  clock?: string;
  status?: string;
  tint?: CoreTint;
  children?: ReactNode;
}) {
  const [ref, inView] = useReveal<HTMLElement>(0.1);
  return (
    <section
      ref={ref}
      className={`rx-ink rx-mini-stage ${inView ? "is-in" : ""}`}
      data-readout
      data-readout-clock={clock}
      data-readout-status={status}
    >
      <SignalCore className="rx-mini-core" tint={tint} radar eager />
      <div className="rx-grain" aria-hidden="true" />
      <div className="container rx-mini-copy">
        {eyebrow && <p className="rx-eyebrow rx-reveal">{eyebrow}</p>}
        <Headline as="h1" text={title} in={inView} underline />
        {lede && (
          <p
            className="rx-mini-lede rx-reveal"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {lede}
          </p>
        )}
        {children && (
          <div
            className="rx-mini-actions rx-reveal"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
