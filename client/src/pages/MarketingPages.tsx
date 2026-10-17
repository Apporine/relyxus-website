import { ArrowRight, Check, CircleAlert, FileText, Fingerprint, Gauge, Mail, ShieldCheck, UsersRound } from "lucide-react";
import { Link } from "wouter";
import { PageMeta, PageIntro, SectionTitle, TextLink, PrimaryLink, ActionBand, InlineAvailability } from "@/components/marketing/PublicSite";
import { ProductExplorer } from "@/components/marketing/Explorers";
import { CONTACT_RECIPIENTS } from "@shared/contact";

type ProductRoute = "overview" | "investigation" | "governed-actions" | "reporting" | "security";
const productCopy: Record<Exclude<ProductRoute, "security">, { eyebrow: string; title: string; summary: string; question: string; mechanism: string; limitation: string; next: { label: string; href: string } }> = {
  overview: {
    eyebrow: "PRODUCT / OVERVIEW",
    title: "Follow the incident from first signal to reviewed outcome.",
    summary: "Relyxus helps teams pull approved evidence into one investigation, weigh a likely explanation, and keep people in charge of any proposed action.",
    question: "What does Relyxus add to the tools we already use?",
    mechanism: "It connects a signal to evidence, a human decision and a record you can revisit. It is not meant to replace your metrics or log store. What you can connect depends on your environment and the release you run.",
    limitation: "Connector coverage and deployment options vary by release. We’ll walk through what applies to your team during an evaluation.",
    next: { label: "Explore the incident walkthrough", href: "/#walkthrough" },
  },
  investigation: {
    eyebrow: "PRODUCT / INVESTIGATION",
    title: "A likely cause, with the evidence to inspect.",
    summary: "Help responders make sense of an incident without hiding uncertainty or cutting a hypothesis off from its sources.",
    question: "What is known, and what still needs checking?",
    mechanism: "Approved evidence comes together in context. A ranked hypothesis stays next to an alternative, and you can open the sources behind each statement.",
    limitation: "Correlation is not confirmation. Incomplete evidence is expected, and responders still decide what is supported.",
    next: { label: "View the incident walkthrough", href: "/#walkthrough" },
  },
  "governed-actions": {
    eyebrow: "PRODUCT / GOVERNED ACTIONS",
    title: "A proposal is not an execution.",
    summary: "Keep the target, policy and human approval visible between a suggested change and anything that could touch a live service.",
    question: "Who is allowed to change what—and under which conditions?",
    mechanism: "Read-only investigation stays separate from action. A proposal carries scope, policy, approvals and a verification plan. Waiting or blocked is a valid outcome.",
    limitation: "Nothing on this website runs against production. Autonomy levels are configured with your team; we do not assume every level is switched on.",
    next: { label: "Compare deployment boundaries", href: "/deployment" },
  },
  reporting: {
    eyebrow: "PRODUCT / REPORTING",
    title: "Keep the evidence with the incident record.",
    summary: "A source-linked timeline helps with handoffs and draft reports while classification, review and submission stay with people.",
    question: "Can a draft show where each statement came from?",
    mechanism: "Events stay ordered, report fields stay tied to sources, and a prepared draft is clearly different from a reviewed and approved report.",
    limitation: "A regulator-facing report is still a draft until people finish it. Completeness and jurisdiction rules need human judgment.",
    next: { label: "Discuss an evaluation", href: "/demo?type=Demo" },
  },
};

function CapabilityGraphic({ kind }: { kind: string }) {
  return <div className={`capability-graphic capability-${kind}`} aria-hidden="true"><div className="capability-graphic-head"><span>ILLUSTRATIVE WORKFLOW</span><span>NOT CONNECTED</span></div>{kind === "overview" && <div className="capability-chain"><span>Signal</span><i /><span>Evidence</span><i /><span className="chain-gate"><ShieldCheck size={14} /> Review</span><i /><span>Record</span></div>}{kind === "investigation" && <><div className="capability-hypothesis"><span>LIKELY EXPLANATION</span><strong>Routing change may be relevant.</strong><small>Source linked · uncertainty retained</small></div><div className="capability-source-bars"><i /><i /><i /></div></>}{kind === "governed-actions" && <><div className="capability-proposal">PROPOSED CHANGE</div><div className="capability-gate"><ShieldCheck size={19} /><span>POLICY GATE<small>Approver roles required</small></span></div><div className="capability-wait">Waiting for review</div></>}{kind === "reporting" && <><div className="capability-report"><FileText size={19} /><span>Incident report draft</span><b>Needs review</b></div><div className="capability-source-bars"><i /><i /><i /></div><small className="capability-caption">Classification · approval · submission remain human-led.</small></>}{kind === "security" && <div className="security-boundary-graphic"><span>YOUR ENVIRONMENT</span><i /><i /><i /><b>REVIEW EACH PATH</b><i /></div>}</div>;
}

export function ProductPage({ page }: { page: ProductRoute }) {
  if (page === "security") return <SecurityPage />;
  const content = productCopy[page];
  return <>
    <PageMeta title={content.eyebrow.replace("PRODUCT / ", "")} description={content.summary} />
    <PageIntro eyebrow={content.eyebrow} title={content.title} summary={content.summary} tone="ink"><PrimaryLink href="/demo">Discuss this workflow</PrimaryLink><Link className="button button-secondary" href="/deployment">Review deployment <ArrowRight size={16} /></Link></PageIntro>
    {page === "overview" && <section className="product-overview-callout"><div className="container overview-callout-inner"><div><p className="eyebrow">ONE INCIDENT / A READABLE SEQUENCE</p><h2>Investigation informs a decision. It doesn’t make the decision disappear.</h2><p>Read approved evidence. Review a likely explanation. Keep policy and human approval in the action path. Record what happened and what is still unknown.</p></div><CapabilityGraphic kind="overview" /></div></section>}
    <section className="capability-detail-section section-pad"><div className="container capability-detail-grid"><div className="capability-detail-copy"><p className="eyebrow">{page === "overview" ? "THE MECHANISM" : "THE QUESTION TO ASK"}</p><h2>{content.question}</h2><p className="lead-copy">{content.mechanism}</p><div className="limitation-box"><CircleAlert size={18} /><p><strong>Important boundary</strong>{content.limitation}</p></div><TextLink href={content.next.href}>{content.next.label}</TextLink></div><CapabilityGraphic kind={page} /></div></section>
    {page === "overview" ? <section className="product-explorer-section section-pad"><div className="container"><SectionTitle eyebrow="EXPLORE FOUR OUTCOMES" title="Keep the whole response understandable." summary="Each capability answers a different operational question. We’ll confirm scope with you during an evaluation." /><ProductExplorer /></div></section> : <section className="capability-questions section-pad"><div className="container"><SectionTitle eyebrow="EVALUATION QUESTIONS" title="What to validate with your own team." summary="Use these questions to make an evaluation concrete without assuming a capability is available." /><div className="question-grid"><article><span>01</span><h3>Inputs</h3><p>Which approved sources, fields and time windows are in scope?</p></article><article><span>02</span><h3>Decision</h3><p>What remains a human judgement, approval or classification?</p></article><article><span>03</span><h3>Evidence</h3><p>Can a reviewer inspect the source, uncertainty and any missing context?</p></article><article><span>04</span><h3>Limits</h3><p>What does the current release not support or guarantee?</p></article></div></div></section>}
    {page === "overview" && <section className="autonomy-section section-pad"><div className="container autonomy-layout"><div><p className="eyebrow">AUTONOMY IS A POLICY CHOICE</p><h2>More automation isn’t always the goal.</h2><p>Use this vocabulary to talk about permission boundaries with your team. Not every level needs to be on from day one.</p><InlineAvailability>Configured with your policies</InlineAvailability></div><div className="autonomy-list">{[{ level: "L0", label: "Observe", text: "Collect context; no suggestion or action." }, { level: "L1", label: "Suggest", text: "A person considers and executes any suggestion." }, { level: "L2", label: "One-click approval", text: "A permitted action still waits for explicit approval." }, { level: "L3", label: "Four-eyes", text: "Distinct eligible approvers review the action." }, { level: "L4", label: "Automatic within limits", text: "Any automatic path is limited by policy and requires confirmation." }].map((item) => <div key={item.level}><span>{item.level}</span><strong>{item.label}</strong><p>{item.text}</p></div>)}</div></div></section>}
    <ActionBand title={page === "overview" ? "Follow the workflow, one decision at a time." : "Discuss what this workflow would mean for your team."} summary="Start with the sources, permission boundaries and deployment questions that matter in your environment." href="/demo?type=Demo" label="Request a demo" />
  </>;
}

function SecurityPage() {
  const items = [
    { icon: <GitBranchIcon />, label: "Data flows and deployment", text: "Map source evidence, model routes and operational paths. Hosting location alone does not prove that every flow stays within the same boundary." },
    { icon: <Fingerprint size={19} />, label: "Identity and access", text: "Review who can access an incident and which permissions are required. Exact mechanisms and release scope need product confirmation." },
    { icon: <SparkleIcon />, label: "AI data handling", text: "Confirm the approved model route, evidence handling and any provider-specific terms. Do not infer a universal retention or training commitment." },
    { icon: <ShieldCheck size={19} />, label: "Action safety", text: "Separate read-only investigation from proposed action, policy checks, approval and verification." },
    { icon: <FileText size={19} />, label: "Evidence and assurance", text: "Ask which records are retained and what approved assurance documents are available. No certification or test status is asserted here." },
    { icon: <UsersRound size={19} />, label: "Support and continuity", text: "Confirm access, expiry, revocation, update, backup and exit arrangements against approved customer documentation." },
  ];
  return <>
    <PageMeta title="Security and trust" description="Understand the questions to ask about Relyxus data boundaries, access, AI routes, actions and assurance material." />
    <PageIntro eyebrow="SECURITY / TRANSPARENCY FIRST" title="Understand the boundary before the badge." summary="A useful security review explains where data flows, who can act, and which commitments are backed by current evidence." tone="blue"><PrimaryLink href="/deployment">Compare deployment boundaries</PrimaryLink></PageIntro>
    <section className="security-intro section-pad" id="data-boundaries"><div className="container security-lead"><div><p className="eyebrow">A REVIEW, NOT A BADGE WALL</p><h2>Start with what your reviewers need to know.</h2><p className="lead-copy">This page walks through the questions security and architecture teams usually ask: where data flows, who can act, and how AI routes are handled. It is not a certification claim or audit report.</p><InlineAvailability>Discuss your review pack with us</InlineAvailability></div><CapabilityGraphic kind="security" /></div></section>
    <section className="security-topics section-pad"><div className="container"><SectionTitle eyebrow="QUESTIONS TO TAKE INTO REVIEW" title="Explain the mechanism, then verify its status." /><div className="security-topic-list">{items.map((item, index) => <article key={item.label}><span className="security-topic-number">0{index + 1}</span><span className="security-topic-icon">{item.icon}</span><div><h3>{item.label}</h3><p>{item.text}</p></div><InlineAvailability>Verify</InlineAvailability></article>)}</div></div></section>
    <section className="assurance-status-band"><div className="container assurance-status-inner"><span className="assurance-symbol"><ShieldCheck size={21} /></span><div><p className="eyebrow">ASSURANCE DOCUMENTS</p><h2>Need the security pack for your review?</h2><p>Ask us for the current documents under a proper access path. We will not invent certifications, issuers or review dates on this page.</p></div><Link className="button button-primary" href="/demo?type=Deployment">Discuss security review <ArrowRight size={16} /></Link></div></section>
    <ActionBand title="Make the boundary part of the evaluation." summary="Discuss model routing, source scope and the assurance material your reviewers need." href="/demo?type=Deployment" label="Discuss deployment" />
  </>;
}

function GitBranchIcon() { return <Gauge size={19} />; }
function SparkleIcon() { return <ShieldCheck size={19} />; }

export function FinancialServicesPage() {
  return <>
    <PageMeta title="Financial services" description="Explore an example payments incident through engineering and resilience perspectives, with control boundaries kept visible." />
    <PageIntro eyebrow="SOLUTIONS / FINANCIAL SERVICES" title="Keep incident response explainable when services matter most." summary="A disrupted payment journey carries engineering, customer and resilience questions. This example shows where evidence and human decisions fit—without promising a regulatory outcome." tone="blue"><PrimaryLink href="/demo?type=Demo">Discuss your context</PrimaryLink></PageIntro>
    <section className="financial-story section-pad"><div className="container financial-story-grid"><div><p className="eyebrow">PAYMENT SCENARIO / EXAMPLE</p><h2>Several signals. One decision to make.</h2><p className="lead-copy">An authorisation service raises a signal. A routing change occurred nearby. A downstream dependency may also be involved.</p><p>The point is not to declare a cause from timing alone. The responder needs a way to inspect evidence, understand what remains uncertain and keep any proposed change behind the organisation’s approval rules.</p><span className="example-flag"><CircleAlert size={15} /> Illustrative example; no customer or service data</span></div><div className="finance-storyboard"><div><span>01 / SERVICE</span><strong>Payment authorisation signal</strong><small>Impact is investigated, not assumed.</small></div><div><span>02 / EVIDENCE</span><strong>Recent change + dependency context</strong><small>Correlation is not confirmation.</small></div><div><span>03 / DECISION</span><strong>Proposal waits behind policy</strong><small>Required human roles remain visible.</small></div></div></div></section>
    <section className="financial-perspectives section-pad"><div className="container"><SectionTitle eyebrow="TWO DIRECTLY ACCESSIBLE PERSPECTIVES" title="Engineering and resilience share the same evidence." summary="Both views remain on this page; choose a section link to jump directly to the question you need to answer." /><div className="perspective-jumps"><a href="#engineering">For engineering <ArrowRight size={15} /></a><a href="#resilience">For resilience <ArrowRight size={15} /></a></div><div className="perspective-row" id="engineering"><span>ENGINEERING</span><div><h3>Can we understand the service path?</h3><p>Trace the alert, inspect the recent change and keep the affected dependency in view. Validate source permissions, supported versions and operational fit with the product owner.</p><TextLink href="/product/investigation">Explore investigation</TextLink></div></div><div className="perspective-row" id="resilience"><span>RESILIENCE</span><div><h3>Can we explain what was decided?</h3><p>Keep approval requirements, evidence provenance and report-draft responsibilities visible. Classification, human approval and submission remain distinct steps.</p><TextLink href="/product/reporting">Explore reporting</TextLink></div></div></div></section>
    <section className="financial-questions"><div className="container financial-question-grid"><Link href="/product/investigation"><span>01</span><h3>How does investigation work?</h3><ArrowRight size={16} /></Link><Link href="/product/governed-actions"><span>02</span><h3>Who approves changes?</h3><ArrowRight size={16} /></Link><Link href="/deployment"><span>03</span><h3>Where does the data go?</h3><ArrowRight size={16} /></Link><Link href="/security"><span>04</span><h3>What should security review?</h3><ArrowRight size={16} /></Link></div></section>
    <ActionBand title="Start with your incident context." summary="Tell us about the evidence you care about, the permission boundary you need, and how you deploy today." href="/demo" label="Request a demo" />
  </>;
}

export function CompanyPage() {
  return (
    <>
      <PageMeta
        title="Company"
        description="Meet the principles behind Relyxus: clearer evidence, visible human control, and honest deployment boundaries."
      />
      <PageIntro
        eyebrow="COMPANY / PRINCIPLES"
        title="Clarity becomes control."
        summary="Relyxus is built for teams that want explainable evidence and governed action—not a black box that quietly changes production."
        tone="ink"
      >
        <PrimaryLink href="/product">Explore the product</PrimaryLink>
      </PageIntro>
      <section className="company-page section-pad">
        <div className="container company-grid">
          <div>
            <p className="eyebrow">HOW WE WORK</p>
            <h2>Give people a clearer place to decide.</h2>
          </div>
          <div>
            <p className="lead-copy">
              We start with the incident a responder actually needs to understand, then keep the human decision boundary
              visible before anything can change a live service.
            </p>
            <p>
              Relyxus is developed by Apporine. For team introductions, commercial details or support routing, reach us
              through the contact page or enquiry form and we’ll connect you with the right people.
            </p>
            <InlineAvailability>Talk to us for the latest company details</InlineAvailability>
            <div className="company-rails">
              <span>Measured</span>
              <span>Candid</span>
              <span>Dependable</span>
            </div>
          </div>
        </div>
      </section>
      <ActionBand
        title="Explore the product story."
        summary="See the workflow and compare the deployment questions your team will want answered."
        href="/product"
        label="Explore product"
      />
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <PageMeta
        title="Contact"
        description="Contact Relyxus for a demo, Replay pilot, deployment discussion or pricing conversation. Enquiries go to the Apporine team."
      />
      <PageIntro
        eyebrow="CONTACT / TEAM"
        title="Talk to the people behind Relyxus."
        summary="Use the enquiry form or email us directly. Messages reach the Apporine team that looks after Relyxus."
        tone="blue"
      >
        <PrimaryLink href="/demo">Send an enquiry</PrimaryLink>
      </PageIntro>
      <section className="contact-options section-pad">
        <div className="container contact-option-grid">
          <article>
            <span>01 / EVALUATION</span>
            <h2>Demo or Replay pilot</h2>
            <p>Tell us about the workflow or historical incidents you’d like to walk through together.</p>
            <Link href="/demo?type=Replay%20pilot">
              Start a pilot enquiry <ArrowRight size={15} />
            </Link>
          </article>
          <article>
            <span>02 / ARCHITECTURE</span>
            <h2>Deployment or pricing</h2>
            <p>Ask about operating boundaries, hosting options or what shapes a commercial discussion.</p>
            <Link href="/demo?type=Deployment">
              Start a deployment enquiry <ArrowRight size={15} />
            </Link>
          </article>
          <article>
            <span>03 / DIRECT EMAIL</span>
            <h2>Prefer to write us yourself?</h2>
            <p>These inboxes receive website enquiries and replies come from the same team.</p>
            <div className="contact-email-list">
              {CONTACT_RECIPIENTS.map((email) => (
                <a key={email} href={`mailto:${email}`} className="contact-email-link">
                  <Mail size={15} aria-hidden="true" />
                  {email}
                </a>
              ))}
            </div>
          </article>
        </div>
        <p className="container contact-caveat">
          We aim to reply as soon as we can. Please avoid sending credentials or sensitive incident data by email.
        </p>
      </section>
    </>
  );
}

export function LegalPage({ page }: { page: "privacy" | "terms" | "accessibility" }) {
  if (page === "accessibility") {
    return (
      <>
        <PageMeta title="Accessibility" description="How the Relyxus website supports keyboard, touch, reduced motion and readable layouts." />
        <PageIntro
          eyebrow="ACCESSIBILITY / SITE APPROACH"
          title="Every decision should remain reachable."
          summary="This site is built for keyboard, touch, reduced motion and narrow screens. We keep improving it as the product grows."
          tone="blue"
        />
        <section className="legal-copy section-pad">
          <div className="container legal-copy-inner">
            <p className="eyebrow">HOW WE BUILD</p>
            <h2>Designed toward WCAG 2.2 AA, without over-claiming.</h2>
            <p>
              Pages use semantic regions, visible focus, text labels, reduced-motion rules and accessible form patterns. The
              incident walkthrough includes a readable transcript.
            </p>
            <h3>Still improving</h3>
            <p>
              We continue to review keyboard, screen-reader, zoom, contrast and touch behaviour. This page is not a formal
              conformance certificate.
            </p>
            <h3>Share an accessibility issue</h3>
            <p>If something is hard to use, tell us through the contact page or enquiry form and we’ll look into it.</p>
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
          title="Privacy"
          description="How Relyxus handles website enquiry details and what we do not collect on this marketing site."
        />
        <PageIntro
          eyebrow="COMPANY / PRIVACY"
          title="We only ask for what we need to reply."
          summary="Enquiry details are used to respond to your message. This marketing site does not load analytics or marketing trackers."
          tone="blue"
        />
        <section className="legal-copy section-pad">
          <div className="container legal-copy-inner">
            <p className="eyebrow">WEBSITE ENQUIRIES</p>
            <h2>What happens when you contact us</h2>
            <p>
              When you submit the demo or contact form, your name, work email, company and message details are emailed to
              the Apporine team at aoon.syed@apporine.com and bisma.idrees@apporine.com so we can respond.
            </p>
            <p>
              Optional marketing preference is recorded with the enquiry if you choose it. Please do not send passwords,
              secrets or sensitive incident data through the form.
            </p>
            <div className="limitation-box">
              <CircleAlert size={18} />
              <p>
                <strong>Need a fuller privacy notice?</strong> Ask us via the contact page and we can share the latest
                organisational wording for your review.
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
      <PageMeta title="Terms" description="Terms for evaluating Relyxus and using this marketing website." />
      <PageIntro
        eyebrow="COMPANY / TERMS"
        title="A simple note while we publish full terms."
        summary="This marketing site helps you evaluate Relyxus. Formal contract terms are agreed separately for paid engagements."
        tone="blue"
      />
      <section className="legal-copy section-pad">
        <div className="container legal-copy-inner">
          <p className="eyebrow">USING THIS SITE</p>
          <h2>What this page covers</h2>
          <p>
            Content on this website is for information and evaluation. It is not a quote, warranty or commitment about
            availability, certifications or regulatory outcomes. Commercial terms are confirmed in writing with your team.
          </p>
          <div className="limitation-box">
            <CircleAlert size={18} />
            <p>
              <strong>Questions about contracts?</strong> Use the enquiry form or email the team and we will point you to
              the right conversation.
            </p>
          </div>
          <TextLink href="/contact">Talk to us</TextLink>
        </div>
      </section>
    </>
  );
}
