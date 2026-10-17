import { ArrowLeft, ArrowRight, Home as HomeIcon } from "lucide-react";
import { Link } from "wouter";
import { PageMeta } from "@/components/marketing/PublicSite";

export default function NotFound() {
  return <><PageMeta title="Page not found" description="The requested Relyxus website page could not be found." /><section className="not-found-page"><div className="not-found-layout"><p className="eyebrow">404 / NOT FOUND</p><span className="not-found-number">404</span><h1>That page isn’t part of this story.</h1><p>The link may be outdated, or the content may not be available in this website preview.</p><div><Link className="button button-primary" href="/"><HomeIcon size={16} />Go home</Link><Link className="text-link" href="/product">Explore the product <ArrowRight size={16} /></Link></div><Link className="not-found-back" href="/resources"><ArrowLeft size={14} />Browse resources</Link></div></section></>;
}
