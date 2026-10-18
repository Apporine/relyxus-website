import type { CSSProperties } from "react";

/**
 * Page-stage backgrounds. The homepage keeps SignalCore; every other page
 * picks a motif so the site does not reuse the same globe on every screen.
 */
export type StageMotif =
  | "screens"
  | "gate"
  | "ledger"
  | "radar"
  | "meter"
  | "mesh"
  | "mark"
  | "pulse";

export type StageTint = "signal" | "paper" | "dense";

export function StageVisual({
  motif,
  tint = "signal",
  className = "",
}: {
  motif: StageMotif;
  tint?: StageTint;
  className?: string;
}) {
  return (
    <div
      className={`rx-stage-visual rx-stage-visual--${motif} rx-stage-visual--${tint} ${className}`}
      aria-hidden="true"
    >
      {motif === "screens" && (
        <>
          <span className="rx-sv-frame" />
          <span className="rx-sv-scan" />
          <span className="rx-sv-grid" />
        </>
      )}
      {motif === "gate" && (
        <>
          <span className="rx-sv-rail" />
          <span className="rx-sv-gate" />
          <span className="rx-sv-lock" />
        </>
      )}
      {motif === "ledger" && (
        <>
          <span className="rx-sv-rule" />
          <span className="rx-sv-rule" />
          <span className="rx-sv-rule" />
          <span className="rx-sv-rule" />
          <span className="rx-sv-rule" />
          <span className="rx-sv-cursor" />
        </>
      )}
      {motif === "radar" && (
        <>
          <span className="rx-sv-ring" />
          <span className="rx-sv-ring" />
          <span className="rx-sv-ring" />
          <span className="rx-sv-sweep" />
          <span className="rx-sv-blip" />
        </>
      )}
      {motif === "meter" && (
        <>
          <span
            className="rx-sv-bar"
            style={{ "--h": "42%" } as CSSProperties}
          />
          <span
            className="rx-sv-bar"
            style={{ "--h": "68%" } as CSSProperties}
          />
          <span
            className="rx-sv-bar"
            style={{ "--h": "88%" } as CSSProperties}
          />
          <span
            className="rx-sv-bar"
            style={{ "--h": "55%" } as CSSProperties}
          />
          <span
            className="rx-sv-bar"
            style={{ "--h": "74%" } as CSSProperties}
          />
        </>
      )}
      {motif === "mesh" && (
        <>
          <span className="rx-sv-mesh" />
          <span className="rx-sv-drift" />
        </>
      )}
      {motif === "mark" && (
        <>
          <span className="rx-sv-cross-h" />
          <span className="rx-sv-cross-v" />
          <span className="rx-sv-dot" />
        </>
      )}
      {motif === "pulse" && (
        <>
          <span className="rx-sv-pulse" />
          <span className="rx-sv-pulse" />
          <span className="rx-sv-pulse-core" />
        </>
      )}
    </div>
  );
}
