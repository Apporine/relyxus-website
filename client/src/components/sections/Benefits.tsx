import { Check } from "lucide-react";
import { benefits, statement } from "@/content/home";

export function Statement() {
  return (
    <section
      className="section section-white statement-band"
      aria-label="Brand line"
    >
      <div className="container">
        <p className="statement">{statement}</p>
      </div>
    </section>
  );
}

export function Benefits() {
  return (
    <section
      className="section section-canvas on-canvas benefits-band"
      aria-labelledby="benefits-title"
    >
      <div className="container">
        <header className="section-header section-header-center">
          <h2 id="benefits-title">{benefits.title}</h2>
        </header>
        <ul className="benefits-grid">
          {benefits.items.map(item => (
            <li key={item}>
              <span className="benefit-icon" aria-hidden="true">
                <Check size={20} strokeWidth={2} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
