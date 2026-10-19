import type { IncidentFile } from "@/content/incidents";
import { Card } from "@/components/ui/Card";

/** A public incident, linked to its file. Never framed as a customer story. */
export function IncidentCard({ file }: { file: IncidentFile }) {
  return (
    <Card
      label={`${file.firm} · ${file.date}`}
      title={file.title}
      href={`/resources/incidents/${file.slug}`}
      linkLabel="Read the incident file"
    >
      <p>{file.summary}</p>
      <p className="small muted">
        Public incident research. {file.firm} is not a Relyxus customer.
      </p>
    </Card>
  );
}
