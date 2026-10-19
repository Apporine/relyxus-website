import { ChevronDown } from "lucide-react";

export type FaqItem = { question: string; answer: string };

/** Native details/summary: keyboard and screen reader support for free. */
export function Accordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="accordion">
      {items.map(item => (
        <details key={item.question} className="accordion-item">
          <summary>
            <span>{item.question}</span>
            <ChevronDown size={20} aria-hidden="true" />
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
