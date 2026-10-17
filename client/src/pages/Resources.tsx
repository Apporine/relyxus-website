import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";
import { Link } from "wouter";
import { pageMeta } from "@/content/meta";
import { articleBodies, resources } from "@/content/site";
import {
  ActionBand,
  PageIntro,
  PageMeta,
  TextLink,
} from "@/components/marketing/PublicSite";

export function ResourcesPage() {
  return (
    <>
      <PageMeta
        title={pageMeta["/resources"].title}
        description={pageMeta["/resources"].description}
      />
      <PageIntro
        eyebrow="Resources"
        title={pageMeta["/resources"].h1}
        summary={pageMeta["/resources"].body}
        tone="ivory"
      />
      <section className="resources-index section-pad">
        <div className="container resources-card-list hx-resource-grid">
          {resources.map(item => {
            const href = item.gatedType
              ? `/demo?type=${encodeURIComponent(item.gatedType)}`
              : `/resources/${item.slug}`;
            return (
              <Link href={href} className="resource-card-large" key={item.slug}>
                <div className="resource-card-meta">
                  <span>{item.category}</span>
                  <span>
                    <Clock3 size={13} />
                    {item.time}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="resource-card-link">
                  {item.gatedType ? "Request the guide" : "Read the guide"}{" "}
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <ActionBand
        title="Bring a question to the team"
        summary="Ask about a demo or a Replay pilot and we’ll reply by email."
        href="/demo"
        label="Open the enquiry form"
      />
    </>
  );
}

export function ResourceArticle({ slug }: { slug: string }) {
  const article = articleBodies[slug];
  if (!article)
    return (
      <>
        <PageMeta
          title="Resource not found"
          description="This public resource was not found."
        />
        <PageIntro
          eyebrow="Resources"
          title="That guide isn’t here"
          summary="Browse the current explainers or return to the home page."
        />
        <section className="section-pad">
          <div className="container">
            <TextLink href="/resources">Browse resources</TextLink>
          </div>
        </section>
      </>
    );
  return (
    <>
      <PageMeta title={article.title} description={article.intro} />
      <article className="resource-article">
        <div className="article-topline container">
          <Link href="/resources">
            <ArrowLeft size={15} />
            All resources
          </Link>
          <span>Field guide</span>
        </div>
        <header className="article-header container">
          <h1>{article.title}</h1>
          <p className="article-deck">{article.intro}</p>
        </header>
        <div className="article-layout container">
          <aside className="article-toc">
            <span>In this guide</span>
            {article.sections.map((section, index) => (
              <a key={section.heading} href={`#section-${index + 1}`}>
                {section.heading}
              </a>
            ))}
          </aside>
          <div className="article-body">
            {article.sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.heading}>
                <span className="article-section-index">0{index + 1}</span>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}
            <Link className="text-link" href="/demo">
              Talk to us about these questions <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </article>
      <ActionBand
        title="See it on an incident like yours"
        summary="Tell us which tools your team uses and we’ll walk through an incident end to end."
        href="/demo"
        label="Request a demo"
      />
    </>
  );
}
