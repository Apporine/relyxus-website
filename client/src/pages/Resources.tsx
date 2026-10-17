import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";
import { Link } from "wouter";
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
        title="Resources"
        description="Read practical explainers on governed incident response, deployment boundaries and honest historical incident evaluation."
      />
      <PageIntro
        eyebrow="RESOURCES / EVALUATION GUIDES"
        title="A useful evaluation starts with better questions."
        summary="Read the mechanisms and the trade-offs before you decide what to test. These notes are written for evaluation conversations, not as a claim that every option is already live."
        tone="ivory"
      />
      <section className="resources-index section-pad">
        <div className="container resources-featured">
          <div className="resources-index-intro">
            <p className="eyebrow">PUBLIC READING</p>
            <h2>Understand the control model, not just the category.</h2>
            <p>
              Start with the human decision boundary, compare deployment paths
              and agree how an evaluation will treat misses.
            </p>
            <span className="content-review-note">
              Field notes for evaluation conversations
            </span>
          </div>
          <div className="resources-card-list">
            {resources.map((item, index) => (
              <Link
                href={`/resources/${item.slug}`}
                className="resource-card-large"
                key={item.slug}
              >
                <div className="resource-card-meta">
                  <span>
                    0{index + 1} / {item.category.toUpperCase()}
                  </span>
                  <span>
                    <Clock3 size={13} />
                    {item.time}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="resource-card-link">
                  Read the explainer <ArrowUpRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="resource-guidance">
        <div className="container resource-guidance-inner">
          <div>
            <p className="eyebrow">PUBLICATION NOTE</p>
            <h2>No invented customer proof.</h2>
          </div>
          <p>
            You will not find fabricated case studies, quotes, certifications or
            scorecards here. The library focuses on the questions worth asking
            before a pilot.
          </p>
        </div>
      </section>
      <ActionBand
        title="Bring a question to the evaluation."
        summary="Ask about a demo or Replay pilot and we’ll get back to you by email."
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
          eyebrow="RESOURCES / NOT FOUND"
          title="That resource isn’t in the library."
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
          <span>FIELD NOTES / FOR EVALUATION</span>
        </div>
        <header className="article-header container">
          <p className="eyebrow">PRACTICAL EXPLAINER</p>
          <h1>{article.title}</h1>
          <p className="article-deck">{article.intro}</p>
          <div className="article-meta">
            <span>Written for evaluation teams</span>
            <span>Bring your own constraints</span>
          </div>
        </header>
        <div className="article-layout container">
          <aside className="article-toc">
            <span>IN THIS GUIDE</span>
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
            <aside className="article-source-note">
              <strong>Scope note</strong>
              <p>
                These explainers help you ask better questions. Confirm exact
                capabilities and commitments with us for your release and
                environment.
              </p>
            </aside>
            <Link className="text-link" href="/demo">
              Discuss the questions with Relyxus <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </article>
      <ActionBand
        title="Keep the conversation grounded in your context."
        summary="Bring the workflow, source permissions and deployment boundaries you need to evaluate."
        href="/demo"
        label="Request a demo"
      />
    </>
  );
}
