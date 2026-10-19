import { PageMeta } from "@/components/layout/PageMeta";
import { PageHero } from "@/components/sections/PageHero";
import { FounderNote } from "@/components/sections/FounderNote";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { APPORINE_URL, replyPromise } from "@/content/site";

const principles = [
  {
    title: "A person decides",
    text: "Nothing changes in your systems until the approvers you name say yes.",
  },
  {
    title: "Evidence on every claim",
    text: "Every likely cause links to the sources behind it, so your team can check our work.",
  },
  {
    title: "Honest about gaps",
    text: "The record says what we didn’t know, because that is what an auditor asks about first.",
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
        label="About"
        title="Incident response you can explain to anyone"
        lead="Relyxus is built by Apporine for the payments teams who answer for every incident: to customers, to the board and to the regulator."
      >
        <ButtonLink href="/contact">Talk to the team</ButtonLink>
        <ButtonLink href={APPORINE_URL} variant="dark">
          About Apporine
        </ButtonLink>
      </PageHero>

      <FounderNote />

      <Section
        id="principles"
        ground="white"
        label="How we work"
        title="Three rules we build to"
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
        id="promises"
        ground="paper"
        label="Promises"
        title="What you can hold us to"
      >
        <ul className="bullets measure">
          {holdUs.map(line => (
            <li key={line}>{line}</li>
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
