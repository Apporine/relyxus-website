import type { ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

/** primary = lime fill; ghost = lime outline on dark; dark = canvas on light; text = link style */
type Variant = "primary" | "ghost" | "dark" | "secondary" | "text";

const classes = (variant: Variant, className = "") => {
  const mapped = variant === "secondary" ? "ghost" : variant;
  return `btn btn-${mapped} ${className}`.trim();
};

/** A link styled as a pill button. External and hash links render a plain anchor. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
}) {
  const content = (
    <>
      {children}
      {variant === "text" && <ArrowRight size={16} aria-hidden="true" />}
    </>
  );
  if (/^(https?:|mailto:|#)/.test(href)) {
    return (
      <a href={href} className={classes(variant, className)} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes(variant, className)} onClick={onClick}>
      {content}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  type = "button",
  disabled,
  className,
  onClick,
}: {
  children: ReactNode;
  variant?: Variant;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      className={classes(variant, className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
