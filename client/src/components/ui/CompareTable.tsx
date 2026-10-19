import { Check } from "lucide-react";

export type CompareRow = { label: string; cells: readonly string[] };

/**
 * The first column is Relyxus and gets the tint and check. Below 768 px each
 * row becomes a stacked card; data-label carries the column name across.
 */
export function CompareTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: readonly string[];
  rows: readonly CompareRow[];
}) {
  return (
    <table className="compare">
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr>
          <th scope="col">
            <span className="sr-only">Topic</span>
          </th>
          {columns.map((column, index) => (
            <th
              scope="col"
              key={column}
              className={index === 0 ? "compare-ours" : undefined}
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.label}>
            <th scope="row">{row.label}</th>
            {row.cells.map((cell, index) => (
              <td
                key={columns[index]}
                data-label={columns[index]}
                className={index === 0 ? "compare-ours" : undefined}
              >
                {index === 0 && (
                  <Check
                    size={18}
                    aria-hidden="true"
                    className="compare-check"
                  />
                )}
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
