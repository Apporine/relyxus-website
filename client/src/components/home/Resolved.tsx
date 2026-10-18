import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { Headline } from "@/components/marketing/Headline";
import { SignalCore } from "@/components/core/SignalCore";
import { closing, compare, deadline, prove } from "@/content/home";
import { regulatorySources, proofStrip } from "@/content/site";
import { useLessMotion, useReveal } from "@/lib/motion";
import { track } from "@/lib/analytics";

const FOUR_HOURS = 4 * 60 * 60;
const hms = (seconds: number) =>
  [Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), seconds % 60]
    .map(n => String(n).padStart(2, "0"))
    .join(":");

/** Counts a number up once, over 1.2 s, when it scrolls into view. */
function CountUp({ value, run }: { value: number; run: boolean }) {
  const less = useLessMotion();
  const [shown, setShown] = useState(less ? value : 0);
  useEffect(() => {
    if (!run || less) {
      setShown(less ? value : 0);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1200);
      setShown(Math.round(value * (1 - Math.pow(1 - t, 4))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, less, value]);
  return <>{shown}</>;
}

/** 7 · Resolve: the DORA 4 hour first notice, counting down. */
export function Deadline() {
  const [ref, inView] = useReveal<HTMLElement>();
  const less = useLessMotion();
  const [left, setLeft] = useState(FOUR_HOURS);
  useEffect(() => {
    if (!inView || less) return;
    const id = window.setInterval(() => setLeft(s => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [inView, less]);
  const metric = proofStrip.metric;
  return (
    <section
      ref={ref}
      className={`rx-paper rx-resolved rx-deadline ${inView ? "is-in" : ""}`}
      aria-labelledby="rx-deadline-title"
      data-readout
      data-readout-clock="T+04:00"
      data-readout-status="First notice due"
    >
      <div className="container">
        <Headline id="rx-deadline-title" text={deadline.title} in={inView} />
        <p className="rx-reveal" style={{ "--i": 2 } as React.CSSProperties}>
          {deadline.line}
        </p>
        <div
          className="rx-countdown rx-reveal"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <div className="rx-countdown-bar" aria-hidden="true">
            <span />
          </div>
          <span className="rx-label">First notice due in</span>
          <span className="rx-countdown-time" aria-label="4 hours">
            {hms(left)}
          </span>
        </div>
        <dl className="rx-deadline-numbers">
          {deadline.numbers.map((n, i) => (
            <div
              key={n.label}
              className="rx-reveal"
              style={{ "--i": 4 + i } as React.CSSProperties}
            >
              <dt>
                <span className="rx-clock-num" aria-hidden="true">
                  <CountUp value={n.value} run={inView} />
                </span>
                <span className="rx-clock-unit">{n.unit}</span>
                <span className="sr-only">
                  {n.value} {n.unit}
                </span>
              </dt>
              <dd>{n.label}</dd>
            </div>
          ))}
        </dl>
        <p className="rx-source-note">
          {deadline.uk}{" "}
          {metric?.href && (
            <a href={metric.href} target="_blank" rel="noreferrer">
              FCA PS26/2
            </a>
          )}
          . Sources:{" "}
          {regulatorySources.slice(0, 2).map((source, i) => (
            <span key={source.href}>
              {i > 0 && ", "}
              <a href={source.href} target="_blank" rel="noreferrer">
                {source.label}
              </a>
            </span>
          ))}
          .
        </p>
      </div>
    </section>
  );
}

/** 8 · Compare: Relyxus against the manual war room and generic AIOps. */
export function Compare() {
  const [ref, inView] = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`rx-paper rx-resolved rx-compare ${inView ? "is-in" : ""}`}
      aria-labelledby="rx-compare-title"
      data-readout
      data-readout-clock="T+04:00"
      data-readout-status="Compare"
    >
      <div className="container">
        <Headline id="rx-compare-title" text={compare.title} in={inView} />
        <div
          className="rx-compare-scroll"
          role="region"
          aria-label="Comparison table"
          tabIndex={0}
        >
          <table className="rx-compare-table">
            <thead>
              <tr>
                <td />
                {compare.columns.map((column, i) => (
                  <th
                    key={column}
                    scope="col"
                    className={i === 0 ? "is-relyxus" : ""}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compare.rows.map((row, r) => (
                <tr
                  key={row.label}
                  className="rx-reveal"
                  style={{ "--i": r + 2 } as React.CSSProperties}
                >
                  <th scope="row">{row.label}</th>
                  {row.cells.map((cell, i) => (
                    <td key={cell} className={i === 0 ? "is-relyxus" : ""}>
                      {i === 0 && <Check size={14} aria-hidden="true" />} {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/** 9 · Prove it: three steps, the active one tinted. */
export function Prove() {
  const [ref, inView] = useReveal<HTMLElement>();
  const less = useLessMotion();
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  // Walks the steps once on arrival, unless the visitor picks one.
  useEffect(() => {
    if (!inView || less || touched) return;
    const ids = [1, 2].map((step, i) =>
      window.setTimeout(() => setActive(step), 1400 * (i + 1))
    );
    return () => ids.forEach(id => window.clearTimeout(id));
  }, [inView, less, touched]);
  return (
    <section
      ref={ref}
      className={`rx-paper rx-resolved rx-prove ${inView ? "is-in" : ""}`}
      aria-labelledby="rx-prove-title"
      data-readout
      data-readout-clock="T+72:00"
      data-readout-status="Replay pilot"
    >
      <div className="container">
        <Headline id="rx-prove-title" text={prove.title} in={inView} />
        <ol className="rx-stepper">
          {prove.steps.map((item, i) => (
            <li
              key={item.name}
              className={`rx-reveal ${i === active ? "is-active" : ""} ${i < active ? "is-done" : ""}`}
              style={{ "--i": i + 2 } as React.CSSProperties}
            >
              <button
                type="button"
                aria-pressed={i === active}
                onClick={() => {
                  setTouched(true);
                  setActive(i);
                }}
              >
                <span className="rx-step-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <strong>{item.name}</strong>
                <span>{item.line}</span>
              </button>
            </li>
          ))}
        </ol>
        <Link
          href={prove.cta.href}
          className="button button-primary"
          onClick={() => track("cta_click", { place: "prove", cta: "replay" })}
        >
          {prove.cta.label} <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

/**
 * The call to action panel: ink inside paper, with the small core idling
 * beside the button. Every page closes on it.
 */
export function CtaPanel({
  title,
  line,
  cta,
  place,
}: {
  title: string;
  line: string;
  cta: { label: string; href: string };
  place: string;
}) {
  const [ref, inView] = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`rx-paper rx-resolved rx-closing ${inView ? "is-in" : ""}`}
      aria-labelledby={`rx-${place}-title`}
      data-readout
      data-readout-clock="T+00:31"
      data-readout-status="Closed"
      data-readout-live="false"
    >
      <div className="container">
        <div className="rx-closing-panel">
          <SignalCore className="rx-closing-core" />
          <div className="rx-closing-copy">
            <Headline id={`rx-${place}-title`} text={title} in={inView} />
            <p
              className="rx-reveal"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              {line}
            </p>
            <Link
              href={cta.href}
              className="button button-primary rx-reveal"
              style={{ "--i": 3 } as React.CSSProperties}
              onClick={() => track("cta_click", { place, cta: cta.label })}
            >
              {cta.label} <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 10 · The shared closing: "Show us the incident that hurt most." */
export function Closing({ place = "closing" }: { place?: string }) {
  return (
    <CtaPanel
      title={closing.title}
      line={closing.line}
      cta={closing.cta}
      place={place}
    />
  );
}
