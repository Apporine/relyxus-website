import type { CSSProperties } from "react";
import { Check, FileText, Lock, X } from "lucide-react";
import { securityCommitments } from "@/content/product";
import { exampleIncident as incident } from "@/content/exampleIncident";
import { useRevealOnce } from "@/lib/useRevealOnce";

type Visual = (typeof securityCommitments)[number]["visual"];

const at = (i: number) => ({ "--i": i }) as CSSProperties;

/** Read ticks in per source; write stays locked. */
function AccessVisual() {
  return (
    <div className="cv cv-access" aria-hidden="true">
      <span className="cv-scan" />
      {["Datadog", "GitHub", "PagerDuty"].map((tool, i) => (
        <div className="cv-access-row" key={tool}>
          <span className="cv-tool">{tool}</span>
          <span className="cv-perm cv-perm-read" style={at(i)}>
            <Check size={12} /> read
          </span>
          <span className="cv-perm cv-perm-write">
            <Lock size={12} /> write
          </span>
        </div>
      ))}
    </div>
  );
}

/** Evidence flows to Relyxus inside the boundary; one packet stops at the edge. */
function BoundaryVisual() {
  return (
    <div className="cv cv-boundary" aria-hidden="true">
      <p className="cv-boundary-label">Your environment</p>
      <div className="cv-boundary-lanes">
        {["Logs", "Deploys", "Alerts"].map((name, i) => (
          <div className="cv-lane" key={name}>
            <span className="cv-chip">{name}</span>
            <span className="cv-track">
              <span className="cv-dot" style={at(i)} />
            </span>
          </div>
        ))}
      </div>
      <span className="cv-node">Relyxus</span>
      <span className="cv-escape">
        <span className="cv-dot cv-dot-out" />
        <span className="cv-block">
          <X size={12} />
        </span>
      </span>
    </div>
  );
}

/** Two named approvers sign off, then the change runs under policy. */
function ApprovalVisual() {
  const { approval } = incident;
  return (
    <div className="cv cv-approval" aria-hidden="true">
      <p className="cv-change mono">{approval.change}</p>
      {approval.approvers.map((person, i) => (
        <div className="cv-approver" key={person.initials} style={at(i)}>
          <span className="cv-avatar">{person.initials}</span>
          <span className="cv-role">{person.role}</span>
          <span className="cv-state">
            <span className="cv-pending">waiting</span>
            <span className="cv-done">
              <Check size={12} /> approved
            </span>
          </span>
        </div>
      ))}
      <span className="cv-runs">Rollback runs under PAY-2</span>
    </div>
  );
}

/** Honest status only: what the pack covers, and a certification in progress. */
function AssuranceVisual() {
  return (
    <div className="cv cv-assurance" aria-hidden="true">
      <div className="cv-pack">
        <FileText size={18} />
        <span>Security pack</span>
      </div>
      {[
        "Data flows and identity",
        "AI data handling",
        "Status and target dates",
      ].map((item, i) => (
        <p className="cv-pack-item" key={item} style={at(i)}>
          <Check size={12} /> {item}
        </p>
      ))}
      <span className="cv-progress">
        <span className="cv-pulse" /> Certification in progress
      </span>
    </div>
  );
}

const visuals: Record<Visual, () => React.JSX.Element> = {
  access: AccessVisual,
  boundary: BoundaryVisual,
  approval: ApprovalVisual,
  assurance: AssuranceVisual,
};

/** Each commitment proved by a small, looping product moment, not a paragraph. */
export function Commitments() {
  const [ref, state] = useRevealOnce<HTMLUListElement>();
  return (
    <ul className="commit-grid" ref={ref} data-reveal={state}>
      {securityCommitments.map((item, index) => {
        const Visual = visuals[item.visual];
        const inPlace = item.status === "in-place";
        return (
          <li key={item.title} className="commit-card" style={at(index)}>
            <div
              className={`commit-stage commit-stage-${index % 2 ? "b" : "a"}`}
            >
              <Visual />
            </div>
            <div className="commit-copy">
              <span
                className={`commit-status ${inPlace ? "is-in-place" : "is-in-progress"}`}
              >
                <span className="commit-status-dot" aria-hidden="true" />
                {inPlace ? "In place" : "In progress"}
              </span>
              <h3>{item.title}</h3>
              <p className="muted">{item.text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
