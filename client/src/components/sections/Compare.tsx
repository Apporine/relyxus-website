import { compare } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { CompareTable } from "@/components/ui/CompareTable";
import { WhatWeSell } from "./WhatWeSell";

export function Compare() {
  return (
    <Section
      id="compare"
      ground="paper"
      label={compare.label}
      title={compare.title}
    >
      <div className="split compare-split">
        <WhatWeSell />
        <CompareTable
          caption="Relyxus compared with a manual war room and generic AIOps"
          columns={compare.columns}
          rows={compare.rows}
        />
      </div>
    </Section>
  );
}
