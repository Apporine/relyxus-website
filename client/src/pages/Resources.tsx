import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { PageMeta } from "@/components/layout/PageMeta";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { IncidentCard } from "@/components/sections/IncidentCard";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Sources } from "@/components/ui/Sources";
import { articles, guides } from "@/content/resources";
import { incidentBySlug, incidentFiles } from "@/content/incidents";
import NotFound from "./NotFound";

export function ResourcesPage() {
  return (
    <>
      <PageMeta route="/resources" />
      <PageHero
        label="Resources"
        title="Guides for the incident you’ll have to explain"
        lead="Short, practical reads for payments engineering and resilience teams, and a library of public incidents."
      />
      <Section
        id="start-here"
        ground="white"
        label="Start here"
        title="DORA and UK reporting"
      >
        <div className="grid-3">
          <Card
            title="The deadlines, explained"
            href="/dora"
            linkLabel="Read the explainer"
          >
            <p>
              Every DORA reporting stage and the UK regime from 18 March 2027,
              with the rules linked.
            </p>
          </Card>
          <Card
            title="Reporting checklist"
            href="/dora/checklist"
            linkLabel="Open the checklist"
          >
            <p>
              One page: what to have ready before the incident, in the first
              hour and before each deadline.
            </p>
          </Card>
          <Card
            title="Incident files"
            href="/resources/incidents"
            linkLabel="Browse the files"
          >
            <p>
              Public outages from published post-incident reports, and where the
              hours went.
            </p>
          </Card>
        </div>
      </Section>
      <Section id="guides" ground="paper" label="Guides" title="Field guides">
        <ul className="grid-3">
          {guides.map(guide => (
            <Card
              as="li"
              key={guide.slug}
              label={guide.time}
              title={guide.title}
              href={
                guide.gatedType
                  ? `/demo?type=${encodeURIComponent(guide.gatedType)}`
                  : `/resources/${guide.slug}`
              }
              linkLabel={
                guide.gatedType ? "Request the guide" : "Read the guide"
              }
            >
              <p>{guide.description}</p>
            </Card>
          ))}
        </ul>
      </Section>
      <CtaBand
        title="Bring a question from your last incident"
        text="Ask about DORA drafts, replay pilots or how the record is built. A person replies by email."
        label="Contact the team"
        href="/contact"
      />
    </>
  );
}

export function ResourceArticle({ slug }: { slug: string }) {
  const article = articles[slug];
  if (!article) return <NotFound />;
  return (
    <>
      <PageMeta title={article.title} description={article.intro} />
      <article className="section section-white article">
        <div className="container narrow">
          <Link href="/resources" className="back-link">
            <ArrowLeft size={16} aria-hidden="true" /> All resources
          </Link>
          <h1>{article.title}</h1>
          <p className="lead">{article.intro}</p>
          <div className="prose">
            {article.sections.map(section => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </article>
      <CtaBand
        ground="paper"
        title="See the record built while the incident runs"
        text="Thirty minutes with an engineer: one incident, from first alert to the notice draft."
      />
    </>
  );
}

export function IncidentsPage() {
  return (
    <>
      <PageMeta route="/resources/incidents" />
      <PageHero
        label="Incident files"
        title="Where the hours went"
        lead="Public outages at payments and infrastructure firms, from their own post-incident reports. A plain timeline, what slowed the response, and the source."
      />
      <Section id="files" ground="white">
        <p className="small muted files-note">
          Public incident research. These firms are not Relyxus customers and
          have not used, endorsed or been assessed by Relyxus.
        </p>
        <ul className="grid-3">
          {incidentFiles.map(file => (
            <li key={file.slug}>
              <IncidentCard file={file} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

export function IncidentFilePage({ slug }: { slug: string }) {
  const file = incidentBySlug(slug);
  if (!file) return <NotFound />;
  return (
    <>
      <PageMeta route={`/resources/incidents/${file.slug}`} />
      <article className="section section-white article">
        <div className="container narrow">
          <Link href="/resources/incidents" className="back-link">
            <ArrowLeft size={16} aria-hidden="true" /> All incident files
          </Link>
          <p className="label">
            {file.firm} · {file.date} · Public incident research
          </p>
          <h1>{file.title}</h1>
          <p className="lead">{file.summary}</p>

          <h2 className="subhead-lg">Timeline</h2>
          <ol className="file-timeline">
            {file.timeline.map(row => (
              <li key={`${row.at}-${row.text}`}>
                <time className="mono">{row.at}</time>
                <span>{row.text}</span>
              </li>
            ))}
          </ol>
          {file.caveat && <p className="small muted">{file.caveat}</p>}

          <div className="prose">
            <section>
              <h2>What slowed the response</h2>
              <p>{file.slowed}</p>
            </section>
            <section>
              <h2>The gap</h2>
              <p>{file.gap}</p>
            </section>
          </div>
          <Sources items={file.sources} />
          <p className="small muted">
            {file.firm} is not a Relyxus customer and has not used, endorsed or
            been assessed by Relyxus. This summary is based on the sources
            above.
          </p>
        </div>
      </article>
      <CtaBand
        ground="paper"
        title="Bring the incident that hurt most"
        text="We’ll replay one of yours, read-only, and show you the record it would have left."
        label="Start a replay pilot"
        href="/pilot"
      />
    </>
  );
}
