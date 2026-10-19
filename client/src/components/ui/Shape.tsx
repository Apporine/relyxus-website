/** Decorative quarter-circle / leaf corner — used once or twice per section. */
export function Shape({
  tone = "lime",
  size = "md",
  className = "",
}: {
  tone?: "lime" | "lavender";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <span
      className={`shape shape-${tone} shape-${size} ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
