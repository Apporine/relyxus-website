import type { IncidentFile } from "@/content/incidents";

/**
 * Stands in for a logo, which we never use for these firms: the region, and
 * how strong the evidence is. A+ is first-party, regulator or securities
 * filing; B is a credible relay without a full primary report.
 */
export function IncidentMark({ file }: { file: IncidentFile }) {
  return (
    <span
      className={`incident-mark tier-${file.tier === "A+" ? "a" : "b"}`}
      title={`${file.region} · ${file.tier} evidence · ${file.sourceType}`}
    >
      <span className="incident-mark-region">{file.region}</span>
      <span className="incident-mark-tier">{file.tier}</span>
    </span>
  );
}

export function EvidenceLine({ file }: { file: IncidentFile }) {
  return (
    <p className="evidence-line">
      {file.tier === "A+" ? "A+ evidence" : "Conditional evidence"} ·{" "}
      {file.sourceType}
    </p>
  );
}
