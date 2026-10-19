export type SourceLink = { label: string; href: string };

/** A quiet "Source:" line under any number or claim that needs one. */
export function Sources({
  items,
  prefix = items.length > 1 ? "Sources" : "Source",
}: {
  items: readonly SourceLink[];
  prefix?: string;
}) {
  if (!items.length) return null;
  return (
    <p className="sources">
      {prefix}:{" "}
      {items.map((item, index) => (
        <span key={item.href}>
          {index > 0 && "; "}
          <a href={item.href} target="_blank" rel="noreferrer">
            {item.label}
          </a>
        </span>
      ))}
    </p>
  );
}
