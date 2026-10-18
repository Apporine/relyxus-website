import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  Check,
  GitCommitHorizontal,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import {
  SignalCore,
  type SignalCoreHandle,
} from "@/components/core/SignalCore";
import { Headline } from "@/components/marketing/Headline";
import {
  approval,
  cause,
  chain,
  explore,
  hero,
  record,
  signals,
  stages,
  type StageId,
} from "@/content/home";
import { EASE_GSAP, useLessMotion } from "@/lib/motion";
import { scrollToTarget } from "@/lib/smoothScroll";
import { track } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

/** Core state per stage: scale, rotation, opacity and position (vw, vh). */
type CoreState = { s: number; r: number; o: number; x: number; y: number };
type Range = { from: CoreState; to: CoreState };
const hold = (state: CoreState): Range => ({ from: state, to: state });

/** The core's path through the stages (Redesign Strategy, transitions table). */
const corePath: Record<StageId, Range> = {
  hero: hold({ s: 1.42, r: 0, o: 1, x: 0, y: 0 }),
  signals: hold({ s: 0.94, r: 0, o: 1, x: 0, y: 2 }),
  chain: {
    from: { s: 0.88, r: 0, o: 1, x: 0, y: 0 },
    to: { s: 1.03, r: -10, o: 0.83, x: 0, y: -27 },
  },
  cause: hold({ s: 1.03, r: -10, o: 0.73, x: 0, y: -27 }),
  approval: {
    from: { s: 1.06, r: -11, o: 0.73, x: 4.4, y: 4 },
    to: { s: 0.92, r: -22, o: 0.89, x: 4.4, y: 4 },
  },
  record: hold({ s: 0.78, r: -33, o: 0.96, x: -24, y: 6 }),
  explore: hold({ s: 0.87, r: -3, o: 0.99, x: -14, y: 6 }),
  exit: {
    from: { s: 0.78, r: -18, o: 1, x: -14, y: 6 },
    to: { s: 0.75, r: -26, o: 0, x: -10, y: -60 },
  },
};

/** The rings layer follows on its own: scale and offset (px at 1137 wide). */
const ringPath: Record<StageId, { from: number[]; to: number[] }> = {
  hero: { from: [1.27, 0, -9], to: [1.27, 0, -9] },
  signals: { from: [1.49, 0, -21], to: [1.49, 0, -21] },
  chain: { from: [1.54, 0, -447], to: [1.86, 0, -603] },
  cause: { from: [1.86, 0, -603], to: [1.86, 0, -603] },
  approval: { from: [1.68, 63, -6], to: [1.4, 63, -6] },
  record: { from: [1.23, 26, -481], to: [1.23, 26, -481] },
  explore: { from: [1.31, -144, -477], to: [1.31, -144, -477] },
  exit: { from: [1.33, -76, 0], to: [1.34, -43, -419] },
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const total = stages.reduce((n, s) => n + s.length, 0);
const starts = stages.reduce<number[]>(
  (list, s, i) => [...list, i === 0 ? 0 : list[i - 1] + stages[i - 1].length],
  []
);
const indexOf = (id: StageId) => stages.findIndex(s => s.id === id);

const cardIcons = {
  logs: ScrollText,
  changes: GitCommitHorizontal,
  alerts: Bell,
  approvals: ShieldCheck,
} as const;

export function HomeStage() {
  const wrapRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const moveRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<SignalCoreHandle>(null);
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(-1);
  const less = useLessMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const pin = pinRef.current;
    const move = moveRef.current;
    const radar = coreRef.current?.radar;
    if (!wrap || !pin || !move || !radar) return;

    // Hold within a stage, tween at each boundary: 900 ms on the one curve.
    const duration = less ? 0.3 : 0.9;
    const to = (target: object, prop: string) =>
      gsap.quickTo(target, prop, { duration, ease: less ? "none" : EASE_GSAP });
    const core = {
      x: to(move, "x"),
      y: to(move, "y"),
      scale: to(move, "scale"),
      rotation: to(move, "rotation"),
      opacity: to(move, "opacity"),
    };
    const rings = {
      scale: to(radar, "scale"),
      x: to(radar, "x"),
      y: to(radar, "y"),
    };

    let current = -1;
    let currentStep = -1;
    const apply = (progress: number) => {
      const pos = progress * total;
      let i = stages.length - 1;
      while (i > 0 && pos < starts[i]) i -= 1;
      const meta = stages[i];
      // Reduced motion: each stage is a static frame, no in-stage scrub.
      const local = less
        ? 0
        : Math.min(1, Math.max(0, (pos - starts[i]) / meta.length));
      const range = corePath[meta.id];
      const vw = window.innerWidth / 100;
      const vh = window.innerHeight / 100;
      // On a phone the core stays centred and lifts clear of the copy below.
      const phone = window.innerWidth < 760;
      const lift = phone && ["approval", "record", "explore"].includes(meta.id);
      core.x(phone ? 0 : lerp(range.from.x, range.to.x, local) * vw);
      core.y(lift ? -12 * vh : lerp(range.from.y, range.to.y, local) * vh);
      core.scale(lerp(range.from.s, range.to.s, local));
      core.rotation(lerp(range.from.r, range.to.r, local));
      core.opacity(lerp(range.from.o, range.to.o, local));
      const ring = ringPath[meta.id];
      const k = window.innerWidth / 1137;
      rings.scale(lerp(ring.from[0], ring.to[0], local));
      rings.x(lerp(ring.from[1], ring.to[1], local) * k);
      rings.y(lerp(ring.from[2], ring.to[2], local) * k * 0.6);

      // Ink crossfades to paper as the stage exits.
      const exitIndex = indexOf("exit");
      if (paperRef.current)
        paperRef.current.style.opacity = String(
          i < exitIndex ? 0 : i > exitIndex ? 1 : local
        );

      // Stage 3: scroll lights each step in turn, and the core pulses once per step.
      const chainIndex = indexOf("chain");
      const nextStep =
        i < chainIndex
          ? -1
          : i > chainIndex
            ? 5
            : Math.min(5, Math.floor(local * 6.6) - 1);
      if (nextStep !== currentStep) {
        if (nextStep > currentStep && i === chainIndex) coreRef.current?.kick();
        currentStep = nextStep;
        setStep(nextStep);
      }

      pin.dataset.readoutStage = `Stage ${meta.number} ${meta.name}`;
      pin.dataset.readoutClock = meta.clock;
      pin.dataset.readoutStatus = meta.status;
      pin.dataset.readoutLive = String(
        meta.id !== "record" && meta.id !== "explore" && meta.id !== "exit"
      );

      if (i !== current) {
        current = i;
        setActive(i);
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      onUpdate: self => apply(self.progress),
      onRefresh: self => apply(self.progress),
    });
    apply(trigger.progress);

    // The hero: the core fades up from black and the rings expand, once.
    if (fadeRef.current && !less) {
      gsap.fromTo(
        fadeRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: EASE_GSAP }
      );
      gsap.fromTo(
        radar,
        { intro: 0 },
        { intro: 1, duration: 1.2, ease: EASE_GSAP }
      );
    } else if (fadeRef.current) {
      fadeRef.current.style.opacity = "1";
      radar.intro = 1;
    }

    return () => {
      trigger.kill();
    };
  }, [less]);

  /** Tabbing into a scene that is not on screen scrolls the stage to it. */
  const focusScene = (index: number) => {
    if (index === active || !wrapRef.current) return;
    const top = wrapRef.current.getBoundingClientRect().top + window.scrollY;
    scrollToTarget(top + (starts[index] / 100) * window.innerHeight + 2, true);
  };

  const scene = (id: StageId) => {
    const index = indexOf(id);
    return {
      className: `rx-scene rx-scene-${id}`,
      "data-active": active === index,
      onFocusCapture: () => focusScene(index),
    };
  };

  const isActive = (id: StageId) => active === indexOf(id);
  const anchors = useMemo(
    () =>
      stages
        .filter(s => s.id !== "exit")
        .map(s => ({ id: `stage-${s.id}`, top: starts[indexOf(s.id)] })),
    []
  );

  return (
    <section
      className="rx-stage"
      ref={wrapRef}
      style={{ height: `${total + 100}vh` }}
      aria-label="An incident, from first alert to the record"
    >
      {anchors.map(anchor => (
        <span
          key={anchor.id}
          id={anchor.id}
          className="rx-stage-anchor"
          style={{ top: `${anchor.top}vh` }}
        />
      ))}
      <div className="rx-stage-pin" ref={pinRef} data-readout>
        <div className="rx-stage-core" aria-hidden="true">
          <div className="rx-core-move" ref={moveRef}>
            <div className="rx-core-fade" ref={fadeRef}>
              <SignalCore
                ref={coreRef}
                radar
                eager
                className="rx-stage-signal"
              />
            </div>
          </div>
        </div>
        <div className="rx-grain" aria-hidden="true" />
        <div className="rx-vignette" aria-hidden="true" />

        <div className="rx-stage-overlay">
          {/* 1 · Hero · T+00:00 */}
          <div {...scene("hero")}>
            <div className="rx-hero-copy">
              <p className="rx-eyebrow rx-reveal is-in">{hero.eyebrow}</p>
              <Headline
                as="h1"
                text={hero.title}
                in={isActive("hero")}
                underline
              />
              <p
                className="rx-scene-line rx-reveal"
                style={{ "--i": 2 } as React.CSSProperties}
              >
                {hero.line}
              </p>
              <div
                className="hx-actions rx-reveal"
                style={{ "--i": 3 } as React.CSSProperties}
              >
                <Link
                  href={hero.primary.href}
                  className="button button-primary"
                  onClick={() =>
                    track("cta_click", { place: "hero", cta: "demo" })
                  }
                >
                  {hero.primary.label} <ArrowRight aria-hidden="true" />
                </Link>
                <a
                  href={hero.secondary.href}
                  className="button button-secondary"
                  onClick={() =>
                    track("cta_click", { place: "hero", cta: "see-it" })
                  }
                >
                  {hero.secondary.label}
                </a>
              </div>
            </div>
            <span className="rx-scroll-cue" aria-hidden="true">
              <span />
              Scroll
            </span>
          </div>

          {/* 2 · Signals · T+00:01 */}
          <div {...scene("signals")}>
            <div className="rx-scene-head rx-scene-head-center">
              <Headline text={signals.title} in={isActive("signals")} />
              <p
                className="rx-scene-line rx-reveal"
                style={{ "--i": 2 } as React.CSSProperties}
              >
                {signals.line}
              </p>
            </div>
            <svg
              className="rx-signal-wires"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {[
                "M22 38 C 34 40, 40 50, 50 53",
                "M78 38 C 66 40, 60 50, 50 53",
                "M22 76 C 34 72, 40 60, 50 55",
                "M78 76 C 66 72, 60 60, 50 55",
              ].map((d, i) => (
                <g key={d}>
                  <path
                    className="rx-wire rx-draw"
                    d={d}
                    pathLength={1}
                    style={{ "--i": i } as React.CSSProperties}
                  />
                  <path className="rx-wire-flow rx-flow" d={d} pathLength={1} />
                </g>
              ))}
            </svg>
            <ul className="rx-signal-cards">
              {signals.cards.map((card, i) => {
                const Icon = cardIcons[card.key];
                return (
                  <li
                    key={card.key}
                    className={`rx-glass rx-signal-card rx-signal-card-${i} rx-reveal`}
                    style={{ "--i": i + 1 } as React.CSSProperties}
                  >
                    <span className="rx-signal-icon">
                      <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="rx-label">{card.label}</span>
                    <code>{card.sample}</code>
                    <span className="rx-signal-dot" aria-hidden="true" />
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 3 · Incident chain · T+00:02 */}
          <div {...scene("chain")}>
            <div className="rx-scene-head rx-chain-head">
              <Headline text={chain.title} in={isActive("chain")} />
            </div>
            <ol className="rx-chain">
              {chain.steps.map((item, i) => (
                <li
                  key={item.name}
                  className={`rx-chain-step ${i <= step ? "is-lit" : ""} ${i === step ? "is-current" : ""}`}
                >
                  <span className="rx-chain-node" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <strong>{item.name}</strong>
                  <span className="rx-chain-line">{item.line}</span>
                  {item.tools.length > 0 && (
                    <span className="rx-chain-tools">
                      {item.tools.map(tool => (
                        <span key={tool} className="rx-chip">
                          {tool}
                        </span>
                      ))}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* 4 · Cause · T+00:04 */}
          <div {...scene("cause")}>
            <div className="rx-scene-head rx-scene-head-center rx-cause-head">
              <Headline text={cause.title} in={isActive("cause")} />
              <p
                className="rx-scene-line rx-reveal"
                style={{ "--i": 2 } as React.CSSProperties}
              >
                {cause.line}
              </p>
            </div>
            <ol className="rx-hypotheses">
              {cause.hypotheses.map((h, i) => (
                <li
                  key={h.name}
                  className={`rx-glass rx-hypothesis rx-hypothesis-${i} ${i === 0 ? "is-top" : ""}`}
                  style={{ "--score": h.score } as React.CSSProperties}
                >
                  <span className="rx-label">
                    #{i + 1} · {h.sources}
                  </span>
                  <strong>{h.name}</strong>
                  <span className="rx-bar" aria-hidden="true">
                    <span />
                  </span>
                  <span className="rx-score">{h.score.toFixed(2)}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* 5 · Approval · T+00:06 */}
          <ApprovalScene
            {...scene("approval")}
            run={isActive("approval")}
            less={less}
          />

          {/* 6 · Record · T+00:09 */}
          <RecordScene
            {...scene("record")}
            run={isActive("record")}
            less={less}
          />

          {/* 7 · Explore */}
          <div {...scene("explore")}>
            <div className="rx-scene-head rx-explore-head">
              <Headline text={explore.title} in={isActive("explore")} />
            </div>
            <ul className="rx-orbit" aria-label="Where to next">
              {explore.links.map((link, i) => (
                <li key={link.href} className={`rx-orbit-item rx-orbit-${i}`}>
                  <Link href={link.href} className="rx-glass rx-orbit-link">
                    {link.label} <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rx-stage-paper" ref={paperRef} aria-hidden="true" />
      </div>
    </section>
  );
}

type SceneProps = {
  className: string;
  "data-active": boolean;
  onFocusCapture: () => void;
  run: boolean;
  less: boolean;
};

/** A change card stops at the gate; two approvals tick; the gate opens. */
function ApprovalScene({ run, less, ...props }: SceneProps) {
  const [phase, setPhase] = useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  // The clock readout follows the gate: awaiting, then approved.
  useEffect(() => {
    const pin = sceneRef.current?.closest<HTMLElement>("[data-readout]");
    if (pin && run)
      pin.dataset.readoutStatus = phase >= 4 ? "Approved" : "Awaiting approval";
  }, [phase, run]);
  useEffect(() => {
    if (!run) {
      setPhase(0);
      return;
    }
    if (less) {
      setPhase(5);
      return;
    }
    // 2.4 s: card arrives, approver 1, approver 2, gate opens, audit line.
    const times = [200, 900, 1400, 1900, 2400];
    const ids = times.map((ms, i) =>
      window.setTimeout(() => setPhase(i + 1), ms)
    );
    return () => ids.forEach(id => window.clearTimeout(id));
  }, [run, less]);
  return (
    <div {...props} ref={sceneRef} data-phase={phase}>
      <div className="rx-scene-head rx-approval-head">
        <Headline text={approval.title} in={run} />
      </div>
      <div className="rx-gate-track" aria-hidden="true">
        <span className="rx-gate-line" />
        <span className="rx-gate-bar" />
      </div>
      <div className="rx-glass rx-change-card">
        <span className="rx-label">Proposed change</span>
        <strong>{approval.change}</strong>
      </div>
      <ul className="rx-approvers">
        {approval.approvers.map((a, i) => (
          <li key={a.role} className={phase >= i + 2 ? "is-approved" : ""}>
            <span className="rx-avatar" aria-hidden="true">
              {phase >= i + 2 ? <Check size={14} /> : a.initials}
            </span>
            <span className="rx-label">{a.role}</span>
          </li>
        ))}
      </ul>
      <p className="rx-audit-line">
        <Typed text={approval.audit} run={phase >= 5} less={less} />
      </p>
    </div>
  );
}

/** The record panel: timestamps type in, then the DORA stamp lands. */
function RecordScene({ run, less, ...props }: SceneProps) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!run) {
      setShown(0);
      return;
    }
    if (less) {
      setShown(record.lines.length + 1);
      return;
    }
    const ids = [...record.lines, null].map((_, i) =>
      window.setTimeout(() => setShown(i + 1), 300 + i * 380)
    );
    return () => ids.forEach(id => window.clearTimeout(id));
  }, [run, less]);
  return (
    <div {...props}>
      <div className="rx-record-panel">
        <Headline text={record.title} in={run} />
        <div className="rx-glass rx-record">
          <span className="rx-label">INC-2207 · Record</span>
          <ol>
            {record.lines.map((line, i) => (
              <li key={line.at} className={i < shown ? "is-shown" : ""}>
                <time>{line.at}</time>
                <Typed text={line.text} run={i < shown} less={less} />
              </li>
            ))}
          </ol>
          <span
            className={`rx-stamp ${shown > record.lines.length ? "is-landed" : ""}`}
          >
            {record.stamp}
          </span>
        </div>
      </div>
    </div>
  );
}

/** Types text out at 30 ms a character, capped at 1.5 s. */
function Typed({
  text,
  run,
  less,
}: {
  text: string;
  run: boolean;
  less: boolean;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!run) {
      setCount(0);
      return;
    }
    if (less) {
      setCount(text.length);
      return;
    }
    const step = Math.min(30, 1500 / text.length);
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setCount(n);
      if (n >= text.length) window.clearInterval(id);
    }, step);
    return () => window.clearInterval(id);
  }, [run, less, text]);
  return (
    <span className="rx-typed">
      <span aria-hidden="true">{text.slice(0, count)}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
