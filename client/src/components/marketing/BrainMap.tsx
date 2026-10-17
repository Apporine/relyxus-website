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

/** Each lane: tile position, label, icon, and an orthogonal route into the core. */
const lanes: {
  label: string;
  tone: Tone;
  x: number;
  y: number;
  path: string;
  icon: typeof Bell;
}[] = [
  {
    label: "Alerts",
    tone: "coral",
    x: 30,
    y: 40,
    path: "M130 66 H196 V140 L262 206",
    icon: Bell,
  },
  {
    label: "Logs",
    tone: "cyan",
    x: 270,
    y: 14,
    path: "M320 66 V198",
    icon: ScrollText,
  },
  {
    label: "Metrics",
    tone: "mint",
    x: 510,
    y: 40,
    path: "M510 66 H444 V140 L378 206",
    icon: Activity,
  },
  {
    label: "Changes",
    tone: "violet",
    x: 10,
    y: 234,
    path: "M110 260 H258",
    icon: GitBranch,
  },
  {
    label: "Tickets",
    tone: "amber",
    x: 530,
    y: 234,
    path: "M530 260 H382",
    icon: Ticket,
  },
  {
    label: "Traces",
    tone: "blue",
    x: 30,
    y: 430,
    path: "M130 456 H196 V380 L262 314",
    icon: Route,
  },
  {
    label: "Deploys",
    tone: "lime",
    x: 270,
    y: 444,
    path: "M320 444 V322",
    icon: Rocket,
  },
  {
    label: "Identity",
    tone: "pink",
    x: 510,
    y: 430,
    path: "M510 456 H444 V380 L378 314",
    icon: Fingerprint,
  },
];

const tags: { label: string; tone: Tone; x: number; y: number }[] = [
  { label: "Evidence aware", tone: "mint", x: 250, y: 176 },
  { label: "Change aware", tone: "violet", x: 252, y: 352 },
  { label: "Policy aware", tone: "amber", x: 392, y: 176 },
  { label: "Record aware", tone: "cyan", x: 394, y: 352 },
];

export function BrainMap({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brain ${compact ? "brain-compact" : ""}`}>
      <svg
        viewBox="0 0 640 520"
        role="img"
        aria-label="Relyxus core: alerts, logs, metrics, changes, tickets, traces, deploys and identity all feed one incident record."
      >
        {lanes.map((lane, index) => (
          <g
            key={lane.label}
            className={`brain-lane brain-${lane.tone}`}
            style={{ "--i": index } as CSSProperties}
          >
            <path className="brain-line" d={lane.path} />
            <circle
              className="brain-packet"
              r="4.5"
              style={{ offsetPath: `path("${lane.path}")` } as CSSProperties}
            />
            <rect
              className="brain-tile"
              x={lane.x}
              y={lane.y}
              width="100"
              height="52"
              rx="10"
            />
            <lane.icon
              className="brain-icon"
              x={lane.x + 38}
              y={lane.y + 7}
              width={24}
              height={24}
            />
            <text
              className="brain-text"
              x={lane.x + 50}
              y={lane.y + 44}
              textAnchor="middle"
            >
              {lane.label.toUpperCase()}
            </text>
          </g>
        ))}

        {tags.map(tag => (
          <g key={tag.label} className={`brain-tag brain-${tag.tone}`}>
            <rect x={tag.x - 6} y={tag.y - 11} width="96" height="18" rx="4" />
            <text x={tag.x + 42} y={tag.y + 2} textAnchor="middle">
              {tag.label.toUpperCase()}
            </text>
          </g>
        ))}

        <circle className="brain-halo" cx="320" cy="260" r="74" />
        <circle className="brain-ring" cx="320" cy="260" r="60" />
        <circle className="brain-disc" cx="320" cy="260" r="50" />
        <Brain className="brain-glyph" x={296} y={232} width={48} height={48} />
        <text className="brain-core-text" x="320" y="296" textAnchor="middle">
          RELYXUS
        </text>
        <text className="brain-core-sub" x="320" y="308" textAnchor="middle">
          INCIDENT CORE
        </text>
      </svg>
    </div>
  );
}
