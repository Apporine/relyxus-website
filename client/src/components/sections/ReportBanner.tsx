import { reportBanner } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Shape } from "@/components/ui/Shape";

export function ReportBanner() {
  return (
    <section
      className="section section-tint-2 report-banner"
      aria-labelledby="report-title"
    >
      <div className="container report-banner-inner">
        <Shape tone="lavender" size="lg" className="report-wedge" />
        <div>
          <h2 id="report-title">{reportBanner.title}</h2>
          <p className="lead">{reportBanner.text}</p>
        </div>
        <ButtonLink href={reportBanner.cta.href}>
          {reportBanner.cta.label}
        </ButtonLink>
      </div>
    </section>
  );
}
