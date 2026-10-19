import { PageMeta } from "@/components/layout/PageMeta";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { companyDetails, replyPromise } from "@/content/site";

const topics = [
  {
    title: "See a demo",
    text: "Thirty minutes on an incident like yours.",
    href: "/demo",
    link: "Book a 30-minute demo",
  },
  {
    title: "Try a replay pilot",
    text: "One closed incident, replayed read-only.",
    href: "/pilot",
    link: "Start a replay pilot",
  },
  {
    title: "Get the security pack",
    text: "For your security and architecture reviewers.",
    href: "/demo?type=Security%20pack",
    link: "Request the pack",
  },
  {
    title: "Talk pricing",
    text: "A proposal in writing, shaped by your setup.",
    href: "/demo?type=Pricing",
    link: "Ask for a proposal",
  },
] as const;

export function ContactPage() {
  return (
    <>
      <PageMeta route="/contact" />
      <PageHero
        label="Contact"
        title="Talk to the team behind Relyxus"
        lead={`Choose what you want to talk about. A person reads every note. ${replyPromise}`}
      />
      <Section id="topics" ground="white">
        <ul className="grid-4">
          {topics.map(topic => (
            <Card
              as="li"
              key={topic.title}
              title={topic.title}
              href={topic.href}
              linkLabel={topic.link}
            >
              <p>{topic.text}</p>
            </Card>
          ))}
        </ul>
        {companyDetails.email && (
          <p className="contact-email">
            Or email us at{" "}
            <a href={`mailto:${companyDetails.email}`}>
              {companyDetails.email}
            </a>
            .
          </p>
        )}
      </Section>
    </>
  );
}
