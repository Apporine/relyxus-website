import { ArrowRight, ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import {
  FounderNote,
  PageMeta,
  PrimaryLink,
  DataBand,
  TextLink,
} from "@/components/marketing/PublicSite";
import { BrainMap } from "@/components/marketing/BrainMap";
import { OutcomeStage } from "@/components/marketing/OutcomeStage";
import {
  pathCards,
  proofPoints,
  regulatoryClocks,
  regulatorySources,
} from "@/content/site";
import { track } from "@/lib/analytics";
import { pageMeta } from "@/content/meta";

function Hero() {
  return (
    <section className="hx-hero">
      <div className="container hx-hero-grid">
        <div className="hx-hero-copy">
          <span className="hx-pill">
            For incident, SRE and resilience teams at regulated firms
          </span>
          <h1>
            Find the cause of a payments incident, with every step{" "}
            <em>on the record.</em>
          </h1>
          <p className="hx-lede">
            Relyxus pulls evidence from the tools you already run into one
            investigation. Nothing changes in your systems until the right
            people approve it.
          </p>
          <div className="hx-actions">
            <Link
              href="/demo"
              className="button button-primary"
              onClick={() => track("cta_click", { place: "hero", cta: "demo" })}
            >
              Request a demo <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a
              href="#in-action"
              className="button button-outline"
              onClick={() =>
                track("cta_click", { place: "hero", cta: "see-it" })
              }
            >
              See it in action
            </a>
          </div>
        </div>
        <BrainMap />
      </div>
    </section>
  );
}

function PathCards() {
  return (
    <section className="hx-section" aria-labelledby="hx-path-title">
      <div className="container">
        <h2 id="hx-path-title" className="hx-h2">
          Start where your job starts
        </h2>
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
              <span className="hx-path-label">{card.label}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <span className="hx-path-go" aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function InAction() {
  return (
    <section className="hx-action" id="in-action">
      <div className="container">
        <div className="hx-action-head">
          <h2 className="hx-h2">One screen from first alert to approval</h2>
          <p>
            The command centre shows what is happening, who owns it and what is
            waiting on a decision.
          </p>
        </div>
        <figure className="hx-shot">
          <div className="hx-shot-bar" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <img
            src="/product/command-centre-attention.png"
            alt="The Relyxus command centre with a SEV1 incident and a production approval waiting for review"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}

function Outcomes() {
  return (
    <section className="hx-section product-explorer-section">
      <div className="container">
        <h2 className="hx-h2">What your team gets</h2>
        <OutcomeStage />
      </div>
    </section>
  );
}

function Proof() {
  if (proofPoints.length === 0) return null;
  return (
    <section className="hx-section hx-proof">
      <div className="container">
        <h2 className="hx-h2">See Relyxus at work</h2>
        <p className="hx-sub">
          The screens your team would use during an incident.
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
                <h3>{point.title}</h3>
                <p>{point.detail}</p>
              </div>
            </li>
          ))}
        </ul>
        <TextLink href="/demo?type=Replay%20pilot">
          Talk to us about a Replay pilot
        </TextLink>
      </div>
    </section>
  );
}

function TrustInBrief() {
  const lines = [
    "Read-only by default",
    "Your data stays in your environment",
    "A person approves before any action",
  ];
  return (
    <section className="hx-section hx-trust">
      <div className="container hx-trust-grid">
        <div>
          <h2 className="hx-h2">Built for a security review</h2>
          <ul className="hx-trust-lines">
            {lines.map(line => (
              <li key={line}>
                <Check size={18} aria-hidden="true" /> {line}
              </li>
            ))}
          </ul>
        </div>
        <div className="hx-trust-cta">
          <p>
            The full security pack covers data flows, identity and how we handle
            AI data. We share it with teams in an evaluation.
          </p>
          <PrimaryLink
            href="/demo?type=Security%20pack"
            className="hx-track-security"
          >
            Request the security pack
          </PrimaryLink>
        </div>
      </div>
    </section>
  );
}

function LeadMagnet() {
  return (
    <section className="hx-section">
      <div className="container">
        <div className="hx-magnet">
          <div>
            <span className="hx-pill">Free checklist</span>
            <h2 className="hx-h2">
              Incident-readiness checklist for regulated teams
            </h2>
            <p>
              Check your evidence, ownership and record-keeping before the next
              incident rather than during it.
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
    <section className="hx-closing">
      <div className="container hx-closing-grid">
        <h2 className="hx-h2">Book a demo or start a Replay pilot</h2>
        <div className="hx-actions">
          <Link
            href="/demo"
            className="button button-primary"
            onClick={() =>
              track("cta_click", { place: "closing", cta: "demo" })
            }
          >
            Request a demo <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/security" className="hx-quiet-link">
            <ShieldCheck size={16} aria-hidden="true" /> Read the security
            summary
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
      <Hero />
      <PathCards />
      <DataBand
        title="Regulators start the clock before you know the cause"
        items={regulatoryClocks}
        sources={regulatorySources}
        note="Which rules apply depends on your firm."
      />
      <InAction />
      <Outcomes />
      <Proof />
      <FounderNote />
      <TrustInBrief />
      <LeadMagnet />
      <ClosingBand />
    </>
  );
}
