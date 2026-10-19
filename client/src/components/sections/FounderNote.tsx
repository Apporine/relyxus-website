import { founderNote, team } from "@/content/site";
import { Section } from "@/components/ui/Section";

const initials = (name: string) =>
  name
    .split(" ")
    .map(part => part[0])
    .join("")
    .slice(0, 2);

export function FounderNote({
  ground = "white",
}: {
  ground?: "paper" | "white";
}) {
  return (
    <Section
      id="founder-note"
      ground={ground}
      label="A note from the team"
      title={founderNote.title}
    >
      <div className="note measure">
        {founderNote.paragraphs.map(text => (
          <p key={text}>{text}</p>
        ))}
        <p className="note-sign">{founderNote.signature}</p>
      </div>
      {team.length > 0 && (
        <ul className="team grid-3">
          {team.map(person => (
            <li key={person.name}>
              {person.photo ? (
                <img
                  src={person.photo}
                  alt=""
                  width={56}
                  height={56}
                  className="avatar-lg"
                />
              ) : (
                <span className="avatar avatar-lg" aria-hidden="true">
                  {initials(person.name)}
                </span>
              )}
              <div>
                <h3>{person.name}</h3>
                <p className="small muted">{person.role}</p>
                <p className="small">{person.line}</p>
                {person.linkedin && (
                  <a href={person.linkedin} className="small" rel="noreferrer">
                    LinkedIn
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
