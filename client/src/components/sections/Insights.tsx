import { Link } from "wouter";
import { insights } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";

export function Insights() {
  return (
    <section
      className="section section-paper insights"
      aria-labelledby="insights-title"
    >
      <div className="container">
        <header className="insights-header">
          <h2 id="insights-title">{insights.title}</h2>
          <ButtonLink href="/resources" variant="dark">
            View all
          </ButtonLink>
        </header>
        <ul className="insights-grid">
          {insights.items.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`insight-card insight-${item.tint}`}
              >
                <span className="insight-thumb" aria-hidden="true" />
                <span className="insight-cat">{item.category}</span>
                <strong>{item.title}</strong>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
