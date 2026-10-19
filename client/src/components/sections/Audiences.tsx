import { audiences } from "@/content/home";
import { roles } from "@/content/solutions";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export function Audiences() {
  return (
    <Section
      id="who"
      ground="paper"
      label={audiences.label}
      title={audiences.title}
    >
      <ul className="grid-3">
        {roles.map(role => (
          <Card
            as="li"
            key={role.slug}
            label={role.who}
            title={role.name}
            href={`/solutions/${role.slug}`}
            linkLabel={`For ${role.name.toLowerCase()}`}
          >
            <p>{role.card.pain}</p>
            <p className="card-outcome">{role.card.outcome}</p>
          </Card>
        ))}
      </ul>
    </Section>
  );
}
