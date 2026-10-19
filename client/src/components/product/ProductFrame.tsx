import type { ReactNode } from "react";

/** The dark console panel every product view sits in. */
export function ProductFrame({
  title,
  meta,
  children,
  size = "full",
  className = "",
}: {
  title: string;
  meta?: ReactNode;
  children: ReactNode;
  size?: "full" | "crop";
  className?: string;
}) {
  return (
    <div className={`frame frame-${size} on-console ${className}`.trim()}>
      <div className="frame-bar">
        <span className="frame-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="frame-title">{title}</span>
        {meta && <span className="frame-meta">{meta}</span>}
      </div>
      <div className="frame-body">{children}</div>
    </div>
  );
}

/** A small tag that annotates the product view, attached by a leader line. */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <span className="callout">
      <span className="callout-line" aria-hidden="true" />
      <span className="callout-tag">{children}</span>
    </span>
  );
}
