import { useEffect, useRef, useState } from "react";
import {
  Activity,
  Bell,
  GitCommitHorizontal,
  KeyRound,
  Rocket,
  ScrollText,
  Ticket,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { integrations } from "@/content/site";

/** True when the visitor asked for less motion, in the OS or with the footer switch. */
export function prefersLessMotion() {
  if (typeof window === "undefined") return false;
  let saved: string | null = null;
  try {
    // Read the saved choice directly: the footer switch may not have mounted yet.
    saved = localStorage.getItem("rx-motion");
  } catch {
    /* storage unavailable */
  }
  return (
    saved === "off" ||
    document.documentElement.dataset.motion === "off" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** A mono timestamp pinned to the Evidence Line at the top of a section. */
export function Stamp({ at }: { at: string }) {
  return (
    <span
      className={`rx-stamp ${at === "Closed" ? "rx-stamp-closed" : ""}`}
      aria-hidden="true"
    >
      {at}
    </span>
  );
}

/**
 * The T+ clock line: a 1px Volt line in the left margin, drawn by scroll
 * progress, on every page. Each Stamp ticks in as its section arrives.
 * Desktop only (CSS).
 */
export function EvidenceLine() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const draw = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 1;
      lineRef.current?.style.setProperty("--rx-progress", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Pages load lazily and change on navigation, so pick up stamps as they
    // appear rather than only the ones present on mount.
    const instant = prefersLessMotion() || !("IntersectionObserver" in window);
    const observer = instant
      ? null
      : new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("is-stamped");
              observer?.unobserve(entry.target);
            });
          },
          { rootMargin: "0px 0px -25% 0px" }
        );
    const watch = () => {
      document
        .querySelectorAll(".rx-stamp:not([data-watched])")
        .forEach(stamp => {
          stamp.setAttribute("data-watched", "");
          if (observer) observer.observe(stamp);
          else stamp.classList.add("is-stamped");
        });
      onScroll();
    };
    watch();
    const mutations = new MutationObserver(watch);
    const main = document.getElementById("main");
    if (main) mutations.observe(main, { childList: true, subtree: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer?.disconnect();
      mutations.disconnect();
    };
  }, []);

  return (
    <div className="rx-line" ref={lineRef} aria-hidden="true">
      <div className="rx-line-fill" />
    </div>
  );
}

const sourceIcons: Record<string, LucideIcon> = {
  Alerts: Bell,
  Logs: ScrollText,
  Metrics: Activity,
  Traces: Waypoints,
  Changes: GitCommitHorizontal,
  Deploys: Rocket,
  Tickets: Ticket,
  Identity: KeyRound,
};

/** Eight tool categories stream along aqua lines into one investigation. */
export function SourceStream() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;
    // The only loop on the page, and it stops whenever it is off screen.
    const observer = new IntersectionObserver(([entry]) =>
      section.classList.toggle("is-live", entry.isIntersecting)
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const columns = integrations.length || 1;
  return (
    <section
      className="rx-sources rx-ivory"
      aria-labelledby="rx-sources-title"
      ref={sectionRef}
    >
      <Stamp at="T+00:04" />
      <div className="container">
        <h2 id="rx-sources-title" className="hx-h2">
          Keep your tools. Relyxus reads them.
        </h2>
        <p className="hx-sub">
          Bring the tools you have. Relyxus reads evidence from
        </p>
        <ul className="rx-source-tiles">
          {integrations.map(name => {
            const Icon = sourceIcons[name] ?? Activity;
            return (
              <li key={name}>
                <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                {name}
              </li>
            );
          })}
        </ul>
        <svg
          className="rx-stream"
          viewBox="0 0 800 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {integrations.map((name, index) => {
            const x = ((index + 0.5) / columns) * 800;
            const d = `M${x} 0 C${x} 64, 400 56, 400 120`;
            return (
              <g key={name}>
                <path className="rx-stream-lane" d={d} />
                <path
                  className="rx-stream-pulse"
                  d={d}
                  pathLength={100}
                  style={{ animationDelay: `${index * 0.2}s` }}
                />
              </g>
            );
          })}
        </svg>
        <div className="rx-investigation">
          <strong>One investigation</strong>
          <span>{integrations.length} sources · every claim linked</span>
        </div>
      </div>
    </section>
  );
}

type Step = "idle" | "signed" | "gate" | "fixing" | "recorded";

const timeNow = (offset = 0) =>
  new Date(Date.now() + offset * 1000).toLocaleTimeString("en-GB", {
    hour12: false,
  });

/**
 * Be the second approver: the visitor approves a fix, a citrine signature
 * line draws, the gate opens, the fix runs and the record entry writes itself.
 */
export function SecondApprover() {
  const [step, setStep] = useState<Step>("idle");
  const [typed, setTyped] = useState("");
  const [record, setRecord] = useState("");
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach(id => window.clearTimeout(id));
    timers.current = [];
  };
  useEffect(() => clear, []);

  const later = (ms: number, run: () => void) => {
    timers.current.push(window.setTimeout(run, ms));
  };

  const approve = () => {
    if (step !== "idle") return;
    const entry = [
      `${timeNow()}  Approved by you, second approver`,
      `${timeNow(1)}  Rollback api-gw v3.2 to v3.1 ran under policy PAY-2`,
      `${timeNow(3)}  Error rate back to baseline. Recorded.`,
    ].join("\n");
    setRecord(entry);

    if (prefersLessMotion()) {
      setTyped(entry);
      setStep("recorded");
      return;
    }

    // 2.4s in all: sign 600ms, gate 450ms, fix 700ms, then the entry types out.
    setStep("signed");
    later(600, () => setStep("gate"));
    later(1050, () => setStep("fixing"));
    later(1750, () => {
      setStep("recorded");
      const perChar = Math.min(30, 650 / entry.length);
      let shown = 0;
      const tick = () => {
        shown += 1;
        setTyped(entry.slice(0, shown));
        if (shown < entry.length) later(perChar, tick);
      };
      tick();
    });
  };

  const reset = () => {
    clear();
    setStep("idle");
    setTyped("");
    setRecord("");
  };

  return (
    <section className="rx-approver rx-ink" aria-labelledby="rx-approver-title">
      <Stamp at="T+00:26" />
      <div className="container rx-approver-grid">
        <div className="rx-approver-copy">
          <span className="rx-eyebrow">Waiting for approval</span>
          <h2 id="rx-approver-title" className="hx-h2">
            Nothing runs until someone like you says yes.
          </h2>
          <p>
            The fix is ready and the first approver has signed. Policy asks for
            two. Press approve and watch what gets written down.
          </p>
        </div>
        <div className="rx-approval" data-step={step}>
          <div className="rx-approval-head">
            <span>
              INC-2207 · <span className="rx-sev">SEV1</span> · payments-api
            </span>
            <span>Example incident</span>
          </div>
          <p className="rx-approval-action">
            Proposed fix: rollback api-gw v3.2 → v3.1
          </p>
          <p className="rx-approval-cause">
            <b>Likely cause:</b> 14:02:11 deploy api-gw v3.2 rolled out
          </p>
          <ul className="rx-approvers">
            <li>
              <span>Approver 1 · Head of Payments Ops</span>
              <span className="rx-approver-name">Approved by Sara Khan</span>
            </li>
            <li>
              <span>Approver 2 · Incident lead</span>
              {step === "idle" ? (
                <span className="rx-approver-pending">Waiting for you</span>
              ) : (
                <span className="rx-approver-name">Approved by you</span>
              )}
            </li>
          </ul>
          <div className="rx-approve-row">
            <button
              type="button"
              className="button button-primary"
              onClick={approve}
              disabled={step !== "idle"}
              aria-describedby="rx-approval-status"
            >
              {step === "idle" ? "Approve the fix" : "Approved"}
            </button>
            <svg className="rx-sign" viewBox="0 0 220 14" aria-hidden="true">
              <path d="M2 9 C 40 3, 70 12, 110 7 S 180 4, 218 8" />
            </svg>
          </div>
          <div className="rx-gate" aria-hidden="true">
            <span className="rx-gate-lane" />
            <span className="rx-gate-run" />
            <span className="rx-gate-bar" />
          </div>
          <p className="rx-record" aria-hidden="true">
            {typed.split("\n").map((line, index) => {
              const [time, ...rest] = line.split("  ");
              return (
                <span key={index}>
                  {index > 0 && "\n"}
                  <span className="rx-record-time">{time}</span>
                  {rest.length > 0 && `  ${rest.join("  ")}`}
                </span>
              );
            })}
          </p>
          <p id="rx-approval-status" className="sr-only" aria-live="polite">
            {step === "recorded" ? record : ""}
          </p>
          {step === "recorded" && (
            <button type="button" className="rx-replay" onClick={reset}>
              Run it again
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

const clockLabel = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `T+${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

/**
 * The home hero: the real Command Centre screen in a tilted frame. The T+
 * clock counts on the SEV1 row while the hero is on screen; with reduced
 * motion it holds at T+00:00.
 */
export function HeroScreen() {
  const frameRef = useRef<HTMLElement>(null);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let timer = 0;
    let visible = true;
    const start = () => {
      if (!timer)
        timer = window.setInterval(
          () => setSeconds(value => Math.min(value + 1, 59 * 60 + 59)),
          1000
        );
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };
    if (!("IntersectionObserver" in window)) {
      if (!prefersLessMotion()) start();
      return stop;
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !prefersLessMotion()) start();
      else stop();
    });
    observer.observe(frame);
    // The footer switch can turn animations off (or back on) mid visit.
    const motion = new MutationObserver(() => {
      if (prefersLessMotion()) {
        stop();
        setSeconds(0);
      } else if (visible) start();
    });
    motion.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    return () => {
      observer.disconnect();
      motion.disconnect();
      stop();
    };
  }, []);

  return (
    <figure className="rx-hero-screen" ref={frameRef}>
      <div className="rx-hero-tilt">
        <div className="hx-shot-bar" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="rx-hero-media">
          <img
            src="/product/command-centre-attention.png"
            alt="The Relyxus Command Centre with a SEV1 card authorisation incident and a production approval waiting for review"
            width={1894}
            height={810}
            fetchPriority="high"
            decoding="async"
          />
          <span className="rx-hero-sev1" aria-hidden="true">
            <span className="rx-hero-clock">{clockLabel(seconds)}</span>
          </span>
        </div>
      </div>
      <figcaption className="rx-caption">
        Command Centre · SEV1 open · approval waiting
      </figcaption>
    </figure>
  );
}
