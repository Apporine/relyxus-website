import { useId, useMemo, useState } from "react";
import { perspectiveFacts } from "@/content/site";
import type { SolutionProof } from "@/content/solutions";

/* Engineering and SRE: click a cause, see its logs, change and ticket. */
const causes = [
  {
    name: "Deploy api-gw v3.2",
    fit: "Fits the evidence",
    logs: [
      "14:05:12 api-gw 502 upstream timeout ×412",
      "14:05:40 auth-svc connection pool exhausted",
    ],
    change: "14:02:11 deploy api-gw v3.2, pool size 50 → 5",
    ticket: "CHG-2207, standard change, no rollback plan attached",
  },
  {
    name: "Card network latency",
    fit: "Partly fits",
    logs: [
      "14:04:58 issuer p99 latency 820ms (baseline 610ms)",
      "14:06:10 timeouts limited to one issuer range",
    ],
    change: "No change on our side in the window",
    ticket: "VND-118, card network status page: degraded, UK",
  },
  {
    name: "Ledger write lag",
    fit: "Doesn’t fit",
    logs: [
      "14:05:00 ledger-writer queue depth normal",
      "14:05:30 no write errors in the window",
    ],
    change: "13:40 config: ledger batch size 200 → 250",
    ticket: "No ticket open",
  },
] as const;

function EvidenceBoard() {
  const [active, setActive] = useState(0);
  const cause = causes[active];
  const id = useId();
  return (
    <div className="rx-proof rx-board">
      <div
        className="rx-board-causes"
        role="tablist"
        aria-label="Ranked causes"
      >
        {causes.map((item, index) => (
          <button
            key={item.name}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-selected={active === index}
            aria-controls={`${id}-panel`}
            onClick={() => setActive(index)}
          >
            <span className="rx-board-rank">#{index + 1}</span>
            <strong>{item.name}</strong>
            <span className="rx-board-fit">{item.fit}</span>
          </button>
        ))}
      </div>
      <div
        className="rx-board-evidence"
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
      >
        <section>
          <h4>Logs</h4>
          {cause.logs.map(line => (
            <p key={line}>{line}</p>
          ))}
        </section>
        <section>
          <h4>Change</h4>
          <p>{cause.change}</p>
        </section>
        <section>
          <h4>Ticket</h4>
          <p>{cause.ticket}</p>
        </section>
      </div>
    </div>
  );
}

/* Risk and resilience: DORA stages from the times you enter. */
const BASE = new Date(2027, 2, 22, 0, 0); // a Monday, so days read naturally
const fmt = (date: Date) =>
  date.toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

function RegulatorClock() {
  const [aware, setAware] = useState("09:00");
  const [classifyAfter, setClassifyAfter] = useState(2);
  const id = useId();

  const times = useMemo(() => {
    const [h, m] = aware.split(":").map(Number);
    const awareAt = new Date(BASE);
    awareAt.setHours(h || 0, m || 0);
    const classifiedAt = new Date(awareAt.getTime() + classifyAfter * 3.6e6);
    const firstNotice = new Date(
      Math.min(
        classifiedAt.getTime() + 4 * 3.6e6,
        awareAt.getTime() + 24 * 3.6e6
      )
    );
    const intermediate = new Date(firstNotice.getTime() + 72 * 3.6e6);
    const final = new Date(intermediate);
    final.setMonth(final.getMonth() + 1);
    return { awareAt, classifiedAt, firstNotice, intermediate, final };
  }, [aware, classifyAfter]);

  const rows = [
    {
      clock: "4h",
      label: "First notice due",
      rule: "4 hours from classification, and no later than 24 hours from awareness",
      at: times.firstNotice,
    },
    {
      clock: "72h",
      label: "Intermediate report due",
      rule: "72 hours after the first notice, if it goes in at its deadline",
      at: times.intermediate,
    },
    {
      clock: "1 month",
      label: "Final report due",
      rule: "1 month after the intermediate report",
      at: times.final,
    },
  ];

  return (
    <div className="rx-proof rx-clocksim">
      <div className="rx-clocksim-inputs">
        <label htmlFor={`${id}-aware`}>
          <span>Became aware at</span>
          <input
            id={`${id}-aware`}
            type="time"
            value={aware}
            onChange={event => setAware(event.target.value)}
          />
        </label>
        <label htmlFor={`${id}-classify`}>
          <span>Classified as major after {classifyAfter}h</span>
          <input
            id={`${id}-classify`}
            type="range"
            min={1}
            max={24}
            step={1}
            value={classifyAfter}
            onChange={event => setClassifyAfter(Number(event.target.value))}
          />
        </label>
      </div>
      <ol className="rx-clocksim-rows" aria-live="polite">
        {rows.map(row => (
          <li key={row.label}>
            <span className="rx-clocksim-clock">{row.clock}</span>
            <span>
              <strong>{row.label}</strong>
              <small>{row.rule}</small>
            </span>
            <time dateTime={row.at.toISOString()}>{fmt(row.at)}</time>
          </li>
        ))}
      </ol>
      <article className="rx-draft" aria-label="Sample first notice draft">
        <header>
          <span>First notice · draft</span>
          <span>Awaiting review</span>
        </header>
        <dl>
          <dt>Incident</dt>
          <dd>INC-2207, card authorisation failures, UK</dd>
          <dt>Detected</dt>
          <dd>{fmt(times.awareAt)}</dd>
          <dt>Classified major</dt>
          <dd>{fmt(times.classifiedAt)}</dd>
          <dt>Impact so far</dt>
          <dd>18,400 failed transactions (estimate)</dd>
          <dt>Working cause</dt>
          <dd>Deploy api-gw v3.2, 3 sources linked</dd>
          <dt>Next step</dt>
          <dd>A person reviews, classifies and submits</dd>
        </dl>
      </article>
    </div>
  );
}

/* Technology leadership: transactions per minute times average value. */
const gbp = (value: number) =>
  value.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  });

function CostCalculator() {
  const [perMinute, setPerMinute] = useState(1200);
  const [average, setAverage] = useState(42);
  const [minutes, setMinutes] = useState(47);
  const id = useId();
  const atRiskPerMinute = perMinute * average;
  const fields = [
    {
      key: "tpm",
      label: "Transactions per minute",
      value: perMinute,
      set: setPerMinute,
    },
    {
      key: "avg",
      label: "Average transaction value (£)",
      value: average,
      set: setAverage,
    },
    {
      key: "min",
      label: "Minutes down",
      value: minutes,
      set: setMinutes,
    },
  ];
  return (
    <div className="rx-proof rx-calc">
      <div className="rx-calc-inputs">
        {fields.map(field => (
          <label key={field.key} htmlFor={`${id}-${field.key}`}>
            <span>{field.label}</span>
            <input
              id={`${id}-${field.key}`}
              type="number"
              inputMode="numeric"
              min={0}
              value={field.value}
              onChange={event =>
                field.set(Math.max(0, Number(event.target.value) || 0))
              }
            />
          </label>
        ))}
      </div>
      <dl className="rx-calc-out" aria-live="polite">
        <div>
          <dt>At risk per minute</dt>
          <dd>{gbp(atRiskPerMinute)}</dd>
        </div>
        <div>
          <dt>At risk per hour</dt>
          <dd>{gbp(atRiskPerMinute * 60)}</dd>
        </div>
        <div className="rx-calc-total">
          <dt>At risk over {minutes} minutes</dt>
          <dd>{gbp(atRiskPerMinute * minutes)}</dd>
        </div>
      </dl>
    </div>
  );
}

/* Card authorisation failures: the payment path with the failing hop lit. */
const hops = [
  { name: "App", note: "Checkout request sent", ok: true },
  { name: "Gateway", note: "Accepted, 38ms", ok: true },
  { name: "Router", note: "Timeout to issuer, 412 in 5 minutes", ok: false },
  { name: "Ledger", note: "No write for failed authorisations", ok: true },
] as const;

function PaymentPath() {
  return (
    <div className="rx-proof rx-path">
      <ol className="rx-path-hops">
        {hops.map((hop, index) => (
          <li
            key={hop.name}
            className={hop.ok ? "" : "is-broken"}
            style={{ animationDelay: `${index * 0.45}s` }}
          >
            <span className="rx-path-node" aria-hidden="true" />
            <strong>{hop.name}</strong>
            <span>{hop.note}</span>
            {!hop.ok && <em className="rx-path-flag">Cause found</em>}
          </li>
        ))}
      </ol>
      <span className="rx-path-packet" aria-hidden="true" />
    </div>
  );
}

/* Third party outages: their incident and yours on one view. */
const vendorLane = [
  {
    at: "13:52",
    text: "Status page: card processor degraded, UK",
    source: "Vendor status page",
  },
  { at: "14:30", text: "Vendor deploys a fix", source: "Vendor update" },
  { at: "15:05", text: "Vendor marks resolved", source: "Vendor update" },
] as const;
const ownLane = [
  {
    at: "13:54",
    text: "Authorisation declines up 8×",
    source: "payments-api metrics",
  },
  {
    at: "14:02",
    text: "Our retry policy doubles load on the processor",
    source: "router logs",
  },
  {
    at: "14:20",
    text: "Failover to the second processor approved",
    source: "approval record",
  },
  { at: "14:41", text: "Declines back to baseline", source: "payments-api" },
] as const;

function SplitTimeline() {
  const fact = perspectiveFacts.engineering;
  return (
    <div className="rx-proof rx-split">
      <div className="rx-split-lanes">
        {[
          { title: "Their incident", items: vendorLane },
          { title: "Your incident", items: ownLane },
        ].map(lane => (
          <section key={lane.title}>
            <h4>{lane.title}</h4>
            <ol>
              {lane.items.map(item => (
                <li key={item.at + item.text}>
                  <time>{item.at}</time>
                  <span>{item.text}</span>
                  <small>Source: {item.source}</small>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
      <p className="rx-split-cite">
        <strong>{fact.value}</strong> {fact.label}.{" "}
        <a href={fact.source.href} target="_blank" rel="noreferrer">
          {fact.source.label}
        </a>
      </p>
    </div>
  );
}

/* Bad changes: from the change to the impact, rollback waiting at the gate. */
const changeEvents = [
  { at: "14:02", text: "Deploy api-gw v3.2" },
  { at: "14:05", text: "Errors rise to 6.1%" },
  { at: "14:11", text: "Change matched to the error spike" },
  { at: "14:14", text: "Rollback to v3.1 proposed" },
] as const;

function ChangeTimeline() {
  return (
    <div className="rx-proof rx-change">
      <svg
        className="rx-change-graph"
        viewBox="0 0 400 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polyline
          className="rx-change-base"
          points="0,64 60,63 100,64 120,62"
        />
        <polyline
          className="rx-change-spike"
          points="120,62 150,30 200,14 260,12 320,13 400,12"
        />
        <line className="rx-change-mark" x1="120" y1="0" x2="120" y2="80" />
      </svg>
      <ol className="rx-change-events">
        {changeEvents.map(event => (
          <li key={event.at}>
            <time>{event.at}</time>
            <span>{event.text}</span>
          </li>
        ))}
        <li className="rx-change-gate">
          <time>Now</time>
          <span>Waiting at the approval gate</span>
          <small>Needs: Head of Payments Ops</small>
        </li>
      </ol>
    </div>
  );
}

export function SolutionProofBlock({ kind }: { kind: SolutionProof }) {
  switch (kind) {
    case "evidence-board":
      return <EvidenceBoard />;
    case "regulator-clock":
      return <RegulatorClock />;
    case "cost-calculator":
      return <CostCalculator />;
    case "payment-path":
      return <PaymentPath />;
    case "split-timeline":
      return <SplitTimeline />;
    case "change-timeline":
      return <ChangeTimeline />;
  }
}
