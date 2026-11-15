// Behaviour for the inner pages. Nothing here changes how a page looks at
// rest: it makes the approved designs work. Questions open, the demo form
// books, the deadline calculator calculates, chips toggle.

import { sendLead, leadsOn } from "./assistant/leads";

const $$ = <T extends HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const FREE_MAIL = /@(gmail|googlemail|yahoo|hotmail|outlook|live|msn|icloud|me|aol|proton|protonmail|gmx|mail|yandex|zoho)\./i;
const pad = (n: number) => String(n).padStart(2, "0");

export function wire() {
  faq();
  copyLink();
  toggles();
  stackPicker();
  askChips();
  replay();
  demoForm();
  calculator();
  toc();
}

// Article contents links scroll to their heading.
function toc() {
  const heads = $$(".ar-txt h2");
  $$(".ar-toc a").forEach((a) => {
    const t = a.textContent?.trim().toLowerCase() || "";
    const h = heads.find((x) => x.textContent?.trim().toLowerCase().startsWith(t));
    if (!h) return;
    h.id ||= t.replace(/[^a-z0-9]+/g, "-");
    a.setAttribute("href", "#" + h.id);
  });
}

// Questions and answers open one at a time.
function faq() {
  $$(".qi").forEach((q) => {
    const b = q.querySelector<HTMLElement>("b"); if (!b) return;
    b.setAttribute("role", "button"); b.tabIndex = 0; b.style.cursor = "pointer";
    b.setAttribute("aria-expanded", String(q.classList.contains("on")));
    const flip = () => { q.classList.toggle("on"); b.setAttribute("aria-expanded", String(q.classList.contains("on"))); };
    b.addEventListener("click", flip);
    b.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });
  });
}

function copyLink() {
  $$("span.b1").filter((s) => s.textContent?.trim() === "Copy link").forEach((s) => {
    s.setAttribute("role", "button"); s.tabIndex = 0; s.style.cursor = "pointer";
    s.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText("https://relyxus.com/trust"); s.textContent = "Link copied"; setTimeout(() => (s.textContent = "Copy link"), 2000); } catch {}
    });
  });
}

// Choice chips in the designs that should respond when clicked.
function toggles() {
  $$(".dm-tg span, .dc-ck span").forEach((s) => {
    s.setAttribute("role", "checkbox"); s.tabIndex = 0; s.style.cursor = "pointer";
    s.setAttribute("aria-checked", String(s.classList.contains("on")));
    const flip = () => { s.classList.toggle("on"); s.setAttribute("aria-checked", String(s.classList.contains("on"))); s.dispatchEvent(new Event("change", { bubbles: true })); };
    s.addEventListener("click", flip);
    s.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); } });
  });
}

function stackPicker() {
  const box = document.querySelector<HTMLElement>(".in-pick"); if (!box) return;
  const go = box.parentElement?.querySelector<HTMLAnchorElement>("a.b1");
  const update = () => {
    const on = $$(".in-pick span.on", document).map((s) => s.textContent?.trim()).filter((t) => t && t !== "Something else");
    if (go) go.dataset.ask = `I'd like a demo with my stack: ${on.join(", ")}`;
  };
  $$("span", box).forEach((s) => {
    s.setAttribute("role", "checkbox"); s.tabIndex = 0; s.style.cursor = "pointer";
    s.setAttribute("aria-checked", String(s.classList.contains("on")));
    const flip = () => { s.classList.toggle("on"); s.setAttribute("aria-checked", String(s.classList.contains("on"))); update(); };
    s.addEventListener("click", flip);
    s.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); } });
  });
  update();
}

// Suggested questions on the Vigil page open the website assistant.
function askChips() {
  $$(".vg-sug span, .vg-conv .ask span, .ask span").forEach((s) => {
    s.dataset.ask = s.textContent?.trim() || ""; s.setAttribute("role", "button"); s.tabIndex = 0; s.style.cursor = "pointer";
  });
  const box = document.querySelector<HTMLElement>(".vg-ask");
  if (box) {
    const live = (import.meta.env.PUBLIC_LIVE_DEMO_URL as string | undefined) || "/demo#live";
    box.style.cursor = "pointer"; box.setAttribute("role", "link"); box.tabIndex = 0;
    box.addEventListener("click", () => (location.href = live));
  }
}

function replay() {
  const body = "Hello,\n\nI'd like a free replay of one of our past incidents. I've attached what we have:\n\n- The postmortem or incident review\n- The timeline\n- Chat or bridge notes, with names removed\n- Which regulators we reported to\n\nName:\nCompany:\n";
  const href = `mailto:support@relyxus.com?subject=${encodeURIComponent("Replay my outage")}&body=${encodeURIComponent(body)}`;
  $$(".rpl-up").forEach((u) => {
    u.style.cursor = "pointer"; u.setAttribute("role", "link"); u.tabIndex = 0;
    u.addEventListener("click", () => (location.href = href));
    u.addEventListener("keydown", (e) => { if (e.key === "Enter") location.href = href; });
  });
}

// The demo booking form: real fields in the approved layout.
function demoForm() {
  const f = document.querySelector<HTMLElement>(".dm-form"); if (!f) return;
  const fields: [string, string, string, string][] = [["name", "text", "Emma Clarke", "name"], ["email", "email", "emma@examplebank.co.uk", "email"], ["company", "text", "Example Bank", "organization"], ["role", "text", "Head of operational resilience", "organization-title"]];
  $$(".dm-f .ip", f).forEach((ip, i) => {
    const [n, t, ph, ac] = fields[i] || ["x", "text", "", "off"];
    const label = ip.parentElement!.querySelector("label")!;
    const inp = document.createElement("input"); inp.className = "ip"; inp.type = t; inp.name = n; inp.placeholder = ph; inp.autocomplete = ac; inp.id = "dm-" + n; inp.required = n !== "role";
    label.htmlFor = inp.id; ip.replaceWith(inp);
  });
  const cal = f.querySelector<HTMLElement>(".dm-cal")!, sl = f.querySelector<HTMLElement>(".dm-sl")!, go = f.querySelector<HTMLElement>(".dm-go")!;
  const days: Date[] = []; const d = new Date(); d.setHours(12, 0, 0, 0);
  while (days.length < 5) { d.setDate(d.getDate() + 1); if (d.getDay() % 6) days.push(new Date(d)); }
  cal.innerHTML = days.map((x, i) => `<button type="button" class="${i === 1 ? "on" : ""}" data-i="${i}">${x.toLocaleDateString("en-GB", { weekday: "short" })}<b>${x.getDate()}</b></button>`).join("");
  sl.innerHTML = ["09:30", "11:00", "14:00", "15:30", "16:30"].map((t, i) => `<button type="button" class="${i === 1 ? "on" : ""}">${t}</button>`).join("");
  let day = 1, slot = "11:00";
  const label = () => { const x = days[day]; go.textContent = `Book ${x.toLocaleDateString("en-GB", { weekday: "long" })} ${x.getDate()} at ${slot}`; };
  cal.addEventListener("click", (e) => { const b = (e.target as HTMLElement).closest("button"); if (!b) return; $$("button", cal).forEach((x) => x.classList.remove("on")); b.classList.add("on"); day = +b.dataset.i!; label(); });
  sl.addEventListener("click", (e) => { const b = (e.target as HTMLElement).closest("button"); if (!b) return; $$("button", sl).forEach((x) => x.classList.remove("on")); b.classList.add("on"); slot = b.textContent!; label(); });
  label();
  const btn = document.createElement("button"); btn.type = "button"; btn.className = go.className; btn.textContent = go.textContent; go.replaceWith(btn);
  const note = document.createElement("p"); note.className = "dm-err"; note.setAttribute("role", "alert"); btn.after(note);
  const refresh = () => { btn.textContent = `Book ${days[day].toLocaleDateString("en-GB", { weekday: "long" })} ${days[day].getDate()} at ${slot}`; };
  cal.addEventListener("click", refresh); sl.addEventListener("click", refresh);
  btn.addEventListener("click", async () => {
    const v = (n: string) => (f.querySelector<HTMLInputElement>(`[name=${n}]`)?.value || "").trim();
    const name = v("name"), email = v("email"), company = v("company"), role = v("role");
    if (!name || !company) { note.textContent = "Add your name and company."; return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { note.textContent = "Add a valid work email."; return; }
    if (FREE_MAIL.test(email)) { note.textContent = "Use your work email, so we can prepare for your company."; return; }
    note.textContent = "";
    const regs = $$(".dm-tg span.on", f).map((s) => s.textContent).join(", ");
    const when = `${days[day].toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })} at ${slot}, UK time`;
    const lead = { name, email, company, sector: role, regulators: regs, interest: `Demo, ${when}`, questions: [], page: location.pathname, startedAt: new Date().toISOString() };
    if (leadsOn) {
      btn.disabled = true; await sendLead(lead, []);
      f.innerHTML = `<h3>Request sent</h3><p class="dm-ok">Thank you, ${name.split(" ")[0]}. We have asked for ${when}. The team will confirm by email to ${email}.</p>`;
    } else {
      const body = `Name: ${name}\nWork email: ${email}\nCompany: ${company}\nRole: ${role}\nRegulators: ${regs}\nPreferred time: ${when}`;
      location.href = `mailto:support@relyxus.com?subject=${encodeURIComponent("Demo request, " + company)}&body=${encodeURIComponent(body)}`;
      f.innerHTML = `<h3>One last step</h3><p class="dm-ok">Your email app has opened with your request for ${when}. Send it, and the team will confirm by email.</p>`;
    }
  });
}

// The deadline calculator, following the published rules.
type Rule = { id: string; name: string; place: string; what: string; at: (det: Date, cls: Date, hrs: number) => Date; then: string; c: string };
const H = 3600e3;
const RULES: Rule[] = [
  { id: "MAS", name: "MAS", place: "Singapore", what: "Notify within 1 hour of discovery", at: (d) => new Date(+d + H), then: "Root cause report in 14 days", c: "#FF6B4A" },
  { id: "Your contracts", name: "Your contract", place: "", what: "Notice to affected clients", at: (d, _c, h) => new Date(+d + h * H), then: "As your contract says", c: "#FFB199" },
  { id: "US service provider", name: "US service provider", place: "United States", what: "Tell your bank customers after 4 hours of material disruption", at: (d) => new Date(+d + 4 * H), then: "As soon as possible", c: "#C79A8C" },
  { id: "DORA", name: "DORA", place: "European Union", what: "Initial notification, 4 hours from classification", at: (d, c) => new Date(Math.min(+c + 4 * H, +d + 24 * H)), then: "Then 72h, 1 month", c: "#F2C27B" },
  { id: "FCA and PRA", name: "FCA and PRA", place: "United Kingdom", what: "Initial report, generally 24 hours", at: (_d, c) => new Date(+c + 24 * H), then: "Final in 30 working days", c: "#9FB4D6" },
  { id: "US banks", name: "US banking agencies", place: "United States", what: "Notify within 36 hours of determination", at: (_d, c) => new Date(+c + 36 * H), then: "Primary federal regulator", c: "#3DAE80" },
];

function calculator() {
  const app = document.querySelector<HTMLElement>(".dc-app"); if (!app) return;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const local = (x: Date) => `${x.getFullYear()}-${pad(x.getMonth() + 1)}-${pad(x.getDate())}T${pad(x.getHours())}:${pad(x.getMinutes())}`;
  const now = new Date(); now.setSeconds(0, 0);
  const det0 = new Date(+now - 82 * 60e3);
  const ips = $$(".dc-f .ip", app);
  const mk = (ip: HTMLElement, type: string, value: string, id: string, extra = "") => {
    const lab = ip.parentElement!.querySelector("label")!;
    const wrap = document.createElement("div"); wrap.className = "ip";
    wrap.innerHTML = `<input id="${id}" type="${type}" value="${value}" ${extra}><span>${type === "number" ? "hours from detection" : tz}</span>`;
    lab.htmlFor = id; ip.replaceWith(wrap); return wrap.querySelector("input")!;
  };
  const det = mk(ips[0], "datetime-local", local(det0), "dc-det");
  const cls = mk(ips[1], "datetime-local", local(now), "dc-cls");
  const hrs = mk(ips[2], "number", "4", "dc-hrs", 'min="1" max="168" step="1"');
  const go = app.querySelector<HTMLElement>(".dc-in .b1");
  const out = app.querySelector<HTMLElement>(".dc-out")!, line = out.querySelector<HTMLElement>(".dc-line")!, hd = out.querySelector<HTMLElement>(".hd span")!;
  const fmt = (x: Date) => x.toLocaleString("en-GB", { weekday: "short", hour: "2-digit", minute: "2-digit" }).replace(",", "");
  let rows: { r: Rule; t: Date }[] = [];

  const run = () => {
    const d = new Date(det.value), c = new Date(cls.value), h = Math.max(1, +hrs.value || 4);
    if (isNaN(+d) || isNaN(+c)) return;
    const on = $$(".dc-ck span.on", app).map((s) => s.textContent?.trim());
    rows = RULES.filter((r) => on.includes(r.id)).map((r) => ({ r, t: r.at(d, c < d ? d : c, h) })).sort((a, b) => +a.t - +b.t);
    $$(".dc-row", out).forEach((x) => x.remove());
    hd.textContent = `${rows.length} ${rows.length === 1 ? "rule applies" : "rules apply"}`;
    const end = rows.length ? +rows[rows.length - 1].t : +d + H, span = Math.max(H, end - +d);
    line.innerHTML = `<div class="dc-p" style="left:4%;--c:#9FB4D6"><i></i><b>Detected</b></div>` +
      rows.map((x, i) => `<div class="dc-p" style="left:${(4 + ((+x.t - +d) / span) * 88).toFixed(1)}%;--c:${x.r.c};top:${i % 2 ? 54 : 30}px"><i></i><b>${x.r.id === "Your contracts" ? "Contract" : x.r.id.split(" ")[0]} ${x.t.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</b></div>`).join("");
    const act = out.querySelector(".dc-act")!;
    rows.forEach((x, i) => {
      const el = document.createElement("div"); el.className = "dc-row";
      const chip = i === 0 ? '<span class="chip co">Most urgent</span>' : i === 1 ? '<span class="chip nx">Next</span>' : `<span class="chip st">${x.r.then}</span>`;
      el.innerHTML = `<div><b>${x.r.name}</b><small>${x.r.id === "Your contracts" ? h + " hours from detection" : x.r.place}</small></div><span>${x.r.what}</span><span class="t">${fmt(x.t)}</span>${chip}`;
      act.before(el);
    });
  };
  [det, cls, hrs].forEach((i) => i.addEventListener("input", run));
  app.addEventListener("change", run);
  if (go) { go.setAttribute("role", "button"); go.tabIndex = 0; go.style.cursor = "pointer"; go.addEventListener("click", () => { run(); out.scrollIntoView({ behavior: "smooth", block: "nearest" }); }); }
  run();

  const [email, cal, how] = $$(".dc-act span", out);
  const list = () => rows.map((x) => `${x.r.name}: ${x.t.toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })} (${x.r.what})`).join("\n");
  const btn = (el: HTMLElement | undefined, fn: () => void) => { if (!el) return; el.setAttribute("role", "button"); el.tabIndex = 0; el.style.cursor = "pointer"; el.addEventListener("click", fn); };
  btn(email, () => (location.href = `mailto:?subject=${encodeURIComponent("Incident deadlines")}&body=${encodeURIComponent(list() + `\n\nTimes in ${tz}. Guidance only, not legal advice. Worked out at relyxus.com/deadline-calculator`)}`));
  btn(cal, () => {
    const z = (x: Date) => x.toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
    const ev = rows.map((x, i) => `BEGIN:VEVENT\r\nUID:${+x.t}-${i}@relyxus.com\r\nDTSTAMP:${z(new Date())}\r\nDTSTART:${z(new Date(+x.t - 30 * 60e3))}\r\nDTEND:${z(x.t)}\r\nSUMMARY:Deadline: ${x.r.name}\r\nDESCRIPTION:${x.r.what}. Guidance only, not legal advice.\r\nEND:VEVENT`).join("\r\n");
    const blob = new Blob([`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Relyxus//Deadline calculator//EN\r\n${ev}\r\nEND:VCALENDAR\r\n`], { type: "text/calendar" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "incident-deadlines.ics"; a.click(); URL.revokeObjectURL(a.href);
  });
  btn(how, () => (location.href = "/reporting"));
}
