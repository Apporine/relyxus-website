import { useEffect, useRef, useState } from "react";

/** The one curve (expo out) and its two secondaries. Mirrors --ease in system.css. */
export const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
export const EASE_GSAP = "expo.out";
export const REVEAL_MS = 600;
export const STAGE_MS = 900;

/**
 * Marketing site keeps motion on. (No footer switch; OS reduce is ignored
 * so animations do not silently die on Windows “Animation effects” off.)
 */
export function prefersLessMotion() {
  return false;
}

/** Always on — CSS reads html[data-motion]. */
export function syncMotionAttr() {
  document.documentElement.dataset.motion = "on";
  try {
    localStorage.removeItem("rx-motion");
  } catch {
    /* storage unavailable */
  }
}

/** Always false; kept so call sites do not need to change. */
export function useLessMotion() {
  useEffect(() => {
    syncMotionAttr();
  }, []);
  return false;
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
