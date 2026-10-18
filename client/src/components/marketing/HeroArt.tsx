/** Decorative hero visuals. Purely illustrative, hidden from assistive tech. */

export function SecurityArt() {
  return (
    <div className="art art-security" aria-hidden="true">
      <svg viewBox="0 0 400 340">
        <g className="art-spin art-spin-slow">
          <circle className="art-ring" cx="200" cy="170" r="146" />
          <circle className="art-orb art-orb-coral" cx="200" cy="24" r="7" />
        </g>
        <g className="art-spin art-spin-rev">
          <circle className="art-ring" cx="200" cy="170" r="104" />
          <circle className="art-orb art-orb-cyan" cx="304" cy="170" r="7" />
          <circle className="art-orb art-orb-violet" cx="96" cy="170" r="7" />
        </g>
        <g className="art-spin art-spin-fast">
          <circle className="art-ring" cx="200" cy="170" r="64" />
          <circle className="art-orb art-orb-mint" cx="200" cy="106" r="6" />
        </g>
        <circle className="art-core-glow" cx="200" cy="170" r="44" />
        <path
          className="art-shield"
          d="M200 140 l26 9 v20 c0 18 -11 31 -26 38 c-15 -7 -26 -20 -26 -38 v-20z"
        />
        <path className="art-tick" d="M189 170 l8 8 l16 -17" />
        <text className="art-label" x="200" y="22" textAnchor="middle">
          Read only
        </text>
        <text className="art-label" x="200" y="326" textAnchor="middle">
          A person approves
        </text>
      </svg>
    </div>
  );
}

export function FinanceArt() {
  const dots = [0, 1, 2, 3, 4];
  return (
    <div className="art art-finance" aria-hidden="true">
      <svg viewBox="0 0 460 300">
        <path className="hx-lane" d="M30 140 H430" />
        <path className="hx-flow" d="M30 140 H430" />
        {[90, 230, 370].map((x, index) => (
          <g key={x} className={`art-station art-station-${index}`}>
            <circle className="art-station-ring" cx={x} cy="140" r="26" />
            <circle className="art-station-core" cx={x} cy="140" r="9" />
            <text className="art-label" x={x} y="196" textAnchor="middle">
              {["App", "Router", "Ledger"][index]}
            </text>
          </g>
        ))}
        <g className="art-alert-tag">
          <rect x="170" y="62" width="120" height="30" rx="15" />
          <text x="230" y="82" textAnchor="middle">
            Cause found
          </text>
        </g>
        {dots.map(dot => (
          <circle
            key={dot}
            className="art-txn"
            cx="0"
            cy="0"
            r="5"
            style={{
              offsetPath: 'path("M30 140 H430")',
              animationDelay: `${dot * 0.8}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

const constellation = [
  { x: 220, y: 160, r: 12 },
  { x: 100, y: 80, r: 7 },
  { x: 340, y: 70, r: 8 },
  { x: 70, y: 210, r: 8 },
  { x: 370, y: 200, r: 7 },
  { x: 160, y: 270, r: 7 },
  { x: 300, y: 270, r: 8 },
  { x: 220, y: 40, r: 6 },
];

export function CompanyArt() {
  return (
    <div className="art art-company" aria-hidden="true">
      <svg viewBox="0 0 440 320">
        {constellation.slice(1).map((node, index) => (
          <path
            key={index}
            className="art-edge"
            d={`M220 160 L${node.x} ${node.y}`}
            style={{ animationDelay: `${index * 0.35}s` }}
          />
        ))}
        {constellation.map((node, index) => (
          <g
            key={index}
            className="art-star"
            style={{ animationDelay: `${index * 0.45}s` }}
          >
            <circle
              className="art-star-halo"
              cx={node.x}
              cy={node.y}
              r={node.r * 2.4}
            />
            <circle
              className="art-star-core"
              cx={node.x}
              cy={node.y}
              r={node.r}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export function ResourcesArt() {
  return (
    <div className="art art-resources" aria-hidden="true">
      {[0, 1, 2].map(index => (
        <div key={index} className={`art-doc art-doc-${index}`}>
          <span className="art-pill">
            {["Guide", "Field guide", "Pack"][index]}
          </span>
          <i className="art-line" style={{ width: "78%" }} />
          <i className="art-line" style={{ width: "62%" }} />
          <i className="art-line" style={{ width: "70%" }} />
          <i className="art-line" style={{ width: "40%" }} />
        </div>
      ))}
    </div>
  );
}

export function ContactArt() {
  return (
    <div className="art art-contact" aria-hidden="true">
      <span className="art-ripple" />
      <span className="art-ripple" style={{ animationDelay: "1.2s" }} />
      <span className="art-ripple" style={{ animationDelay: "2.4s" }} />
      <div className="art-bubble">
        <span className="art-typing">
          <i />
          <i />
          <i />
        </span>
      </div>
    </div>
  );
}
