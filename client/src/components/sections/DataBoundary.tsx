import type { CSSProperties } from "react";
import { useRevealOnce } from "@/lib/useRevealOnce";

const sources = ["Logs", "Deploys", "Alerts"] as const;

/**
 * Hero visual for Security: where evidence lives, what is read-only,
 * and what never leaves the customer boundary.
 */
export function DataBoundary() {
  const [ref, state] = useRevealOnce<HTMLDivElement>();

  return (
    <div className="data-boundary card on-console">
      <p className="data-boundary-title">Data boundary</p>
      <div className="data-boundary-stage" ref={ref} data-reveal={state}>
        <div
          className="data-boundary-env"
          style={{ "--i": 0 } as CSSProperties}
        >
          <p className="data-boundary-label">Your environment</p>

          <ul className="data-boundary-sources" aria-label="Evidence sources">
            {sources.map((name, index) => (
              <li key={name} style={{ "--i": index + 1 } as CSSProperties}>
                {name}
              </li>
            ))}
          </ul>

          <p
            className="data-boundary-flow"
            style={{ "--i": 4 } as CSSProperties}
          >
            <span className="mono">read-only</span>
          </p>

          <div
            className="data-boundary-core"
            style={{ "--i": 5 } as CSSProperties}
          >
            <strong>Relyxus</strong>
            <span>Investigate · evidence stays here</span>
          </div>

          <p
            className="data-boundary-flow"
            style={{ "--i": 6 } as CSSProperties}
          >
            <span className="mono">needs named approval</span>
          </p>

          <div
            className="data-boundary-gate"
            style={{ "--i": 7 } as CSSProperties}
          >
            <strong>Change may run</strong>
            <span>Only after your policy approvers say yes</span>
          </div>
        </div>

        <p className="data-boundary-out" style={{ "--i": 8 } as CSSProperties}>
          <span aria-hidden="true">✕</span> Shared tenancy · model training —
          not used for your incident data
        </p>
      </div>
    </div>
  );
}
