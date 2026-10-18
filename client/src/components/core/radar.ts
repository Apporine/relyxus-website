/**
 * The layer behind the core: concentric rings with a slow radar sweep, and
 * faint log lines drifting past. One canvas, drawn at up to 30 fps by the
 * same ticker as the core. Also a pure function of time.
 */

const LOG_LINES = [
  "14:02:11 deploy api-gw v3.2 rolled out",
  "14:05:12 api-gw 502 upstream timeout ×412",
  "14:05:40 auth-svc connection pool exhausted",
  "14:06:10 issuer p99 latency 820ms",
  "14:07:02 alert card_auth_declines > 8x",
  "14:09:55 ledger-writer queue depth normal",
  "14:11:40 hypothesis ranked: api-gw v3.2",
  "14:14:03 rollback proposed: v3.2 → v3.1",
  "14:26:08 approval 2/2 recorded",
  "14:31:02 error rate back to baseline",
  "13:40:00 config ledger batch size 200 → 250",
  "14:04:48 trace span auth.authorise 30s timeout",
];

export type RadarState = {
  /** Ring scale and offset in px, from the stage table. */
  scale: number;
  x: number;
  y: number;
  /** 0 → 1 once, for the hero's first pulse of the rings. */
  intro: number;
};

export type RadarRenderer = {
  draw: (seconds: number, state: RadarState) => void;
  resize: () => void;
};

export function createRadarRenderer(canvas: HTMLCanvasElement): RadarRenderer {
  const ctx = canvas.getContext("2d", { alpha: true })!;
  let width = 0;
  let height = 0;
  let mono = "IBM Plex Mono, ui-monospace, monospace";

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    mono = getComputedStyle(canvas).getPropertyValue("--font-mono") || mono;
  };

  const draw = (seconds: number, state: RadarState) => {
    ctx.clearRect(0, 0, width, height);
    const cx = width / 2 + state.x;
    const cy = height / 2 + state.y;
    const base = Math.min(height * 0.2, width * 0.24) * state.scale;
    // Rings expand from 0.8 to full size on arrival.
    const grow = 0.8 + 0.2 * state.intro;

    // Concentric rings, faint paper lines.
    for (let i = 0; i < 5; i += 1) {
      const r = base * (1 + i * 0.42) * grow;
      ctx.strokeStyle = `rgba(244, 239, 230, ${0.07 - i * 0.01})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // The sweep: one turn every 20 s, in step with the core loop.
    const angle = ((seconds % 20) / 20) * Math.PI * 2 - Math.PI / 2;
    const reach = base * 2.7 * grow;
    const steps = 18;
    for (let i = 0; i < steps; i += 1) {
      const a0 = angle - (i + 1) * 0.035;
      const a1 = angle - i * 0.035;
      ctx.fillStyle = `rgba(198, 244, 50, ${(0.022 * (1 - i / steps)).toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, reach, a0, a1);
      ctx.closePath();
      ctx.fill();
    }

    // Log lines drift slowly up and to the left, wrapping round.
    ctx.font = `500 11px ${mono}`;
    ctx.textBaseline = "middle";
    LOG_LINES.forEach((line, i) => {
      const lane = (i * 0.137 + 0.06) % 1;
      const speed = 6 + (i % 4) * 2.5;
      const drift = ((seconds * speed) / height + i * 0.29) % 1;
      const y = height * (1 - drift);
      const x = width * lane - drift * 40;
      // Fade near the edges and keep the centre, where the copy sits, quiet.
      const edge = Math.min(drift, 1 - drift) * 5;
      const centre = Math.abs(x + 120 - width / 2) < width * 0.22 ? 0.35 : 1;
      const alpha = Math.min(1, edge) * 0.16 * centre;
      if (alpha < 0.01) return;
      ctx.fillStyle = `rgba(244, 239, 230, ${alpha.toFixed(3)})`;
      ctx.fillText(line, x, y);
    });
  };

  return { draw, resize };
}
