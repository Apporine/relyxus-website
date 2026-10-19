import type { ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

/** The one card: white, hairline border, no shadow. Optional link footer. */
export function Card({
  title,
  label,
  children,
  href,
  linkLabel,
  as: Tag = "article",
  className = "",
}: {
  title?: string;
  label?: string;
  children?: ReactNode;
  href?: string;
  linkLabel?: string;
  as?: "article" | "li" | "div";
  className?: string;
}) {
  return (
    <Tag className={`card ${href ? "card-link" : ""} ${className}`.trim()}>
      {label && <p className="card-label">{label}</p>}
      {title && <h3 className="card-title">{title}</h3>}
      {children && <div className="card-body">{children}</div>}
      {href && linkLabel && (
        <Link href={href} className="card-cta">
          {linkLabel}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      )}
    </Tag>
  );
}
