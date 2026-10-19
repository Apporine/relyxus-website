import { PageMeta } from "@/components/layout/PageMeta";
import { PageHero } from "@/components/sections/PageHero";
import { PilotSteps } from "@/components/sections/PilotSteps";
import { FlowDiagram } from "@/components/sections/FlowDiagram";
import { DemoForm } from "@/components/sections/DemoForm";
import { ReplayResult } from "@/components/sections/Proof";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { securityCommitments } from "@/content/product";

const pilotFlow = [
  {
    label: "Bring a closed SEV1",
    text: "One incident your team knows, ideally where the first theory was wrong.",
    tone: "signal" as const,
  },
  {
    label: "Replay read only",
    text: "We rebuild the record from alerts, deploys and logs. Nothing changes.",
    tone: "ok" as const,
  },
  {
    label: "Compare the result",
    text: "Ranked causes, approvals it would have asked for, and a notice draft.",
    tone: "wait" as const,
  },
] as const;

const youBring = [
  "One closed SEV1 your team knows well, ideally one where the first theory was wrong.",
  "Read only access to the sources for that incident: alerts, deploy history and logs.",
  "An hour of the incident lead’s time to compare notes at the end.",
] as const;

const youGet = [
  "The record Relyxus would have built, in event order with every source linked.",
  "The causes it ranked, with the evidence for and against each.",
  "The approvals it would have asked for, and who would have been asked.",
  "A first notice draft for the incident, for your resilience team to judge.",
] as const;

const pilotFaq = [
  {
    question: "Does a replay pilot touch our live systems?",
    answer:
      "No. It uses read only access to the sources for one closed incident. Nothing is changed, and nothing is proposed against production.",
  },
  {
    question: "What if Relyxus gets the cause wrong?",
    answer:
      "Then you’ll see it, and you’ll see why: every ranked cause shows its evidence. A pilot is meant to show you what it finds and what it misses.",
  },
  {
    question: "What does a pilot cost?",
    answer:
      "We agree a fixed price in writing before you start. If you go ahead, what you paid comes off the annual licence.",
  },
] as const;

export function PilotPage() {
  return (
    <>
      <PageMeta route="/pilot" />
      <PageHero
        ground="canvas"
        label="Replay pilot"
        title="Start with an incident you’ve *already closed*"
        lead="We replay one closed incident read only and show you the record Relyxus would have left: the ranked cause, the approvals and the notice draft. Nothing in your systems changes."
        visual={<FlowDiagram title="Pilot path" steps={pilotFlow} />}
      >
        <ButtonLink href="#pilot-form">Start a replay pilot</ButtonLink>
      </PageHero>

      <Section
        id="how"
        ground="white"
        label="How it works"
        title="Three steps, read only"
      >
        <PilotSteps />
      </Section>

      <Section id="scope" ground="paper">
        <div className="split split-even">
          <div>
            <h2 className="subhead-lg">What you bring</h2>
            <ul className="bullets">
              {youBring.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="subhead-lg">What you get</h2>
            <ul className="bullets">
              {youGet.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section
        id="safety"
        ground="white"
        label="Safety"
        title="What a pilot can and can’t do"
      >
        <ul className="grid-3 commitments">
          {securityCommitments.map(item => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p className="muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="result" ground="paper" label="What a result looks like">
        <div className="split split-even">
          <ReplayResult />
          <Accordion items={pilotFaq} />
        </div>
      </Section>

      <section
        className="section section-white"
        id="pilot-form"
        aria-labelledby="pilot-form-title"
      >
        <div className="container narrow">
          <div className="form-card">
            <SectionHeader
              id="pilot-form-title"
              title="Bring the incident that hurt most"
              intro="We’ll show you the record it would have left."
            />
            <DemoForm
              enquiry="Replay pilot"
              messageLabel="Which incident would you replay?"
              submitLabel="Start a replay pilot"
            />
          </div>
        </div>
      </section>
    </>
  );
}
