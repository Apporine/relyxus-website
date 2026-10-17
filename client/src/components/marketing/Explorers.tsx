import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  ExternalLink,
  FileText,
  GitBranch,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "wouter";
import { productOutcomes } from "@/content/site";

const steps = [
  {
    id: "context",
    label: "Context",
    number: "01",
    short: "Understand impact",
    title: "What changed for the people relying on this service?",
    caption:
      "The payment journey is affected. The responder sees the alert and the recent change side by side.",
    kind: "context",
  },
  {
    id: "evidence",
    label: "Evidence",
    number: "02",
    short: "Inspect evidence",
    title: "A likely cause, with the doubt left in.",
    caption:
      "The timing makes a recent route change the first thing to check. A dependency timeout stays on the list.",
    kind: "evidence",
  },
  {
    id: "review",
    label: "Human review",
    number: "03",
    short: "Review the gate",
    title: "The proposal is waiting for the people policy requires.",
    caption:
      "A rollback is proposed. It waits for the two approvers your policy names.",
    kind: "review",
  },
  {
    id: "record",
    label: "Record",
    number: "04",
    short: "Inspect the record",
    title: "Preserve what was known, decided and checked.",
    caption:
      "The record keeps every source link and a report draft that people still classify, review and submit.",
    kind: "record",
  },
];

function StepIllustration({ kind }: { kind: string }) {
  if (kind === "context")
    return (
      <div className="step-visual step-context-visual">
        <div className="step-visual-title">
          <span>Incident RX-204</span>
          <span>Sample data</span>
        </div>
        <div className="context-path">
          <span>PAYMENTS API</span>
          <i />
          <span>AUTHORIZATION</span>
          <i />
          <span>LEDGER ADAPTER</span>
        </div>
        <div className="impact-band">
          <CircleAlert size={17} />
          <span>
            <strong>Service signal observed</strong>
            <small>Customer payment flow may be affected</small>
          </span>
          <span className="time">09:14 UTC</span>
        </div>
        <div className="change-chip">
          <GitBranch size={14} /> Recent change <b>billing-router 2.8.1</b>
          <span>09:08 UTC</span>
        </div>
      </div>
    );
  if (kind === "evidence")
    return (
      <div className="step-visual step-evidence-visual">
        <div className="step-visual-title">
          <span>Likely cause</span>
          <span className="ai-tag">
            <Sparkles size={12} /> Hypothesis
          </span>
        </div>
        <h3>The routing change looks relevant.</h3>
        <p className="uncertainty-line">
          Check the source and the alternative before acting.
        </p>
        <div className="evidence-source-list">
          <div>
            <span className="source-index">A</span>
            <span>
              <strong>Deployment record</strong>
              <small>
                Route configuration changed shortly before the alert.
              </small>
            </span>
            <details className="source-detail">
              <summary>Details</summary>
              <p>
                billing-router 2.8.1 adjusted routing shortly before the signal.
              </p>
            </details>
          </div>
          <div>
            <span className="source-index">B</span>
            <span>
              <strong>Dependency signal</strong>
              <small>ledger-adapter responses are also under review.</small>
            </span>
            <details className="source-detail">
              <summary>Details</summary>
              <p>Intermittent ledger-adapter timeouts remain an alternative.</p>
            </details>
          </div>
        </div>
        <details className="evidence-detail">
          <summary>
            What if evidence is incomplete? <ChevronDown size={15} />
          </summary>
          <p>
            An unavailable source is recorded as unavailable. It never counts as
            support for the leading hypothesis.
          </p>
        </details>
        <details className="evidence-detail">
          <summary>
            Why it is still a hypothesis <ChevronDown size={15} />
          </summary>
          <p>
            Timing points to the change but does not rule out the dependency.
          </p>
        </details>
      </div>
    );
  if (kind === "review")
    return (
      <div className="step-visual step-review-visual">
        <div className="step-visual-title">
          <span>Proposed action</span>
          <span className="waiting-tag">WAITING</span>
        </div>
        <div className="proposal-box">
          <span className="proposal-icon">
            <GitBranch size={16} />
          </span>
          <div>
            <small>Proposed change</small>
            <strong>Roll back billing-router 2.8.1</strong>
            <span>Scope: payment routing service</span>
          </div>
        </div>
        <div className="approval-gate">
          <span className="gate-line" />
          <span className="gate-shield">
            <ShieldCheck size={16} />
          </span>
          <div>
            <small>POLICY GATE</small>
            <strong>Two distinct approver roles required</strong>
          </div>
        </div>
        <div className="approval-steps">
          <span>
            <i />
            Service owner <b>Required</b>
          </span>
          <span>
            <i />
            Change authority <b>Required</b>
          </span>
        </div>
        <div className="blocked-callout">
          <ShieldCheck size={14} />
          <span>
            <strong>Waiting.</strong> Nothing has been changed.
          </span>
        </div>
        <details className="evidence-detail">
          <summary>
            Show the approval order <ChevronDown size={15} />
          </summary>
          <p>
            Service owner review, then change-authority review, then a policy
            re-check.
          </p>
        </details>
      </div>
    );
  return (
    <div className="step-visual step-record-visual">
      <div className="step-visual-title">
        <span>Incident record</span>
        <span className="draft-tag">Draft</span>
      </div>
      <div className="record-timeline">
        <div>
          <span className="record-dot record-blue" />
          <span>
            <small>09:14 UTC</small>
            <strong>Service signal observed</strong>
            <em>Source attached</em>
          </span>
        </div>
        <div>
          <span className="record-dot record-violet" />
          <span>
            <small>09:16 UTC</small>
            <strong>Hypothesis recorded</strong>
            <em>Hypothesis, source-linked</em>
          </span>
        </div>
        <div>
          <span className="record-dot record-muted" />
          <span>
            <small>Pending</small>
            <strong>Human review required</strong>
            <em>Waiting for the incident commander</em>
          </span>
        </div>
      </div>
      <div className="report-draft">
        <FileText size={17} />
        <span>
          <strong>Incident report draft</strong>
          <small>
            Classification, review and submission remain human responsibilities.
          </small>
        </span>
        <span className="draft-status">Draft</span>
      </div>
      <div className="verification-note">
        <Check size={14} /> Verification check recorded
      </div>
    </div>
  );
}

export function IncidentWalkthrough() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  return (
    <div className="walkthrough" aria-label="Incident walkthrough">
      <div
        className="walkthrough-step-list"
        role="group"
        aria-label="Walkthrough steps"
      >
        {steps.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={active === index}
            aria-current={active === index ? "step" : undefined}
            className={`walkthrough-step ${active === index ? "active" : ""}`}
            onClick={() => setActive(index)}
          >
            <span className="walkthrough-number">{item.number}</span>
            <span>
              <strong>{item.label}</strong>
              <small>{item.short}</small>
            </span>
            <span className="step-arrow">
              <ArrowRight size={16} />
            </span>
          </button>
        ))}
      </div>
      <div
        className="walkthrough-panel"
        id="walkthrough-panel"
        role="region"
        aria-label={`${step.label}, step ${active + 1} of ${steps.length}`}
      >
        <div
          className="walkthrough-panel-head"
          aria-live="polite"
          aria-atomic="true"
        >
          <div>
            <span className="panel-label">
              STEP {step.number} OF 04 / {step.label.toUpperCase()}
            </span>
            <h3>{step.title}</h3>
            <p>{step.caption}</p>
          </div>
          <span className="example-stamp">Sample data</span>
        </div>
        <StepIllustration kind={step.kind} />
      </div>
    </div>
  );
}

function MiniVisual({ type }: { type: string }) {
  return (
    <div className={`outcome-visual outcome-${type}`} aria-hidden="true">
      <div className="outcome-visual-top">
        <span />
        <span />
        <span />
      </div>
      {type === "trace" && (
        <>
          <div className="trace-node">
            <i /> Evidence source <b>01</b>
          </div>
          <div className="trace-path" />
          <div className="trace-answer">
            <Sparkles size={13} /> Likely cause
          </div>
          <div className="trace-path trace-short" />
          <div className="trace-node">
            <i /> Alternative kept <b>02</b>
          </div>
        </>
      )}
      {type === "gate" && (
        <>
          <div className="gate-proposal-mini">Proposed change</div>
          <div className="mini-gate">
            <ShieldCheck size={18} />
          </div>
          <div className="gate-approved-mini">
            Approval
            <br />
            <b>Required</b>
          </div>
        </>
      )}
      {type === "record" && (
        <>
          <div className="mini-record-title">
            Incident record <span>Draft</span>
          </div>
          <div className="record-bars">
            <i />
            <i />
            <i />
          </div>
          <div className="mini-record-caption">Every source linked</div>
        </>
      )}
    </div>
  );
}

export function ProductExplorer() {
  const [selectedKey, setSelectedKey] = useState<string>(
    productOutcomes[0].key
  );
  const selected = useMemo(
    () =>
      productOutcomes.find(item => item.key === selectedKey) ??
      productOutcomes[0],
    [selectedKey]
  );
  const renderOutcome = (item: (typeof productOutcomes)[number]) => (
    <>
      <div className="preview-inner" aria-live="polite" aria-atomic="true">
        <p className="preview-eyebrow">{item.eyebrow}</p>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        <div className="preview-detail">
          <span className="detail-rule" />
          <span>{item.detail}</span>
        </div>
        <Link className="text-link" href={item.href}>
          See how it works <ArrowRight size={16} />
        </Link>
      </div>
      <MiniVisual type={item.visual} />
    </>
  );
  return (
    <div className="product-explorer">
      <div
        className="product-choice-list"
        role="group"
        aria-label="Product outcomes"
      >
        {productOutcomes.map((item, index) => (
          <div className="product-choice-row" key={item.key}>
            <button
              id={`product-choice-${item.key}`}
              type="button"
              data-index={index + 1}
              aria-pressed={selectedKey === item.key}
              aria-expanded={selectedKey === item.key}
              aria-controls={`product-mobile-panel-${item.key} product-preview`}
              className={`product-choice ${selectedKey === item.key ? "selected" : ""}`}
              onClick={() => setSelectedKey(item.key)}
            >
              <span className="product-choice-index">0{index + 1}</span>
              <span>
                <strong>{item.label}</strong>
                <small>{item.eyebrow}</small>
              </span>
              <ArrowRight size={16} />
            </button>
            <div
              id={`product-mobile-panel-${item.key}`}
              className="product-mobile-panel"
              role="region"
              aria-labelledby={`product-choice-${item.key}`}
              hidden={selectedKey !== item.key}
            >
              <div className="product-preview">{renderOutcome(item)}</div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="product-preview"
        id="product-preview"
        role="region"
        aria-labelledby={`product-choice-${selected.key}`}
      >
        {renderOutcome(selected)}
      </div>
    </div>
  );
}
