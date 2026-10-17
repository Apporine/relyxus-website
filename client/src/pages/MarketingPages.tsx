import { ArrowRight, CircleAlert } from "lucide-react";
import { Link } from "wouter";
import { pageMeta } from "@/content/meta";
import { ContactArt, ResourcesArt } from "@/components/marketing/HeroArt";
import {
  PageMeta,
  PageIntro,
  TextLink,
  PrimaryLink,
} from "@/components/marketing/PublicSite";

export function ContactPage() {
  return (
    <>
      <PageMeta
        title={pageMeta["/contact"].title}
        description={pageMeta["/contact"].description}
      />
      <PageIntro
        eyebrow="Contact"
        title="Talk to the people behind Relyxus"
        art={<ContactArt />}
        summary="Use the enquiry form to start a conversation with the team that looks after Relyxus."
        tone="blue"
      >
        <PrimaryLink href="/demo">Send an enquiry</PrimaryLink>
      </PageIntro>
      <section className="contact-options section-pad">
        <div className="container contact-option-grid">
          <article>
            <h2>Demo or Replay pilot</h2>
            <p>
              Tell us about the workflow or historical incidents you&apos;d like
              to walk through together.
            </p>
            <Link href="/demo?type=Replay%20pilot">
              Start a pilot enquiry <ArrowRight size={15} />
            </Link>
          </article>
          <article>
            <h2>Security pack or pricing</h2>
            <p>
              Ask for the security pack, or what shapes a commercial discussion.
            </p>
            <Link href="/demo?type=Security%20pack">
              Start an enquiry <ArrowRight size={15} />
            </Link>
          </article>
          <article>
            <h2>Something else?</h2>
            <p>
              Use the enquiry form for other questions. We aim to reply as soon
              as we can.
            </p>
            <Link href="/demo">
              Open the enquiry form <ArrowRight size={15} />
            </Link>
          </article>
        </div>
        <p className="container contact-caveat">
          Please avoid sending credentials or sensitive incident data through
          the form.
        </p>
      </section>
    </>
  );
}

export function LegalPage({
  page,
}: {
  page: "privacy" | "terms" | "accessibility";
}) {
  if (page === "accessibility") {
    return (
      <>
        <PageMeta
          title={pageMeta["/accessibility"].title}
          description={pageMeta["/accessibility"].description}
        />
        <PageIntro
          eyebrow="Accessibility"
          title={pageMeta["/accessibility"].h1}
          art={<ResourcesArt />}
          summary={pageMeta["/accessibility"].body}
          tone="blue"
        />
        <section className="legal-copy section-pad">
          <div className="container legal-copy-inner">
            <h2>How we build</h2>
            <p>
              We aim for WCAG 2.2 AA. Pages use semantic regions, visible focus,
              text labels, reduced-motion rules and accessible form patterns.
              The incident walkthrough works from the keyboard.
            </p>
            <h3>Still improving</h3>
            <p>
              We keep testing keyboard, screen-reader, zoom, contrast and touch
              behaviour. We have not had a formal conformance audit.
            </p>
            <h3>Share an accessibility issue</h3>
            <p>
              If something is hard to use, tell us through the contact page or
              enquiry form and we'll look into it.
            </p>
            <TextLink href="/contact">Contact the team</TextLink>
          </div>
        </section>
      </>
    );
  }

  if (page === "privacy") {
    return (
      <>
        <PageMeta
          title={pageMeta["/privacy"].title}
          description={pageMeta["/privacy"].description}
        />
        <PageIntro
          eyebrow="Privacy policy"
          title={pageMeta["/privacy"].h1}
          art={<ResourcesArt />}
          summary="This policy covers the Relyxus website and enquiry forms. It does not replace contract terms for a paid deployment."
          tone="blue"
        />
        <section className="legal-copy section-pad">
          <div className="container legal-copy-inner">
            <h2>Who this policy covers</h2>
            <p>
              This page applies to visitors of the Relyxus marketing website and
              people who submit the demo or contact form. Product deployments
              and customer environments are covered by separate agreements.
            </p>

            <h3>What we collect from the enquiry form</h3>
            <p>
              When you submit an enquiry we receive the details you enter: name,
              work email, company, enquiry type, and any optional role,
              deployment interest, message, or marketing preference.
            </p>

            <h3>How we use that information</h3>
            <p>
              We use enquiry details to respond to your request, follow up on a
              demo or evaluation conversation, and keep a record of the
              exchange. We do not sell form submissions.
            </p>

            <h3>What this site does not load</h3>
            <p>
              This marketing site does not load analytics or marketing trackers
              today. Cookie preference controls are available if that changes.
            </p>

            <h3>What not to send</h3>
            <p>
              Please do not include passwords, secrets, credentials, or
              sensitive incident data in the form. Use a secure channel agreed
              with the team for anything confidential.
            </p>

            <h3>How long we keep enquiry details</h3>
            <p>
              We keep enquiry correspondence for as long as needed to complete
              the conversation and maintain ordinary business records, then
              remove or archive it according to internal retention practice.
            </p>

            <div className="limitation-box">
              <CircleAlert size={18} />
              <p>
                <strong>Questions about privacy?</strong> Use the contact page
                or enquiry form and we can share the latest organisational
                wording for your review.
              </p>
            </div>
            <TextLink href="/contact">Contact the team</TextLink>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title={pageMeta["/terms"].title}
        description={pageMeta["/terms"].description}
      />
      <PageIntro
        eyebrow="Terms"
        title={pageMeta["/terms"].h1}
        art={<ResourcesArt />}
        summary={pageMeta["/terms"].body}
        tone="blue"
      />
      <section className="legal-copy section-pad">
        <div className="container legal-copy-inner">
          <h2>Using this site</h2>
          <p>
            Content on this website is for information and evaluation. It is not
            a quote, warranty or commitment about availability, certifications
            or regulatory outcomes. Commercial terms are confirmed in writing
            with your team.
          </p>
          <div className="limitation-box">
            <CircleAlert size={18} />
            <p>
              <strong>Questions about contracts?</strong> Use the enquiry form
              or email the team and we will point you to the right conversation.
            </p>
          </div>
          <TextLink href="/contact">Talk to us</TextLink>
        </div>
      </section>
    </>
  );
}
