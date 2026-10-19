import { ButtonLink } from "@/components/ui/Button";
import { demoMicrocopy } from "@/content/site";

/** The closing call to action: short, centred, one button. */
export function CtaBand({
  title,
  text,
  label = "Book a 30-minute demo",
  href = "/demo",
  ground = "white",
}: {
  title: string;
  text: string;
  label?: string;
  href?: string;
  ground?: "paper" | "white";
}) {
  return (
    <section
      className={`section section-${ground} cta`}
      aria-labelledby="cta-title"
    >
      <div className="container cta-inner">
        <h2 id="cta-title">{title}</h2>
        <p className="section-intro">{text}</p>
        <div className="actions">
          <ButtonLink href={href}>{label}</ButtonLink>
        </div>
        {href === "/demo" && <p className="small muted">{demoMicrocopy}</p>}
      </div>
    </section>
  );
}
