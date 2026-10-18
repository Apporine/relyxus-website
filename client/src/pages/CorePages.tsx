import { ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import {
  APPORINE_URL,
  AssuranceList,
  DataBand,
  FounderNote,
  FoundersGrid,
  PageMeta,
  PricingBlock,
  PrimaryLink,
} from "@/components/marketing/PublicSite";
import { MiniStage } from "@/components/marketing/MiniStage";
import { Section } from "@/components/marketing/Section";
import { StageVisual } from "@/components/marketing/StageVisual";
import { Headline } from "@/components/marketing/Headline";
import { CtaPanel } from "@/components/home/Resolved";
import { ProductTour } from "@/components/marketing/ProductTour";
import {
  BeforeAfterStrip,
  FeatureMap,
  HowItWorksStrip,
  SecurityFeatureStrip,
  StackStrip,
} from "@/components/marketing/ProductClarity";
import { outageData, packPromise } from "@/content/site";
import { pageMeta } from "@/content/meta";
import { useReveal } from "@/lib/motion";

/** Product screenshots on a frame motif — not the homepage globe. */
function ScreensStage() {
  const [ref, inView] = useReveal<HTMLElement>(0.15);
  return (
    <section
      ref={ref}
      id="screens"
      className={`rx-ink rx-screens-stage ${inView ? "is-in" : ""}`}
      data-readout
      data-readout-clock="T+00:04"
      data-readout-status="The war room"
    >
      <StageVisual motif="screens" className="rx-screens-core" />
      <div className="container">
        <Headline text="Five screens. *One source of truth.*" in={inView} />
        <p
          className="rx-section-sub rx-reveal"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          Each screen owns a feature: exposure, investigation, ranked causes,
          approvals, or service impact.
        </p>
        <div
          className="rx-glass rx-screens-frame rx-reveal"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <ProductTour />
        </div>
      </div>
    </section>
  );
}

export function ProductPage() {
  return (
    <>
      <PageMeta
        title={pageMeta["/product"].title}
        description={pageMeta["/product"].description}
      />
      <MiniStage
        eyebrow="Product"
        title="From first alert *to a record you can hand to audit.*"
        lede="One investigation per incident. A person approves every change. The write up is half done before the incident closes."
        status="Product"
        visual="screens"
      >
        <PrimaryLink href="/demo">Book a 30 minute demo</PrimaryLink>
        <a className="button button-secondary" href="#what-you-get">
          What you get <ArrowRight size={16} aria-hidden="true" />
        </a>
        <a className="button button-secondary" href="#screens">
          See the screens <ArrowRight size={16} aria-hidden="true" />
        </a>
      </MiniStage>
      <HowItWorksStrip />
      <FeatureMap ground="ink" />
      <ScreensStage />
      <BeforeAfterStrip />
      <StackStrip />
      <SecurityFeatureStrip />
      <DataBand
        title="Most major outages cost six figures. *Every hour to cause adds to it.*"
        items={outageData.items}
        sources={outageData.sources}
        ground="ivory"
      />
      <PricingBlock />
      <CtaPanel
        title="Bring your stack. *We’ll walk an incident through it.*"
        line="Tell us which tools your team uses and we’ll show you the incident from first alert to record."
        cta={{ label: "Book a 30 minute demo", href: "/demo?type=Demo" }}
        place="product"
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
    text: "Run Relyxus as a dedicated environment or self hosted by you.",
  },
  {
    title: "A person approves every action",
    text: "Proposed changes wait for the approvers your policy names.",
  },
] as const;

const reviewerTests = [
  {
    title: "Read only means read only",
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
      <MiniStage
        eyebrow="Security"
        title="Made for *your security review.*"
        lede={pageMeta["/security"].body}
        status="Security review"
        tint="paper"
        visual="gate"
      >
        <PrimaryLink href="/demo?type=Security%20pack">
          Request the security pack
        </PrimaryLink>
      </MiniStage>

      <Section
        id="data-boundaries"
        title="Every tool is a new risk. *Here is how we keep Relyxus from being one.*"
      >
        <div className="hx-commitments">
          {commitments.map(item => (
            <article key={item.title}>
              <Check size={20} aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Three things *to test in your review.*">
        <div className="hx-commitments">
          {reviewerTests.map((test, index) => (
            <article key={test.title}>
              <span className="hx-test-index">0{index + 1}</span>
              <h3>{test.title}</h3>
              <p>{test.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        title="What’s in *the security pack.*"
        sub={`Written for security and architecture teams. We share it with teams in an evaluation, ${packPromise}.`}
      >
        <AssuranceList />
        <PrimaryLink href="/demo?type=Security%20pack">
          Request the security pack
        </PrimaryLink>
      </Section>

      <CtaPanel
        title="Bring your reviewers. *We’ll answer every question.*"
        line="Tell us who is reviewing and what they need, and we’ll share the pack."
        cta={{
          label: "Request the security pack",
          href: "/demo?type=Security%20pack",
        }}
        place="security"
      />
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
      <MiniStage
        eyebrow="Built by Apporine"
        title="Incident response *you can explain to anyone.*"
        lede="Relyxus is built by Apporine for the teams who answer for every incident."
        status="Company"
        tint="dense"
        visual="ledger"
      >
        <PrimaryLink href="/contact">Talk to the team</PrimaryLink>
        <Link className="button button-secondary" href="/product">
          See the product <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <a className="rx-apporine rx-apporine-hero" href={APPORINE_URL}>
          An Apporine product
        </a>
      </MiniStage>

      <Section
        title="Why we’re *building it.*"
        sub="We start from the incident a responder has to understand at 3am, and from the report someone has to write the week after. Relyxus is built for both."
      >
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
      </Section>

      <FounderNote ground="ivory" />

      <Section title="How *we work.*">
        <div className="hx-commitments">
          {principles.map(item => (
            <article key={item.title}>
              <Check size={20} aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="What you can *hold us to.*">
        <ul className="hx-trust-lines hx-holdus">
          {holdUs.map(line => (
            <li key={line}>
              <Check size={18} aria-hidden="true" /> {line}
            </li>
          ))}
        </ul>
      </Section>

      <FoundersGrid />

      <CtaPanel
        title="Say *hello.*"
        line="Talk incident response with us, even if Relyxus isn’t the right fit yet."
        cta={{ label: "Contact the team", href: "/contact" }}
        place="company"
      />
    </>
  );
}
