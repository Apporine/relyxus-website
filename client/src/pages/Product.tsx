import { Check } from "lucide-react";
import { PageMeta } from "@/components/layout/PageMeta";
import { PageHero } from "@/components/sections/PageHero";
import { WhatWeSell } from "@/components/sections/WhatWeSell";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Screen } from "@/components/product/Screen";
import { modules, securityCommitments } from "@/content/product";
import { integrations, pricingTerms } from "@/content/site";

export function ProductPage() {
  return (
    <>
      <PageMeta route="/product" />
      <PageHero
        ground="canvas"
        label="Product"
        title="One incident record, from first alert to regulator notice"
        lead="Relyxus is one product with three modules: the War Room for the investigation, Approvals for named sign-off, and the Command Centre for leadership."
        visual={
          <Screen
            screen={modules[0].screen}
            title={`Relyxus · ${modules[0].name}`}
          />
        }
      >
        <ButtonLink href="/demo">Book Demo</ButtonLink>
        <ButtonLink href="/pilot" variant="ghost">
          Start a replay pilot
        </ButtonLink>
      </PageHero>

      <Section
        id="what"
        ground="white"
        label="What we sell"
        title="Relyxus, in one block"
      >
        <WhatWeSell />
      </Section>

      {modules.map((module, index) => (
        <Section
          key={module.key}
          id={module.key}
          ground={index % 2 === 0 ? "paper" : "white"}
        >
          <div
            className={`split ${index % 2 ? "split-reverse module-flip" : ""}`}
          >
            <div className="module-copy">
              <p className="label">{module.job}</p>
              <h2>{module.name}</h2>
              <p className="lead">{module.line}</p>
              <ul className="checks">
                {module.points.map(point => (
                  <li key={point}>
                    <Check size={18} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <Screen screen={module.screen} title={`Relyxus · ${module.name}`} />
          </div>
        </Section>
      ))}

      <HowItWorks ground="white" />

      <Section
        id="fit"
        ground="paper"
        label="Fits your stack"
        title="Works with the tools you already run"
        intro="Relyxus reads from your monitoring, alerting, deploy and ticketing tools. It is not another monitoring tool."
      >
        <ul className="tool-list">
          {integrations.map(tool => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
        <ul className="grid-3 commitments">
          {securityCommitments.map(item => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p className="muted">{item.text}</p>
            </li>
          ))}
        </ul>
        <ButtonLink href="/security" variant="text">
          How we handle your data
        </ButtonLink>
      </Section>

      <Section
        id="pricing"
        ground="white"
        label="Pricing"
        title="How you buy it"
      >
        <ol className="grid-3 terms">
          {pricingTerms.map(term => (
            <li key={term.title}>
              <h3>{term.title}</h3>
              <p className="muted">{term.text}</p>
            </li>
          ))}
        </ol>
        <ButtonLink href="/demo?type=Pricing" variant="text">
          Ask for a proposal
        </ButtonLink>
      </Section>

      <CtaBand
        ground="paper"
        title="Bring your stack. We’ll walk an incident through it."
        text="Tell us which tools your team uses and we’ll show you one incident, from first alert to the notice draft."
      />
    </>
  );
}
