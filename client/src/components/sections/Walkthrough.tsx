import { useEffect, useRef, useState } from "react";
import { walkthrough } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { crops } from "@/components/product/Crops";

const STEP_MS = 6000;

/** Four auto-advancing steps with a progress bar; click stops auto-advance. */
export function Walkthrough() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (paused || reduced) return;
    timer.current = window.setInterval(() => {
      setActive(current => (current + 1) % walkthrough.steps.length);
    }, STEP_MS);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [paused, reduced]);

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
          <div>
            <ol className="walkthrough-tabs" role="tablist">
              {walkthrough.steps.map((item, index) => (
                <li key={item.title} role="presentation">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active === index}
                    className={active === index ? "is-active" : ""}
                    onClick={() => {
                      setPaused(true);
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
                    {active === index && !paused && !reduced && (
                      <span
                        className="walkthrough-progress"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ol>
            <aside className="walkthrough-side card">
              <h3>{walkthrough.side.title}</h3>
              <p className="muted">{walkthrough.side.text}</p>
              <ButtonLink href={walkthrough.side.cta.href}>
                {walkthrough.side.cta.label}
              </ButtonLink>
            </aside>
          </div>
          <div className="walkthrough-visual" role="tabpanel">
            <Crop />
          </div>
        </div>
      </div>
    </section>
  );
}
