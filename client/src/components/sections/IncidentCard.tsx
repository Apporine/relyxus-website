import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import type { IncidentFile } from "@/content/incidents";
import { EvidenceLine, IncidentMark } from "./IncidentMark";

/** A public incident file card — research, never a customer story. */
export function IncidentCard({ file }: { file: IncidentFile }) {
  return (
    <article className="incident-card">
      <header className="incident-card-head">
        <IncidentMark file={file} />
        <div className="incident-card-meta">
          <p className="incident-card-firm">{file.firm}</p>
          <p className="incident-card-date">
            {file.region} · {file.date}
          </p>
        </div>
      </header>
      <h3 className="incident-card-title">
        <Link href={`/resources/incidents/${file.slug}`}>{file.title}</Link>
      </h3>
      <p className="incident-card-highlight">{file.highlight}</p>
      <p className="incident-card-summary">{file.short}</p>
      <EvidenceLine file={file} />
      <Link
        href={`/resources/incidents/${file.slug}`}
        className="incident-card-cta"
      >
        Read the incident file
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
      <p className="incident-card-disclaimer">
        Public incident research. {file.firm} is not a Relyxus customer.
      </p>
    </article>
  );
}
