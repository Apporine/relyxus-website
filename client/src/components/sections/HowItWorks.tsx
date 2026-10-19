import { howItWorks } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { crops } from "@/components/product/Crops";

export function HowItWorks({
  ground = "paper",
}: {
  ground?: "paper" | "white";
}) {
  return (
    <Section
      id="how-it-works"
      ground={ground}
      label={howItWorks.label}
      title={howItWorks.title}
      intro={howItWorks.intro}
    >
      <ol className="steps grid-4">
        {howItWorks.steps.map((step, index) => {
          const Crop = crops[step.crop];
          return (
            <li key={step.title} className="step">
              <p className="step-num">Step {index + 1}</p>
              <h3>{step.title}</h3>
              <p className="muted">{step.text}</p>
              <Crop />
            </li>
          );
        })}
      </ol>
      <p className="small muted steps-note">
        Product previews built from the Relyxus interface, using example
        incident INC-2207.
      </p>
    </Section>
  );
}
