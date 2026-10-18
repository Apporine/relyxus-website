import { PageMeta } from "@/components/marketing/PublicSite";
import { Headline, stripAccent } from "@/components/marketing/Headline";
import { SignalCore } from "@/components/core/SignalCore";
import * as home from "@/content/home";

/** Counts the words in every string of the homepage copy deck. */
function countWords(value: unknown): number {
  if (typeof value === "string")
    return value.startsWith("/") || value.startsWith("#")
      ? 0
      : stripAccent(value).split(/\s+/).filter(Boolean).length;
  if (Array.isArray(value)) return value.reduce((n, v) => n + countWords(v), 0);
  if (value && typeof value === "object")
    return Object.entries(value).reduce(
      (n, [key, v]) =>
        ["href", "key", "id", "number", "length", "initials"].includes(key)
          ? n
          : n + countWords(v),
      0
    );
  return 0;
}

const deck = {
  hero: home.hero,
  signals: home.signals,
  chain: home.chain,
  cause: home.cause,
  approval: home.approval,
  record: home.record,
  explore: home.explore,
  deadline: home.deadline,
  compare: home.compare,
  prove: home.prove,
  closing: home.closing,
};

const tokens = [
  ["--ink", "#120A18", "Stage background, the cinematic half"],
  ["--paper", "#F4EFE6", "Text on ink; the resolved half"],
  ["--signal", "#C6F432", "Accent words, connectors, glows, primary button"],
  ["--muted", "paper at 55%", "Labels, secondary lines"],
  ["--alert", "#F0524F", "Failing payment state inside diagrams only"],
];

/**
 * Gate 1 review page: type specimen, the signal core render and the copy
 * deck word count. Not linked from the site and not indexed.
 */
export function SpecimenPage() {
  const counts = Object.entries(deck).map(
    ([name, value]) => [name, countWords(value)] as const
  );
  const total = counts.reduce((n, [, c]) => n + c, 0);
  return (
    <>
      <PageMeta title="Design specimen" description="Gate 1 review." noindex />
      <section className="rx-ink rx-specimen">
        <div className="container">
          <p className="rx-eyebrow">
            Gate 1 · type specimen, core render, copy deck
          </p>
          <Headline
            as="h1"
            text="Know why payments failed *before the regulator asks.*"
            underline
          />
          <Headline text="Every signal, *one core.*" />
          <h3>Card headline in Bricolage 700, sentence case</h3>
          <p>
            Body in Instrument Sans, 17 on 28, never more than sixty characters
            a line. One sentence under a headline, never two.
          </p>
          <p className="rx-label">
            T+00:04 · Cause found · IBM Plex Mono label
          </p>
          <div className="hx-actions">
            <a className="button button-primary" href="#core">
              Primary button
            </a>
            <a className="button button-secondary" href="#deck">
              Secondary button
            </a>
          </div>
          <ul className="rx-specimen-tokens">
            {tokens.map(([name, value, use]) => (
              <li key={name}>
                <span
                  className="rx-swatch"
                  style={{ background: `var(${name})` }}
                />
                <strong>{name}</strong>
                <span>{value}</span>
                <small>{use}</small>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="rx-ink rx-specimen" id="core">
        <div className="container">
          <p className="rx-eyebrow">
            The signal core · 20 s seamless loop · drawn live
          </p>
          <SignalCore className="rx-specimen-core" radar eager />
          <div className="rx-specimen-tints">
            {(["signal", "paper", "dense"] as const).map(tint => (
              <figure key={tint}>
                <SignalCore className="rx-specimen-tint" tint={tint} eager />
                <figcaption className="rx-label">Tint: {tint}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="rx-paper rx-specimen" id="deck">
        <div className="container">
          <Headline text="The copy deck, *counted.*" />
          <p>
            Homepage budget is 450 words. This deck holds {total}, counted from
            client/src/content/home.ts.
          </p>
          <table className="rx-specimen-table">
            <tbody>
              {counts.map(([name, count]) => (
                <tr key={name}>
                  <th scope="row">{name}</th>
                  <td>{count}</td>
                </tr>
              ))}
              <tr>
                <th scope="row">Total</th>
                <td>{total} / 450</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
