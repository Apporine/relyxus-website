import { Link } from "wouter";
import { PageMeta } from "@/components/layout/PageMeta";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <PageMeta
        title="Page not found"
        description="This page isn’t on the Relyxus website."
        noindex
      />
      <section className="section section-paper" aria-labelledby="page-title">
        <div className="container narrow">
          <p className="label">404</p>
          <h1 id="page-title">We couldn’t find that page</h1>
          <p className="lead">
            The link may be old, or the page may have moved. No incident record
            for this one, sadly.
          </p>
          <div className="actions">
            <ButtonLink href="/">Go to the homepage</ButtonLink>
            <ButtonLink href="/product" variant="dark">
              See the product
            </ButtonLink>
          </div>
          <p className="small muted">
            Looking for something specific?{" "}
            <Link href="/contact">Ask the team</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
