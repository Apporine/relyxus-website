import { Redirect } from "wouter";
import { PageMeta } from "@/components/layout/PageMeta";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { IncidentCard } from "@/components/sections/IncidentCard";
import { QuoteCard, ReplayResult } from "@/components/sections/Proof";
import { Section } from "@/components/ui/Section";
import { DotGraph } from "@/components/ui/DotGraph";
import { nightDiagrams } from "@/content/diagrams";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Sources } from "@/components/ui/Sources";
import { DrawBars } from "@/components/ui/DrawBars";
import { Reveal } from "@/components/ui/Reveal";
import { Screen } from "@/components/product/Screen";
import { roleBySlug, type Role } from "@/content/solutions";
import { moduleByKey } from "@/content/product";
import { incidentBySlug } from "@/content/incidents";
import { doraClocks, regulatorySources, ukRegime } from "@/content/regulation";

function RegulationProof() {
  return (
    <div className="card">
      <p className="card-label">Mapped to the rules</p>
      <ul className="reg-list">
        {doraClocks.slice(1).map(clock => (
          <li key={clock.at}>
            <strong className="mono">{clock.at}</strong>
            <span>
              {clock.title}: {clock.text}
            </span>
          </li>
        ))}
        <li>
          <strong className="mono">UK</strong>
          <span>
            From {ukRegime.date}: {ukRegime.text}
          </span>
        </li>
      </ul>
      <Sources items={regulatorySources} />
    </div>
  );
}

function RoleProof({ role }: { role: Role }) {
  const file = incidentBySlug(role.incident);
  return (
    <div className="split split-even">
      {role.proof === "replay" && <ReplayResult />}
      {role.proof === "regulation" && <RegulationProof />}
      {role.proof === "quote" && <QuoteCard />}
      {file && <IncidentCard file={file} />}
    </div>
  );
}

function RoleVisual({ role }: { role: Role }) {
  if (role.causeBars?.length) {
    return (
      <DrawBars
        title="Likely causes · INC-2207 (example)"
        bars={role.causeBars}
      />
    );
  }
  const module = moduleByKey(role.screen.module);
  if (!module) return null;
  return <Screen screen={module.screen} title={`Relyxus · ${module.name}`} />;
}

/** One template, role-specific copy and visuals — never identical section titles. */
export function SolutionRoute({ slug }: { slug: string }) {
  const role = roleBySlug(slug);
  if (!role) return <Redirect to="/" replace />;
  const module = moduleByKey(role.screen.module);
  if (!module) return <Redirect to="/" replace />;
  return (
    <>
      <PageMeta route={`/solutions/${role.slug}`} />
      <PageHero
        ground="canvas"
        label={`For ${role.name}: ${role.who}`}
        title={role.title}
        lead={role.lede}
        visual={<RoleVisual role={role} />}
      >
        <ButtonLink href={role.cta.href}>{role.cta.label}</ButtonLink>
        <ButtonLink href="#screen" variant="ghost">
          See the screen
        </ButtonLink>
      </PageHero>

      <Section
        id="bad-night"
        ground="white"
        label={role.sections.nightLabel}
        title={role.sections.nightTitle}
      >
        <div className="night-grid">
          <Reveal>
            <div className="bad-night measure">
              {role.badNight.map(line => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Reveal>
          <DotGraph diagram={nightDiagrams[role.slug]} />
        </div>
      </Section>

      <Section
        id="screen"
        ground="paper"
        label={module.name}
        title={role.screen.title}
        intro={role.screen.intro}
      >
        <Reveal>
          <Screen screen={module.screen} title={`Relyxus · ${module.name}`} />
        </Reveal>
      </Section>

      <Section
        id="outcomes"
        ground="white"
        label={role.sections.outcomesLabel}
        title={role.sections.outcomesTitle}
      >
        <ul className="grid-3 terms">
          {role.outcomes.map((outcome, i) => (
            <Reveal as="li" key={outcome.title} delay={i * 80}>
              <h3>{outcome.title}</h3>
              <p className="muted">{outcome.text}</p>
            </Reveal>
          ))}
        </ul>
        <p className="reassure">{role.reassurance}</p>
      </Section>

      <Section
        id="proof"
        ground="paper"
        label={role.sections.proofLabel}
        title={role.sections.proofTitle}
      >
        <RoleProof role={role} />
      </Section>

      <Section
        id="faq"
        ground="white"
        label="Questions"
        title={role.sections.faqTitle}
      >
        <div className="measure-wide">
          <Accordion items={role.faq} />
        </div>
      </Section>

      <CtaBand
        ground="paper"
        title={role.cta.title}
        text={role.cta.text}
        label={role.cta.label}
        href={role.cta.href}
      />
    </>
  );
}
