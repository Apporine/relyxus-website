import { Link } from "wouter";
import { PageMeta } from "@/components/layout/PageMeta";
import { Button } from "@/components/ui/Button";
import { Sources } from "@/components/ui/Sources";
import { checklist, regulatorySources } from "@/content/regulation";

/** The checklist as a printable page: Print saves it as a one-page PDF. */
export function ChecklistPage() {
  return (
    <>
      <PageMeta route="/dora/checklist" />
      <section
        className="section section-white checklist-page"
        aria-labelledby="page-title"
      >
        <div className="container narrow">
          <p className="label">
            <Link href="/dora">DORA and UK reporting</Link> · Checklist
          </p>
          <h1 id="page-title">
            Payments incident reporting checklist (DORA and UK)
          </h1>
          <p className="lead">
            Tick what you could show an auditor today. Every unticked line is
            time you would spend during a real incident.
          </p>
          <div className="no-print actions">
            <Button onClick={() => window.print()}>Print or save as PDF</Button>
          </div>
          {checklist.map(group => (
            <section key={group.stage} className="checklist-group">
              <h2>{group.stage}</h2>
              <ul>
                {group.items.map(item => (
                  <li key={item}>
                    <label>
                      <input type="checkbox" />
                      <span>{item}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <Sources items={regulatorySources} />
          <p className="small muted">
            From Relyxus, a product by Apporine. A summary of public rules, not
            legal advice.
          </p>
        </div>
      </section>
    </>
  );
}
