import { ArrowRight, Home as HomeIcon } from "lucide-react";
import { Link } from "wouter";
import { PageMeta } from "@/components/marketing/PublicSite";

export default function NotFound() {
  return (
    <>
      <PageMeta
        title="Page not found"
        description="The requested Relyxus website page could not be found."
        noindex
      />
      <section className="not-found-page">
        <div className="not-found-layout">
          <p className="eyebrow">404 / NOT FOUND</p>
          <span className="not-found-number" aria-hidden="true">
            404
          </span>
          <h1>That page isn’t part of this story.</h1>
          <p>
            The link may be outdated, or the page may have moved. Start from
            home, or jump into the product and security pages.
          </p>
          <div className="not-found-actions">
            <Link className="button button-primary" href="/">
              <HomeIcon size={16} aria-hidden="true" />
              Go home
            </Link>
            <Link className="button button-outline" href="/product">
              Explore product
            </Link>
            <Link className="text-link" href="/contact">
              Contact the team <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ul className="not-found-links">
            <li>
              <Link href="/security">Security</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy policy</Link>
            </li>
            <li>
              <Link href="/demo">Book a 30 minute demo</Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
