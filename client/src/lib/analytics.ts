type EventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Fire-and-forget click tracking. Feeds dataLayer if present and a DOM event any tool can hook. */
export function track(event: string, props: EventProps = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer?.push({ event, ...props });
    window.dispatchEvent(
      new CustomEvent("relyxus:track", { detail: { event, ...props } })
    );
  } catch {
    /* analytics must never break the page */
  }
}
