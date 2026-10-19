import { useMemo } from "react";
import { Redirect } from "wouter";
import { ENQUIRY_TYPES, type EnquiryType } from "@shared/contact";
import { PageMeta } from "@/components/layout/PageMeta";
import { DemoForm } from "@/components/sections/DemoForm";
import { demoMicrocopy } from "@/content/site";

type Variant = {
  label: string;
  title: string;
  lead: string;
  message: string;
  submit: string;
};

const variants: Partial<Record<EnquiryType, Variant>> = {
  Demo: {
    label: "Book a demo",
    title: "Book a 30-minute demo",
    lead: "We’ll walk one incident from first alert to the notice draft, using the tools your team already runs.",
    message: "Tell us about an incident you’d want to replay",
    submit: "Book a 30-minute demo",
  },
  "Security pack": {
    label: "Security pack",
    title: "Request the security pack",
    lead: "Written for security and architecture reviewers: data flows, identity, AI data handling, action safety and assurance status.",
    message: "Who is reviewing, and what do they need?",
    submit: "Request the security pack",
  },
  Deployment: {
    label: "Deployment",
    title: "Talk through how you would run Relyxus",
    lead: "Dedicated or self-hosted, where data goes, and who looks after updates. Your constraints first.",
    message: "Tell us about your environment",
    submit: "Send",
  },
  Pricing: {
    label: "Pricing",
    title: "Ask for a proposal",
    lead: "A replay pilot first, then an annual licence with no per-seat fees. Tell us a little and we’ll put a price in writing.",
    message: "Teams, incident volume, timeline: anything that helps",
    submit: "Ask for a proposal",
  },
};

const agenda = [
  {
    title: "Who you’ll meet",
    text: "An engineer who has worked payments incidents, not a sales script.",
  },
  {
    title: "What to bring",
    text: "One closed incident, ideally one where the first theory was wrong.",
  },
  {
    title: "The 30 minutes",
    text: "Your incident first, then the record, the approvals and the notice draft.",
  },
] as const;

export function DemoPage() {
  const type = useMemo(() => {
    const value = new URLSearchParams(window.location.search).get("type");
    return ENQUIRY_TYPES.includes(value as EnquiryType)
      ? (value as EnquiryType)
      : "Demo";
  }, []);

  if (type === "Replay pilot")
    return <Redirect to="/pilot#pilot-form" replace />;
  if (type === "Readiness checklist" || type === "Newsletter")
    return <Redirect to="/dora#checklist" replace />;

  const variant = variants[type] ?? variants.Demo!;
  return (
    <>
      <PageMeta route="/demo" />
      <section className="section section-paper" aria-labelledby="page-title">
        <div className="container split demo-grid">
          <div>
            <p className="label">{variant.label}</p>
            <h1 id="page-title">{variant.title}</h1>
            <p className="lead">{variant.lead}</p>
            {type === "Demo" && (
              <dl className="agenda">
                {agenda.map(item => (
                  <div key={item.title}>
                    <dt>{item.title}</dt>
                    <dd>{item.text}</dd>
                  </div>
                ))}
              </dl>
            )}
            <p className="small muted">{demoMicrocopy}</p>
          </div>
          <div className="form-card">
            <DemoForm
              enquiry={type}
              messageLabel={variant.message}
              submitLabel={variant.submit}
            />
          </div>
        </div>
      </section>
    </>
  );
}
