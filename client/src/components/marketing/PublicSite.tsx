import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { navGroups, type NavItem } from "@/content/site";
import {
  DEFAULT_KEYWORDS,
  SITE_NAME,
  upsertJsonLd,
  upsertLink,
  upsertMeta,
} from "@/lib/seo";

export function PageMeta({
  title,
  description,
  keywords = DEFAULT_KEYWORDS,
  noindex = false,
}: {
  title: string;
  description: string;
  keywords?: string;
  noindex?: boolean;
}) {
  useEffect(() => {
    const normalized = title.trim();
    const fullTitle =
      !normalized || normalized.toLowerCase() === SITE_NAME.toLowerCase()
        ? SITE_NAME
        : `${normalized} | ${SITE_NAME}`;
    const canonicalUrl = new URL(
      window.location.pathname,
      window.location.origin
    ).href;
    const imageUrl = new URL("/Icon.jpg", window.location.origin).href;

    document.title = fullTitle;
    document.documentElement.lang = "en";

    upsertMeta("name", "description", description);
    upsertMeta("name", "keywords", keywords);
    upsertMeta("name", "author", "Apporine / Relyxus");
    upsertMeta(
      "name",
      "robots",
      noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"
    );
    upsertMeta("name", "theme-color", "#0b0e18");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:locale", "en_US");
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:image:alt", SITE_NAME);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);
    upsertLink("canonical", canonicalUrl);

    upsertJsonLd("relyxus-org-schema", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: window.location.origin,
      description,
      sameAs: [],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          url: `${window.location.origin}/contact`,
          areaServed: "Worldwide",
          availableLanguage: ["English"],
        },
      ],
    });

    upsertJsonLd("relyxus-webpage-schema", {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: fullTitle,
      description,
      url: canonicalUrl,
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: window.location.origin,
      },
    });
  }, [title, description, keywords, noindex]);
  return null;
}

export function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      className="wordmark"
      aria-label="Relyxus home"
      onClick={onClick}
    >
      <img
        className="wordmark-mark"
        src="/Icon.jpg"
        alt=""
        width={22}
        height={22}
        decoding="async"
      />
      <span>relyxus</span>
    </Link>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && openMenu) {
        event.preventDefault();
        setOpenMenu(null);
        triggers.current[openMenu]?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (
        openMenu &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      )
        setOpenMenu(null);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openMenu]);

  const handleNavigate = () => {
    setOpenMenu(null);
    onNavigate?.();
  };

  return (
    <nav className="desktop-nav" aria-label="Main navigation" ref={headerRef}>
      <ul>
        {navGroups.map(group => {
          const isOpen = openMenu === group.label;
          const id = `nav-panel-${group.label.toLowerCase().replaceAll(" ", "-")}`;
          return (
            <li
              className={`nav-item ${isOpen ? "is-open" : ""}`}
              key={group.label}
            >
              <button
                type="button"
                ref={element => {
                  triggers.current[group.label] = element;
                }}
                className="nav-trigger"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpenMenu(isOpen ? null : group.label)}
              >
                {group.label}
                <ChevronDown className="nav-chevron" aria-hidden="true" />
              </button>
              <div className="nav-popover" id={id} hidden={!isOpen}>
                <div className="nav-popover-head">
                  <span>Explore {group.label.toLowerCase()}</span>
                  <span className="nav-index">
                    RELYXUS / {group.label.toUpperCase()}
                  </span>
                </div>
                <div className="nav-popover-links">
                  {group.items.map((item: NavItem) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="nav-popover-link"
                      onClick={handleNavigate}
                    >
                      <span>
                        <strong>{item.label}</strong>
                        {item.description && <small>{item.description}</small>}
                      </span>
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MobileMenu({
  onClose,
  onNavigate,
}: {
  onClose: () => void;
  onNavigate: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();
  const previousLocation = useRef(location);

  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key === "Tab" && dialogRef.current) {
        const elements = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'
          )
        ).filter(
          element =>
            element.getClientRects().length > 0 && !element.closest("[hidden]")
        );
        if (elements.length === 0) return;
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (previousLocation.current === location) return;
    previousLocation.current = location;
    onNavigate();
  }, [location, onNavigate]);

  return (
    <div
      className="mobile-nav-scrim"
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
        ref={dialogRef}
      >
        <div className="mobile-nav-top">
          <Wordmark onClick={onClose} />
          <button
            ref={closeRef}
            className="icon-button close-menu"
            type="button"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>
        <div className="mobile-nav-groups">
          {navGroups.map(group => (
            <details
              key={group.label}
              className="mobile-nav-group"
              open={group.label === "Product"}
            >
              <summary>
                {group.label}
                <ChevronDown aria-hidden="true" />
              </summary>
              <div className="mobile-nav-group-links">
                {group.items.map(item => (
                  <Link key={item.href} href={item.href} onClick={onNavigate}>
                    {item.label}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </details>
          ))}
        </div>
        <Link
          href="/demo"
          className="button button-primary mobile-demo"
          onClick={onNavigate}
        >
          Request a demo <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    requestAnimationFrame(() => mobileTrigger.current?.focus());
  }, []);
  const navigateMobile = useCallback(() => setMobileOpen(false), []);
  return (
    <header className="site-header">
      <div className="header-shell">
        <Wordmark />
        <NavLinks />
        <div className="header-actions">
          <Link href="/demo" className="button button-small button-primary">
            Request a demo <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <button
            ref={mobileTrigger}
            type="button"
            className="mobile-menu-trigger"
            aria-expanded={mobileOpen}
            aria-controls={mobileOpen ? "mobile-menu" : undefined}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={21} />
            <span>Menu</span>
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div id="mobile-menu">
          <MobileMenu onClose={closeMobile} onNavigate={navigateMobile} />
        </div>
      )}
    </header>
  );
}

const footerGroups: {
  title: string;
  links: { label: string; href: string }[];
}[] = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/product" },
      { label: "Investigation", href: "/product/investigation" },
      { label: "Governed actions", href: "/product/governed-actions" },
      { label: "Reporting", href: "/product/reporting" },
      { label: "Integrations", href: "/integrations" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Evaluate",
    links: [
      { label: "Deployment", href: "/deployment" },
      { label: "Financial services", href: "/solutions/financial-services" },
      { label: "Replay", href: "/replay" },
      { label: "Pricing", href: "/pricing" },
      { label: "Request a demo", href: "/demo" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Resource library", href: "/resources" },
      {
        label: "Governed response",
        href: "/resources/governed-incident-response",
      },
      { label: "Deployment choices", href: "/resources/deployment-choices" },
      { label: "Replay methodology", href: "/resources/replay-methodology" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

export function SiteFooter() {
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const preferenceTrigger = useRef<HTMLButtonElement>(null);
  const preferenceDialog = useRef<HTMLElement>(null);
  const preferenceClose = useRef<HTMLButtonElement>(null);
  const closePreferences = useCallback(() => {
    setPreferencesOpen(false);
    requestAnimationFrame(() => preferenceTrigger.current?.focus());
  }, []);
  useEffect(() => {
    if (!preferencesOpen) return;
    preferenceClose.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePreferences();
      }
      if (event.key === "Tab" && preferenceDialog.current) {
        const elements = Array.from(
          preferenceDialog.current.querySelectorAll<HTMLElement>(
            "button:not([disabled]), a[href]"
          )
        ).filter(element => element.getClientRects().length > 0);
        if (elements.length === 0) return;
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (
          event.shiftKey &&
          (document.activeElement === first ||
            !preferenceDialog.current.contains(document.activeElement))
        ) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [preferencesOpen, closePreferences]);
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Wordmark />
          <p>
            Understand the incident.
            <br />
            Control what happens next.
          </p>
          <span className="footer-footnote">
            Questions? Email the team or request a demo.
          </span>
        </div>
        <div className="footer-groups-desktop">
          {footerGroups.map(group => (
            <div className="footer-group" key={group.title}>
              <h2>{group.title}</h2>
              {group.links.map(item => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-groups-mobile">
          {footerGroups.map(group => (
            <details className="footer-group-accordion" key={group.title}>
              <summary>
                {group.title}
                <span aria-hidden="true">＋</span>
              </summary>
              <div>
                {group.links.map(item => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© Relyxus</span>
        <span className="footer-bottom-links">
          <Link href="/security">Security</Link>
          <Link href="/accessibility">Accessibility</Link>
          <button
            ref={preferenceTrigger}
            type="button"
            onClick={() => setPreferencesOpen(true)}
          >
            Cookie preferences
          </button>
        </span>
        <span className="footer-region">
          Built for teams that keep people in the loop.
        </span>
      </div>
      {preferencesOpen && (
        <div
          className="dialog-scrim"
          onMouseDown={event => {
            if (event.target === event.currentTarget) closePreferences();
          }}
        >
          <section
            className="dialog-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="preferences-title"
            aria-describedby="preferences-description"
            ref={preferenceDialog}
          >
            <button
              ref={preferenceClose}
              type="button"
              className="dialog-close"
              aria-label="Close preferences"
              onClick={closePreferences}
            >
              <X size={20} />
            </button>
            <p className="eyebrow">SITE PREFERENCES</p>
            <h2 id="preferences-title">A note on cookies</h2>
            <p id="preferences-description">
              This site does not load analytics or marketing cookies today.
              There is nothing optional to accept here. If tracking is added
              later, consent controls will appear in this dialog.
            </p>
            <button
              type="button"
              className="button button-primary"
              onClick={closePreferences}
            >
              Close
            </button>
          </section>
        </div>
      )}
    </footer>
  );
}

export function PublicLayout({
  children,
  tone = "ivory",
}: {
  children: React.ReactNode;
  tone?: "ivory" | "white";
}) {
  const [location] = useLocation();
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (window.location.hash) {
        let target: HTMLElement | null = null;
        try {
          target = document.getElementById(
            decodeURIComponent(window.location.hash.slice(1))
          );
        } catch {
          target = null;
        }
        target?.scrollIntoView({ block: "start", behavior: "auto" });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location]);
  return (
    <div className={`public-site page-tone-${tone}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  summary,
  tone = "ivory",
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  tone?: "ivory" | "blue" | "ink";
  children?: React.ReactNode;
}) {
  return (
    <section className={`page-hero page-hero-${tone}`}>
      <div className="container page-hero-inner">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero-summary">{summary}</p>
        {children && <div className="page-hero-actions">{children}</div>}
      </div>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  summary,
  light = false,
}: {
  eyebrow: string;
  title: string;
  summary?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-title ${light ? "section-title-light" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {summary && <p>{summary}</p>}
    </div>
  );
}

export function PrimaryLink({
  href,
  children,
  secondary = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-secondary" : "button-primary"} ${className}`}
    >
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </Link>
  );
}

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="text-link">
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
    </Link>
  );
}

export function InlineAvailability({
  children = "Confirm during evaluation",
}: {
  children?: React.ReactNode;
}) {
  return (
    <span className="availability-note">
      <span className="availability-dot" aria-hidden="true" />
      {children}
    </span>
  );
}

export function ActionBand({
  title = "See how Relyxus would fit your team.",
  summary = "Walk through an incident, discuss deployment requirements and agree what a useful evaluation would measure.",
  href = "/demo",
  label = "Request a demo",
}: {
  title?: string;
  summary?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="action-band">
      <div className="container action-band-inner">
        <div>
          <p className="eyebrow">A CLEAR NEXT STEP</p>
          <h2>{title}</h2>
          <p>{summary}</p>
        </div>
        <div className="action-band-actions">
          <PrimaryLink href={href}>{label}</PrimaryLink>
          <Link href="/deployment" className="action-quiet">
            Review deployment options{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PageIntro({
  eyebrow,
  title,
  summary,
  tone = "ivory",
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  tone?: "ivory" | "blue" | "ink";
  children?: React.ReactNode;
}) {
  return (
    <PageHero eyebrow={eyebrow} title={title} summary={summary} tone={tone}>
      {children}
    </PageHero>
  );
}
