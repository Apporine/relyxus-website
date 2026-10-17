import type { CSSProperties } from "react";
import {
  Activity,
  Bell,
  Brain,
  Fingerprint,
  GitBranch,
  Rocket,
  Route,
  ScrollText,
  ShieldCheck,
  Ticket,
} from "lucide-react";

type Tone =
  | "coral"
  | "cyan"
  | "mint"
  | "violet"
  | "amber"
  | "blue"
  | "lime"
  | "pink";

const CX = 320;
const CY = 260;
const RX = 240;
const RY = 196;
const SWEEP_SECONDS = 8;

/** Clockwise from the top, so the radar sweep reaches them in this order. */
const sources: {
  label: string;
  tone: Tone;
  deg: number;
  icon: typeof Bell;
}[] = [
  { label: "Logs", tone: "cyan", deg: 0, icon: ScrollText },
  { label: "Metrics", tone: "mint", deg: 45, icon: Activity },
  { label: "Tickets", tone: "amber", deg: 90, icon: Ticket },
  { label: "Identity", tone: "pink", deg: 135, icon: Fingerprint },
  { label: "Deploys", tone: "lime", deg: 180, icon: Rocket },
  { label: "Traces", tone: "blue", deg: 225, icon: Route },
  { label: "Changes", tone: "violet", deg: 270, icon: GitBranch },
  { label: "Alerts", tone: "coral", deg: 315, icon: Bell },
];

const phases = [
  "Gathering evidence",
  "Likely cause found",
  "Waiting for approval",
  "Recorded",
] as const;

function place(deg: number, rx = RX, ry = RY) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: CX + rx * Math.cos(rad), y: CY + ry * Math.sin(rad) };
}

/** A curved beam that swirls into the core. */
function beam(from: { x: number; y: number }) {
  const vx = CX - from.x;
  const vy = CY - from.y;
  const length = Math.hypot(vx, vy);
  const mx = (from.x + CX) / 2 + (-vy / length) * 58;
  const my = (from.y + CY) / 2 + (vx / length) * 58;
  return `M${from.x.toFixed(1)} ${from.y.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${CX} ${CY}`;
}

const sweepStart = place(-50, 250, 250);
const sweepEnd = place(0, 250, 250);
const hexagon = Array.from({ length: 6 }, (_, index) => {
  const rad = ((index * 60 - 90) * Math.PI) / 180;
  return `${(CX + 44 * Math.cos(rad)).toFixed(1)},${(CY + 44 * Math.sin(rad)).toFixed(1)}`;
}).join(" ");

export function BrainMap({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`orb ${compact ? "orb-compact" : ""}`}>
      <svg
        viewBox="0 0 640 520"
        role="img"
        aria-label="Relyxus core. Logs, metrics, tickets, identity, deploys, traces, changes and alerts feed one incident record, which moves from gathering evidence to a likely cause, an approval and a record."
      >
        <defs>
          <linearGradient id="orb-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#69f0cb" stopOpacity="0" />
            <stop offset="1" stopColor="#69f0cb" stopOpacity="0.28" />
          </linearGradient>
        </defs>

        <ellipse className="orb-ring" cx={CX} cy={CY} rx={RX} ry={RY} />
        <ellipse
          className="orb-ring orb-ring-2"
          cx={CX}
          cy={CY}
          rx="170"
          ry="140"
        />
        <g className="orb-spin">
          <circle className="orb-ring" cx={CX} cy={CY} r="104" />
          {[0, 90, 180, 270].map(deg => {
            const point = place(deg, 104, 104);
            return (
              <rect
                key={deg}
                className="orb-diamond"
                x={point.x - 5}
                y={point.y - 5}
                width="10"
                height="10"
                transform={`rotate(45 ${point.x} ${point.y})`}
              />
            );
          })}
        </g>

        <g className="orb-sweep">
          <path
            d={`M${CX} ${CY} L${sweepStart.x.toFixed(1)} ${sweepStart.y.toFixed(1)} A250 250 0 0 1 ${sweepEnd.x.toFixed(1)} ${sweepEnd.y.toFixed(1)} Z`}
            fill="url(#orb-sweep)"
          />
          <path
            className="orb-sweep-edge"
            d={`M${CX} ${CY} L${sweepEnd.x.toFixed(1)} ${sweepEnd.y.toFixed(1)}`}
          />
        </g>

        {sources.map((source, index) => {
          const point = place(source.deg);
          const d = beam(point);
          const below = source.deg > 90 && source.deg < 270;
          return (
            <g
              key={source.label}
              className={`orb-source orb-${source.tone}`}
              style={
                {
                  "--i": index,
                  "--delay": `${((source.deg / 360) * SWEEP_SECONDS).toFixed(2)}s`,
                } as CSSProperties
              }
            >
              <path className="orb-beam" d={d} />
              <circle
                className="orb-packet"
                r="4"
                style={{ offsetPath: `path("${d}")` } as CSSProperties}
              />
              <circle className="orb-node" cx={point.x} cy={point.y} r="25" />
              <source.icon
                className="orb-icon"
                x={point.x - 11}
                y={point.y - 11}
                width={22}
                height={22}
              />
              <text
                className="orb-label"
                x={point.x}
                y={point.y + (below ? 45 : -35)}
                textAnchor="middle"
              >
                {source.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        <g className="orb-gate">
          <circle cx={CX + 104} cy={CY} r="19" />
          <ShieldCheck x={CX + 104 - 10} y={CY - 10} width={20} height={20} />
        </g>

        <circle className="orb-halo" cx={CX} cy={CY} r="70" />
        <circle
          className="orb-progress"
          cx={CX}
          cy={CY}
          r="60"
          transform={`rotate(-90 ${CX} ${CY})`}
        />
        <polygon className="orb-hex" points={hexagon} />
        <Brain
          className="orb-brain"
          x={CX - 20}
          y={CY - 21}
          width={40}
          height={40}
        />
        <text className="orb-core-text" x={CX} y={CY + 33} textAnchor="middle">
          RELYXUS
        </text>

        <g className="orb-readout">
          <rect x={CX - 92} y="333" width="184" height="26" rx="13" />
          {phases.map((phase, index) => (
            <text
              key={phase}
              className="orb-phase"
              x={CX}
              y="350"
              textAnchor="middle"
              style={{ animationDelay: `${index * 3}s` }}
            >
              {phase.toUpperCase()}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}
