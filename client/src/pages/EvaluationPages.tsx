import { ArrowRight, Check, CircleHelp, FileSearch, GitBranch, ListChecks, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { ActionBand, InlineAvailability, PageIntro, PageMeta, SectionTitle } from "@/components/marketing/PublicSite";

export function ReplayPage() {
  const stages = [
    { number: "01", title: "Agree scope", text: "Select incidents, time windows, environments and exclusions before evaluation." },
    { number: "02", title: "Connect approved sources", text: "Confirm read-only permissions, source coverage and any redaction conditions." },
    { number: "03", title: "Evaluate historical incidents", text: "Use time-fenced evidence from incidents the team already understands." },
    { number: "04", title: "Review results and misses", text: "Inspect likely-cause ranking, unavailable evidence, excluded incidents and model conditions." },
  ];
  return <>
    <PageMeta title="Incident Replay" description="Evaluate incident reasoning on historical cases with an agreed scope, approved read-only sources, and an honest review of misses." />
    <PageIntro eyebrow="REPLAY / EVALUATION METHOD" title="Test the reasoning on incidents you already understand." summary="Historical incidents can help your team examine evidence quality, hypothesis ranking and deployment fit before considering any change to action permissions." tone="ink"><Link className="button button-primary" href="/demo?type=Replay%20pilot">Discuss a Replay pilot <ArrowRight size={16} /></Link></PageIntro>
    <section className="replay-method-section section-pad"><div className="container replay-method-layout"><div><p className="eyebrow">A CONTROLLED EVALUATION</p><h2>Agree what a useful result means before running the test.</h2><p className="lead-copy">Choose the sample, define the known cause, note what evidence existed at the time and decide how incomplete cases will be handled.</p><InlineAvailability>Scope agreed with your team</InlineAvailability></div><div className="replay-stages">{stages.map((stage) => <div key={stage.number}><span>{stage.number}</span><div><h3>{stage.title}</h3><p>{stage.text}</p></div></div>)}</div></div></section>
    <section className="replay-review-section"><div className="container replay-review-layout"><div><p className="eyebrow">WHAT TO REVIEW</p><h2>Look at the misses as closely as the matches.</h2><p>Any numerical score needs a documented method, denominator, sample, date and limitations. Internal targets are not public achievements.</p></div><div className="replay-review-list"><div><FileSearch size={18} /><span><strong>Correct-first and top-ranked hypotheses</strong><small>Agree how a known cause was established.</small></span></div><div><GitBranch size={18} /><span><strong>Time to hypothesis</strong><small>Define start event, end event and the cases included.</small></span></div><div><CircleHelp size={18} /><span><strong>Misses and exclusions</strong><small>Keep unavailable evidence and ambiguous incidents visible.</small></span></div><div><ListChecks size={18} /><span><strong>Model and environment</strong><small>Record route, version and evaluation conditions.</small></span></div></div></div></section>
    <section className="replay-scope-note section-pad"><div className="container replay-scope-box"><ShieldCheck size={20} /><div><h2>No fixed package entitlement is implied.</h2><p>Any sample size you see in conversation is just an example. Scope is agreed with your team—we do not promise a universal quota, accuracy level or remediation time on this page.</p></div></div></section>
    <ActionBand title="Discuss a Replay pilot." summary="Agree the incident set, source scope and methodology with the people who will judge the result." href="/demo?type=Replay%20pilot" label="Discuss a Replay pilot" />
  </>;
}

export function PricingPage() {
  const factors = ["Deployment model and environment count", "Supported capabilities and verified release scope", "Support responsibilities and operating model", "Evaluation requirements and agreed Replay scope", "Any approved commercial terms for the current offer"];
  return <>
    <PageMeta title="Pricing" description="Relyxus pricing is an enterprise discussion about deployment, environments, support, confirmed capability scope and evaluation requirements." />
    <PageIntro eyebrow="PRICING / ENTERPRISE ENGAGEMENT" title="A commercial discussion shaped around your operating context." summary="There are no self-service tiers or public price cards here. Scope depends on your environment, the capabilities you need and how you want to operate." tone="blue"><Link className="button button-primary" href="/demo?type=Pricing">Discuss pricing <ArrowRight size={16} /></Link><Link className="button button-outline" href="/demo?type=Replay%20pilot">Discuss a Replay pilot <ArrowRight size={16} /></Link></PageIntro>
    <section className="pricing-scope section-pad"><div className="container pricing-scope-layout"><div><p className="eyebrow">WHAT SHAPES SCOPE</p><h2>Understand the variables before a quote.</h2><p className="lead-copy">A useful commercial conversation follows a product evaluation—not a made-up plan grid.</p></div><div className="pricing-factor-list">{factors.map((factor, index) => <div key={factor}><span>0{index + 1}</span><strong>{factor}</strong><Check size={16} /></div>)}</div></div></section>
    <section className="pricing-caveat"><div className="container pricing-caveat-inner"><span className="pricing-caveat-icon">i</span><p><strong>No public price list here.</strong> Ask us for current commercial terms. Anything quoted is confirmed in writing for your engagement.</p></div></section>
    <ActionBand title="Discuss a commercial scope that fits your environment." summary="Bring the deployment and evaluation requirements that matter to your team." href="/demo?type=Pricing" label="Discuss pricing" />
  </>;
}
