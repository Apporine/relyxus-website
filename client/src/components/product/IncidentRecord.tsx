import type { CSSProperties } from "react";
import { exampleIncident as incident } from "@/content/exampleIncident";
import { useRevealOnce } from "@/lib/useRevealOnce";
import { Callout, ProductFrame } from "./ProductFrame";

/** The hero visual: the INC-2207 record, annotated with three callouts. */
export function IncidentRecord() {
  const [ref, reveal] = useRevealOnce<HTMLOListElement>();
  return (
    <ProductFrame
      title={`${incident.ref} · Incident record`}
      meta={<span className="sev">{incident.severity}</span>}
      className="record-frame"
    >
      <p className="record-heading">{incident.title}</p>
      <ol className="record" ref={ref} data-reveal={reveal}>
        {incident.record.map((row, index) => (
          <li
            key={row.at}
            className={
              "highlight" in row ? "record-row is-cause" : "record-row"
            }
            style={{ "--i": index } as CSSProperties}
          >
            <time className="record-time">{row.at}</time>
            <span className="record-text">
              {row.text}
              <span className="record-source">{row.source}</span>
            </span>
            {"callout" in row && <Callout>{row.callout}</Callout>}
          </li>
        ))}
        <li
          className="record-row record-notice"
          style={{ "--i": incident.record.length } as CSSProperties}
        >
          <span className="notice-chip">{incident.notice}</span>
          <Callout>{incident.noticeCallout}</Callout>
        </li>
      </ol>
    </ProductFrame>
  );
}
