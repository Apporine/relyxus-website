import { Check } from "lucide-react";
import { designPartners } from "@/content/site";

/** Sectors as plain text until partners approve their names and logos. */
export function TrustStrip() {
  return (
    <section className="trust" aria-label={designPartners.label}>
      <div className="container trust-inner">
        <p className="trust-sectors">
          <span className="trust-label">{designPartners.label}:</span>{" "}
          {designPartners.sectors.join(" · ")}
        </p>
        <ul className="trust-badges">
          {designPartners.badges.map(badge => (
            <li key={badge}>
              <Check size={16} aria-hidden="true" />
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
