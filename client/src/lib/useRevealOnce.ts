import { useEffect, useLayoutEffect, useRef, useState } from "react";

type RevealState = "static" | "ready" | "play";

const canAnimate = () =>
  typeof window !== "undefined" &&
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Plays a one-off entrance the first time the element is in view. Content is
 * visible by default; it is only hidden ("ready") once we know the animation
 * can run, so no-JS, reduced motion and screenshots all show it in full.
 */
export function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState<RevealState>("static");

  useLayoutEffect(() => {
    if (canAnimate()) setState("ready");
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (state !== "ready" || !node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState("play");
        observer.disconnect();
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [state]);

  return [ref, state] as const;
}
