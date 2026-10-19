import { useEffect, useState, type CSSProperties } from "react";
import { exampleIncident as incident } from "@/content/exampleIncident";
import { useRevealOnce } from "@/lib/useRevealOnce";
import { Callout, ProductFrame } from "./ProductFrame";

const ROW_MS = 1000;
const HOLD_MS = 5000;

/**
 * The INC-2207 record. Every row is always visible at full contrast; when
 * `playing`, a highlight walks the timeline about 1 s a row, the notice chip
 * pops in at the end, then it holds and repeats. Reduced motion: no walk.
 */
export function IncidentRecord({ playing = false }: { playing?: boolean }) {
  const [ref, reveal] = useRevealOnce<HTMLOListElement>();
  const total = incident.record.length + 1;
  // Index of the highlighted row; -1 means none (the resting state).
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!playing || reduced) return;
    let timer = 0;
    const step = (index: number) => {
      setCurrent(index);
      const last = index >= total - 1;
      timer = window.setTimeout(
        () => step(last ? 0 : index + 1),
        last ? HOLD_MS : ROW_MS
      );
    };
    timer = window.setTimeout(() => step(0), HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [playing, total]);

  return (
    <ProductFrame
      title={`${incident.ref} · Incident record`}
      meta={<span className="sev">{incident.severity}</span>}
      className="record-frame"
    >
      <p className="record-heading">{incident.title}</p>
      <ol
        className="record"
        ref={ref}
        data-reveal={playing ? undefined : reveal}
        data-playing={playing || undefined}
      >
        {incident.record.map((row, index) => (
          <li
            key={row.at}
            className={[
              "record-row",
              "highlight" in row ? "is-cause" : "",
              current === index ? "is-current" : "",
            ]
              .filter(Boolean)
              .join(" ")}
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
          className={[
            "record-row",
            "record-notice",
            current === incident.record.length ? "is-current" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ "--i": incident.record.length } as CSSProperties}
        >
          <span className="notice-chip">{incident.notice}</span>
          <Callout>{incident.noticeCallout}</Callout>
        </li>
      </ol>
    </ProductFrame>
  );
}
