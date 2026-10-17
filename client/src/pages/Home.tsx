import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  GitBranch,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "wouter";
import {
  PageMeta,
  PrimaryLink,
  SectionTitle,
  TextLink,
} from "@/components/marketing/PublicSite";
import {
  DeploymentExplorer,
  IncidentWalkthrough,
  ProductExplorer,
} from "@/components/marketing/Explorers";
import { resources } from "@/content/site";

function HeroEvidence() {
  return (
    <div
      className="hero-visual"
      role="group"
      aria-label="Example incident evidence panel; no production system is connected"
    >
      <svg
        className="hero-signal-network"
        viewBox="0 0 640 540"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="rx-flow-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ff826d" />
            <stop offset=".42" stopColor="#59d5ff" />
            <stop offset="1" stopColor="#69f0cb" />
          </linearGradient>
        </defs>
        <path
          className="hero-signal-track"
          d="M-20 122h72c65 0 61 82 131 82h82c76 0 81 54 153 54h173"
        />
        <path
          className="hero-signal-track track-violet"
          d="M-20 366h91c52 0 58-90 128-90h66c68 0 71-18 124-18h173"
        />
        <path
          className="hero-signal-track"
          d="M108 -18v53c0 54 81 53 81 119v47"
        />
        <circle className="hero-signal-node" cx="50" cy="122" r="4" />
        <circle
          className="hero-signal-node node-violet"
          cx="338"
          cy="204"
          r="4"
        />
        <circle
          className="hero-signal-node node-gate"
          cx="533"
          cy="258"
          r="5"
        />
        <circle className="hero-signal-node" cx="70" cy="366" r="3" />
      </svg>
      <div className="visual-topline">
        <span className="visual-mark">
          <span /> Relyxus / Incident view
        </span>
        <span className="visual-example">EXAMPLE INCIDENT</span>
      </div>
      <div className="visual-incident-title">
        <span className="severity-line" />
        <div>
          <small>PAYMENTS / SERVICE SIGNAL</small>
          <strong>Payment authorisation degraded</strong>
        </div>
        <span className="status-pill">Investigating</span>
      </div>
      <div className="visual-evidence-list">
        <div className="visual-evidence-row">
          <span className="evidence-icon alert-icon">
            <CircleHelp size={15} />
          </span>
          <div>
            <small>ALERT SIGNAL</small>
            <strong>Authorisation errors observed</strong>
          </div>
          <span className="time-mark">09:14</span>
        </div>
        <div className="visual-evidence-row">
          <span className="evidence-icon change-icon">
            <GitBranch size={15} />
          </span>
          <div>
            <small>RECENT CHANGE</small>
            <strong>billing-router · release 2.8.1</strong>
          </div>
          <span className="time-mark">09:08</span>
        </div>
      </div>
      <div className="visual-hypothesis">
        <div className="ai-label">
          <Sparkles size={13} /> HYPOTHESIS / NEEDS REVIEW
        </div>
        <strong>Recent routing change may be relevant.</strong>
        <span>Correlation is not confirmation. Inspect the source.</span>
        <span className="hypothesis-line" />
      </div>
      <div className="visual-gate">
        <span className="gate-rule" />
        <span className="gate-node">
          <ShieldCheck size={17} />
        </span>
        <div>
          <small>HUMAN REVIEW REQUIRED</small>
          <strong>Proposed action is waiting</strong>
        </div>
        <span className="waiting-tag">No action taken</span>
      </div>
      <div className="visual-note">
        <span className="visual-record-dot" /> Evidence remains attached to the
        incident record
      </div>
    </div>
  );
}

function IncidentContext() {
  return (
    <section className="context-section section-pad" id="context">
      <div className="container context-layout">
        <div className="context-copy">
          <p className="eyebrow">
            THE FIRST QUESTION ISN’T “WHAT’S THE METRIC?”
          </p>
          <h2>When the alerts arrive, start with context.</h2>
          <p className="lead-copy">
            A payments service raises an alert. A deployment happened minutes
            earlier. A dependency sits in the middle. The responder needs the
            threads—not another place to watch them.
          </p>
          <p>
            In this example, Relyxus brings the fragments together so a person
            can inspect the evidence and decide what deserves attention next.
          </p>
          <TextLink href="/product/investigation">
            How investigation stays evidence-linked
          </TextLink>
        </div>
        <div
          className="context-evidence"
          aria-label="Example incident evidence fragments"
        >
          <div className="context-evidence-heading">
            <span>PAYMENT INCIDENT / EXAMPLE</span>
            <span>09:14 UTC</span>
          </div>
          <article className="evidence-fragment fragment-alert">
            <div className="fragment-top">
              <span>01 / SERVICE ALERT</span>
              <span className="fragment-dot" />
            </div>
            <h3>Payment authorisation errors observed</h3>
            <p>A signal from the payment API needs context.</p>
            <div className="fragment-source">
              Source fragment <span>Illustrative</span>
            </div>
          </article>
          <article className="evidence-fragment fragment-change">
            <div className="fragment-top">
              <span>02 / RECENT DEPLOYMENT</span>
              <span className="fragment-square" />
            </div>
            <h3>billing-router · release 2.8.1</h3>
            <p>A recent change is a lead to investigate, not a proven cause.</p>
            <div className="fragment-source">
              Change record <span>Illustrative</span>
            </div>
          </article>
          <article className="evidence-fragment fragment-dependency">
            <div className="fragment-top">
              <span>03 / AFFECTED DEPENDENCY</span>
              <span className="fragment-ring" />
            </div>
            <h3>ledger-adapter</h3>
            <p>Dependency context helps narrow the next question.</p>
            <div className="fragment-source">
              Service map <span>Illustrative</span>
            </div>
          </article>
          <svg
            className="evidence-connections"
            viewBox="0 0 520 320"
            fill="none"
            aria-hidden="true"
          >
            <path d="M30 64h155c50 0 55 53 111 53h187" />
            <path d="M30 163h135c57 0 66-46 121-46" />
            <path d="M30 264h151c52 0 68-93 105-93h206" />
            <path d="M473 102v123" />
            <circle cx="473" cy="162" r="12" />
            <circle cx="473" cy="162" r="4" />
          </svg>
          <span className="context-footnote">
            Service and release names are illustrative; no customer systems are
            connected.
          </span>
        </div>
      </div>
    </section>
  );
}

function ControlSummary() {
  const items = [
    {
      number: "01",
      icon: <CircleHelp size={18} />,
      title: "Evidence-linked investigation",
      text: "Inspect what supports a likely explanation.",
      href: "/product/investigation",
    },
    {
      number: "02",
      icon: <ShieldCheck size={18} />,
      title: "Policy-controlled action",
      text: "Keep a human decision between proposal and execution.",
      href: "/product/investigation#governed-actions",
    },
    {
      number: "03",
      icon: <GitBranch size={18} />,
      title: "Deployment choices",
      text: "Make the platform and model boundary visible.",
      href: "/deployment",
    },
  ];
  return (
    <section className="control-summary">
      <div className="container control-summary-grid">
        {items.map(item => (
          <Link
            href={item.href}
            key={item.number}
            className="control-principle"
          >
            <span className="principle-number">{item.number}</span>
            <span className="principle-icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <span className="principle-arrow">
              <ArrowUpRight size={17} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ReplayTeaser() {
  return (
    <section className="replay-teaser section-pad">
      <div className="container replay-layout">
        <div className="replay-copy">
          <p className="eyebrow">LEARN WITH REPLAY</p>
          <h2>Evaluate the reasoning on incidents you already know.</h2>
          <p className="lead-copy">
            Agree the scope. Connect approved read-only sources. Review
            historical incidents, including misses and incomplete evidence.
          </p>
          <p>
            Replay is a conversation about what the evidence supports—not a
            promise of guaranteed accuracy or remediation.
          </p>
          <PrimaryLink href="/replay?type=Replay%20pilot">
            Discuss a Replay pilot
          </PrimaryLink>
        </div>
        <div className="replay-scorecard">
          <div className="scorecard-head">
            <div>
              <span className="scorecard-kicker">
                EVALUATION / SAMPLE STRUCTURE
              </span>
              <strong>What would you review?</strong>
            </div>
            <span className="illustrative-stamp">ILLUSTRATIVE</span>
          </div>
          <div className="scorecard-row">
            <span>
              <Check size={15} /> Known cause and evidence
            </span>
            <span>Define the basis</span>
          </div>
          <div className="scorecard-row">
            <span>
              <Clock3 size={15} /> Time to hypothesis
            </span>
            <span>Agree start &amp; end</span>
          </div>
          <div className="scorecard-row">
            <span>
              <CircleHelp size={15} /> Misses and exclusions
            </span>
            <span>Keep them visible</span>
          </div>
          <div className="scorecard-row">
            <span>
              <ShieldCheck size={15} /> Model and environment
            </span>
            <span>Record conditions</span>
          </div>
          <p className="scorecard-foot">
            No scores shown. Scope, method and release must be confirmed with
            the product team.
          </p>
        </div>
      </div>
    </section>
  );
}

function ResourceStrip() {
  return (
    <section className="resource-strip section-pad" id="resources">
      <div className="container">
        <div className="resource-strip-head">
          <SectionTitle
            eyebrow="KEEP EVALUATING"
            title="Good questions make better pilots."
            summary="Start with the boundaries, the method and the human decision—not a logo wall."
          />
          <TextLink href="/resources">Browse all resources</TextLink>
        </div>
        <div className="resource-strip-list">
          {resources.map((resource, index) => (
            <Link
              href={`/resources/${resource.slug}`}
              className="resource-row"
              key={resource.slug}
            >
              <span className="resource-row-index">0{index + 1}</span>
              <div>
                <span className="resource-category">
                  {resource.category} · {resource.time}
                </span>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
              </div>
              <ArrowUpRight size={19} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <PageMeta
        title="Relyxus"
        description="Relyxus brings evidence from your tools into one investigation, explains likely causes, and keeps proposed actions behind policy and human approval."
        keywords="Relyxus, AI incident response, governed actions, incident investigation, regulated teams, SRE, security"
      />
      <section className="hero-section">
        <div className="container hero-layout">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="eyebrow-line" />
              AI INCIDENT RESPONSE FOR REGULATED TEAMS
            </p>
            <h1>
              Understand the incident. <em>Control what happens next.</em>
            </h1>
            <p className="hero-summary">
              Relyxus brings evidence from your existing tools into one
              investigation, explains likely causes and routes proposed actions
              through your policies.
            </p>
            <div className="hero-actions">
              <PrimaryLink href="/demo">Request a demo</PrimaryLink>
              <a className="button button-outline" href="#walkthrough">
                Explore an incident <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="hero-assurance">
              <span className="assurance-mark">
                <ShieldCheck size={15} />
              </span>
              <span>
                Read-only by default.{" "}
                <strong>Actions follow your approval rules.</strong>
              </span>
            </div>
            <div className="hero-status">
              <span className="status-line" />A clearer path from evidence to
              decision
            </div>
          </div>
          <HeroEvidence />
        </div>
        <div className="hero-footer container">
          <span>EXPLAINABLE BY DESIGN</span>
          <span>
            01 — EVIDENCE&nbsp;&nbsp;&nbsp; 02 — REVIEW&nbsp;&nbsp;&nbsp; 03 —
            RECORD
          </span>
        </div>
      </section>
      <ControlSummary />
      <IncidentContext />
      <section className="walkthrough-section section-pad" id="walkthrough">
        <div className="container">
          <div className="walkthrough-intro">
            <SectionTitle
              eyebrow="INCIDENT WALKTHROUGH / EXAMPLE"
              title="From first signal to a reviewed outcome."
              summary="Follow one example incident. Each step is user-controlled; this walkthrough is not connected to production."
            />
            <div className="walkthrough-note">
              <span className="note-marker" />
              No production systems, commands or customer records are connected.
            </div>
          </div>
          <IncidentWalkthrough />
        </div>
      </section>
      <section className="product-explorer-section section-pad">
        <div className="container">
          <SectionTitle
            eyebrow="FOUR OUTCOMES. ONE CONTROL MODEL."
            title="The response stays explainable at every step."
            summary="Choose a moment in the workflow to see the question it helps a team answer."
          />
          <ProductExplorer />
        </div>
      </section>
      <DeploymentExplorer compact />
      <section className="trust-section section-pad">
        <div className="container trust-layout">
          <div className="trust-intro">
            <p className="eyebrow">TRUST THROUGH EXPLANATION</p>
            <h2>Show the mechanism behind the claim.</h2>
            <p>
              Evidence stays visible. Action permissions stay separate. People
              review what becomes a report. Deployment choices are described as
              boundaries you can inspect—not vague promises.
            </p>
            <TextLink href="/security">Explore security and trust</TextLink>
          </div>
          <div className="trust-list">
            <Link href="/product/investigation">
              <span>01</span>
              <div>
                <h3>Read-only investigation</h3>
                <p>See what is gathered and what remains uncertain.</p>
              </div>
              <ChevronRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/product/investigation#governed-actions">
              <span>02</span>
              <div>
                <h3>Governed action</h3>
                <p>Review scope, policy and approval before action.</p>
              </div>
              <ChevronRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/product/reporting">
              <span>03</span>
              <div>
                <h3>Evidence traceability</h3>
                <p>Keep an ordered record of the decision and its sources.</p>
              </div>
              <ChevronRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/deployment">
              <span>04</span>
              <div>
                <h3>Deployment boundaries</h3>
                <p>Ask where the platform and model run—and what may leave.</p>
              </div>
              <ChevronRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <ReplayTeaser />
      <ResourceStrip />
      <section className="closing-band">
        <div className="container closing-layout">
          <div>
            <p className="eyebrow">A CONVERSATION WITH CONTEXT</p>
            <h2>See how Relyxus would fit your team.</h2>
            <p>
              Walk through an incident, discuss your deployment requirements and
              agree what a useful evaluation would measure.
            </p>
          </div>
          <div className="closing-actions">
            <PrimaryLink href="/demo">Request a demo</PrimaryLink>
            <Link href="/security" className="closing-quiet">
              Still evaluating? Visit Security <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="closing-index">RX / 01—08</div>
        </div>
      </section>
    </>
  );
}
