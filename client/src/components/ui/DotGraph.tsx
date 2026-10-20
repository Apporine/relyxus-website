import type { CSSProperties } from "react";
import type { Diagram, DiagramNode } from "@/content/diagrams";
import { useRevealOnce } from "@/lib/useRevealOnce";

const NODE_H = 46;
const NODE_H_PLAIN = 34;

const width = (node: DiagramNode) =>
  Math.max(
    node.label.length * 7.6 + 32,
    node.sub ? node.sub.length * 6.4 + 32 : 0,
    110
  );
const height = (node: DiagramNode) => (node.sub ? NODE_H : NODE_H_PLAIN);

/** A curve from one node's edge to the other's, horizontal or vertical. */
function edgePath(a: DiagramNode, b: DiagramNode) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (Math.abs(dx) >= Math.abs(dy) * 0.6) {
    const sx = a.x + Math.sign(dx) * (width(a) / 2);
    const ex = b.x - Math.sign(dx) * (width(b) / 2);
    const mid = (sx + ex) / 2;
    return `M${sx} ${a.y} C${mid} ${a.y}, ${mid} ${b.y}, ${ex} ${b.y}`;
  }
  const sy = a.y + Math.sign(dy) * (height(a) / 2);
  const ey = b.y - Math.sign(dy) * (height(b) / 2);
  const mid = (sy + ey) / 2;
  return `M${a.x} ${sy} C${a.x} ${mid}, ${b.x} ${mid}, ${b.x} ${ey}`;
}

/**
 * Nodes and dotted connectors whose dots flow toward each target. Nodes
 * appear once in view; reduced motion shows the finished, still diagram.
 */
export function DotGraph({ diagram }: { diagram: Diagram }) {
  const [ref, state] = useRevealOnce<HTMLDivElement>();
  const byId = new Map(diagram.nodes.map(node => [node.id, node]));
  return (
    <figure className="dot-graph on-console" ref={ref} data-reveal={state}>
      <p className="dot-graph-title">{diagram.title}</p>
      <svg
        viewBox={`0 0 600 ${diagram.height}`}
        role="img"
        aria-label={`${diagram.title}. ${diagram.caption}`}
      >
        {diagram.edges.map((edge, i) => {
          const from = byId.get(edge.from)!;
          const to = byId.get(edge.to)!;
          return (
            <path
              key={`${edge.from}-${edge.to}`}
              d={edgePath(from, to)}
              className={`dg-edge tone-${edge.tone ?? "plain"}`}
              style={{ "--i": i } as CSSProperties}
            />
          );
        })}
        {diagram.nodes.map((node, i) => {
          const w = width(node);
          const h = height(node);
          return (
            <g
              key={node.id}
              className={`dg-node tone-${node.tone ?? "plain"}`}
              style={{ "--i": i } as CSSProperties}
            >
              <rect
                x={node.x - w / 2}
                y={node.y - h / 2}
                width={w}
                height={h}
                rx={10}
              />
              <text
                x={node.x}
                y={node.sub ? node.y - 4 : node.y + 5}
                className="dg-label"
              >
                {node.label}
              </text>
              {node.sub && (
                <text x={node.x} y={node.y + 14} className="dg-sub">
                  {node.sub}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <figcaption>{diagram.caption}</figcaption>
    </figure>
  );
}
