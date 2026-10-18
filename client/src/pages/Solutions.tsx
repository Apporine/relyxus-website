import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Link, useLocation } from "wouter";
import { PageMeta, PrimaryLink } from "@/components/marketing/PublicSite";
import { Stamp } from "@/components/marketing/Ledger";
import { SolutionProofBlock } from "@/components/marketing/SolutionProofs";
import { solutionBySlug, solutions, type Solution } from "@/content/solutions";
import { pageMeta } from "@/content/meta";
import { track } from "@/lib/analytics";
import NotFound from "@/pages/NotFound";

/** Steps reveal one by one once the flow scrolls into view. */
function Flow({ steps }: { steps: readonly string[] }) {
  const ref = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    if (!("IntersectionObserver" in window)) {
      list.classList.add("is-in");
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      list.classList.add("is-in");
      observer.disconnect();
    });
    observer.observe(list);
    return () => observer.disconnect();
  }, []);
  return (
    <ol className="rx-flow" ref={ref}>
      {steps.map((step, index) => (
        <li key={step} style={{ transitionDelay: `${index * 140}ms` }}>
          <span className="rx-flow-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}

/** The shared six block template: hero, question, flow, proof, checklist, close. */
function SolutionTemplate({ solution }: { solution: Solution }) {
  const meta = pageMeta[`/solutions/${solution.slug}`];
  const ctaClick = (place: string) =>
    track("cta_click", { place, cta: solution.slug });
  return (
    <>
      <PageMeta
        title={meta?.title ?? solution.label}
        description={meta?.description ?? solution.paragraph}
      />
      <section className="rx-sol-hero rx-ink">
        <Stamp at="T+00:00" />
        <div className="container">
          <span className="rx-eyebrow">{solution.eyebrow}</span>
          <h1>{solution.title}</h1>
          <p className="rx-sol-lede">{solution.paragraph}</p>
          <div className="hx-actions">
            <Link
              href={solution.cta.href}
              className="button button-primary"
              onClick={() => ctaClick("solution-hero")}
            >
              {solution.cta.label} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="rx-sol-question rx-ivory">
        <Stamp at="T+00:04" />
        <div className="container">
          <span className="rx-eyebrow">The question this team asks</span>
          <h2 className="hx-h2">{solution.question}</h2>
          <p>{solution.questionNote}</p>
        </div>
      </section>

      <section className="rx-sol-flow rx-ivory" aria-label="How it runs">
        <div className="container">
          <span className="rx-eyebrow">How it runs in Relyxus</span>
          <Flow steps={solution.flow} />
        </div>
      </section>

      <section className="rx-sol-proof rx-ink">
        <Stamp at="T+00:19" />
        <div className="container">
          <h2 className="hx-h2">{solution.proofTitle}</h2>
          <p className="rx-sol-note">{solution.proofNote}</p>
          <SolutionProofBlock kind={solution.proof} />
        </div>
      </section>

      <section className="rx-sol-checklist rx-ivory">
        <Stamp at="T+00:31" />
        <div className="container">
          <h2 className="hx-h2">Three things to test in your demo</h2>
          <ol>
            {solution.checklist.map(item => (
              <li key={item}>
                <Check size={18} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rx-sol-close rx-ink">
        <Stamp at="Closed" />
        <div className="container rx-sol-close-grid">
          <h2 className="hx-h2">{solution.closing}</h2>
          <Link
            href={solution.cta.href}
            className="button button-primary"
            onClick={() => ctaClick("solution-close")}
          >
            {solution.cta.label} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

export function SolutionPage({ slug }: { slug: string }) {
  const solution = solutionBySlug(slug);
  if (!solution) return <NotFound />;
  return <SolutionTemplate key={solution.slug} solution={solution} />;
}

/** Old tab anchors now have their own pages. Fragments never reach the
 * server, so this has to be a client side replace rather than a 308. */
const legacyAnchors: Record<string, string> = {
  "#engineering": "/solutions/engineering",
  "#resilience": "/solutions/resilience",
};

/** Industry overview: the six pages, by team and by incident. */
export function FinancialServicesPage() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    const target = legacyAnchors[window.location.hash];
    if (target) setLocation(target, { replace: true });
  }, [setLocation]);

  const meta = pageMeta["/solutions/financial-services"];
  const columns = [
    { label: "By team", items: solutions.filter(s => s.column === "team") },
    {
      label: "By incident",
      items: solutions.filter(s => s.column === "incident"),
    },
  ];
  return (
    <>
      <PageMeta title={meta.title} description={meta.description} />
      <section className="rx-sol-hero rx-ink">
        <Stamp at="T+00:00" />
        <div className="container">
          <span className="rx-eyebrow">
            Built for banks, payments and fintech
          </span>
          <h1>{meta.h1}</h1>
          <p className="rx-sol-lede">{meta.body}</p>
          <div className="hx-actions">
            <PrimaryLink href="/demo?type=Demo">
              Book a 30 minute demo
            </PrimaryLink>
          </div>
        </div>
      </section>
      <section className="rx-sol-index rx-ivory" aria-label="Solutions">
        <div className="container rx-sol-index-grid">
          {columns.map(column => (
            <div key={column.label}>
              <span className="rx-eyebrow">{column.label}</span>
              <ul>
                {column.items.map(item => (
                  <li key={item.slug}>
                    <Link href={`/solutions/${item.slug}`}>
                      <strong>{item.label}</strong>
                      <span>{item.line}</span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
