import { Radio, ShieldCheck, LayoutDashboard } from "lucide-react";
import { modulesBand } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const icons = {
  "war-room": Radio,
  approvals: ShieldCheck,
  "command-centre": LayoutDashboard,
} as const;

/** Three module cards straddling the dark hero into the white band below. */
export function ModulesBand() {
  return (
    <section className="modules-band" aria-labelledby="modules-title">
      <div className="container">
        <header className="section-header section-header-center">
          <h2 id="modules-title">{modulesBand.title}</h2>
          <p className="section-intro">{modulesBand.intro}</p>
        </header>
        <ul className="modules-grid">
          {modulesBand.cards.map((card, i) => {
            const Icon = icons[card.key];
            return (
              <Reveal
                as="li"
                key={card.key}
                delay={i * 80}
                className="module-card"
              >
                <span className="module-icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <ButtonLink href={card.href} variant="primary">
                  See {card.title}
                </ButtonLink>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
