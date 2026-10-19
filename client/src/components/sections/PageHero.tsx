import type { ReactNode } from "react";
import { Accent } from "@/components/ui/Accent";

/** Inner page hero: label, H1, lead, actions. Optional visual on the right. */
export function PageHero({
  label,
  title,
  lead,
  children,
  visual,
  ground = "paper",
}: {
  label: string;
  title: string;
  lead: string;
  children?: ReactNode;
  visual?: ReactNode;
  ground?: "paper" | "white" | "canvas";
}) {
  const onCanvas = ground === "canvas";
  return (
    <section
      className={`page-hero ${onCanvas ? "page-hero-canvas on-canvas" : ""}`}
      aria-labelledby="page-title"
    >
      <div className={`container ${visual ? "hero-grid" : ""}`}>
        <div className="hero-copy">
          <p className={`label ${onCanvas ? "hero-tag" : ""}`}>{label}</p>
          <h1 id="page-title">
            <Accent text={title} />
          </h1>
          <p className="lead">{lead}</p>
          {children && <div className="actions">{children}</div>}
        </div>
        {visual && <div className="hero-visual">{visual}</div>}
      </div>
    </section>
  );
}
