import { useEffect, useState } from "react";
import { walkthrough } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { crops } from "@/components/product/Crops";

const STEP_MS = 6000;

/**
 * Four steps that auto-advance every 6 s. Hovering or focusing a step shows
 * it at once and pauses the cycle until the pointer leaves; a click keeps
 * the chosen step. The console fills the height of the step list.
 */
export function Walkthrough() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [locked, setLocked] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const running = !hovering && !locked && !reduced;

  // A fresh 6 s per step, so leaving the list never jumps straight on.
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(
      () => setActive(current => (current + 1) % walkthrough.steps.length),
      STEP_MS
    );
    return () => window.clearTimeout(timer);
  }, [running, active]);

  const step = walkthrough.steps[active];
  const Crop = crops[step.crop];

  return (
    <section
      id="walkthrough"
      className="section section-paper walkthrough"
      aria-labelledby="walkthrough-title"
    >
      <div className="container">
        <header className="section-header">
          <h2 id="walkthrough-title">{walkthrough.title}</h2>
        </header>
        <div className="walkthrough-grid">
          <ol
            className="walkthrough-tabs"
            role="tablist"
            aria-label="Incident steps"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {walkthrough.steps.map((item, index) => (
              <li key={item.title} role="presentation">
                <button
                  type="button"
                  role="tab"
                  id={`walk-tab-${index}`}
                  aria-selected={active === index}
                  aria-controls="walk-panel"
                  className={active === index ? "is-active" : ""}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => {
                    setLocked(true);
                    setActive(index);
                  }}
                >
                  <span className="walkthrough-num" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span>
                    <strong>{item.title}</strong>
                    <span className="muted small">{item.text}</span>
                  </span>
                  {active === index && running && (
                    <span
                      key={active}
                      className="walkthrough-progress"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>
            ))}
          </ol>
          <div
            className="walkthrough-visual"
            role="tabpanel"
            id="walk-panel"
            aria-labelledby={`walk-tab-${active}`}
          >
            <div className="walkthrough-crop" key={active}>
              <Crop />
            </div>
          </div>
        </div>
        <aside className="walkthrough-cta" aria-label={walkthrough.side.title}>
          <div>
            <h3>{walkthrough.side.title}</h3>
            <p>{walkthrough.side.text}</p>
          </div>
          <ButtonLink href={walkthrough.side.cta.href}>
            {walkthrough.side.cta.label}
          </ButtonLink>
        </aside>
      </div>
    </section>
  );
}
