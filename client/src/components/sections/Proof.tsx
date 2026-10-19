import { Link } from "wouter";
import { partnerQuote, replayResult } from "@/content/site";
import { proof } from "@/content/home";
import { Section } from "@/components/ui/Section";

export function QuoteCard() {
  return (
    <figure className="quote">
      <span className="quote-mark" aria-hidden="true">
        “
      </span>
      <blockquote>
        <p>{partnerQuote.text}</p>
      </blockquote>
      <figcaption>
        <strong>{partnerQuote.name}</strong>
        <span>{partnerQuote.role}</span>
      </figcaption>
    </figure>
  );
}

/** The replay figure, shown modestly and always next to its disclaimer. */
export function ReplayResult() {
  return (
    <aside className="replay" aria-label="Illustrative replay result">
      <p className="replay-label">Illustrative replay result</p>
      <p className="replay-value mono">{replayResult.value}</p>
      <p>{replayResult.label}</p>
      <p className="small muted">{replayResult.disclaimer}</p>
    </aside>
  );
}

export function Proof() {
  return (
    <Section id="proof" ground="white" label={proof.label} title={proof.title}>
      <div className="proof-grid">
        <QuoteCard />
        <div className="proof-side">
          <ReplayResult />
          <p className="small">
            <Link href="/resources/incidents">Read the incident files</Link>
            <span className="muted">
              : public outages at payments and infrastructure firms, and where
              the hours went.
            </span>
          </p>
        </div>
      </div>
    </Section>
  );
}
