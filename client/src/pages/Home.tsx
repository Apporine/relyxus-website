import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Link } from "wouter";
import {
  FounderNote,
  FoundersGrid,
  PageMeta,
  PilotResult,
  ProofStrip,
  PrimaryLink,
  DataBand,
  TextLink,
} from "@/components/marketing/PublicSite";
import { OutcomeStage } from "@/components/marketing/OutcomeStage";
import {
  HeroScreen,
  SecondApprover,
  SourceStream,
  Stamp,
} from "@/components/marketing/Ledger";
import {
  pathCards,
  proofPoints,
  regulatoryClocks,
  regulatorySources,
  replayExplainer,
} from "@/content/site";
import { track } from "@/lib/analytics";
import { pageMeta } from "@/content/meta";

function Hero() {
  return (
    <section className="hx-hero rx-ink">
      <Stamp at="T+00:00" />
      <div className="container hx-hero-grid">
        <div className="hx-hero-copy">
          <span className="hx-pill">
            For incident, SRE and resilience teams at regulated firms
          </span>
          <h1>Know why payments failed before the regulator asks.</h1>
          <p className="hx-lede">{pageMeta["/"].body}</p>
          <div className="hx-actions">
            <Link
              href="/demo"
              className="button button-primary"
              onClick={() => track("cta_click", { place: "hero", cta: "demo" })}
            >
              Book a 30 minute demo <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a
              href="#in-action"
              className="button button-outline"
              onClick={() =>
                track("cta_click", { place: "hero", cta: "see-it" })
              }
            >
              Watch an incident unfold
            </a>
          </div>
        </div>
        <HeroScreen />
      </div>
    </section>
  );
}

function RoleGlyph({ kind }: { kind: "converge" | "clock" | "gate" }) {
  return (
    <svg className="rg" viewBox="0 0 120 120" aria-hidden="true">
      {kind === "converge" && (
        <>
          {[24, 60, 96].map((y, index) => (
            <g key={y}>
              <path className="hx-lane" d={`M10 ${y} C50 ${y}, 54 60, 90 60`} />
              <path
                className="hx-flow"
                style={{ animationDelay: `${index * 0.3}s` }}
                d={`M10 ${y} C50 ${y}, 54 60, 90 60`}
              />
            </g>
          ))}
          <circle className="tl-dot" cx="96" cy="60" r="10" />
        </>
      )}
      {kind === "clock" && (
        <>
          <circle className="rg-track" cx="60" cy="60" r="42" />
          <circle className="rg-count" cx="60" cy="60" r="42" />
          <text className="rg-text" x="60" y="68" textAnchor="middle">
            4h
          </text>
        </>
      )}
      {kind === "gate" && (
        <>
          <path className="hx-lane" d="M8 60 H112" />
          <rect
            className="tl-gate"
            x="56"
            y="20"
            width="8"
            height="80"
            rx="4"
          />
          <circle className="tl-card" cx="22" cy="60" r="9" />
        </>
      )}
    </svg>
  );
}

function PathCards() {
  return (
    <section className="hx-section rx-ivory" aria-labelledby="hx-path-title">
      <Stamp at="T+00:11" />
      <div className="container">
        <h2 id="hx-path-title" className="hx-h2">
          One incident. Three teams who have to answer for it.
        </h2>
        <p className="hx-sub">
          Same alert, three questions. Relyxus answers all three from one set of
          evidence.
        </p>
        <div className="hx-paths">
          {pathCards.map(card => (
            <Link
              key={card.key}
              href={card.href}
              className={`hx-path hx-path-${card.key}`}
              onClick={() =>
                track("path_card_click", { path: card.key, place: "home" })
              }
            >
              <RoleGlyph kind={card.glyph} />
              <span className="hx-path-label">{card.label}</span>
              <h3>{card.question}</h3>
              <p>{card.answer}</p>
              <span className="hx-path-cta">
                {card.cta} <ArrowUpRight size={15} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The three promises, stated in full once on the page and nowhere else. */
const tests = [
  {
    title: "Read only by default",
    text: "Check the access Relyxus asks for. Investigating needs read access only, so looking never changes anything.",
  },
  {
    title: "Nothing runs without an approver",
    text: "Try to push a change through. It waits for the people your policy names, and records who said yes.",
  },
  {
    title: "The record builds as you go",
    text: "Ask for the timeline mid incident. It already exists, in order, with every source behind it.",
  },
] as const;

function ReplayBand() {
  return (
    <section className="hx-section rx-ivory" id="test-us">
      <Stamp at="T+72:00" />
      <div className="container">
        <h2 className="hx-h2 hx-lead-heading">
          Don’t take our word for it. Test three things.
        </h2>
        <p className="hx-sub">
          In a demo or a Replay pilot, ask us to prove each one on an incident
          you already know.
        </p>
        <div className="hx-commitments">
          {tests.map((test, index) => (
            <article key={test.title}>
              <span className="hx-test-index">0{index + 1}</span>
              <h3>{test.title}</h3>
              <p>{test.text}</p>
            </article>
          ))}
        </div>
        <PilotResult />
        <div className="hx-magnet hx-test-offer">
          <div>
            <span className="hx-pill">Replay pilot</span>
            <h2 className="hx-h2">
              Prove it on incidents you’ve already closed.
            </h2>
            <p>{replayExplainer}</p>
          </div>
          <PrimaryLink
            href="/demo?type=Replay%20pilot"
            className="hx-track-replay"
          >
            Start a Replay pilot
          </PrimaryLink>
        </div>
      </div>
    </section>
  );
}

function Outcomes() {
  return (
    <section
      className="hx-section product-explorer-section rx-ink"
      id="in-action"
    >
      <Stamp at="T+00:19" />
      <div className="container">
        <h2 className="hx-h2">What changes in your next incident</h2>
        <OutcomeStage />
      </div>
    </section>
  );
}

function Proof() {
  if (proofPoints.length === 0) return null;
  return (
    <section className="hx-section hx-proof rx-ivory">
      <Stamp at="T+00:31" />
      <div className="container">
        <h2 className="hx-h2">What your team sees at 3am</h2>
        <p className="hx-sub">
          The three screens the whole team works from during an incident.
        </p>
        <ul className="hx-proof-list">
          {proofPoints.map(point => (
            <li key={point.title}>
              {point.image && (
                <img
                  src={point.image.src}
                  alt={point.image.alt}
                  loading="lazy"
                  decoding="async"
                />
              )}
              <div className="hx-proof-text">
                <span className="rx-caption">
                  {point.title.toLowerCase().replaceAll(" ", "-")}
                </span>
                <h3>{point.title}</h3>
                <p>{point.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Trust ticks, then the readiness checklist as a document cover. */
function TrustAndChecklist() {
  const lines = [
    "Runs in your environment",
    "Security pack for your reviewers",
  ];
  return (
    <section className="rx-trust rx-ink" aria-label="Security in brief">
      <div className="container">
        <div className="hx-trustbar-inner">
          <ul>
            {lines.map(line => (
              <li key={line}>
                <Check size={18} aria-hidden="true" /> {line}
              </li>
            ))}
          </ul>
          <TextLink href="/demo?type=Security%20pack">
            Request the security pack
          </TextLink>
        </div>
        <div className="hx-magnet">
          <div>
            <span className="hx-pill">Free checklist</span>
            <h2 className="hx-h2">
              Could you file a DORA first notice within 4 hours?
            </h2>
            <p>
              The incident readiness checklist for UK and EU resilience teams.
              Find the gaps in evidence, ownership and records before an auditor
              or regulator does.
            </p>
          </div>
          <PrimaryLink href="/demo?type=Readiness%20checklist">
            Get the checklist
          </PrimaryLink>
        </div>
      </div>
    </section>
  );
}

function ClosingBand() {
  return (
    <section className="hx-closing rx-ink">
      <Stamp at="Closed" />
      <div className="container hx-closing-grid">
        <div>
          <h2 className="hx-h2">
            Show us the incident that hurt most. We’ll show you how Relyxus
            would have handled it.
          </h2>
          <p className="hx-closing-note">
            Prefer to test it yourself?{" "}
            <Link href="/demo?type=Replay%20pilot">Start a Replay pilot</Link>.
            We replay a few past incidents with read only access.
          </p>
        </div>
        <div className="hx-actions">
          <Link
            href="/demo"
            className="button button-primary"
            onClick={() =>
              track("cta_click", { place: "closing", cta: "demo" })
            }
          >
            Book a 30 minute demo <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <PageMeta
        title={pageMeta["/"].title}
        description={pageMeta["/"].description}
        keywords="Relyxus, incident investigation, payments incidents, operational resilience, SRE, regulated firms"
      />
      {/* Dark and ivory chapters alternate, never more than two dark in a row. */}
      <Hero />
      <ProofStrip ground="ink" withSources={false} rulesAsCitations />
      <SourceStream />
      <PathCards />
      <Outcomes />
      <SecondApprover />
      <Proof />
      <DataBand
        title={<>Regulators start the clock before you know the cause</>}
        items={regulatoryClocks}
        sources={regulatorySources}
        note="Which rules apply depends on your firm."
        footnote="Relyxus timestamps every fact from the first alert, so each deadline starts with a draft, not a blank page."
        stamp="T+04:00"
      />
      <ReplayBand />
      <FounderNote ground="ivory" stamp="T+1 month" />
      <FoundersGrid />
      <TrustAndChecklist />
      <ClosingBand />
    </>
  );
}
