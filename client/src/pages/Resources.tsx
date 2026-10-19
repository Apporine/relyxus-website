import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Clock3, FileText, Shield } from "lucide-react";
import { PageMeta } from "@/components/layout/PageMeta";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { IncidentCard } from "@/components/sections/IncidentCard";
import { TimelineDiagram } from "@/components/sections/TimelineDiagram";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Sources } from "@/components/ui/Sources";
import { articles, guides } from "@/content/resources";
import {
  incidentBySlug,
  incidentFiles,
  headlineFact,
} from "@/content/incidents";
import NotFound from "./NotFound";

const featured = incidentFiles[0];

const startCards = [
  {
    href: "/dora",
    icon: Shield,
    tone: "lavender" as const,
    title: "DORA and UK deadlines",
    text: "Every reporting stage, with the rules linked — so you can check each line.",
    cta: "Read the explainer",
  },
  {
    href: "/dora/checklist",
    icon: FileText,
    tone: "lime" as const,
    title: "Reporting checklist",
    text: "One page: before the incident, in the first hour, and before each deadline.",
    cta: "Open the checklist",
  },
  {
    href: "/resources/incidents",
    icon: Clock3,
    tone: "lavender" as const,
    title: "Incident files",
    text: "Public outages and where the hours went — evidence for the problem, not case studies.",
    cta: "Browse the files",
  },
] as const;

export function ResourcesPage() {
  return (
    <>
      <PageMeta route="/resources" />
      <PageHero
        ground="canvas"
        label="Resources"
        title="Evidence and playbooks for the incident you’ll have to explain"
        lead="Sourced incident files, DORA deadlines you can check, and short field guides — built for payments engineering and resilience teams, not for a content calendar."
        visual={
          <TimelineDiagram
            title={`${featured.firm} · ${featured.date}`}
            gapLabel="Alert → right cause: ~2 hours"
            rows={featured.timeline.map((row, i) => ({
              ...row,
              highlight: i === 2 || i === 4,
            }))}
          />
        }
      >
        <ButtonLink href="/resources/incidents">
          Read the incident files
        </ButtonLink>
        <ButtonLink href="/dora" variant="ghost">
          DORA explainer
        </ButtonLink>
      </PageHero>

      <Section
        id="featured"
        ground="white"
        label="Featured finding"
        title={headlineFact.text}
      >
        <Reveal>
          <p className="small muted">
            Source:{" "}
            <a href={headlineFact.source.href}>{headlineFact.source.label}</a>.{" "}
            {featured.firm} is not a Relyxus customer.
          </p>
        </Reveal>
      </Section>

      <Section
        id="start-here"
        ground="paper"
        label="Start here"
        title="Three places to begin — pick your job"
      >
        <ul className="resource-start-grid">
          {startCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal as="li" key={card.href} delay={i * 70}>
                <Link
                  href={card.href}
                  className={`resource-start resource-${card.tone}`}
                >
                  <span className="resource-start-icon" aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <span className="resource-start-cta">
                    {card.cta} <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <Section
        id="guides"
        ground="white"
        label="Field guides"
        title="Short reads that survive a SEV1"
      >
        <ul className="insights-grid">
          {guides.map((guide, i) => (
            <Reveal as="li" key={guide.slug} delay={i * 60}>
              <Link
                href={
                  guide.gatedType
                    ? `/demo?type=${encodeURIComponent(guide.gatedType)}`
                    : `/resources/${guide.slug}`
                }
                className={`insight-card insight-${i % 2 ? "tint-2" : "tint-1"}`}
              >
                <span className="insight-thumb" aria-hidden="true" />
                <span className="insight-cat">{guide.time}</span>
                <strong>{guide.title}</strong>
                <span className="muted small">{guide.description}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section
        id="library-preview"
        ground="paper"
        label="Incident library"
        title="Where the hours went"
        intro="Five public files today. Each has a plain timeline, what slowed the response, and a primary source."
      >
        <ul className="grid-3">
          {incidentFiles.slice(0, 3).map((file, i) => (
            <Reveal as="li" key={file.slug} delay={i * 60}>
              <IncidentCard file={file} />
            </Reveal>
          ))}
        </ul>
        <div className="actions" style={{ marginTop: "var(--space-4)" }}>
          <ButtonLink href="/resources/incidents" variant="dark">
            View all incident files
          </ButtonLink>
        </div>
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
        ground="canvas"
        label="Incident files"
        title="Where the hours went"
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
