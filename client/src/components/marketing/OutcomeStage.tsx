import { useEffect, useRef, useState } from "react";
import { Check, Pause, Play, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { productOutcomes } from "@/content/site";

const CYCLE_MS = 8000;

const sources = [
  { y: 60, tone: "coral", label: "Alert" },
  { y: 130, tone: "cyan", label: "Logs" },
  { y: 200, tone: "violet", label: "Change" },
  { y: 270, tone: "amber", label: "Ticket" },
] as const;

function CauseScene() {
  return (
    <svg viewBox="0 0 520 340" aria-hidden="true" className="hx-scene">
      {sources.map((source, index) => (
        <g
          key={source.label}
          className={`tone-${source.tone}`}
          style={{ animationDelay: `${index * 0.25}s` }}
        >
          <path
            className="hx-lane"
            d={`M60 ${source.y} C170 ${source.y}, 190 170, 290 170`}
          />
          <path
            className="hx-flow hx-scene-flow"
            style={{ animationDelay: `${index * 0.25}s` }}
            d={`M60 ${source.y} C170 ${source.y}, 190 170, 290 170`}
          />
          <circle
            className="hx-dot hx-scene-pulse"
            cx="60"
            cy={source.y}
            r="7"
            style={{ animationDelay: `${index * 0.25}s` }}
          />
          <text className="hx-chip-text" x="22" y={source.y - 16}>
            {source.label}
          </text>
        </g>
      ))}
      <circle className="hx-core-halo hx-scene-ring" cx="290" cy="170" r="44" />
      <circle className="hx-core-disc" cx="290" cy="170" r="30" />
      <g className="hx-scene-reveal" style={{ animationDelay: "1.4s" }}>
        <path className="hx-lane" d="M320 170 H370" />
        <rect
          className="hx-card hx-card-hot"
          x="370"
          y="132"
          width="132"
          height="52"
          rx="12"
        />
        <text className="hx-card-title" x="386" y="154">
          Likely cause
        </text>
        <text className="hx-card-sub" x="386" y="171">
          Sources attached
        </text>
      </g>
      <g className="hx-scene-reveal" style={{ animationDelay: "2.1s" }}>
        <rect
          className="hx-card hx-card-dim"
          x="370"
          y="206"
          width="132"
          height="44"
          rx="12"
        />
        <text className="hx-card-title" x="386" y="233">
          Alternative kept
        </text>
      </g>
    </svg>
  );
}

function ActionScene() {
  return (
    <svg viewBox="0 0 520 340" aria-hidden="true" className="hx-scene">
      <path className="hx-lane" d="M30 190 H490" />
      <g className="hx-scene-card-move">
        <rect
          className="hx-card hx-card-hot"
          x="30"
          y="156"
          width="130"
          height="68"
          rx="12"
        />
        <text className="hx-card-sub" x="46" y="180">
          Proposed change
        </text>
        <text className="hx-card-title" x="46" y="202">
          Waiting
        </text>
      </g>
      <g>
        <rect
          className="hx-gate-bar"
          x="268"
          y="90"
          width="8"
          height="200"
          rx="4"
        />
        <circle
          className="hx-core-disc hx-scene-ring"
          cx="272"
          cy="190"
          r="26"
        />
      </g>
      <g className="hx-scene-approver" style={{ animationDelay: "1.6s" }}>
        <circle cx="236" cy="70" r="12" />
        <text x="236" y="74" textAnchor="middle">
          1
        </text>
      </g>
      <g className="hx-scene-approver" style={{ animationDelay: "2.6s" }}>
        <circle cx="308" cy="70" r="12" />
        <text x="308" y="74" textAnchor="middle">
          2
        </text>
      </g>
      <text className="hx-card-sub" x="272" y="40" textAnchor="middle">
        Approvers your policy names
      </text>
      <g className="hx-scene-reveal" style={{ animationDelay: "4.4s" }}>
        <circle className="hx-done" cx="440" cy="190" r="24" />
        <path className="hx-done-tick" d="M429 190 l8 8 l15 -16" />
        <text className="hx-card-sub" x="440" y="240" textAnchor="middle">
          Applied, then verified
        </text>
      </g>
    </svg>
  );
}

const recordRows = [
  "Alert received",
  "Likely cause recorded",
  "Approval granted",
  "Fix verified",
] as const;

function RecordScene() {
  return (
    <svg viewBox="0 0 520 340" aria-hidden="true" className="hx-scene">
      <path className="hx-lane hx-scene-draw" d="M70 44 V296" />
      {recordRows.map((row, index) => (
        <g
          key={row}
          className="hx-scene-reveal"
          style={{ animationDelay: `${0.5 + index * 0.7}s` }}
        >
          <circle className="hx-core-disc" cx="70" cy={60 + index * 76} r="9" />
          <text className="hx-card-title" x="96" y={64 + index * 76}>
            {row}
          </text>
          <rect
            className="hx-bar"
            x="96"
            y={74 + index * 76}
            width={110 - index * 12}
            height="6"
            rx="3"
          />
        </g>
      ))}
      <g className="hx-scene-reveal" style={{ animationDelay: "3.8s" }}>
        <rect
          className="hx-card hx-card-hot"
          x="320"
          y="110"
          width="166"
          height="120"
          rx="14"
        />
        <text className="hx-card-title" x="340" y="142">
          Report draft
        </text>
        <rect
          className="hx-bar"
          x="340"
          y="158"
          width="126"
          height="6"
          rx="3"
        />
        <rect
          className="hx-bar"
          x="340"
          y="176"
          width="104"
          height="6"
          rx="3"
        />
        <rect
          className="hx-bar"
          x="340"
          y="194"
          width="116"
          height="6"
          rx="3"
        />
        <text className="hx-card-sub" x="340" y="220">
          People review and submit
        </text>
      </g>
    </svg>
  );
}

const scenes = [CauseScene, ActionScene, RecordScene];

const nodes = [
  { x: 70, label: "No new tools" },
  { x: 290, label: "Cause first" },
  { x: 510, label: "Safe approvals" },
  { x: 730, label: "Report ready" },
] as const;

export function OutcomeStage() {
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // Start the sequence when the diagram scrolls into view.
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
      { threshold: 0.35 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || paused) return;
    const timer = window.setTimeout(
      () => setActive(index => (index + 1) % productOutcomes.length),
      CYCLE_MS
    );
    return () => window.clearTimeout(timer);
  }, [active, started, paused]);

  const outcome = productOutcomes[active];
  const Scene = scenes[active];
  const tokenNode = started ? active + 1 : 0;
  const tokenX = nodes[tokenNode].x;

  return (
    <div
      className="hx-stage"
      ref={root}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <svg
        className="hx-pipeline"
        viewBox="0 0 800 130"
        role="group"
        aria-label="Workflow: no new tools, cause first, safe approvals, report ready"
      >
        <path className="hx-lane" d="M70 50 H730" />
        <path
          className="hx-pipeline-fill"
          d="M70 50 H730"
          style={{ strokeDashoffset: 660 - (tokenX - 70) }}
        />
        <path className="hx-flow hx-scene-flow" d="M70 50 H730" />
        {nodes.map((node, index) => {
          const outcomeIndex = index - 1;
          const clickable = outcomeIndex >= 0;
          const on = tokenNode === index;
          return (
            <g
              key={node.label}
              className={`hx-pipe-node ${on ? "is-on" : ""} ${index < tokenNode ? "is-done" : ""}`}
              role={clickable ? "button" : undefined}
              tabIndex={clickable ? 0 : undefined}
              aria-label={clickable ? `Show ${node.label}` : undefined}
              aria-pressed={clickable ? on : undefined}
              onClick={clickable ? () => setActive(outcomeIndex) : undefined}
              onKeyDown={
                clickable
                  ? event => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActive(outcomeIndex);
                      }
                    }
                  : undefined
              }
            >
              <circle className="hx-pipe-hit" cx={node.x} cy="50" r="30" />
              <circle className="hx-pipe-ring" cx={node.x} cy="50" r="20" />
              <circle className="hx-pipe-core" cx={node.x} cy="50" r="8" />
              <text x={node.x} y="106" textAnchor="middle">
                {node.label}
              </text>
            </g>
          );
        })}
        <g
          className="hx-token"
          style={{ transform: `translateX(${tokenX}px)` }}
        >
          <circle cx="0" cy="50" r="13" className="hx-token-halo" />
          <circle cx="0" cy="50" r="6" className="hx-token-core" />
        </g>
      </svg>
      <button
        type="button"
        className="hx-pause"
        aria-label={paused ? "Play the animation" : "Pause the animation"}
        onClick={() => setPaused(value => !value)}
      >
        {paused ? <Play size={14} /> : <Pause size={14} />}
      </button>
      <div className="hx-stage-panel" aria-live="polite">
        <div className="hx-stage-copy" key={outcome.key}>
          <span className="hx-status">{outcome.label}</span>
          <h3>{outcome.title}</h3>
          <p>{outcome.summary}</p>
          <p className="hx-stage-note">
            {active === 1 ? (
              <ShieldCheck size={16} aria-hidden="true" />
            ) : (
              <Check size={16} aria-hidden="true" />
            )}
            {outcome.detail}
          </p>
          <Link className="text-link" href="/product">
            See how it works
          </Link>
        </div>
        <div className="hx-stage-visual" key={`v-${outcome.key}`}>
          <Scene />
        </div>
      </div>
    </div>
  );
}
