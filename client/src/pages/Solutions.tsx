import { Redirect } from "wouter";
import { PageMeta } from "@/components/layout/PageMeta";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { IncidentCard } from "@/components/sections/IncidentCard";
import { QuoteCard, ReplayResult } from "@/components/sections/Proof";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Sources } from "@/components/ui/Sources";
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

/** One template for the three Solutions pages; every block is role-specific. */
export function SolutionRoute({ slug }: { slug: string }) {
  const role = roleBySlug(slug);
  if (!role) return <Redirect to="/" replace />;
  const module = moduleByKey(role.screen.module);
  if (!module) return <Redirect to="/" replace />;
  return (
    <>
      <PageMeta route={`/solutions/${role.slug}`} />
      <PageHero
        label={`For ${role.name.toLowerCase()}: ${role.who}`}
        title={role.title}
        lead={role.lede}
      >
        <ButtonLink href={role.cta.href}>{role.cta.label}</ButtonLink>
        <ButtonLink href="#screen" variant="dark">
          See the screen
        </ButtonLink>
      </PageHero>

      <Section
        id="bad-night"
        ground="white"
        label="Your bad night"
        title="You’ve had this one"
      >
        <div className="bad-night measure">
          {role.badNight.map(line => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </Section>

      <Section
        id="screen"
        ground="paper"
        label={module.name}
        title={role.screen.title}
        intro={role.screen.intro}
      >
        <Screen screen={module.screen} title={`Relyxus · ${module.name}`} />
      </Section>

      <Section
        id="outcomes"
        ground="white"
        label="What changes"
        title="Three things you get"
      >
        <ul className="grid-3 terms">
          {role.outcomes.map(outcome => (
            <li key={outcome.title}>
              <h3>{outcome.title}</h3>
              <p className="muted">{outcome.text}</p>
            </li>
          ))}
        </ul>
        <p className="reassure">{role.reassurance}</p>
      </Section>

      <Section
        id="proof"
        ground="paper"
        label="Proof"
        title="The gap Relyxus is built for"
      >
        <RoleProof role={role} />
      </Section>

      <Section
        id="faq"
        ground="white"
        label="Questions"
        title={`What ${role.name.toLowerCase()} teams ask`}
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
