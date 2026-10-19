import { useEffect, type ReactNode } from "react";
import { useLocation } from "wouter";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

/** Scroll to the top (or the hash target) on every route change. */
function useRouteScroll() {
  const [location] = useLocation();
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const target = hash
      ? document.getElementById(decodeURIComponent(hash))
      : null;
    if (target) target.scrollIntoView();
    else {
      window.scrollTo(0, 0);
      document.getElementById("main")?.focus({ preventScroll: true });
    }
  }, [location]);
}

export function Layout({ children }: { children: ReactNode }) {
  useRouteScroll();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
