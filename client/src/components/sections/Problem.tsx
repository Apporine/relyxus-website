import { Link } from "wouter";
import { problem } from "@/content/home";
import { headlineFact } from "@/content/incidents";
import { Section } from "@/components/ui/Section";
import { Sources } from "@/components/ui/Sources";

export function Problem() {
  return (
    <Section
      id="problem"
      ground="white"
      label={problem.label}
      title={problem.title}
    >
      <div className="split split-even problem">
        <p className="lead">{problem.text}</p>
        <blockquote className="fact">
          <p>{headlineFact.text}</p>
          <Sources items={[headlineFact.source]} />
          <p className="small">
            <Link href={`/resources/incidents/${headlineFact.file}`}>
              Read the incident file
            </Link>{" "}
            <span className="muted">
              · Public incident research. Cloudflare is not a Relyxus customer.
            </span>
          </p>
        </blockquote>
      </div>
    </Section>
  );
}
