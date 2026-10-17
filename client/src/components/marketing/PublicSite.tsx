import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "wouter";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import {
  assurance,
  companyDetails,
  founderNote,
  founders,
  integrations,
  proofStrip,
  navGroups,
  type DataPoint,
  type DataSource,
  type NavItem,
} from "@/content/site";
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
    const fullTitle = !normalized
      ? SITE_NAME
      : normalized.toLowerCase().includes(SITE_NAME.toLowerCase())
        ? normalized
        : `${normalized} | ${SITE_NAME}`;
    const canonicalUrl = new URL(
      window.location.pathname,
      window.location.origin
    ).href;
    const imageUrl = new URL("/og-cover.png", window.location.origin).href;

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
    upsertMeta("name", "theme-color", "#01030a");
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
      <span className="wm" aria-hidden="true">
        <span>rel</span>
        <span>y</span>
        <svg className="wm-x" viewBox="0 0 14 18">
          <path className="wm-x1" d="M1.5 2.5 L12.5 15.5" />
          <path className="wm-x2" d="M12.5 2.5 L1.5 15.5" />
        </svg>
        <span>us</span>
      </span>
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
  const headerRef = useRef<HTMLElement>(null);
  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    requestAnimationFrame(() => mobileTrigger.current?.focus());
  }, []);
  const navigateMobile = useCallback(() => setMobileOpen(false), []);
  return (
    <header className="site-header" ref={headerRef}>
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
      {mobileOpen &&
        createPortal(
          <div id="mobile-menu">
            <MobileMenu onClose={closeMobile} onNavigate={navigateMobile} />
          </div>,
          // The header's backdrop blur would otherwise trap this fixed overlay.
          headerRef.current?.closest(".public-site") ?? document.body
        )}
    </header>
  );
}

const footerNav = [
  { label: "Product", href: "/product" },
  { label: "Security", href: "/security" },
  { label: "Contact", href: "/contact" },
  { label: "Request a demo", href: "/demo" },
] as const;

const footerLegal = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

/** Animations default to on. Visitors can switch them off; the choice is remembered. */
function MotionToggle() {
  const [off, setOff] = useState(false);
  useEffect(() => {
    try {
      setOff(localStorage.getItem("rx-motion") === "off");
    } catch {
      /* storage unavailable */
    }
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = off ? "off" : "on";
  }, [off]);
  return (
    <button
      type="button"
      className="motion-toggle"
      aria-pressed={off}
      onClick={() => {
        const next = !off;
        setOff(next);
        try {
          localStorage.setItem("rx-motion", next ? "off" : "on");
        } catch {
          /* storage unavailable */
        }
      }}
    >
      Animations: {off ? "off" : "on"}
    </button>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <div className="footer-row">
          <Wordmark />
          <nav className="footer-nav" aria-label="Footer">
            {footerNav.map(item => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer-row footer-legal-row">
          <nav className="footer-legal" aria-label="Legal">
            {footerLegal.map(item => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="footer-copy">
            © {new Date().getFullYear()} Apporine. All rights reserved.
            {companyDetails.registration && ` ${companyDetails.registration}.`}
            {companyDetails.location && ` ${companyDetails.location}.`}
          </p>
          {(companyDetails.email || companyDetails.linkedin) && (
            <p className="footer-contact">
              {companyDetails.email && (
                <a href={`mailto:${companyDetails.email}`}>
                  {companyDetails.email}
                </a>
              )}
              {companyDetails.linkedin && (
                <a href={companyDetails.linkedin} rel="noreferrer">
                  LinkedIn
                </a>
              )}
            </p>
          )}
          <MotionToggle />
        </div>
      </div>
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
  art,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  tone?: "ivory" | "blue" | "ink";
  art?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className={`page-hero page-hero-${tone}`}>
      <div className={`container page-hero-inner ${art ? "has-art" : ""}`}>
        <div className="page-hero-text">
          <p className="eyebrow page-hero-eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            <span>{eyebrow}</span>
          </p>
          <h1>{title}</h1>
          <p className="page-hero-summary">{summary}</p>
          {children && <div className="page-hero-actions">{children}</div>}
        </div>
        {art && <div className="page-hero-art">{art}</div>}
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

export function DataBand({
  title,
  items,
  sources,
  note = "",
}: {
  title: string;
  items: readonly DataPoint[];
  sources: readonly DataSource[];
  note?: string;
}) {
  return (
    <section className="hx-band" aria-label={title}>
      <div className="container">
        <h2 className="hx-band-title">{title}</h2>
        <dl className="hx-facts">
          {items.map(clock => (
            <div key={clock.value}>
              <dt>{clock.value}</dt>
              <dd>{clock.label}</dd>
            </div>
          ))}
        </dl>
        <p className="hx-source-line">
          Sources:{" "}
          {sources.map((source, index) => (
            <span key={source.href}>
              {index > 0 && ", "}
              <a href={source.href} target="_blank" rel="noreferrer">
                {source.label}
              </a>
            </span>
          ))}
          {note ? `. ${note}` : ""}
        </p>
      </div>
    </section>
  );
}

export function FounderNote() {
  return (
    <section className="hx-section">
      <div className="container">
        <div className="hx-note">
          <h2 className="hx-h2">{founderNote.heading}</h2>
          <div className="hx-note-body">
            {founderNote.paragraphs.map(text => (
              <p key={text}>{text}</p>
            ))}
            <p className="hx-note-sign">
              {founderNote.name ? `${founderNote.name}, ` : "— "}
              {founderNote.signature}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Logos, a pilot quote, one metric and named integrations. Renders nothing until filled. */
export function ProofStrip() {
  const { logos, quote, metric } = proofStrip;
  if (!logos.length && !quote && !metric && !integrations.length) return null;
  return (
    <section className="hx-proofstrip" aria-label="Proof">
      <div className="container">
        {metric && (
          <p className="hx-metric">
            <strong>{metric.value}</strong> {metric.label}
            <small>{metric.source}</small>
          </p>
        )}
        {quote && (
          <blockquote className="hx-quote">
            <p>{quote.text}</p>
            <footer>
              {quote.name}, {quote.role}
            </footer>
          </blockquote>
        )}
        {logos.length > 0 && (
          <ul className="hx-logos" aria-label="Customers and partners">
            {logos.map(logo => (
              <li key={logo.name}>
                {logo.src ? (
                  <img src={logo.src} alt={logo.name} loading="lazy" />
                ) : (
                  logo.name
                )}
              </li>
            ))}
          </ul>
        )}
        {integrations.length > 0 && (
          <div className="hx-integrations">
            <span>Works with</span>
            <ul>
              {integrations.map(name => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export function AssuranceList() {
  if (!assurance.length) return null;
  return (
    <ul className="hx-assurance">
      {assurance.map(item => (
        <li key={item.label}>
          <strong>{item.label}</strong>
          <span>{item.status}</span>
        </li>
      ))}
    </ul>
  );
}

export function FoundersGrid() {
  if (!founders.length) return null;
  return (
    <section className="hx-section">
      <div className="container">
        <h2 className="hx-h2">The people building Relyxus</h2>
        <ul className="hx-founders">
          {founders.map(person => (
            <li key={person.name}>
              {person.photo && (
                <img src={person.photo} alt={person.name} loading="lazy" />
              )}
              <h3>{person.name}</h3>
              <span>{person.role}</span>
              <p>{person.background}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
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
  title = "See how Relyxus would fit your team",
  summary = "Walk through an incident together and see what it would mean for your team.",
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
          <h2>{title}</h2>
          <p>{summary}</p>
        </div>
        <div className="action-band-actions">
          <PrimaryLink href={href}>{label}</PrimaryLink>
          <Link href="/security" className="action-quiet">
            Read the security summary{" "}
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
  art,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  tone?: "ivory" | "blue" | "ink";
  art?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <PageHero
      eyebrow={eyebrow}
      title={title}
      summary={summary}
      tone={tone}
      art={art}
    >
      {children}
    </PageHero>
  );
}
