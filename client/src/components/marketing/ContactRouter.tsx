import { useEffect, useState } from "react";
import { Check, Mail, Pause, Play, Users } from "lucide-react";
import { PrimaryLink } from "@/components/marketing/PublicSite";
import { contactTopics } from "@/content/site";

const TEAM = { x: 470, y: 180 };

function beam(index: number) {
  const y = 57 + index * 85;
  return `M220 ${y} C330 ${y}, 340 ${TEAM.y}, 414 ${TEAM.y}`;
}
const REPLY = "M526 180 H616";

export function ContactRouter() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(
      () => setActive(index => (index + 1) % contactTopics.length),
      6000
    );
    return () => window.clearTimeout(timer);
  }, [active, paused]);

  const topic = contactTopics[active];

  return (
    <div
      className="cr"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="cr-diagram">
        <svg
          viewBox="0 0 720 360"
          role="group"
          aria-label="Choose what you want to talk about. Your note goes to the Relyxus team and the reply comes back by email."
        >
          {contactTopics.map((item, index) => {
            const on = index === active;
            const y = 30 + index * 85;
            return (
              <g
                key={item.key}
                className={`cr-topic ${on ? "is-on" : ""}`}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={item.label}
                onClick={() => setActive(index)}
                onKeyDown={event => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActive(index);
                  }
                }}
              >
                <path className="cr-beam" d={beam(index)} />
                {on && <path className="hx-flow cr-flow" d={beam(index)} />}
                <rect x="20" y={y} width="200" height="54" rx="27" />
                <circle cx="48" cy={y + 27} r="7" />
                <text x="68" y={y + 25}>
                  {item.label}
                </text>
                <text className="cr-hint" x="68" y={y + 43}>
                  {item.hint}
                </text>
              </g>
            );
          })}

          <g key={active}>
            <circle
              className="cr-packet"
              r="6"
              style={{ offsetPath: `path("${beam(active)}")` }}
            />
            <circle
              className="cr-packet cr-packet-out"
              r="6"
              style={{ offsetPath: `path("${REPLY}")` }}
            />
          </g>

          <path className="hx-lane" d={REPLY} />
          <circle className="cr-halo" cx={TEAM.x} cy={TEAM.y} r="72" />
          <circle className="cr-team" cx={TEAM.x} cy={TEAM.y} r="52" />
          <Users
            className="cr-team-icon"
            x={TEAM.x - 20}
            y={TEAM.y - 20}
            width={40}
            height={40}
          />

          <g className="cr-reply">
            <circle cx="650" cy="180" r="34" />
            <Mail x={638} y={168} width={24} height={24} />
          </g>
        </svg>
        <button
          type="button"
          className="hx-pause"
          aria-label={paused ? "Play the animation" : "Pause the animation"}
          onClick={() => setPaused(value => !value)}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </div>

      <div className="cr-panel" key={topic.key} aria-live="polite">
        <div>
          <h2 className="hx-h2">{topic.title}</h2>
          <p>{topic.text}</p>
          <ul className="hx-trust-lines">
            {topic.points.map(point => (
              <li key={point}>
                <Check size={18} aria-hidden="true" /> {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="cr-next">
          <span className="hx-status">What happens next</span>
          <ol>
            <li>You send a short note.</li>
            <li>We read it and reply by email.</li>
            <li>If it helps, we set up a call.</li>
          </ol>
          <PrimaryLink href={`/demo?type=${encodeURIComponent(topic.type)}`}>
            {topic.cta}
          </PrimaryLink>
        </div>
      </div>
    </div>
  );
}
