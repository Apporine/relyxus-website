import { demoForm, faq, pilot } from "@/content/home";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { PilotSteps } from "./PilotSteps";
import { DemoForm } from "./DemoForm";

/** The last homepage section: the replay pilot, five FAQs and the demo form. */
export function Start() {
  return (
    <Section
      id="start"
      ground="white"
      label={pilot.label}
      title={pilot.title}
      intro={pilot.intro}
    >
      <PilotSteps />
      <div className="split split-even start-grid">
        <div>
          <h3 className="subhead">Questions buyers ask first</h3>
          <Accordion items={faq} />
        </div>
        <div className="form-card" id="book">
          <SectionHeader title={demoForm.title} intro={demoForm.text} />
          <DemoForm />
        </div>
      </div>
    </Section>
  );
}
