// Rotates the customer word in the section 5 heading and the footer line:
// bank, payment firm, fintech, SaaS platform. Each word slides up and out,
// the next slides in from below. Stays on the first word for reduced motion.
export function rotateWords() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll<HTMLElement>(".rot[data-words]").forEach((el, n) => {
    const words = (el.dataset.words || "").split(",");
    if (words.length < 2) return;
    let i = 0;
    window.setTimeout(() => window.setInterval(() => {
      el.classList.add("out");
      window.setTimeout(() => {
        i = (i + 1) % words.length;
        el.textContent = words[i];
        el.classList.remove("out");
        el.classList.add("pre");
        void el.offsetWidth;
        el.classList.remove("pre");
      }, 360);
    }, 2800), n * 700);
  });
}
