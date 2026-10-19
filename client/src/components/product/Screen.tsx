import type { CSSProperties } from "react";
import type { Screenshot } from "@/content/product";

/** A real product screenshot in a frame, with numbered markers and notes. */
export function Screen({
  screen,
  title,
}: {
  screen: Screenshot;
  title: string;
}) {
  return (
    <figure className="screen">
      <div className="screen-frame on-console">
        <div className="frame-bar">
          <span className="frame-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="frame-title">{title}</span>
        </div>
        <div className="screen-shot">
          <img
            src={screen.src}
            width={screen.width}
            height={screen.height}
            alt={screen.alt}
            loading="lazy"
            decoding="async"
          />
          {screen.callouts.map((note, index) => (
            <span
              key={note.text}
              className="screen-marker"
              style={
                { "--x": `${note.x}%`, "--y": `${note.y}%` } as CSSProperties
              }
              aria-hidden="true"
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>
      <figcaption>
        <ol className="screen-notes">
          {screen.callouts.map((note, index) => (
            <li key={note.text}>
              <span className="screen-num" aria-hidden="true">
                {index + 1}
              </span>
              {note.text}
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}
