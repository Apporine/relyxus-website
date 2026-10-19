/** Scroll to a hash target, accounting for sticky announce + header + product bar. */
export function scrollToHash(
  hash?: string,
  behavior: ScrollBehavior = "smooth"
) {
  const id = (hash ?? window.location.hash).replace(/^#/, "");
  if (!id) return false;
  const target = document.getElementById(decodeURIComponent(id));
  if (!target) return false;
  target.scrollIntoView({ behavior, block: "start" });
  return true;
}
