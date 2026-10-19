import { Link } from "wouter";
import { clockBand } from "@/content/home";
import { doraClocks, regulatorySources, ukRegime } from "@/content/regulation";
import { Section } from "@/components/ui/Section";

/** The one dark band on the page: the DORA timeline, with footnoted sources. */
export function ClockBand({
  title = clockBand.title,
  linkToExplainer = true,
}: {
  title?: string;
  linkToExplainer?: boolean;
}) {
  return (
    <Section
      id="clock"
      ground="console"
      label={clockBand.label}
      title={title}
      intro={clockBand.intro}
    >
      <ol className="clock">
        {doraClocks.map((clock, index) => (
          <li
            key={clock.at}
            className={index === 0 ? "clock-start" : undefined}
          >
            <p className="clock-at mono">{clock.at}</p>
            <h3>
              {clock.title}
              {clock.note >= 0 && (
                <sup>
                  <a
                    href={`#clock-note-${clock.note + 1}`}
                    aria-label={`Source ${clock.note + 1}`}
                  >
                    {clock.note + 1}
                  </a>
                </sup>
              )}
            </h3>
            <p>{clock.text}</p>
          </li>
        ))}
      </ol>
      <p className="clock-uk">
        <strong>UK, from {ukRegime.date}:</strong> {ukRegime.text}
        <sup>
          <a
            href={`#clock-note-${ukRegime.note + 1}`}
            aria-label={`Source ${ukRegime.note + 1}`}
          >
            {ukRegime.note + 1}
          </a>
        </sup>{" "}
        {linkToExplainer && (
          <Link href="/dora">Read the DORA and UK explainer</Link>
        )}
      </p>
      <ol className="footnotes">
        {regulatorySources.map((source, index) => (
          <li key={source.href} id={`clock-note-${index + 1}`}>
            <a href={source.href} target="_blank" rel="noreferrer">
              {source.label}
            </a>
          </li>
        ))}
      </ol>
    </Section>
  );
}
