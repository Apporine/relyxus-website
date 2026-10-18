import { useEffect, useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import { PageMeta } from "@/components/marketing/PublicSite";
import { MiniStage } from "@/components/marketing/MiniStage";
import { Headline } from "@/components/marketing/Headline";
import { CtaPanel } from "@/components/home/Resolved";
import {
  SolutionMotion,
  type SolutionMotionKind,
} from "@/components/marketing/SolutionMotion";
import {
  caseByKey,
  chainSteps,
  teamBySlug,
  useCases,
  type Team,
  type UseCase,
} from "@/content/solutions";
import { pageMeta } from "@/content/meta";
import { useReveal } from "@/lib/motion";
import { track } from "@/lib/analytics";
import NotFound from "@/pages/NotFound";

const gbp = (value: number) =>
  value.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  });
const clock = (minutes: number) =>
  `${String(14 + Math.floor((5 + minutes) / 60)).padStart(2, "0")}:${String((5 + minutes) % 60).padStart(2, "0")}`;

/** Engineering: the likely causes, ranked by evidence. */
function EvidenceView({ useCase }: { useCase: UseCase }) {
  return (
    <ol className="rx-team-causes">
      {useCase.causes.map((c, i) => (
        <li
          key={c.name}
          className={i === 0 ? "is-top" : ""}
          style={{ "--score": c.score } as React.CSSProperties}
        >
          <span className="rx-label">#{i + 1}</span>
          <strong>{c.name}</strong>
          <span className="rx-bar" aria-hidden="true">
            <span />
          </span>
          <span className="rx-score">{c.score.toFixed(2)}</span>
        </li>
      ))}
    </ol>
  );
}

/** Resilience: the regulator timeline, drafted from the record. */
function TimelineView({ useCase }: { useCase: UseCase }) {
  const classified = useCase.classifiedAfter;
  const notice = Math.min(classified + 240, 24 * 60);
  const rows = [
    { at: "14:05", what: "Alert, the clock starts" },
    { at: clock(classified), what: "Classified as major" },
    { at: clock(notice), what: "First notice due · draft ready" },
    { at: "+72h", what: "Intermediate report due" },
    { at: "+1 month", what: "Final report due" },
  ];
  return (
    <ol className="rx-team-timeline">
      {rows.map((row, i) => (
        <li key={row.what} className={i === 2 ? "is-due" : ""}>
          <time>{row.at}</time>
          <span>{row.what}</span>
        </li>
      ))}
    </ol>
  );
}

/** Leadership: exposure in money and minutes. */
function ExposureView({ useCase }: { useCase: UseCase }) {
  const { atRisk, minutes, failed } = useCase.exposure;
  return (
    <dl className="rx-team-exposure">
      <div>
        <dt>At risk</dt>
        <dd className="is-lead">{gbp(atRisk)}</dd>
      </div>
      <div>
        <dt>Minutes to cause</dt>
        <dd>{minutes}</dd>
      </div>
      <div>
        <dt>Failed payments</dt>
        <dd>{failed.toLocaleString("en-GB")}</dd>
      </div>
      <div>
        <dt>Per minute</dt>
        <dd>{gbp(Math.round(atRisk / minutes))}</dd>
      </div>
    </dl>
  );
}

/** The team's view: the incident chain with this team's steps lit, plus its data. */
function TeamView({ team, initialCase }: { team: Team; initialCase: UseCase }) {
  const [active, setActive] = useState(initialCase);
  const [ref, inView] = useReveal<HTMLElement>();
  const id = useId();
  return (
    <section
      ref={ref}
      className={`rx-ink rx-team-view ${inView ? "is-in" : ""}`}
      aria-labelledby={`${id}-title`}
      data-readout
      data-readout-clock={team.clock}
      data-readout-status={active.label}
    >
      <div className="container">
        <Headline id={`${id}-title`} text={team.viewTitle} in={inView} />
        <div className="rx-team-tabs" role="tablist" aria-label="Incident type">
          {useCases.map(useCase => (
            <button
              key={useCase.key}
              type="button"
              role="tab"
              id={`${id}-${useCase.key}`}
              aria-selected={active.key === useCase.key}
              aria-controls={`${id}-panel`}
              onClick={() => {
                setActive(useCase);
                track("solution_tab", { team: team.slug, case: useCase.key });
              }}
            >
              {useCase.label}
            </button>
          ))}
        </div>
        <div
          className="rx-team-panel"
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-${active.key}`}
          key={active.key}
        >
          <ol className="rx-team-chain">
            {chainSteps.map((step, i) => (
              <li key={step} className={team.lit.includes(i) ? "is-lit" : ""}>
                <span className="rx-chain-node" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <strong>{step}</strong>
                <span>{active.steps[i]}</span>
              </li>
            ))}
          </ol>
          <div className="rx-glass rx-team-data">
            <span className="rx-label">Example · {active.label}</span>
            {team.view === "evidence" && <EvidenceView useCase={active} />}
            {team.view === "timeline" && <TimelineView useCase={active} />}
            {team.view === "exposure" && <ExposureView useCase={active} />}
            <SolutionMotion kind={team.view} compact className="rx-team-feed" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Outcomes({ team }: { team: Team }) {
  const [ref, inView] = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`rx-paper rx-team-outcomes ${inView ? "is-in" : ""}`}
      aria-label="Three outcomes"
      data-readout
      data-readout-clock={team.clock}
      data-readout-status="Outcomes"
    >
      <div className="container">
        <ul>
          {team.outcomes.map((o, i) => (
            <li
              key={o.line}
              className="rx-reveal"
              style={{ "--i": i } as React.CSSProperties}
            >
              <strong>{o.value}</strong>
              <span>{o.line}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const teamMotion: Record<Team["slug"], SolutionMotionKind> = {
  engineering: "evidence",
  resilience: "timeline",
  leadership: "exposure",
};

export function SolutionPage({ slug }: { slug: string }) {
  const team = teamBySlug(slug);
  if (!team) return <NotFound />;
  const meta = pageMeta[`/solutions/${team.slug}`];
  const initial = caseByKey(
    new URLSearchParams(window.location.search).get("case")
  );
  return (
    <div key={team.slug}>
      <PageMeta
        title={meta?.title ?? team.label}
        description={meta?.description ?? team.lede}
      />
      <MiniStage
        eyebrow={team.label}
        title={team.title}
        lede={team.lede}
        clock={team.clock}
        status={team.status}
        tint={team.tint}
        solutionMotion={teamMotion[team.slug]}
      >
        <Link
          href={team.cta.href}
          className="button button-primary"
          onClick={() =>
            track("cta_click", { place: "solution", cta: team.slug })
          }
        >
          {team.cta.label} <ArrowRight aria-hidden="true" />
        </Link>
      </MiniStage>
      <TeamView team={team} initialCase={initial} />
      <Outcomes team={team} />
      <CtaPanel
        title={team.close.title}
        line={team.close.line}
        cta={team.close.cta}
        place={`solution-${team.slug}`}
      />
    </div>
  );
}

/**
 * Retired Solutions routes. The incident pages are tabs on the team pages
 * now, and the old #engineering / #resilience anchors never reach the
 * server, so this has to be a client side replace.
 */
const retired: Record<string, string> = {
  "payment-failures": "/solutions/engineering?case=payment-failures",
  "third-party-outages": "/solutions/resilience?case=third-party-outages",
  "change-incidents": "/solutions/engineering?case=change-incidents",
};

export function RetiredSolution({ slug }: { slug?: string }) {
  const [, setLocation] = useLocation();
  useEffect(() => {
    const hash = window.location.hash;
    const target =
      (slug && retired[slug]) ||
      (hash === "#resilience"
        ? "/solutions/resilience"
        : "/solutions/engineering");
    setLocation(target, { replace: true });
  }, [slug, setLocation]);
  return null;
}

/** /solutions/:slug — a team page, or a redirect from a retired page. */
export function SolutionRoute({ slug }: { slug: string }) {
  if (slug in retired || slug === "financial-services")
    return <RetiredSolution slug={slug} />;
  return <SolutionPage slug={slug} />;
}
