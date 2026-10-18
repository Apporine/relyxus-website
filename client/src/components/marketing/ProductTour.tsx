import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { prefersLessMotion } from "@/lib/motion";
import { screenFeatures } from "@/content/features";

type Callout = { x: number; y: number; w: number; h: number; text: string };

/** Regions are percentages of each 1024x728 screenshot. */
const screens: {
  key: string;
  label: string;
  src: string;
  alt: string;
  callouts: Callout[];
}[] = [
  {
    key: "command",
    label: "Command centre",
    src: "/product/overview-command-centre.png",
    alt: "The Relyxus command centre",
    callouts: [
      {
        x: 18,
        y: 13,
        w: 80,
        h: 9,
        text: "See severity and money at risk before anything else.",
      },
      {
        x: 77,
        y: 29,
        w: 21,
        h: 34,
        text: "See which approvals are waiting on someone.",
      },
    ],
  },
  {
    key: "incidents",
    label: "Incidents",
    src: "/product/overview-incidents.png",
    alt: "The Relyxus incident list",
    callouts: [
      {
        x: 19,
        y: 14,
        w: 78,
        h: 12,
        text: "Every active incident, sorted by severity.",
      },
      {
        x: 19,
        y: 40,
        w: 78,
        h: 48,
        text: "Owner, impact and age on every row.",
      },
    ],
  },
  {
    key: "war room",
    label: "War room",
    src: "/product/overview-investigation.png",
    alt: "A Relyxus incident with its timeline and ranked causes",
    callouts: [
      {
        x: 36,
        y: 36,
        w: 38,
        h: 34,
        text: "Ranked causes, each with its evidence.",
      },
      {
        x: 75,
        y: 22,
        w: 24,
        h: 36,
        text: "The change waiting for approval, in plain view.",
      },
    ],
  },
  {
    key: "approvals",
    label: "Approvals",
    src: "/product/overview-approvals.png",
    alt: "The Relyxus approvals queue",
    callouts: [
      {
        x: 19,
        y: 12,
        w: 22,
        h: 60,
        text: "Every pending decision in one queue.",
      },
      {
        x: 77,
        y: 6,
        w: 22,
        h: 60,
        text: "See what a change touches before you say yes.",
      },
    ],
  },
  {
    key: "services",
    label: "Services",
    src: "/product/overview-services.png",
    alt: "The Relyxus service dependency map",
    callouts: [
      { x: 15, y: 14, w: 26, h: 60, text: "Service health at a glance." },
      {
        x: 43,
        y: 14,
        w: 54,
        h: 80,
        text: "Follow an incident to the services it hit.",
      },
    ],
  },
];

const STEP_MS = 3600;

export function ProductTour() {
  const [screen, setScreen] = useState(0);
  const [beat, setBeat] = useState(0);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);

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
      { threshold: 0.3 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Two beats per screen: spotlight the first region, then the second.
  useEffect(() => {
    if (!started || paused) return;
    const timer = window.setTimeout(() => {
      if (beat === 0) setBeat(1);
      else {
        setBeat(0);
        setScreen(index => (index + 1) % screens.length);
      }
    }, STEP_MS);
    return () => window.clearTimeout(timer);
  }, [screen, beat, started, paused]);

  const current = screens[screen];
  const focus = current.callouts[beat];
  const feature = screenFeatures[current.key];
  const zoom = 1.22;
  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));
  const shiftX = clamp(
    50 - (focus.x + focus.w / 2) * zoom,
    100 - 100 * zoom,
    0
  );
  const shiftY = clamp(
    50 - (focus.y + focus.h / 2) * zoom,
    100 - 100 * zoom,
    0
  );

  const tilt = (event: React.MouseEvent) => {
    if (prefersLessMotion()) return;
    const box = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - box.left) / box.width - 0.5;
    const py = (event.clientY - box.top) / box.height - 0.5;
    frame.current?.style.setProperty("--tilt-x", `${(-py * 6).toFixed(2)}deg`);
    frame.current?.style.setProperty("--tilt-y", `${(px * 8).toFixed(2)}deg`);
  };
  const resetTilt = () => {
    frame.current?.style.setProperty("--tilt-x", "0deg");
    frame.current?.style.setProperty("--tilt-y", "0deg");
    setPaused(false);
  };

  return (
    <div
      className="hx-tour"
      ref={root}
      onMouseMove={tilt}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={resetTilt}
    >
      <div className="hx-tour-stage">
        <div className="hx-tour-frame" ref={frame}>
          <div className="hx-shot-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>{current.label}</span>
          </div>
          <div className="hx-tour-viewport">
            <div
              className="hx-tour-zoom"
              style={{
                transform: started
                  ? `translate3d(${shiftX}%, ${shiftY}%, 0) scale(${zoom})`
                  : "translate3d(0, 0, 0) scale(1)",
              }}
            >
              {screens.map((item, index) => (
                <img
                  key={item.key}
                  src={item.src}
                  alt={index === screen ? item.alt : ""}
                  aria-hidden={index === screen ? undefined : true}
                  className={index === screen ? "is-on" : ""}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
              ))}
              {current.callouts.map((callout, index) => (
                <span
                  key={`${current.key}-${index}`}
                  className={`hx-spot ${index === beat ? "is-on" : ""}`}
                  style={{
                    left: `${callout.x}%`,
                    top: `${callout.y}%`,
                    width: `${callout.w}%`,
                    height: `${callout.h}%`,
                  }}
                />
              ))}
            </div>
            <p
              className="hx-tour-label"
              key={`${current.key}-${beat}`}
              aria-live="polite"
            >
              {feature && (
                <span className="hx-tour-feature">{feature.feature}</span>
              )}
              {focus.text}
            </p>
          </div>
        </div>
      </div>

      <div className="hx-tour-rail" role="group" aria-label="Product screens">
        <svg viewBox="0 0 800 70" aria-hidden="true">
          <path className="hx-lane" d="M50 24 H750" />
          <path
            className="hx-pipeline-fill"
            d="M50 24 H750"
            style={{
              strokeDasharray: 700,
              strokeDashoffset: 700 - (screen / (screens.length - 1)) * 700,
            }}
          />
        </svg>
        <ul>
          {screens.map((item, index) => (
            <li key={item.key}>
              <button
                type="button"
                aria-pressed={index === screen}
                className={`hx-tour-node ${index <= screen ? "is-done" : ""}`}
                onClick={() => {
                  setScreen(index);
                  setBeat(0);
                }}
              >
                <i />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="hx-pause"
          aria-label={paused ? "Play the tour" : "Pause the tour"}
          onClick={() => setPaused(value => !value)}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </div>
    </div>
  );
}
