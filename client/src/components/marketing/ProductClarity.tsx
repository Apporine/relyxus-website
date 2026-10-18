import type { CSSProperties } from "react";
import { Link } from "wouter";
import { ArrowUpRight, Check } from "lucide-react";
import { Headline } from "./Headline";
import {
  beforeAfter,
  featureMap,
  howItWorks,
  namedIntegrations,
  securityFeatures,
} from "@/content/features";
import { useReveal } from "@/lib/motion";

/** Static five-step strip so buyers see the workflow without the long stage. */
export function HowItWorksStrip() {
  const [ref, inView] = useReveal<HTMLElement>(0.15);
  return (
    <section
      ref={ref}
      id="how-it-works"
      className={`rx-paper rx-section rx-how ${inView ? "is-in" : ""}`}
      aria-labelledby="rx-how-title"
    >
      <div className="container">
        <Headline id="rx-how-title" text="How it *works.*" in={inView} />
        <p
          className="rx-section-sub rx-reveal"
          style={{ "--i": 2 } as CSSProperties}
        >
          Five steps from first alert to a record you can hand to audit.
        </p>
        <ol
          className="rx-how-steps rx-reveal"
          style={{ "--i": 3 } as CSSProperties}
        >
          {howItWorks.map(step => (
            <li key={step.step}>
              <span className="rx-label">{step.step}</span>
              <strong>{step.name}</strong>
              <span>{step.line}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Inventory of what you buy — name, line, owning screen. */
export function FeatureMap({ ground = "ink" }: { ground?: "ink" | "paper" }) {
  const [ref, inView] = useReveal<HTMLElement>(0.12);
  return (
    <section
      ref={ref}
      id="what-you-get"
      className={`rx-${ground} rx-section rx-features ${inView ? "is-in" : ""}`}
      aria-labelledby="rx-features-title"
    >
      <div className="container">
        <Headline id="rx-features-title" text="What you *get.*" in={inView} />
        <p
          className="rx-section-sub rx-reveal"
          style={{ "--i": 2 } as CSSProperties}
        >
          Six capabilities. Each one maps to a screen your team will use.
        </p>
        <ul
          className="rx-feature-grid rx-reveal"
          style={{ "--i": 3 } as CSSProperties}
        >
          {featureMap.map(item => (
            <li key={item.name}>
              <div className="rx-feature-head">
                <strong>{item.name}</strong>
                <Link href={item.href} className="rx-feature-screen">
                  {item.screen}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
              <p>{item.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Translate features into outcomes without marketing fluff. */
export function BeforeAfterStrip() {
  const [ref, inView] = useReveal<HTMLElement>(0.15);
  return (
    <section
      ref={ref}
      id="before-after"
      className={`rx-paper rx-section rx-before ${inView ? "is-in" : ""}`}
      aria-labelledby="rx-before-title"
    >
      <div className="container">
        <Headline
          id="rx-before-title"
          text="Without Relyxus, *and with it.*"
          in={inView}
        />
        <div
          className="rx-before-table rx-reveal"
          style={{ "--i": 2 } as CSSProperties}
        >
          <div className="rx-before-head" aria-hidden="true">
            <span>Without</span>
            <span>With Relyxus</span>
            <span>Feature</span>
          </div>
          {beforeAfter.map(row => (
            <div className="rx-before-row" key={row.feature}>
              <p className="is-without">{row.without}</p>
              <p className="is-with">{row.with}</p>
              <p className="is-feature">{row.feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Named tools so buyers can see stack fit. */
export function StackStrip() {
  const [ref, inView] = useReveal<HTMLElement>(0.15);
  return (
    <section
      ref={ref}
      id="stack"
      className={`rx-ink rx-section rx-stack ${inView ? "is-in" : ""}`}
      aria-labelledby="rx-stack-title"
    >
      <div className="container">
        <Headline
          id="rx-stack-title"
          text="Works with *the tools you already run.*"
          in={inView}
        />
        <p
          className="rx-section-sub rx-reveal"
          style={{ "--i": 2 } as CSSProperties}
        >
          Named integrations for alerts, observability, change and identity —
          not categories.
        </p>
        <ul
          className="rx-stack-list rx-reveal"
          style={{ "--i": 3 } as CSSProperties}
        >
          {namedIntegrations.map(name => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Security controls as product features, not only a pack request. */
export function SecurityFeatureStrip() {
  const [ref, inView] = useReveal<HTMLElement>(0.15);
  return (
    <section
      ref={ref}
      id="controls"
      className={`rx-paper rx-section rx-controls ${inView ? "is-in" : ""}`}
      aria-labelledby="rx-controls-title"
    >
      <div className="container">
        <Headline
          id="rx-controls-title"
          text="Built-in *controls.*"
          in={inView}
        />
        <p
          className="rx-section-sub rx-reveal"
          style={{ "--i": 2 } as CSSProperties}
        >
          Three product features your security review can test on day one.
        </p>
        <ul
          className="rx-control-list rx-reveal"
          style={{ "--i": 3 } as CSSProperties}
        >
          {securityFeatures.map(item => (
            <li key={item.title}>
              <Check size={20} aria-hidden="true" />
              <div>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <p
          className="rx-control-more rx-reveal"
          style={{ "--i": 4 } as CSSProperties}
        >
          <Link href="/security">Read the security summary</Link>
          {" · "}
          <Link href="/demo?type=Security%20pack">
            Request the security pack
          </Link>
        </p>
      </div>
    </section>
  );
}
