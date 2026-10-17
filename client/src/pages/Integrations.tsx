import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Search, SlidersHorizontal, X } from "lucide-react";
import { Link } from "wouter";
import { sourceCategories } from "@/content/site";
import { ActionBand, InlineAvailability, PageIntro, PageMeta, SectionTitle, TextLink } from "@/components/marketing/PublicSite";

const groups = ["All categories", ...Array.from(new Set(sourceCategories.map((item) => item.group)))];
function readFilters() {
  const params = new URLSearchParams(window.location.search);
  return { query: params.get("q") ?? "", group: params.get("category") ?? "All categories" };
}

export function IntegrationsPage() {
  const [filters, setFilters] = useState(readFilters);
  useEffect(() => {
    const onPop = () => setFilters(readFilters());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))) return;
      event.preventDefault();
      document.querySelector<HTMLInputElement>(".catalogue-search input")?.focus();
    };
    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, []);
  const update = (next: { query: string; group: string }, replace = false) => {
    const params = new URLSearchParams(window.location.search);
    if (next.query.trim()) params.set("q", next.query.trim()); else params.delete("q");
    if (next.group !== "All categories") params.set("category", next.group); else params.delete("category");
    const query = params.toString();
    const url = `${window.location.pathname}${query ? `?${query}` : ""}`;
    if (replace) window.history.replaceState({}, "", url); else window.history.pushState({}, "", url);
    setFilters(next);
  };
  const matching = useMemo(() => {
    const needle = filters.query.trim().toLowerCase();
    return sourceCategories.filter((item) => (filters.group === "All categories" || item.group === filters.group) && (!needle || `${item.title} ${item.group} ${item.keywords} ${item.summary}`.toLowerCase().includes(needle)));
  }, [filters]);
  const clear = () => update({ query: "", group: "All categories" });
  return <>
    <PageMeta title="Integrations" description="Explore the kinds of incident evidence sources Relyxus can connect to, and the questions to ask before enabling one." />
    <PageIntro eyebrow="INTEGRATIONS / SOURCE DISCOVERY" title="See what each source would contribute." summary="An integration name is not enough. A useful evaluation asks what is read or written, what permissions are needed, which versions are supported and where data flows." tone="ink"><Link href="/demo?type=Demo" className="button button-primary">Ask about a source <ArrowRight size={16} /></Link></PageIntro>
    <section className="integrations-catalogue section-pad"><div className="container"><div className="catalogue-notice"><span className="catalogue-notice-mark">!</span><p><strong>Release catalogue not supplied.</strong> This directory groups source types for evaluation only. It does not assert a supported vendor connector or current availability.</p><InlineAvailability>Vendor status pending verification</InlineAvailability></div>
      <div className="catalogue-controls"><label className="catalogue-search"><Search size={17} /><span className="sr-only">Search source categories</span><input type="search" value={filters.query} onChange={(event) => update({ ...filters, query: event.target.value }, true)} placeholder="Search sources or topics" /><kbd>/</kbd></label><div className="filter-label"><SlidersHorizontal size={16} />Filter by</div><div className="filter-pills" aria-label="Filter source categories">{groups.map((group) => <button type="button" key={group} aria-pressed={filters.group === group} className={filters.group === group ? "active" : ""} onClick={() => update({ ...filters, group })}>{group}</button>)}</div></div>
      <div className="catalogue-result-count" aria-live="polite"><strong>{matching.length}</strong> {matching.length === 1 ? "source category" : "source categories"} {filters.query || filters.group !== "All categories" ? "match your filters" : "for evaluation"}</div>
      {matching.length ? <div className="integration-grid">{matching.map((item, index) => <article className="integration-card" key={item.slug}><div className="integration-card-head"><span className="integration-card-index">0{index + 1}</span><span className="integration-card-symbol" aria-hidden="true">{item.group.slice(0, 1)}</span><span className="integration-status">Status to confirm</span></div><p className="integration-group">{item.group}</p><h2>{item.title}</h2><p>{item.summary}</p><Link href={`/integrations/${item.slug}`} className="text-link">Review scope questions <ArrowUpRight size={15} /></Link></article>)}</div> : <div className="empty-catalogue"><div><Search size={21} /></div><h2>No matching source categories</h2><p>Try another term or clear the filters. Asking about a source does not commit it to the roadmap.</p><button type="button" className="button button-outline" onClick={clear}><X size={15} />Clear filters</button><Link href="/demo?type=Demo" className="empty-ask">Ask about an integration <ArrowRight size={15} /></Link></div>}
      <p className="catalogue-footnote">The product release catalogue, connector permissions and setup documentation were not included in the supplied archive. Public availability must be confirmed before launch.</p>
    </div></section>
    <ActionBand title="Have a source in mind?" summary="Tell us which evidence sources and permissions you need to review. We’ll follow up by email." href="/demo?type=Demo" label="Ask about an integration" />
  </>;
}

export function IntegrationDetail({ slug }: { slug: string }) {
  const source = sourceCategories.find((item) => item.slug === slug);
  if (!source) return <><PageMeta title="Source category" description="This source category was not found." /><PageIntro eyebrow="INTEGRATIONS / NOT FOUND" title="This source category is not in the current directory." summary="The public catalogue is limited to general source categories and does not assert vendor availability." /><section className="section-pad"><div className="container"><TextLink href="/integrations">Return to source discovery</TextLink></div></section></>;
  return <>
    <PageMeta title={source.title} description={source.summary} />
    <PageIntro eyebrow={`INTEGRATIONS / ${source.group.toUpperCase()}`} title={source.title} summary={source.summary} tone="blue"><InlineAvailability>Vendor availability not verified</InlineAvailability></PageIntro>
    <section className="integration-detail-section section-pad"><div className="container integration-detail-layout"><div><p className="eyebrow">WHAT TO VERIFY</p><h2>A source category is a starting point, not a support claim.</h2><p className="lead-copy">{source.detail}</p><p>We list categories so you can ask the right questions. Exact vendors, versions and operations are confirmed with your team before anything is treated as available.</p><TextLink href="/integrations">Back to integrations</TextLink></div><div className="integration-detail-facts"><h3>Review these boundaries</h3>{[{ label: "Data", text: "Which fields are read, redacted or retained?" }, { label: "Permissions", text: "What is read-only, and what would require separate write permission?" }, { label: "Scope", text: "Which versions, environments and limitations apply?" }, { label: "Availability", text: "Which release and deployment modes are approved?" }].map((item, index) => <div key={item.label}><span>0{index + 1}</span><strong>{item.label}</strong><p>{item.text}</p></div>)}<Link className="button button-primary" href="/demo?type=Demo">Discuss this source <ArrowRight size={16} /></Link></div></div></section>
    <ActionBand title="Confirm the exact integration scope." summary="No API keys are collected here. Integration requirements should be reviewed with the product team." href="/demo?type=Demo" label="Discuss an integration" />
  </>;
}
