import { useEffect, useState } from "react";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import {
  ActionBand,
  PageIntro,
  PageMeta,
  PrimaryLink,
} from "@/components/marketing/PublicSite";
import {
  IncidentWalkthrough,
  ProductExplorer,
} from "@/components/marketing/Explorers";
import { track } from "@/lib/analytics";
import { pageMeta } from "@/content/meta";

const productScreens = [
  {
    label: "Command Centre",
    caption: "See what needs attention before the queue grows.",
    src: "/product/overview-command-centre.png",
  },
  {
    label: "Incidents",
    caption: "Severity, impact and ownership in one list.",
    src: "/product/overview-incidents.png",
  },
  {
    label: "Approvals",
    caption: "Every pending decision, with who still needs to sign.",
    src: "/product/overview-approvals.png",
  },
  {
    label: "Services",
    caption: "Jump from an incident to the service it hit.",
    src: "/product/overview-services.png",
  },
] as const;

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
        summary="One investigation per incident. A person approves every change. The write-up is half done before the incident closes."
        tone="ink"
      >
        <PrimaryLink href="/demo">Request a demo</PrimaryLink>
        <a className="button button-secondary" href="#walkthrough">
          Follow an incident <ArrowRight size={16} aria-hidden="true" />
        </a>
      </PageIntro>

      <section className="hx-section product-explorer-section">
        <div className="container">
          <h2 className="hx-h2">What your team gets</h2>
          <ProductExplorer />
        </div>
      </section>

      <section className="hx-section">
        <div className="container">
          <h2 className="hx-h2">The product, with sample data</h2>
          <div className="hx-screens">
            {productScreens.map(screen => (
              <figure key={screen.label} className="hx-screen">
                <img
                  src={screen.src}
                  alt={`${screen.label} screen. ${screen.caption}`}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <strong>{screen.label}</strong>
                  <span>{screen.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="hx-section walkthrough-section" id="walkthrough">
        <div className="container">
          <h2 className="hx-h2">Follow one incident</h2>
          <p className="hx-sub">
            A payments authorisation failure, from alert to a reviewed decision.
          </p>
          <IncidentWalkthrough />
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
        summary="Three commitments up front. The detail goes to your reviewers in the security pack."
        tone="blue"
      >
        <PrimaryLink href="/demo?type=Security%20pack">
          Request the security pack
        </PrimaryLink>
      </PageIntro>

      <section className="hx-section" id="data-boundaries">
        <div className="container">
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
                Data flows, identity and access, how AI data is handled, action
                safety, assurance status and support arrangements. We share it
                with teams in an evaluation.
              </p>
              <p>
                We don’t claim any certification on this site. Ask us for the
                current status of each.
              </p>
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
        title="Start with your incident context"
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
        eyebrow="Company"
        title="We build Relyxus at Apporine"
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
            <p className="hx-inline-note">
              <ShieldCheck size={16} aria-hidden="true" /> Product images show
              sample data.
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
                <figcaption>
                  Severity, impact and the approval waiting on someone, in one
                  view.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <ActionBand
        title="Say hello"
        summary="We’re happy to talk about incident response, whether or not Relyxus is the right fit."
        href="/contact"
        label="Contact the team"
      />
    </>
  );
}
