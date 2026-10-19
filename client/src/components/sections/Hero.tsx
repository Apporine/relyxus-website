import { hero } from "@/content/home";
import { demoMicrocopy } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { IncidentRecord } from "@/components/product/IncidentRecord";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="label">{hero.label}</p>
          <h1 id="hero-title">{hero.title}</h1>
          <p className="lead">{hero.sub}</p>
          <div className="actions">
            <ButtonLink href={hero.primary.href}>
              {hero.primary.label}
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="secondary">
              {hero.secondary.label}
            </ButtonLink>
          </div>
          <p className="small muted">{demoMicrocopy}</p>
        </div>
        <figure className="hero-visual">
          <IncidentRecord />
          <figcaption className="small muted">{hero.frameNote}</figcaption>
        </figure>
      </div>
    </section>
  );
}
