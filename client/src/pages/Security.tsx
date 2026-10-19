import { PageMeta } from "@/components/layout/PageMeta";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { DataBoundary } from "@/components/sections/DataBoundary";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Commitments } from "@/components/sections/Commitments";
import { packPromise } from "@/content/site";

/**
 * What is and isn't in place. Only the first three rows are product claims;
 * the rest point to the security pack until the client confirms details.
 */
const dataHandling = [
  {
    topic: "Access to your systems",
    status: "Read only by default. Investigating never changes anything.",
  },
  {
    topic: "Changes in production",
    status: "Only after the approvers named in your policy approve them.",
  },
  {
    topic: "Where it runs",
    status: "A dedicated environment, or self hosted by you.",
  },
  {
    topic: "Hosting region and encryption",
    status: "Set per deployment and written down in the security pack.",
  },
  {
    topic: "AI and your data",
    status:
      "What reaches a model, and under which controls, is in the security pack.",
  },
  {
    topic: "Certifications",
    status:
      "We list a certification here only once it is complete. Current status and dates are in the security pack.",
  },
] as const;

const reviewerTests = [
  {
    title: "Read only means read only",
    text: "Check the access Relyxus is given. Investigation needs read access only.",
  },
  {
    title: "No action without an approver",
    text: "Ask us to show a proposed change waiting at the approval step.",
  },
  {
    title: "Your data stays put",
    text: "Ask where evidence is stored and which paths, if any, leave your environment.",
  },
] as const;

export function SecurityPage() {
  return (
    <>
      <PageMeta route="/security" />
      <PageHero
        ground="canvas"
        label="Security and data handling"
        title="How we handle *your data*"
        lead="Regulated buyers check this before they book a call, so here it is plainly: what is in place, and where the detail lives."
        visual={<DataBoundary />}
      >
        <ButtonLink href="/demo?type=Security%20pack">
          Request the security pack
        </ButtonLink>
      </PageHero>

      <Section
        id="commitments"
        ground="white"
        label="In place and in progress"
        title="What you can check *today*"
        intro="Three commitments are in place now; certification is in progress. Each one is something your reviewers can test."
      >
        <Commitments />
      </Section>

      <Section
        id="data"
        ground="paper"
        label="Data handling"
        title="What is and isn’t in place yet"
      >
        <table className="facts">
          <caption className="sr-only">Data handling status</caption>
          <tbody>
            {dataHandling.map(row => (
              <tr key={row.topic}>
                <th scope="row">{row.topic}</th>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section
        id="tests"
        ground="white"
        label="For your reviewers"
        title="Three things to test in your review"
      >
        <ol className="grid-3 terms">
          {reviewerTests.map(test => (
            <li key={test.title}>
              <h3>{test.title}</h3>
              <p className="muted">{test.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand
        ground="paper"
        title="Bring your reviewers"
        text={`The security pack covers data flows, identity, AI data handling, action safety and assurance status. We share it with teams in an evaluation, ${packPromise}.`}
        label="Request the security pack"
        href="/demo?type=Security%20pack"
      />
    </>
  );
}
