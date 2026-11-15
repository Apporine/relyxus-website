// The Halo (locked 15 Nov 2026): a ring of light in the Relyxus colours that
// turns slowly. It swells with the visitor's voice while listening, its light
// races round while thinking, and it pulses while Vigil speaks.

export type HaloState = "idle" | "listening" | "thinking" | "speaking";

const PAL = [[255, 107, 74], [255, 177, 153], [159, 180, 214], [61, 174, 128]];
function col(t: number) {
  t = ((t % 1) + 1) % 1; const s = t * 3, i = Math.floor(s), f = s - i, a = PAL[i], b = PAL[Math.min(i + 1, 3)];
  return a.map((v, k) => (v + (b[k] - v) * f) | 0);
}

export class Halo {
  state: HaloState = "idle";
  dy = 0;
  private x: CanvasRenderingContext2D;
  private w = 0; private h = 0;
  private pts: { u: number; v: number; c: number[] }[] = [];
  private t = 0;
  private spin = 0;

  constructor(private c: HTMLCanvasElement, n = 2200, private scale = 0.27, private bg = "6,8,12") {
    this.x = c.getContext("2d")!;
    for (let i = 0; i < n; i++) { const u = Math.random() * 6.283; this.pts.push({ u, v: Math.random() * 6.283, c: col(u / 6.283) }); }
    this.resize();
  }

  resize() {
    const d = Math.min(2, window.devicePixelRatio || 1);
    this.w = this.c.clientWidth; this.h = this.c.clientHeight;
    this.c.width = this.w * d; this.c.height = this.h * d;
    this.x.setTransform(d, 0, 0, d, 0, 0);
  }

  frame(dt: number, level: number) {
    const { x, w, h } = this;
    if (!w) return;
    this.t += dt;
    const st = this.state, t = this.t;
    this.spin += dt * (st === "thinking" ? 1.4 : 0.35);
    x.globalCompositeOperation = "source-over";
    x.fillStyle = `rgba(${this.bg},0.35)`; x.fillRect(0, 0, w, h);
    x.globalCompositeOperation = "lighter";
    const pulse = st === "idle" ? 0.22 + 0.04 * Math.sin(t * 1.6) : 0.2 + 0.18 * level;
    const ry = this.spin, rx = 1.15, cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);
    const m = Math.min(w, h), sc = m * this.scale;
    for (const p of this.pts) {
      const wave = st === "speaking" ? 0.5 * level * Math.max(0, Math.sin(p.u * 5 - t * 7)) : 0;
      const r = pulse * (1 + 0.15 * Math.sin(p.v * 3 + t * 2) + wave);
      const X0 = (1 + r * Math.cos(p.v)) * Math.cos(p.u), Y0 = r * Math.sin(p.v), Z0 = (1 + r * Math.cos(p.v)) * Math.sin(p.u);
      const X = X0 * cy - Z0 * sy; let Z = X0 * sy + Z0 * cy; const Y = Y0 * cx - Z * sx; Z = Y0 * sx + Z * cx;
      const k = 2.6 / (3.2 + Z), px = w / 2 + X * sc * k, py = h / 2 + this.dy + Y * sc * k;
      const a = Math.max(0.15, Math.min(1, 0.75 - Z * 0.35)), c = p.c, s = 1.1 * k * Math.max(0.55, Math.min(1.4, m / 230));
      x.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${a * 0.5})`;
      x.fillRect(px - s, py - s, s * 2, s * 2);
    }
  }
}
