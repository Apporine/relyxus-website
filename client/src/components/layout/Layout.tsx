import { useEffect, type ReactNode } from "react";
import { useLocation } from "wouter";
import { scrollToHash } from "@/lib/scrollToHash";
import { AnnouncementBar } from "./AnnouncementBar";
import { SiteHeader } from "./SiteHeader";
import { ProductBar } from "./ProductBar";
import { SiteFooter } from "./SiteFooter";

/** Scroll to the top (or the hash target) on every route / hash change. */
function useRouteScroll() {
  const [location] = useLocation();
  useEffect(() => {
    const go = () => {
      if (window.location.hash) {
        // Wait a frame so the destination page has painted its section ids.
        requestAnimationFrame(() => scrollToHash(undefined, "auto"));
      } else {
        window.scrollTo(0, 0);
        document.getElementById("main")?.focus({ preventScroll: true });
      }
    };
    go();
    window.addEventListener("hashchange", go);
    return () => window.removeEventListener("hashchange", go);
  }, [location]);
}

export function Layout({ children }: { children: ReactNode }) {
  useRouteScroll();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <AnnouncementBar />
      <SiteHeader />
      <ProductBar />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
