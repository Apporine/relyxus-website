import { demoForm, faq } from "@/content/home";
import { Shape } from "@/components/ui/Shape";
import { Accordion } from "@/components/ui/Accordion";
import { DemoForm } from "./DemoForm";

export function HomeDemo() {
  return (
    <section
      id="start"
      className="section section-canvas on-canvas home-demo"
      aria-labelledby="demo-title"
    >
      <div className="container home-demo-grid">
        <div className="home-demo-copy">
          <Shape tone="lavender" size="lg" className="demo-wedge" />
          <h2 id="demo-title">{demoForm.title}</h2>
          <p className="lead muted">{demoForm.text}</p>
          <div className="home-faq">
            <h3 className="subhead-lg">Questions buyers ask</h3>
            <Accordion items={faq.slice(0, 5)} />
          </div>
        </div>
        <div className="form-card">
          <DemoForm
            enquiry="Demo"
            submitLabel={demoForm.submit}
            messageLabel="Tell us about an incident you’d want to replay"
          />
          <p className="small muted demo-under">{demoForm.under}</p>
        </div>
      </div>
    </section>
  );
}
