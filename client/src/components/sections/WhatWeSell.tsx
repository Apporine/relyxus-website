import { whatWeSell } from "@/content/product";

/** The "what we sell" block. Same words wherever it appears. */
export function WhatWeSell() {
  return (
    <dl className="sell">
      {whatWeSell.map(item => (
        <div key={item.term}>
          <dt>{item.term}</dt>
          <dd>{item.text}</dd>
        </div>
      ))}
    </dl>
  );
}
