import { Link } from "wouter";
import { PageMeta } from "@/components/layout/PageMeta";
import { PageHero } from "@/components/sections/PageHero";
import { ClockBand } from "@/components/sections/ClockBand";
import { EmailCapture } from "@/components/sections/EmailCapture";
import { IncidentCard } from "@/components/sections/IncidentCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Sources } from "@/components/ui/Sources";
import { articles } from "@/content/resources";
import { incidentBySlug } from "@/content/incidents";
import { regulatorySources, ukRegime } from "@/content/regulation";

const guide = articles["dora-major-incident-reports"];

export function DoraPage() {
  const example = incidentBySlug("barclays-31-january-2025");
  return (
    <>
      <PageMeta route="/dora" />
      <PageHero
        label="DORA and UK incident reporting"
        title="What the regulator needs from you, and by when"
        lead="A plain guide to the DORA major incident deadlines and the UK regime that starts on 18 March 2027, with the rules linked so you can check every line."
      >
        <ButtonLink href="#checklist">Get the reporting checklist</ButtonLink>
        <ButtonLink href="/dora/checklist" variant="dark">
          Open the printable version
        </ButtonLink>
      </PageHero>

      <ClockBand
        title="The DORA timeline, from the first alert"
        linkToExplainer={false}
      />

      <Section
        id="what-to-capture"
        ground="white"
        label="What to capture"
        title="Each report is a summary of the log"
      >
        <div className="prose">
          <p className="lead">{guide.intro}</p>
          {guide.sections.slice(1).map(section => (
            <section key={section.heading}>
              <h3>{section.heading}</h3>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </Section>

      <Section
        id="uk"
        ground="paper"
        label="United Kingdom"
        title={`One UK regime from ${ukRegime.date}`}
      >
        <div className="prose">
          <p>
            {ukRegime.text} The FCA, PRA and Bank of England set out the regime
            in Policy Statement PS26/2, published on 18 March 2026. If you
            already report under DORA in the EU, expect the same discipline:
            classify early, write down when, and keep the log from the first
            alert.
          </p>
          <p className="small muted">
            This page summarises public rules. It is not legal advice; check the
            current technical standards and your regulator’s guidance for what
            applies to your firm.
          </p>
          <Sources items={regulatorySources} />
        </div>
      </Section>

      {example && (
        <Section
          id="example"
          ground="white"
          label="From the public record"
          title="Why the log matters"
        >
          <div className="split split-even">
            <p className="lead">
              When payments and servicing degrade together, each channel still
              needs one ordered, sourced record. Barclays’ January 2025
              mainframe incident is a recent public example.
            </p>
            <IncidentCard file={example} />
          </div>
        </Section>
      )}

      <Section
        id="checklist"
        ground="paper"
        label="Download"
        title="Payments incident reporting checklist"
      >
        <div className="split split-even">
          <p className="lead">
            One page for DORA and the UK regime: what to have ready before the
            incident, in the first hour, and before each deadline. Email only;
            no other fields.
          </p>
          <EmailCapture
            enquiry="Readiness checklist"
            label="Work email"
            button="Get the checklist"
            done={
              <p>
                Thanks. <Link href="/dora/checklist">Open the checklist</Link>{" "}
                and print it, or save it as a PDF.
              </p>
            }
          />
        </div>
      </Section>

      <CtaBand
        title="See a first notice draft built from a live record"
        text="Thirty minutes with an engineer: one incident, from first alert to the notice your team would review."
      />
    </>
  );
}
