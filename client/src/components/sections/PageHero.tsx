import type { ReactNode } from "react";

/** Inner page hero: label, H1, lead, actions. Optional visual on the right. */
export function PageHero({
  label,
  title,
  lead,
  children,
  visual,
}: {
  label: string;
  title: string;
  lead: string;
  children?: ReactNode;
  visual?: ReactNode;
}) {
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <div className={`container ${visual ? "hero-grid" : ""}`}>
        <div className="hero-copy">
          <p className="label">{label}</p>
          <h1 id="page-title">{title}</h1>
          <p className="lead">{lead}</p>
          {children && <div className="actions">{children}</div>}
        </div>
        {visual && <div className="hero-visual">{visual}</div>}
      </div>
    </section>
  );
}
