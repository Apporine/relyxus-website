import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLessMotion } from "./motion";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/** Scrolls to a position or element, smoothly when Lenis is running. */
export function scrollToTarget(
  target: number | HTMLElement,
  immediate = false
) {
  if (lenis) lenis.scrollTo(target, { immediate, offset: 0 });
  else if (typeof target === "number")
    window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
  else target.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
}

/**
 * Lenis for the weighted scroll feel, driven by GSAP's ticker so
 * ScrollTrigger and the stage stay in step. Off with reduced motion.
 */
export function useSmoothScroll() {
  const less = useLessMotion();
  useEffect(() => {
    if (less) return;
    lenis = new Lenis({ lerp: 0.1, anchors: true, autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, [less]);
}
