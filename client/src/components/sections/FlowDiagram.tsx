import type { CSSProperties } from "react";
import { useRevealOnce } from "@/lib/useRevealOnce";

type Step = { label: string; text: string; tone?: "ok" | "wait" | "signal" };

/** Numbered flow that draws in — for Security, Pilot and Company heroes. */
export function FlowDiagram({
  title,
  steps,
}: {
  title: string;
  steps: readonly Step[];
}) {
  const [ref, state] = useRevealOnce<HTMLOListElement>();
  return (
    <div className="flow-diagram card on-console">
      <p className="flow-diagram-title">{title}</p>
      <ol className="flow-diagram-list" ref={ref} data-reveal={state}>
        {steps.map((step, index) => (
          <li
            key={step.label}
            className={step.tone ? `tone-${step.tone}` : undefined}
            style={{ "--i": index } as CSSProperties}
          >
            <span className="flow-num mono" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <strong>{step.label}</strong>
              <p>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
