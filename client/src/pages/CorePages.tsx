import { useEffect, useState } from "react";
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
import {
  CompanyArt,
  FinanceArt,
  SecurityArt,
} from "@/components/marketing/HeroArt";
import { ProductTour } from "@/components/marketing/ProductTour";
import { track } from "@/lib/analytics";
import { outageData, packPromise, perspectiveFacts } from "@/content/site";
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
        <PrimaryLink href="/demo">Request a demo</PrimaryLink>
        <a className="button button-secondary" href="#walkthrough">
          Follow an incident <ArrowRight size={16} aria-hidden="true" />
        </a>
      </PageIntro>

      <DataBand
        title="Every hour to cause is money"
        items={outageData.items}
        sources={outageData.sources}
      />

      <section className="hx-section">
        <div className="container">
          <h2 className="hx-h2">
            Five screens your team will live in during an incident
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
        title="See it on an incident like yours"
        summary="Tell us which tools your team uses and we’ll walk through an incident end to end."
        href="/demo?type=Demo"
        label="Request a demo"
      />
    </>
  );
}

const commitments = [
  {
    title: "Read-only by default",
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

const perspectives = {
  engineering: {
    label: "For engineering",
    title: "Get to the cause with every source in one view",
    text: "The alert, the recent change and the affected service sit side by side, so the on-call engineer starts from evidence instead of a search.",
    points: [
      "One investigation per incident",
      "Read-only until someone approves",
      "Sources open for your own check",
    ],
  },
  resilience: {
    label: "For resilience",
    title: "Have the record ready before anyone asks",
    text: "Timeline, owners and decisions are logged while the incident runs, so the report starts as a draft instead of a blank page.",
    points: [
      "Ordered timeline with sources attached",
      "Approvals recorded with who and when",
      "People classify, review and submit",
    ],
  },
} as const;

type PerspectiveKey = keyof typeof perspectives;

function hashPerspective(): PerspectiveKey {
  if (typeof window === "undefined") return "engineering";
  return window.location.hash === "#resilience" ? "resilience" : "engineering";
}

export function FinancialServicesPage() {
  const [active, setActive] = useState<PerspectiveKey>(hashPerspective);
  useEffect(() => {
    const onHash = () => setActive(hashPerspective());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const current = perspectives[active];
  return (
    <>
      <PageMeta
        title={pageMeta["/solutions/financial-services"].title}
        description={pageMeta["/solutions/financial-services"].description}
      />
      <PageIntro
        eyebrow="Financial services"
        title="When a payment fails, the whole firm is asking why"
        art={<FinanceArt />}
        summary="Engineering needs the cause. Resilience needs the record. Relyxus gives both the same evidence."
        tone="blue"
      >
        <PrimaryLink href="/demo?type=Demo">Request a demo</PrimaryLink>
      </PageIntro>

      <section className="hx-section" id="engineering">
        <div className="container">
          <div
            className="hx-tabs"
            role="group"
            aria-label="Choose a perspective"
          >
            {(Object.keys(perspectives) as PerspectiveKey[]).map(key => (
              <button
                key={key}
                type="button"
                aria-pressed={active === key}
                onClick={() => {
                  setActive(key);
                  track("perspective_tab", { perspective: key });
                }}
              >
                {perspectives[key].label}
              </button>
            ))}
          </div>
          <div className="hx-perspective" id="resilience">
            <h2 className="hx-h2">{current.title}</h2>
            <p>{current.text}</p>
            <aside className="hx-fact-card">
              <strong>{perspectiveFacts[active].value}</strong>
              <p>{perspectiveFacts[active].label}</p>
              <span className="hx-fact-payoff">
                {perspectiveFacts[active].payoff}
              </span>
              <a
                href={perspectiveFacts[active].source.href}
                target="_blank"
                rel="noreferrer"
              >
                {perspectiveFacts[active].source.label}
              </a>
            </aside>
            <ul className="hx-trust-lines">
              {current.points.map(point => (
                <li key={point}>
                  <Check size={18} aria-hidden="true" /> {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ActionBand
        title="Tell us the payments incident that hurt most"
        summary="Tell us about the tools you run and the incidents that hurt most."
        href="/demo?type=Demo"
        label="Request a demo"
      />
    </>
  );
}

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
        summary="We make incident response easier to explain, for the teams who have to explain it."
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

      <FoundersGrid />

      <ActionBand
        title="Say hello"
        summary="We’re happy to talk about incident response, whether or not Relyxus is the right fit."
        href="/contact"
        label="Contact the team"
      />
    </>
  );
}
