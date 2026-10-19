import {
  ArrowLeftRight,
  CandlestickChart,
  Cloud,
  CloudCog,
  Globe,
  Landmark,
  Plane,
  TowerControl,
  type LucideIcon,
} from "lucide-react";
import type { IncidentFile, IncidentKind } from "@/content/incidents";

/** An icon for the kind of organisation. Firm logos are never used. */
const icons: Record<IncidentKind, LucideIcon> = {
  bank: Landmark,
  cloud: Cloud,
  "cloud-platform": CloudCog,
  edge: Globe,
  market: CandlestickChart,
  clearing: ArrowLeftRight,
  airline: Plane,
  "air-traffic": TowerControl,
};

/**
 * Sector icon with the evidence tier on its corner. A+ is a first-party
 * report, regulator publication or securities filing; B is a relay.
 */
export function IncidentMark({ file }: { file: IncidentFile }) {
  const Icon = icons[file.kind];
  return (
    <span
      className={`incident-mark kind-${file.kind} tier-${file.tier === "A+" ? "a" : "b"}`}
      title={`${file.sector} · ${file.tier} evidence · ${file.sourceType}`}
    >
      <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
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
