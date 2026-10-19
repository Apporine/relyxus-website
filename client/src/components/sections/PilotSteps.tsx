import { pilot } from "@/content/home";

export function PilotSteps() {
  return (
    <ol className="pilot-steps grid-3">
      {pilot.steps.map((step, index) => (
        <li key={step.title}>
          <span className="pilot-num" aria-hidden="true">
            {index + 1}
          </span>
          <h3>{step.title}</h3>
          <p className="muted">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
