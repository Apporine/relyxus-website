/**
 * The signal core, drawn on a canvas. A dark glass sphere with a lime ring of
 * light around its equator, tilted toward the viewer, while thin strands
 * (logs, changes, alerts) spiral in, turn lime at the ring and vanish into the
 * sphere. A pulse beats every 4 seconds.
 *
 * Every frame is a pure function of time inside a 20 second loop, so frame
 * 600 is frame 0 and a recording of it loops seamlessly. Storyboard:
 *   0–4 s    strands drift in from the lower left; the ring turns (10 s a turn)
 *   4 s      pulse 1: the centre brightens for 600 ms, the ring flares 15%
 *   4–8 s    a second stream joins from the upper right
 *   8/12/16  pulses 2–4
 *   12–16 s  a brighter cluster (an "incident") feeds in and is absorbed
 *   16–20 s  density settles back to the 0 s state
 */

export const LOOP = 20;
const PULSES = [4, 8, 12, 16];
const PULSE_MS = 0.6;
const TILT = (-12 * Math.PI) / 180;
/** Vertical squash of the disk: a camera about 15° above the equator. */
const FLAT = 0.3;

const PAPER: Rgb = [244, 239, 230];
const SIGNAL: Rgb = [198, 244, 50];
type Rgb = [number, number, number];

type Strand = {
  stream: "a" | "b" | "c";
  spawn: number;
  life: number;
  angle: number;
  turns: number;
  width: number;
  bright: number;
};

export type CoreTint = "signal" | "paper" | "dense";

/** Small seeded PRNG so every visit draws the same loop. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeStrands(tint: CoreTint): Strand[] {
  const rand = mulberry32(tint === "dense" ? 11 : tint === "paper" ? 7 : 3);
  const count = tint === "dense" ? 2.1 : 1.6;
  const strands: Strand[] = [];
  const add = (
    stream: Strand["stream"],
    n: number,
    spawn: () => number,
    life: () => number,
    center: number,
    spread: number,
    bright: number
  ) => {
    for (let i = 0; i < Math.round(n * count); i += 1) {
      strands.push({
        stream,
        spawn: spawn(),
        life: life(),
        angle: center + (rand() - 0.5) * spread,
        turns: 0.55 + rand() * 0.6,
        width: 0.5 + rand() * 0.7,
        bright,
      });
    }
  };
  // Disk plane: x right, z toward the viewer. Lower left is x < 0, z > 0.
  add(
    "a",
    230,
    () => rand() * LOOP,
    () => 4 + rand() * 3,
    (3 * Math.PI) / 4,
    1.3,
    1
  );
  // Upper right, entering at 4 s and absorbed before 20 s.
  add(
    "b",
    110,
    () => 4 + rand() * 10,
    () => 3 + rand() * 2,
    -Math.PI / 4,
    1.1,
    1
  );
  // The incident: a short, brighter burst from 12 s, gone by 16 s.
  add(
    "c",
    55,
    () => 12 + rand() * 1.6,
    () => 1.8 + rand() * 0.6,
    rand() * Math.PI * 2,
    Math.PI * 2,
    1.8
  );
  return strands;
}

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const mix = (a: Rgb, b: Rgb, t: number): Rgb => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];
const rgba = (c: Rgb, a: number) =>
  `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${a.toFixed(3)})`;

/** 0 → 1 → 0 over the 600 ms after each pulse time. */
export function pulseAt(t: number) {
  let value = 0;
  for (const p of PULSES) {
    const d = t - p;
    if (d >= 0 && d < PULSE_MS)
      value = Math.max(value, Math.sin((Math.PI * d) / PULSE_MS));
  }
  return value;
}

export type CoreRenderer = {
  draw: (seconds: number) => void;
  resize: () => void;
  /** An extra pulse on demand, e.g. once per step of the incident chain. */
  kick: () => void;
};

export function createCoreRenderer(
  canvas: HTMLCanvasElement,
  { tint = "signal" as CoreTint } = {}
): CoreRenderer {
  const ctx = canvas.getContext("2d", { alpha: true })!;
  const strands = makeStrands(tint);
  const strandEdge = tint === "paper" ? 0.15 : 0;
  let width = 0;
  let height = 0;
  let kickAt = -10;
  let lastSeconds = 0;

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const project = (cx: number, cy: number, r: number, theta: number) => {
    const x = r * Math.cos(theta);
    const z = r * Math.sin(theta) * FLAT;
    return {
      x: cx + x * Math.cos(TILT) - z * Math.sin(TILT),
      y: cy + x * Math.sin(TILT) + z * Math.cos(TILT),
      back: Math.sin(theta) < 0,
    };
  };

  const draw = (seconds: number) => {
    lastSeconds = seconds;
    const t = ((seconds % LOOP) + LOOP) % LOOP;
    const kick = clamp(1 - (seconds - kickAt) / PULSE_MS);
    const pulse = Math.max(
      pulseAt(t),
      kick > 0 ? Math.sin(Math.PI * (1 - kick)) : 0
    );
    const cx = width / 2;
    const cy = height / 2;
    // The sphere and ring fill about 45% of the frame height.
    const sphere = Math.min(height * 0.225, width * 0.26);
    const ring = sphere / 0.62;
    const outer = ring * 3.1;

    ctx.clearRect(0, 0, width, height);

    // Soft volumetric haze around the ring.
    const haze = ctx.createRadialGradient(
      cx,
      cy,
      sphere * 0.6,
      cx,
      cy,
      ring * 2.1
    );
    haze.addColorStop(0, rgba(SIGNAL, 0.07 + pulse * 0.04));
    haze.addColorStop(0.5, rgba(SIGNAL, 0.025));
    haze.addColorStop(1, rgba(SIGNAL, 0));
    ctx.fillStyle = haze;
    ctx.fillRect(0, 0, width, height);

    const strandsAt = (back: boolean) => {
      ctx.lineCap = "round";
      for (const s of strands) {
        let age = t - s.spawn;
        if (s.stream === "a") age = ((age % LOOP) + LOOP) % LOOP;
        if (age < 0 || age >= s.life) continue;
        const p = Math.pow(age / s.life, 1.15);
        const r =
          sphere * 0.55 + (outer - sphere * 0.55) * Math.pow(1 - p, 1.6);
        const theta = s.angle + s.turns * Math.PI * 2 * p;
        const head = project(cx, cy, r, theta);
        if (head.back !== back) continue;
        const pTail = Math.max(0, p - 0.07);
        const rTail =
          sphere * 0.55 + (outer - sphere * 0.55) * Math.pow(1 - pTail, 1.6);
        const tail = project(
          cx,
          cy,
          rTail,
          s.angle + s.turns * Math.PI * 2 * pTail
        );
        // Paper white at the edges, lime by the ring; thicker as they arrive.
        const nearRing = clamp((outer * 0.55 - r) / (outer * 0.55 - ring));
        const colour = mix(PAPER, SIGNAL, clamp(nearRing + strandEdge));
        const fadeIn = clamp(p / 0.12);
        const vanish = clamp((r - sphere * 0.7) / (sphere * 0.35));
        const alpha = fadeIn * vanish * (0.18 + nearRing * 0.55) * s.bright;
        if (alpha <= 0.01) continue;
        ctx.strokeStyle = rgba(colour, Math.min(alpha, 0.95));
        ctx.lineWidth = s.width * (0.6 + nearRing * 1.4);
        ctx.beginPath();
        ctx.moveTo(tail.x, tail.y);
        ctx.lineTo(head.x, head.y);
        ctx.stroke();
      }
    };

    // The ring: two bright arcs opposite each other turn once every 10 s
    // (two full turns per 20 s loop), so motion reads at a glance.
    const ringAt = (back: boolean) => {
      const turn = (t / 10) * Math.PI * 2;
      const segments = 96;
      for (let i = 0; i < segments; i += 1) {
        const a0 = (i / segments) * Math.PI * 2;
        const a1 = ((i + 1) / segments) * Math.PI * 2;
        const isBack = Math.sin((a0 + a1) / 2) < 0;
        if (isBack !== back) continue;
        const d = Math.abs(Math.sin(a0 - turn));
        const glow = 0.35 + 0.65 * Math.pow(1 - d, 3);
        const flare = 1 + pulse * 0.15;
        const p0 = project(cx, cy, ring, a0);
        const p1 = project(cx, cy, ring, a1);
        ctx.strokeStyle = rgba(
          SIGNAL,
          clamp((back ? 0.45 : 0.95) * glow * flare)
        );
        ctx.lineWidth = (back ? 1.6 : 2.6) * flare;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
        // A wide, faint stroke stands in for bloom without a blur filter.
        ctx.strokeStyle = rgba(SIGNAL, 0.06 * glow * flare);
        ctx.lineWidth = 10;
        ctx.stroke();
      }
    };

    ringAt(true);
    strandsAt(true);

    // The sphere: near black glass with a purple tint and a thin rim light.
    const body = ctx.createRadialGradient(
      cx - sphere * 0.35,
      cy - sphere * 0.4,
      sphere * 0.05,
      cx,
      cy,
      sphere
    );
    body.addColorStop(0, "rgba(58, 40, 70, 1)");
    body.addColorStop(0.45, "rgba(22, 13, 28, 1)");
    body.addColorStop(1, "rgba(6, 3, 9, 1)");
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.arc(cx, cy, sphere, 0, Math.PI * 2);
    ctx.fill();

    const rim = ctx.createLinearGradient(
      cx - sphere,
      cy - sphere,
      cx + sphere,
      cy + sphere
    );
    rim.addColorStop(0, rgba(PAPER, 0.35));
    rim.addColorStop(0.35, rgba(SIGNAL, 0.18));
    rim.addColorStop(1, rgba(SIGNAL, 0));
    ctx.strokeStyle = rim;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // The heartbeat inside the glass.
    const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, sphere * 0.75);
    core.addColorStop(0, rgba(SIGNAL, 0.06 + pulse * 0.32));
    core.addColorStop(1, rgba(SIGNAL, 0));
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(cx, cy, sphere, 0, Math.PI * 2);
    ctx.fill();

    strandsAt(false);
    ringAt(false);
  };

  return {
    draw,
    resize,
    kick: () => {
      kickAt = lastSeconds;
    },
  };
}
