import { useEffect, useRef, useState } from "react";

/** The one curve (expo out) and its two secondaries. Mirrors --ease in system.css. */
export const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
export const EASE_GSAP = "expo.out";
export const REVEAL_MS = 600;
export const STAGE_MS = 900;

/** True when the visitor asked for less motion, in the OS or with the footer switch. */
export function prefersLessMotion() {
  if (typeof window === "undefined") return false;
  let saved: string | null = null;
  try {
    // Read the saved choice directly: the footer switch may not have mounted yet.
    saved = localStorage.getItem("rx-motion");
  } catch {
    /* storage unavailable */
  }
  return (
    saved === "off" ||
    document.documentElement.dataset.motion === "off" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Re-renders when the motion preference changes (OS setting or footer switch). */
export function useLessMotion() {
  const [less, setLess] = useState(prefersLessMotion);
  useEffect(() => {
    const update = () => setLess(prefersLessMotion());
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    media.addEventListener("change", update);
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    return () => {
      media.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);
  return less;
}

/**
 * Adds `is-in` once the element scrolls into view, which starts the
 * blur to focus reveals and line draws inside it.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}
