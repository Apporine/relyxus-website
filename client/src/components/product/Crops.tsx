import { Check } from "lucide-react";
import { exampleIncident as incident } from "@/content/exampleIncident";
import { ProductFrame } from "./ProductFrame";

/** Small, honest crops of the product, one per step of "How it works". */

export function EvidenceCrop() {
  return (
    <ProductFrame title="Evidence · 4 sources" size="crop">
      <ul className="crop-list">
        {incident.evidence.map(item => (
          <li key={item.text}>
            <span className="crop-source">{item.source}</span>
            <span>{item.text}</span>
            <time>{item.at}</time>
          </li>
        ))}
      </ul>
    </ProductFrame>
  );
}

export function CausesCrop() {
  return (
    <ProductFrame title="Likely causes" size="crop">
      <ol className="crop-causes">
        {incident.causes.map((cause, index) => (
          <li key={cause.name} className={index === 0 ? "is-top" : undefined}>
            <span className="cause-name">{cause.name}</span>
            <span className="cause-bar" aria-hidden="true">
              <span style={{ width: `${cause.score}%` }} />
            </span>
            <span className="cause-meta">
              {cause.score}% · {cause.sources}{" "}
              {cause.sources === 1 ? "source" : "sources"}
            </span>
          </li>
        ))}
      </ol>
    </ProductFrame>
  );
}

export function ApprovalCrop() {
  const { approval } = incident;
  return (
    <ProductFrame title="Approval · 2 of 2" size="crop">
      <p className="crop-change">{approval.change}</p>
      <ul className="crop-approvers">
        {approval.approvers.map(person => (
          <li key={person.initials}>
            <span className="avatar" aria-hidden="true">
              {person.initials}
            </span>
            <span>{person.role}</span>
            <Check size={16} aria-label="approved" className="ok" />
            <time>{person.at}</time>
          </li>
        ))}
      </ul>
      <p className="crop-foot">{approval.policy}</p>
    </ProductFrame>
  );
}

export function RecordCrop() {
  return (
    <ProductFrame title="Audit record" size="crop">
      <ol className="crop-timeline">
        {incident.record
          .filter(row => row.source !== "Slack")
          .slice(-4)
          .map(row => (
            <li key={row.at}>
              <time>{row.at}</time>
              <span>{row.text}</span>
            </li>
          ))}
      </ol>
      <p className="notice-chip">{incident.notice}</p>
    </ProductFrame>
  );
}

export const crops = {
  evidence: EvidenceCrop,
  causes: CausesCrop,
  approval: ApprovalCrop,
  record: RecordCrop,
} as const;
