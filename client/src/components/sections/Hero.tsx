import { Check } from "lucide-react";
import { hero } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Shape } from "@/components/ui/Shape";
import { IncidentRecord } from "@/components/product/IncidentRecord";

export function Hero() {
  return (
    <section className="hero on-canvas" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-tag">{hero.tag}</p>
          <h1 id="hero-title">
            {hero.titleBefore}{" "}
            <em className="accent-phrase">{hero.titleAccent}</em>
          </h1>
          <p className="lead hero-lead">{hero.para1}</p>
          <p className="hero-lead muted">{hero.para2}</p>
          <div className="actions">
            <ButtonLink href={hero.primary.href}>
              {hero.primary.label}
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="ghost">
              {hero.secondary.label}
            </ButtonLink>
          </div>
          <p className="hero-badge">
            <Check size={16} aria-hidden="true" />
            {hero.badge}
          </p>
        </div>
        <div className="hero-visual">
          <Shape
            tone="lavender"
            size="lg"
            className="hero-shape hero-shape-a"
          />
          <Shape tone="lime" size="md" className="hero-shape hero-shape-b" />
          <div className="hero-card">
            <IncidentRecord playing />
            <div className="stat-tile" aria-hidden="true">
              <span className="stat-note">{hero.stat.note}</span>
              <strong>{hero.stat.value}</strong>
              <span>{hero.stat.label}</span>
            </div>
          </div>
          <p className="hero-note small muted">{hero.frameNote}</p>
        </div>
      </div>
    </section>
  );
}
