import { Link } from "wouter";
import { PageMeta } from "@/components/layout/PageMeta";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FlowDiagram } from "@/components/sections/FlowDiagram";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Accent";
import { Reveal } from "@/components/ui/Reveal";
import { replyPromise } from "@/content/site";
import {
  assurance,
  companyHero,
  companyStory,
  evidenceLinks,
  founders,
  parentNote,
  principles,
} from "@/content/company";

const companyFlow = [
  {
    label: "Named founders",
    text: "Bisma Idrees and Syed Aoon, accountable people, not a faceless vendor.",
    tone: "signal" as const,
  },
  {
    label: "Evidence first",
    text: "Every claim on this site has a source, or an illustrative label beside it.",
    tone: "ok" as const,
  },
  {
    label: "Honest gaps",
    text: "Certifications stay planned until they are earned, no invented green ticks.",
    tone: "wait" as const,
  },
] as const;

const holdUs = [
  replyPromise.replace("We reply", "A person replies to every note"),
  "Nothing changes in your systems without the approvers you name.",
  "Every number on this site has a source or an “illustrative” label beside it.",
  "If we don’t know something, we say so and find out.",
] as const;

export function AboutPage() {
  return (
    <>
      <PageMeta route="/about" />
      <PageHero
        ground="canvas"
        label={companyHero.label}
        title={companyHero.title}
        lead={companyHero.lead}
        visual={<FlowDiagram title="How we earn trust" steps={companyFlow} />}
      >
        <ButtonLink href="/contact">Talk to the team</ButtonLink>
        <ButtonLink href="/demo" variant="ghost">
          Book a demo
        </ButtonLink>
      </PageHero>

      <Section
        id="founders"
        ground="white"
        label="The people behind Relyxus"
        title="Two founders. *One standard.*"
        intro="You will always know who is building the product, and who answers for it."
      >
        <ul className="founder-grid">
          {founders.map(person => (
            <li key={person.name} className="founder-card">
              <Reveal>
                <span className="avatar avatar-xl" aria-hidden="true">
                  {person.initials}
                </span>
                <h3>{person.name}</h3>
                <p className="small muted founder-role">{person.role}</p>
                <p className="founder-line">{person.line}</p>
                <blockquote className="founder-quote">
                  <p>“{person.quote}”</p>
                  <footer>
                    {person.name}, {person.role.split("·")[0].trim()}
                  </footer>
                </blockquote>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="parent-note small muted">
          {parentNote.text}{" "}
          <a href={parentNote.href} rel="noreferrer">
            {parentNote.label}
          </a>
          .
        </p>
      </Section>

      <Section
        id="story"
        ground="paper"
        label={companyStory.label}
        title={companyStory.title}
      >
        <div className="note measure">
          {companyStory.paragraphs.map(text => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </Section>

      <Section
        id="principles"
        ground="white"
        label="How we work"
        title="Three rules we *build to*"
      >
        <ul className="grid-3 commitments">
          {principles.map(item => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p className="muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="trust"
        ground="canvas"
        label={assurance.label}
        title={assurance.title}
        intro={assurance.intro}
      >
        <div className="trust-ledger">
          <table>
            <caption className="sr-only">Assurance roadmap</caption>
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">What it means</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {assurance.rows.map(row => (
                <tr key={row.item}>
                  <th scope="row">{row.item}</th>
                  <td>{row.meaning}</td>
                  <td>
                    <span
                      className={`status-pill status-${row.status
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        id="promises"
        ground="paper"
        label="Promises"
        title="What you can *hold us to*"
      >
        <ul className="bullets measure">
          {holdUs.map(line => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </Section>

      <Section
        id="evidence"
        ground="white"
        label={evidenceLinks.label}
        title={evidenceLinks.title}
        intro={evidenceLinks.intro}
      >
        <ul className="evidence-grid">
          {evidenceLinks.items.map(item => (
            <li key={item.href}>
              <Link href={item.href} className="evidence-card">
                <strong>
                  <Accent text={item.title} />
                </strong>
                <span className="muted">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="Say hello"
        text="Talk incident response with us, even if Relyxus isn’t the right fit yet."
        label="Contact the team"
        href="/contact"
      />
    </>
  );
}
