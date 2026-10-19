import { featureRows } from "@/content/home";
import { partnerQuote } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Shape } from "@/components/ui/Shape";
import { crops } from "@/components/product/Crops";
import { QuoteCard } from "./Proof";

export function FeatureRows() {
  return (
    <div className="feature-rows">
      {featureRows.map((row, index) => {
        const Crop = crops[row.crop];
        const reverse = index % 2 === 1;
        return (
          <section
            key={row.id}
            id={row.id}
            className={`section section-${row.tint} feature-row ${reverse ? "is-reverse" : ""}`}
            aria-labelledby={`${row.id}-title`}
          >
            <div className="container feature-row-grid">
              <div className="feature-row-copy">
                <h2 id={`${row.id}-title`}>{row.title}</h2>
                <p className="lead">{row.text}</p>
                {"cta" in row && row.cta && (
                  <div className="actions">
                    <ButtonLink href={row.cta.href}>{row.cta.label}</ButtonLink>
                  </div>
                )}
                {row.showQuote && partnerQuote.text && (
                  <div className="feature-quote">
                    <QuoteCard />
                  </div>
                )}
              </div>
              <div className="feature-row-visual">
                <div className={`feature-panel feature-panel-${row.tint}`}>
                  <Shape
                    tone={index % 2 === 0 ? "lavender" : "lime"}
                    size="md"
                    className="feature-shape"
                  />
                  <Crop />
                  <div
                    className={`stat-tile ${index % 2 === 0 ? "stat-lime" : "stat-canvas"}`}
                    aria-hidden="true"
                  >
                    <strong>
                      {index === 0
                        ? "4"
                        : index === 1
                          ? "0.86"
                          : index === 2
                            ? "2/2"
                            : "4h"}
                    </strong>
                    <span>
                      {index === 0
                        ? "sources linked"
                        : index === 1
                          ? "top cause score"
                          : index === 2
                            ? "approvals"
                            : "first notice"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
