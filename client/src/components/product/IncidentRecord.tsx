import { useEffect, useState, type CSSProperties } from "react";
import { exampleIncident as incident } from "@/content/exampleIncident";
import { useRevealOnce } from "@/lib/useRevealOnce";
import { Callout, ProductFrame } from "./ProductFrame";

const ROW_MS = 1000;
const LOOP_MS = 13000;

/**
 * The INC-2207 record. When `playing`, rows appear ~1 s apart, the cause
 * highlights, the notice chip slides in, then the loop restarts every 13 s.
 * Respects prefers-reduced-motion (final state only).
 */
export function IncidentRecord({ playing = false }: { playing?: boolean }) {
  const [ref, reveal] = useRevealOnce<HTMLOListElement>();
  const total = incident.record.length + 1;
  const [visible, setVisible] = useState(playing ? 0 : total);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!playing || reduced) {
      setVisible(total);
      return;
    }
    let step = 0;
    setVisible(0);
    const tick = () => {
      step += 1;
      if (step > total) {
        step = 0;
        setVisible(0);
      } else {
        setVisible(step);
      }
    };
    const interval = window.setInterval(tick, ROW_MS);
    const loop = window.setInterval(() => {
      step = 0;
      setVisible(0);
    }, LOOP_MS);
    return () => {
      window.clearInterval(interval);
      window.clearInterval(loop);
    };
  }, [playing, reduced, total]);

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
              visible > index ? "is-shown" : "",
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
            visible > incident.record.length ? "is-shown" : "",
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
