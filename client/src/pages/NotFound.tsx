import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { PageMeta, PrimaryLink } from "@/components/marketing/PublicSite";
import { MiniStage } from "@/components/marketing/MiniStage";

export default function NotFound() {
  return (
    <>
      <PageMeta
        title="Page not found"
        description="The requested Relyxus website page could not be found."
        noindex
      />
      <MiniStage
        eyebrow="404 · Not found"
        title="That page isn’t part *of this story.*"
        lede="The link may be outdated, or the page may have moved. Start from home, or go to the product and security pages."
        clock="T+00:00"
        status="Signal lost"
        tint="paper"
      >
        <PrimaryLink href="/">Go home</PrimaryLink>
        <Link className="button button-secondary" href="/product">
          See the product <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <ul className="rx-not-found-links">
          <li>
            <Link href="/security">Security</Link>
          </li>
          <li>
            <Link href="/contact">Contact the team</Link>
          </li>
          <li>
            <Link href="/demo">Book a 30 minute demo</Link>
          </li>
        </ul>
      </MiniStage>
    </>
  );
}
