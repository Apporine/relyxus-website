import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import {
  ActionBand,
  AssuranceList,
  FoundersGrid,
  PageIntro,
  DataBand,
  PageMeta,
  PrimaryLink,
} from "@/components/marketing/PublicSite";
import { BrainMap } from "@/components/marketing/BrainMap";
import { IncidentTimeline } from "@/components/marketing/IncidentTimeline";
import { CompanyArt, SecurityArt } from "@/components/marketing/HeroArt";
import { ProductTour } from "@/components/marketing/ProductTour";
import { outageData, packPromise } from "@/content/site";
import { pageMeta } from "@/content/meta";

export function ProductPage() {
  return (
    <>
      <PageMeta
        title={pageMeta["/product"].title}
        description={pageMeta["/product"].description}
      />
      <PageIntro
        eyebrow="Product"
        title="From first alert to a record you can hand to audit"
        art={<BrainMap compact />}
        summary="One investigation per incident. A person approves every change. The write-up is half done before the incident closes."
        tone="ink"
      >
        <PrimaryLink href="/demo">Book a demo, 30 minutes</PrimaryLink>
        <a className="button button-secondary" href="#walkthrough">
          Follow an incident <ArrowRight size={16} aria-hidden="true" />
        </a>
      </PageIntro>

      <DataBand
        title="Most major outages cost six figures. Every hour to cause adds to it."
        items={outageData.items}
        sources={outageData.sources}
      />

      <section className="hx-section">
        <div className="container">
          <h2 className="hx-h2">
            Five screens. One source of truth for the whole incident.
          </h2>
          <ProductTour />
        </div>
      </section>

      <section className="hx-section" id="walkthrough">
        <div className="container">
          <h2 className="hx-h2">Follow one incident</h2>
          <p className="hx-sub">
            A payments authorisation failure, from first alert to a reviewed
            decision.
          </p>
          <IncidentTimeline />
        </div>
      </section>

      <ActionBand
        title="Bring your stack. We’ll walk a real incident through it in 30 minutes."
        summary="Tell us which tools your team uses and we’ll show you the incident from first alert to record."
        href="/demo?type=Demo"
        label="Book a demo, 30 minutes"
      />
    </>
  );
}

const commitments = [
  {
    title: "Read only by default",
    text: "Looking at an incident never changes anything in your systems.",
  },
  {
    title: "Your data stays in your environment",
    text: "Run Relyxus as a dedicated environment or self-hosted by you.",
  },
  {
    title: "A person approves every action",
    text: "Proposed changes wait for the approvers your policy names.",
  },
] as const;

const reviewerTests = [
  {
    title: "Read-only means read-only",
    text: "Check the access Relyxus is given. Investigation needs read access only.",
  },
  {
    title: "No action without an approver",
    text: "Ask us to show a proposed change waiting at the approval gate.",
  },
  {
    title: "Your data stays put",
    text: "Ask where evidence is stored and which paths leave your environment.",
  },
] as const;

export function SecurityPage() {
  return (
    <>
      <PageMeta
        title={pageMeta["/security"].title}
        description={pageMeta["/security"].description}
      />
      <PageIntro
        eyebrow="Security"
        title="Made for your security review"
        art={<SecurityArt />}
        summary={pageMeta["/security"].body}
        tone="blue"
      >
        <PrimaryLink href="/demo?type=Security%20pack">
          Request the security pack
        </PrimaryLink>
      </PageIntro>

      <section className="hx-section" id="data-boundaries">
        <div className="container">
          <h2 className="hx-h2 hx-lead-heading">
            Every tool you add is a new risk. Here is how we keep Relyxus from
            being one.
          </h2>
          <div className="hx-commitments">
            {commitments.map(item => (
              <article key={item.title}>
                <Check size={20} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hx-section">
        <div className="container">
          <h2 className="hx-h2 hx-lead-heading">
            Three things to test in your review
          </h2>
          <div className="hx-commitments">
            {reviewerTests.map((test, index) => (
              <article key={test.title}>
                <span className="hx-test-index">0{index + 1}</span>
                <h3>{test.title}</h3>
                <p>{test.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hx-section">
        <div className="container">
          <div className="hx-magnet">
            <div>
              <h2 className="hx-h2">What’s in the security pack</h2>
              <p>
                Written for security and architecture teams. We share it with
                teams in an evaluation, {packPromise}.
              </p>
              <AssuranceList />
            </div>
            <PrimaryLink href="/demo?type=Security%20pack">
              Request the security pack
            </PrimaryLink>
          </div>
        </div>
      </section>
    </>
  );
}

const holdUs = [
  "A person replies to every note within one business day.",
  "The security pack reaches teams in an evaluation, typically within two business days.",
  "Nothing changes in your systems without the approvers you name.",
  "If we don’t know something, we say so and find out.",
] as const;

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

export function CompanyPage() {
  return (
    <>
      <PageMeta
        title={pageMeta["/company"].title}
        description={pageMeta["/company"].description}
      />
      <PageIntro
        eyebrow="Built by Apporine"
        title={pageMeta["/company"].h1}
        art={<CompanyArt />}
        summary="Relyxus is built by Apporine for the teams who answer for every incident."
        tone="ink"
      >
        <PrimaryLink href="/contact">Talk to the team</PrimaryLink>
        <Link className="button button-secondary" href="/product">
          See the product <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </PageIntro>

      <section className="company-page section-pad">
        <div className="container company-grid">
          <div className="company-copy">
            <h2>Why we’re building it</h2>
            <p className="lead-copy">
              We start from the incident a responder has to understand at 3am,
              and from the report someone has to write the week after. Relyxus
              is built for both.
            </p>
            <p>
              For introductions, commercial details or support, send us an
              enquiry and we’ll put you in touch with the right person.
            </p>
          </div>
          <div className="company-shot-stack">
            <div className="company-shot-stage">
              <figure className="company-shot company-shot-back">
                <img
                  src="/product/command-centre.png"
                  alt="Relyxus Command Centre showing active incidents, approvals and service health"
                  width={1894}
                  height={712}
                  loading="lazy"
                />
              </figure>
              <figure className="company-shot company-shot-front">
                <img
                  src="/product/command-centre-attention.png"
                  alt="Relyxus Command Centre highlighting a SEV1 incident and a production approval waiting for review"
                  width={1894}
                  height={810}
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="hx-section">
        <div className="container">
          <h2 className="hx-h2">How we work</h2>
          <div className="hx-commitments">
            {principles.map(item => (
              <article key={item.title}>
                <Check size={20} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hx-section">
        <div className="container">
          <h2 className="hx-h2">What you can hold us to</h2>
          <ul className="hx-trust-lines hx-holdus">
            {holdUs.map(line => (
              <li key={line}>
                <Check size={18} aria-hidden="true" /> {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FoundersGrid />

      <ActionBand
        title="Say hello"
        summary="Talk incident response with us, even if Relyxus isn’t the right fit yet."
        href="/contact"
        label="Contact the team"
      />
    </>
  );
}
