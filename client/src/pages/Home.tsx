import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import {
  FounderNote,
  PageMeta,
  PrimaryLink,
  RegulatoryBand,
  TextLink,
} from "@/components/marketing/PublicSite";
import { ProductExplorer } from "@/components/marketing/Explorers";
import { pathCards, proofPoints } from "@/content/site";
import { track } from "@/lib/analytics";
import { pageMeta } from "@/content/meta";

type HubMode = "investigate" | "approve" | "record";

const hubModes: { key: HubMode; label: string; caption: string }[] = [
  {
    key: "investigate",
    label: "Investigate",
    caption: "Alerts, changes and logs flow into one investigation.",
  },
  {
    key: "approve",
    label: "Approve",
    caption:
      "A proposed fix waits at the gate for the people your policy names.",
  },
  {
    key: "record",
    label: "Record",
    caption: "Every step lands in an ordered record you can hand to audit.",
  },
];

const hubSources = [
  { label: "Alerts", tone: "coral", y: 54 },
  { label: "Logs and traces", tone: "cyan", y: 124 },
  { label: "Changes", tone: "violet", y: 194 },
  { label: "Tickets", tone: "amber", y: 264 },
] as const;

function IncidentHub() {
  const [mode, setMode] = useState<HubMode>("investigate");
  const active = hubModes.find(item => item.key === mode) ?? hubModes[0];
  return (
    <div className="hx-hub" data-mode={mode}>
      <svg
        viewBox="0 0 560 320"
        role="img"
        aria-label="Sources flow into one incident record. An approval gate and an audit trail flow out."
      >
        {hubSources.map(source => (
          <g key={source.label} className={`hx-source tone-${source.tone}`}>
            <path
              className="hx-lane"
              d={`M120 ${source.y} C190 ${source.y}, 190 160, 250 160`}
            />
            <path
              className="hx-flow"
              d={`M120 ${source.y} C190 ${source.y}, 190 160, 250 160`}
            />
            <rect
              x="8"
              y={source.y - 15}
              width="112"
              height="30"
              rx="15"
              className="hx-chip"
            />
            <circle cx="26" cy={source.y} r="4" className="hx-dot" />
            <text x="38" y={source.y + 4} className="hx-chip-text">
              {source.label}
            </text>
          </g>
        ))}
        <g className="hx-core">
          <circle cx="290" cy="160" r="46" className="hx-core-halo" />
          <circle cx="290" cy="160" r="34" className="hx-core-disc" />
          <text x="290" y="156" textAnchor="middle" className="hx-core-text">
            Incident
          </text>
          <text x="290" y="172" textAnchor="middle" className="hx-core-text">
            record
          </text>
        </g>
        <g className="hx-out hx-out-approve">
          <path className="hx-lane" d="M324 160 C380 160, 380 92, 430 92" />
          <path className="hx-flow" d="M324 160 C380 160, 380 92, 430 92" />
          <rect
            x="430"
            y="68"
            width="122"
            height="48"
            rx="14"
            className="hx-card"
          />
          <text x="446" y="89" className="hx-card-title">
            Approval gate
          </text>
          <text x="446" y="105" className="hx-card-sub">
            2 approvers
          </text>
        </g>
        <g className="hx-out hx-out-record">
          <path className="hx-lane" d="M324 160 C380 160, 380 228, 430 228" />
          <path className="hx-flow" d="M324 160 C380 160, 380 228, 430 228" />
          <rect
            x="430"
            y="204"
            width="122"
            height="48"
            rx="14"
            className="hx-card"
          />
          <text x="446" y="225" className="hx-card-title">
            Audit trail
          </text>
          <text x="446" y="241" className="hx-card-sub">
            Every step logged
          </text>
        </g>
      </svg>
      <div className="hx-hub-controls">
        <div role="group" aria-label="Show a stage" className="hx-toggle">
          {hubModes.map(item => (
            <button
              key={item.key}
              type="button"
              aria-pressed={mode === item.key}
              onClick={() => setMode(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p aria-live="polite">{active.caption}</p>
      </div>
    </div>
  );
}

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
        <IncidentHub />
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
            src="/product/overview-command-centre.png"
            alt="The Relyxus command centre listing live incidents, owners and pending approvals"
            loading="lazy"
            decoding="async"
          />
          <figcaption>Product screenshot with sample data</figcaption>
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
        <ProductExplorer />
      </div>
    </section>
  );
}

function Proof() {
  if (proofPoints.length === 0) return null;
  return (
    <section className="hx-section hx-proof">
      <div className="container">
        <h2 className="hx-h2">Where we are today</h2>
        <ul className="hx-proof-list">
          {proofPoints.map(point => (
            <li key={point.title}>
              <span className="hx-status">{point.status}</span>
              <h3>{point.title}</h3>
              <p>{point.detail}</p>
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
      <RegulatoryBand title="Regulators start the clock before you know the cause" />
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
