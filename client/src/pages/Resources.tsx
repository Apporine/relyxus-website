import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { PageMeta } from "@/components/layout/PageMeta";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { IncidentCard } from "@/components/sections/IncidentCard";
import { TimelineDiagram } from "@/components/sections/TimelineDiagram";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Sources } from "@/components/ui/Sources";
import { articles } from "@/content/resources";
import { incidentBySlug, incidentFiles } from "@/content/incidents";
import NotFound from "./NotFound";

export function ResourceArticle({ slug }: { slug: string }) {
  const article = articles[slug];
  if (!article) return <NotFound />;
  return (
    <>
      <PageMeta title={article.title} description={article.intro} />
      <article className="section section-white article">
        <div className="container narrow">
          <Link href="/about#evidence" className="back-link">
            <ArrowLeft size={16} aria-hidden="true" /> Company · evidence
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
        ground="canvas"
        label="Incident files"
        title="Where the hours *went*"
        lead="Public outages at payments and infrastructure firms, from their own post-incident reports. A plain timeline, what slowed the response, and the source."
        visual={
          <TimelineDiagram
            title="Alert → cause gap"
            gapLabel="Cloudflare: 3 min to alert, 2+ hours to the right cause"
            rows={[
              { at: "11:28", text: "First customer impact" },
              { at: "11:31", text: "Automated test fires", highlight: true },
              { at: "13:37", text: "Right cause confirmed", highlight: true },
              { at: "14:30", text: "Main impact resolved" },
            ]}
          />
        }
      >
        <ButtonLink href="/demo">Book Demo</ButtonLink>
        <ButtonLink href="/pilot" variant="ghost">
          Start a replay pilot
        </ButtonLink>
      </PageHero>
      <Section id="files" ground="white">
        <p className="small muted files-note">
          Public incident research. These firms are not Relyxus customers and
          have not used, endorsed or been assessed by Relyxus.
        </p>
        <ul className="grid-3">
          {incidentFiles.map((file, i) => (
            <Reveal as="li" key={file.slug} delay={i * 50}>
              <IncidentCard file={file} />
            </Reveal>
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
          <TimelineDiagram
            title={`${file.firm} timeline`}
            rows={file.timeline}
          />
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
