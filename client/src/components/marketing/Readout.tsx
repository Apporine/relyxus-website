import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

type ReadoutState = {
  stage: string;
  clock: string;
  status: string;
  live: boolean;
};

const EMPTY: ReadoutState = {
  stage: "",
  clock: "T+00:00",
  status: "",
  live: true,
};

/**
 * The incident clock, bottom left on every page: "STAGE 04 · CAUSE" over
 * "T+00:04 · CAUSE FOUND · 0.420". The section under the middle of the
 * viewport supplies the stage, clock and status through data-readout
 * attributes; progress is scroll divided by the whole page.
 */
export function Readout() {
  const [state, setState] = useState<ReadoutState>(EMPTY);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [location] = useLocation();

  useEffect(() => {
    let frame = 0;
    let last = "";
    const read = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progressRef.current)
        progressRef.current.textContent = progress.toFixed(3);

      const middle = window.innerHeight / 2;
      let found: HTMLElement | null = null;
      for (const el of document.querySelectorAll<HTMLElement>(
        "[data-readout]"
      )) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= middle && rect.bottom >= middle) found = el;
      }
      const next: ReadoutState = found
        ? {
            stage: found.dataset.readoutStage ?? "",
            clock: found.dataset.readoutClock ?? "T+00:00",
            status: found.dataset.readoutStatus ?? "",
            live: found.dataset.readoutLive !== "false",
          }
        : EMPTY;
      const key = JSON.stringify(next);
      if (key !== last) {
        last = key;
        setState(next);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Stages also change their attributes without a scroll event.
    const observer = new MutationObserver(onScroll);
    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: [
        "data-readout-stage",
        "data-readout-clock",
        "data-readout-status",
        "data-readout-live",
      ],
    });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
    };
  }, [location]);

  const [hh, mm] = state.clock.replace("T+", "").split(":");
  return (
    <div className="rx-readout" aria-hidden="true">
      {state.stage && <span className="rx-readout-stage">{state.stage}</span>}
      <span>
        <span className={`rx-readout-clock ${state.live ? "is-live" : ""}`}>
          T+{hh}
          <span className="rx-colon">:</span>
          {mm}
        </span>
        {state.status && <strong> · {state.status}</strong>} ·{" "}
        <span ref={progressRef}>0.000</span>
      </span>
    </div>
  );
}
