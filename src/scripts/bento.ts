// Controllers for the platform bento (section 5).
const root = document.querySelector<HTMLElement>(".r-bento")!;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const SAY = "Severity 1. Card payments are failing in production. Press 1 to take it, press 2 to pass it on.";
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = root) => r.querySelector(s) as T;
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = root) => [...r.querySelectorAll(s)] as T[];
type Tick = (dt: number, t: number) => void;
// Tweak 11: hovering a card replays its moment and speeds up its motion.
const hot = new Set<string>();
const replays: Record<string, () => void> = {};
function paging(): Tick {
  const ph = $(".ph"), lad = $(".lad"); const rows = $$(".lr", lad), ft = $(".ft", lad);
  let t = 0, done = false, n = 0;
  const reset = () => { t = 0; done = false; n = 0; ph.classList.remove("done"); $(".s", ph).textContent = "Incoming call";
    rows.forEach((r, i) => { r.classList.remove("ok"); const p = $(".pl", r); p.className = "pl" + (i === 0 ? " r" : ""); p.textContent = i === 0 ? "Paging" : "Waiting"; }); ft.classList.remove("on"); };
  const fin = (k: number) => { if (done) return; done = true; ph.classList.add("done"); $(".s", ph).textContent = "Call ended";
    $(".t", ph).innerHTML = k === 1 ? '<span style="color:#8BE6BE">You have taken incident 2047.</span>' : "<span>Passing to Emma Clarke, next on call.</span>";
    if (k === 1) { rows[0].classList.add("ok"); const p = $(".pl", rows[0]); p.className = "pl g"; p.textContent = "Took it, 03:14";
      setTimeout(() => { rows.slice(1).forEach((r, i) => setTimeout(() => { const q = $(".pl", r); q.className = "pl n"; q.textContent = "Not woken"; }, i * 500)); setTimeout(() => ft.classList.add("on"), 1100); }, 500); }
    else { const p = $(".pl", rows[0]); p.className = "pl"; p.textContent = "Passed on"; const q = $(".pl", rows[1]); q.className = "pl r"; q.textContent = "Calling now"; } };
  ($(".a", ph) as HTMLButtonElement).onclick = () => fin(1); ($(".p", ph) as HTMLButtonElement).onclick = () => fin(2); reset();
  replays.c1 = () => { if (done) reset(); };
  return (dt) => { t += dt; if (!done) { n = Math.min(SAY.length, n + dt * 40); $(".t", ph).textContent = SAY.slice(0, Math.floor(n)); } if (!done && t > 6.5) fin(1); if (done && t > 13) reset(); };
}
function causeC(): Tick {
  const c = $(".cause"), li = $$("li", c), bar = $(".bar i", c), cf = $(".cf", c); let t = 0;
  replays.c2 = () => { if (t > 5) t = 10.9; };
  return (dt) => { t += dt; if (t > 11) { t = 0; li.forEach((l) => l.classList.remove("on")); bar.style.width = "0"; cf.textContent = "0% confident"; }
    li.forEach((l, i) => { if (t > 1 + i * 1.1) l.classList.add("on"); }); if (t > 4.4 && bar.style.width !== "92%") { bar.style.width = "92%"; cf.textContent = "92% confident"; } };
}
function apC(): Tick {
  const a = $(".ap2"), who = $$(".who>div", a), run = $(".run", a); let t = 0;
  replays.c3 = () => { if (t > 4.5) t = 9.9; };
  return (dt) => { t += dt;
    if (t > 10) { t = 0; who.forEach((w) => { w.classList.remove("ok"); $(".k", w).textContent = "Waiting"; }); run.className = "run"; run.textContent = "Needs 2 approvals"; }
    if (t > 2 && !who[0].classList.contains("ok")) { who[0].classList.add("ok"); $(".k", who[0]).textContent = "Approved with passkey"; run.textContent = "1 of 2 approved"; }
    if (t > 4.2 && !who[1].classList.contains("ok")) { who[1].classList.add("ok"); $(".k", who[1]).textContent = "Approved with passkey"; run.className = "run ok"; run.textContent = "Rolling back now"; } };
}
let sd = 3; const rr = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
function ringC(): Tick {
  const cv = $<HTMLCanvasElement>("canvas.ring"), x = cv.getContext("2d")!; const P: { a: number; r: number; s: number; c: number }[] = [];
  for (let i = 0; i < 420; i++) P.push({ a: rr() * 6.283, r: 0.75 + rr() * 0.5, s: 0.5 + rr() * 1.4, c: rr() });
  return (_dt, t) => { const D = Math.min(2, devicePixelRatio || 1), w = cv.clientWidth, h = cv.clientHeight; if (!w) return;
    if (cv.width !== Math.round(w * D)) { cv.width = w * D; cv.height = h * D; } x.setTransform(D, 0, 0, D, 0, 0); x.clearRect(0, 0, w, h);
    const cx = w * 0.62, cy = h * 0.42, R = Math.min(w, h) * 0.34;
    P.forEach((p) => { const a = p.a + t * 0.05 * (p.r > 1 ? 1 : -1), r2 = R * p.r * (1 + 0.04 * Math.sin(t * 0.6 + p.a * 5));
      x.fillStyle = p.c < 0.12 ? "rgba(255,107,74,.75)" : p.c < 0.3 ? "rgba(61,174,128,.55)" : "rgba(120,140,170,.45)";
      x.beginPath(); x.arc(cx + Math.cos(a) * r2 * 1.25, cy + Math.sin(a) * r2 * 0.8, p.s * 0.8, 0, 6.283); x.fill(); }); };
}
function dmC(): Tick {
  const cv = $<HTMLCanvasElement>("canvas.dm"), x = cv.getContext("2d")!, DOTS: number[] = []; for (let i = 0; i < 900; i++) DOTS.push(rr());
  return (_dt, t) => { const D = Math.min(2, devicePixelRatio || 1), w = cv.clientWidth, h = cv.clientHeight; if (!w) return;
    if (cv.width !== Math.round(w * D)) { cv.width = w * D; cv.height = h * D; } x.setTransform(D, 0, 0, D, 0, 0); x.clearRect(0, 0, w, h); const s = 12; let n = 0;
    const sp = hot.has("c4") ? 1.6 : 0.55;
    for (let y = s / 2; y < h; y += s) for (let xx = s / 2; xx < w; xx += s) { const k = DOTS[n++ % 900], v = Math.sin(t * sp + k * 30); let c: string;
      if (v < 0.15) c = "#16191F"; else if (k < 0.06) c = "#FF6B4A"; else if (k < 0.16) c = "#9FB4D6"; else if (k < 0.22) c = "#3DAE80"; else c = v > 0.8 ? "#E9EEF5" : "#3A3F47";
      const fade = Math.min(1, Math.max(0, (y - h * 0.2) / (h * 0.5))); x.globalAlpha = 0.25 + 0.75 * fade; x.fillStyle = c; x.beginPath(); x.arc(xx, y, 2.1, 0, 6.283); x.fill(); }
    x.globalAlpha = 1; };
}
function connC(): Tick {
  const sig = $(".sig"), TR = $$(".tr2"), sgv = $(".sgv", sig), sgc = $(".sgc", sig), sgt = $(".sgt", sig);
  const SIGS: [number, string, string][] = [[0, "Prometheus: card-auth errors above 30%", 'rate(http_5xx{svc="card-auth"}) > 0.3'], [3, 'Loki: "auth timeout" in card-auth logs', '{app="card-auth"} |= "auth timeout"'], [7, "Terraform Cloud: release 4.18.2 applied", "run 4.18.2, card-auth, applied 03:10"]];
  let t = 0, si = -1;
  return (dt) => { t += dt * (hot.has("c6") ? 3 : 1); const k = Math.floor(t / 3.2) % SIGS.length; if (k !== si) { si = k; const s = SIGS[k]; sig.style.opacity = "0"; sig.style.transform = "translateY(6px)";
    setTimeout(() => { sgv.textContent = s[1]; sgc.textContent = s[2]; sgt.textContent = ["03:12:02", "03:12:05", "03:10:08"][k]; sig.style.opacity = "1"; sig.style.transform = "none"; }, 300);
    TR.forEach((r, i) => r.classList.toggle("hit", i === s[0])); } };
}
$$(".c").forEach((card) => { const h = $(".sw", card); if (!h) return;
  card.addEventListener("pointermove", (e) => { const r = h.getBoundingClientRect(); const f = Math.max(0, Math.min(1, ((e as PointerEvent).clientX - r.left) / r.width)); h.style.setProperty("--p", ((1.2 - f) * 100).toFixed(1) + "%"); h.classList.add("hov"); });
  card.addEventListener("pointerleave", () => h.classList.remove("hov")); });
$$(".c").forEach((card) => { const id = ["c1", "c2", "c3", "c4", "c5", "c6"].find((k) => card.classList.contains(k)); if (!id) return;
  card.addEventListener("pointerenter", () => { hot.add(id); replays[id]?.(); });
  card.addEventListener("pointerleave", () => hot.delete(id)); });
const CT: Tick[] = [paging(), causeC(), apC(), ringC(), dmC(), connC()];
let vis = false; new IntersectionObserver((e) => (vis = e[0].isIntersecting), { threshold: 0.05 }).observe(root);
let last = 0;
function loop(ts: number) { const t = ts / 1000, dt = Math.min(0.05, t - last || 0.016); last = t; if (vis) CT.forEach((f) => f(dt, t)); requestAnimationFrame(loop); }
if (reduce) CT.forEach((f) => f(8, 8)); else requestAnimationFrame(loop);
