import type { CSSProperties, ReactNode } from "react";
import { useRevealOnce } from "@/lib/useRevealOnce";

/** 16 px rise + fade once on enter. Off when prefers-reduced-motion. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
}) {
  const [ref, state] = useRevealOnce<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`.trim()}
      data-reveal={state}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
