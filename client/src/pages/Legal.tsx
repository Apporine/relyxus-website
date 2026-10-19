import { Link } from "wouter";
import { PageMeta } from "@/components/layout/PageMeta";

const privacy = [
  {
    heading: "Who this policy covers",
    body: "Visitors to the Relyxus marketing website and people who send the demo, pilot, checklist or newsletter forms. Product deployments and customer environments are covered by separate agreements.",
  },
  {
    heading: "What we collect",
    body: "Only what you enter: your work email, and for demo or pilot requests your name, company, role and any note you add.",
  },
  {
    heading: "How we use it",
    body: "To reply to your request, follow up on a demo or evaluation, and keep a record of the conversation. If you subscribe, we send one email a month, with an unsubscribe link in each. We do not sell form submissions.",
  },
  {
    heading: "Website analytics",
    body: "We use Vercel Web Analytics to count visits and page views. It does not use cookies or follow you across other sites. This site does not load marketing trackers.",
  },
  {
    heading: "What not to send",
    body: "Please do not include passwords, secrets, credentials or sensitive incident data in any form. Use a secure channel agreed with the team for anything confidential.",
  },
  {
    heading: "How long we keep it",
    body: "For as long as we need to complete the conversation and keep ordinary business records, then we remove or archive it.",
  },
] as const;

const terms = [
  {
    heading: "Using this site",
    body: "Content on this website is for information and evaluation. It is not a quote, warranty or commitment about availability, certifications or regulatory outcomes. Commercial terms are agreed in writing with your team.",
  },
  {
    heading: "Public incident research",
    body: "Incident files summarise public post-incident reports and news coverage, with sources linked. The firms named are not Relyxus customers and have not used, endorsed or been assessed by Relyxus.",
  },
  {
    heading: "Regulatory summaries",
    body: "Our summaries of DORA and UK rules are not legal advice. Check the current rules and your regulator’s guidance for what applies to your firm.",
  },
] as const;

export function LegalPage({ page }: { page: "privacy" | "terms" }) {
  const sections = page === "privacy" ? privacy : terms;
  return (
    <>
      <PageMeta route={`/${page}`} />
      <article
        className="section section-white article"
        aria-labelledby="page-title"
      >
        <div className="container narrow">
          <p className="label">Legal</p>
          <h1 id="page-title">
            {page === "privacy" ? "Privacy policy" : "Terms"}
          </h1>
          <div className="prose">
            {sections.map(section => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}
            <p>
              Questions? <Link href="/contact">Contact the team</Link>.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
