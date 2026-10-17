import { useEffect, useRef, useState } from "react";

const steps = [
  {
    label: "Context",
    title: "Start from what customers feel",
    text: "The alert and the change that landed just before it appear side by side, with the service they touch.",
    glyph: "ripple",
  },
  {
    label: "Evidence",
    title: "A likely cause, with the doubt left in",
    text: "Sources converge on one explanation. The alternative stays on the list until someone rules it out.",
    glyph: "converge",
  },
  {
    label: "Review",
    title: "A person decides",
    text: "The proposed fix waits for the approvers your policy names. Nothing runs before they say so.",
    glyph: "gate",
  },
  {
    label: "Record",
    title: "The write-up builds itself",
    text: "Every source, decision and check is logged in order, ready for a report that people review and submit.",
    glyph: "lines",
  },
] as const;

function Glyph({ kind }: { kind: (typeof steps)[number]["glyph"] }) {
  return (
    <svg
      className={`tl-glyph tl-${kind}`}
      viewBox="0 0 120 120"
      aria-hidden="true"
    >
      {kind === "ripple" && (
        <>
          <circle className="tl-r tl-r1" cx="60" cy="60" r="12" />
          <circle className="tl-r tl-r2" cx="60" cy="60" r="12" />
          <circle className="tl-dot" cx="60" cy="60" r="7" />
        </>
      )}
      {kind === "converge" && (
        <>
          {[24, 60, 96].map((y, index) => (
            <g key={y}>
              <path className="hx-lane" d={`M14 ${y} C54 ${y}, 54 60, 92 60`} />
              <path
                className="hx-flow"
                style={{ animationDelay: `${index * 0.3}s` }}
                d={`M14 ${y} C54 ${y}, 54 60, 92 60`}
              />
            </g>
          ))}
          <circle className="tl-dot" cx="96" cy="60" r="9" />
        </>
      )}
      {kind === "gate" && (
        <>
          <path className="hx-lane" d="M10 60 H110" />
          <rect
            className="tl-gate"
            x="54"
            y="22"
            width="8"
            height="76"
            rx="4"
          />
          <circle className="tl-card" cx="24" cy="60" r="9" />
        </>
      )}
      {kind === "lines" && (
        <>
          {[28, 52, 76].map((y, index) => (
            <rect
              key={y}
              className="tl-bar"
              x="22"
              y={y}
              width={76 - index * 14}
              height="8"
              rx="4"
              style={{ animationDelay: `${index * 0.4}s` }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

export function IncidentTimeline() {
  const root = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setStarted(true);
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || shown >= steps.length) return;
    const timer = window.setTimeout(() => setShown(value => value + 1), 900);
    return () => window.clearTimeout(timer);
  }, [started, shown]);

  return (
    <div className="tl" ref={root}>
      <span className="tl-spine" aria-hidden="true">
        <i style={{ transform: `scaleY(${shown / steps.length})` }} />
      </span>
      <ol>
        {steps.map((step, index) => (
          <li
            key={step.label}
            className={`${index < shown ? "is-on" : ""} ${index % 2 ? "is-right" : ""}`}
          >
            <span className="tl-node" aria-hidden="true" />
            <div className="tl-copy">
              <span className="hx-status">{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
            <div className="tl-art">
              <Glyph kind={step.glyph} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
