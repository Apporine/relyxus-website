import type { CSSProperties } from "react";
import { SecurityArt } from "@/components/marketing/HeroArt";

const delay = (seconds: number): CSSProperties => ({
  animationDelay: `${seconds}s`,
});

function DemoScene() {
  return (
    <svg viewBox="0 0 400 300" aria-hidden="true">
      <rect
        className="ea-frame"
        x="30"
        y="30"
        width="340"
        height="240"
        rx="16"
      />
      {[0, 1, 2].map(i => (
        <circle key={i} className="ea-dim" cx={52 + i * 16} cy="52" r="4" />
      ))}
      {[
        { label: "Alert received", tone: "coral", y: 84 },
        { label: "Likely cause found", tone: "mint", y: 134 },
        { label: "Approval granted", tone: "amber", y: 184 },
      ].map((row, index) => (
        <g
          key={row.label}
          className={`ea-reveal ea-${row.tone}`}
          style={delay(index * 1.4)}
        >
          <rect
            className="ea-chip"
            x="56"
            y={row.y}
            width="288"
            height="38"
            rx="12"
          />
          <circle className="ea-dot" cx="78" cy={row.y + 19} r="6" />
          <text x="98" y={row.y + 24}>
            {row.label}
          </text>
        </g>
      ))}
      <rect
        className="ea-bar ea-type"
        x="56"
        y="238"
        width="170"
        height="8"
        rx="4"
      />
    </svg>
  );
}

function ReplayScene() {
  return (
    <svg viewBox="0 0 400 300" aria-hidden="true">
      <circle className="ea-ringline" cx="200" cy="140" r="92" />
      <circle className="ea-ringline ea-ring-in" cx="200" cy="140" r="64" />
      <g className="ea-rewind">
        <path className="ea-hand" d="M200 140 L200 62" />
        <circle className="ea-dot" cx="200" cy="62" r="7" />
      </g>
      <circle className="ea-core" cx="200" cy="140" r="9" />
      <path className="ea-arrow" d="M290 118 a92 92 0 0 0 -34 -48" />
      <path className="ea-arrow" d="M256 70 l2 14 l12 -9 z" />
      {[0, 1, 2, 3, 4].map(i => (
        <rect
          key={i}
          className="ea-tick"
          x={72 + i * 62}
          y="262"
          width="44"
          height="8"
          rx="4"
          style={delay((4 - i) * 0.7)}
        />
      ))}
      <text className="ea-cap" x="200" y="250" textAnchor="middle">
        A past incident, replayed
      </text>
    </svg>
  );
}

function ChecklistScene() {
  const rows = [
    "Evidence in one place",
    "Clear ownership",
    "A record for audit",
    "Practised approvals",
  ];
  return (
    <svg viewBox="0 0 400 300" aria-hidden="true">
      {rows.map((row, index) => (
        <g key={row}>
          <rect
            className="ea-chip"
            x="50"
            y={36 + index * 58}
            width="300"
            height="44"
            rx="12"
          />
          <rect
            className="ea-box"
            x="68"
            y={48 + index * 58}
            width="20"
            height="20"
            rx="6"
          />
          <path
            className="ea-check"
            d={`M72 ${58 + index * 58} l5 6 l10 -12`}
            style={delay(index * 1.1)}
          />
          <text x="104" y={64 + index * 58}>
            {row}
          </text>
        </g>
      ))}
    </svg>
  );
}

function DeploymentScene() {
  return (
    <svg viewBox="0 0 400 300" aria-hidden="true">
      <rect
        className="ea-zone ea-zone-a"
        x="24"
        y="60"
        width="152"
        height="180"
        rx="18"
      />
      <rect
        className="ea-zone ea-zone-b"
        x="224"
        y="60"
        width="152"
        height="180"
        rx="18"
      />
      <text className="ea-cap" x="100" y="84" textAnchor="middle">
        Dedicated
      </text>
      <text className="ea-cap" x="300" y="84" textAnchor="middle">
        Self hosted
      </text>
      <circle className="ea-core" cx="200" cy="150" r="18" />
      <path className="hx-lane" d="M182 150 H110" />
      <path className="hx-lane" d="M218 150 H290" />
      <circle
        className="ea-packet ea-packet-a"
        r="5"
        cx="0"
        cy="0"
        style={{ offsetPath: 'path("M182 150 H110")' } as CSSProperties}
      />
      <circle
        className="ea-packet ea-packet-b"
        r="5"
        cx="0"
        cy="0"
        style={{ offsetPath: 'path("M218 150 H290")' } as CSSProperties}
      />
      <rect className="ea-node" x="70" y="126" width="48" height="48" rx="12" />
      <rect
        className="ea-node"
        x="282"
        y="126"
        width="48"
        height="48"
        rx="12"
      />
    </svg>
  );
}

function PricingScene() {
  return (
    <svg viewBox="0 0 400 300" aria-hidden="true">
      {[110, 160, 90].map((height, index) => (
        <rect
          key={index}
          className="ea-grow"
          x={70 + index * 96}
          y={230 - height}
          width="60"
          height={height}
          rx="10"
          style={delay(index * 0.5)}
        />
      ))}
      <path className="ea-baseline" d="M44 232 H356" />
      <g className="ea-slider">
        <path className="ea-baseline" d="M70 270 H330" />
        <circle className="ea-handle" cx="70" cy="270" r="9" />
      </g>
    </svg>
  );
}

export function EnquiryArt({ kind }: { kind: string }) {
  if (kind === "Security pack") return <SecurityArt />;
  const scene =
    kind === "Replay pilot" ? (
      <ReplayScene />
    ) : kind === "Readiness checklist" ? (
      <ChecklistScene />
    ) : kind === "Deployment" ? (
      <DeploymentScene />
    ) : kind === "Pricing" ? (
      <PricingScene />
    ) : (
      <DemoScene />
    );
  return (
    <div
      className={`art ea ea-${kind.toLowerCase().replace(/\s+/g, "-")}`}
      aria-hidden="true"
    >
      {scene}
    </div>
  );
}
