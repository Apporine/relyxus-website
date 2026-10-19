import type { ReactNode } from "react";
import { Accent, stripAccent } from "@/components/ui/Accent";

export type Ground =
  | "paper"
  | "white"
  | "console"
  | "canvas"
  | "tint-1"
  | "tint-2";

/** A page section with an optional header: label, H2, short intro. */
export function Section({
  id,
  ground = "paper",
  label,
  title,
  intro,
  align = "left",
  children,
  className = "",
}: {
  id?: string;
  ground?: Ground;
  label?: string;
  title?: string;
  intro?: ReactNode;
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
}) {
  const headingId = id ? `${id}-title` : undefined;
  const onDark = ground === "console" || ground === "canvas";
  return (
    <section
      id={id}
      className={`section section-${ground} ${onDark ? "on-canvas on-console" : ""} ${className}`.trim()}
      aria-labelledby={title ? headingId : undefined}
    >
      <div className="container">
        {title && (
          <SectionHeader
            id={headingId}
            label={label}
            title={title}
            intro={intro}
            align={align}
          />
        )}
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({
  id,
  label,
  title,
  intro,
  align = "left",
  level = 2,
}: {
  id?: string;
  label?: string;
  title: string;
  intro?: ReactNode;
  align?: "left" | "center";
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <header className={`section-header section-header-${align}`}>
      {label && <p className="label">{label}</p>}
      <Heading id={id}>
        <Accent text={title} />
      </Heading>
      {intro && (
        <p className="section-intro">
          {typeof intro === "string" ? stripAccent(intro) : intro}
        </p>
      )}
    </header>
  );
}
