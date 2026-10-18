import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "wouter";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import {
  assurance,
  companyDetails,
  founderNote,
  founders,
  navGroups,
  pilotResult,
  pricingTerms,
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
import { prefersLessMotion } from "@/lib/motion";
import { useSmoothScroll } from "@/lib/smoothScroll";
import { Readout } from "@/components/marketing/Readout";
import { MiniStage } from "@/components/marketing/MiniStage";
import { Accent } from "@/components/marketing/Headline";
import { CtaPanel } from "@/components/home/Resolved";

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
    upsertMeta("name", "theme-color", "#120A18");
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
    <Link href="/" className="wordmark" onClick={onClick}>
      {/* Read as "Relyxus", not the split letters, which stay aria-hidden. */}
      <span className="sr-only">Relyxus</span>
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

function PopoverLink({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  return (
    <Link href={item.href} className="nav-popover-link" onClick={onNavigate}>
      <span>
        <strong>{item.label}</strong>
        {item.description && <small>{item.description}</small>}
      </span>
      <ArrowUpRight size={15} aria-hidden="true" />
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
              <div
                className={`nav-popover ${group.orbit ? "nav-popover-orbit" : ""}`}
                id={id}
                hidden={!isOpen}
              >
                <div className="nav-popover-head">
                  <span>Explore {group.label.toLowerCase()}</span>
                  <span className="nav-index">
                    RELYXUS / {group.label.toUpperCase()}
                  </span>
                </div>
                {group.orbit ? (
                  <div className="nav-orbit">
                    <span className="nav-orbit-ring" aria-hidden="true">
                      <span />
                    </span>
                    {group.items.map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`nav-orbit-link nav-orbit-${index}`}
                        onClick={handleNavigate}
                      >
                        <strong>{item.label}</strong>
                        {item.description && <small>{item.description}</small>}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="nav-popover-links">
                    {group.items.map(item => (
                      <PopoverLink
                        key={item.href}
                        item={item}
                        onNavigate={handleNavigate}
                      />
                    ))}
                  </div>
                )}
                {group.note && (
                  <a
                    className="nav-popover-note rx-apporine"
                    href={APPORINE_URL}
                    rel="noreferrer"
                  >
                    {group.note}
                  </a>
                )}
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
          Book a 30 minute demo <ArrowRight size={16} aria-hidden="true" />
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
            Book a 30 minute demo <ArrowRight size={15} aria-hidden="true" />
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

/** Footer columns follow the main navigation, so the two never drift apart. */
const footerColumns = navGroups.map(group => ({
  label: group.label,
  items: [...group.items],
}));

/** Contact links that render only once they exist. */
const companyLinks = [
  companyDetails.linkedin && {
    label: "LinkedIn",
    href: companyDetails.linkedin,
  },
  companyDetails.securityEmail && {
    label: "Security contact",
    href: `mailto:${companyDetails.securityEmail}`,
  },
  companyDetails.statusUrl && {
    label: "Status page",
    href: companyDetails.statusUrl,
  },
].filter((link): link is { label: string; href: string } => Boolean(link));

export const APPORINE_URL = "https://apporine.com";

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
        <div className="footer-top">
          <div className="footer-brand">
            <Wordmark />
            <a className="rx-apporine" href={APPORINE_URL} rel="noreferrer">
              An Apporine product
            </a>
          </div>
          <nav className="footer-columns" aria-label="Footer">
            {footerColumns.map(column => (
              <div key={column.label}>
                <p className="footer-column-label">{column.label}</p>
                <ul>
                  {column.items.map(item => (
                    <li key={item.href}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                  {column.label === "Company" &&
                    companyLinks.map(item => (
                      <li key={item.href}>
                        <a href={item.href} rel="noreferrer">
                          {item.label}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
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
  useSmoothScroll();
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
      <Readout />
    </div>
  );
}

/** Inner page hero: the mini stage, with the signal core beside the headline. */
export function PageHero({
  eyebrow,
  title,
  summary,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  children?: React.ReactNode;
}) {
  return (
    <MiniStage eyebrow={eyebrow} title={title} lede={summary} status={eyebrow}>
      {children}
    </MiniStage>
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

/** "72 hours" counts up from 0 to 72 once it scrolls into view. */
function ClockValue({ value }: { value: string }) {
  const match = value.match(/^(\d+)\s*(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(target);

  useEffect(() => {
    const node = ref.current;
    if (!match || !node || prefersLessMotion()) return;
    if (!("IntersectionObserver" in window)) return;
    setShown(0);
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / 1200);
        setShown(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  if (!match) return <span className="rx-clock-num">{value}</span>;
  return (
    <>
      <span className="rx-clock-num" ref={ref} aria-hidden="true">
        {shown}
      </span>
      <span className="rx-clock-unit" aria-hidden="true">
        {match[2]}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}

export function DataBand({
  title,
  items,
  sources,
  note = "",
  footnote,
  ground = "ink",
  stamp,
}: {
  title: React.ReactNode;
  items: readonly DataPoint[];
  sources: readonly DataSource[];
  note?: string;
  footnote?: string;
  ground?: "ink" | "ivory";
  stamp?: string;
}) {
  return (
    <section
      className={`hx-band rx-${ground}`}
      aria-labelledby="hx-band-title"
      data-readout={stamp ? "" : undefined}
      data-readout-clock={stamp}
    >
      <div className="container">
        <h2 className="hx-band-title" id="hx-band-title">
          {typeof title === "string" ? <Accent text={title} /> : title}
        </h2>
        <dl className="hx-facts">
          {items.map(clock => (
            <div key={clock.value}>
              <dt>
                <ClockValue value={clock.value} />
              </dt>
              <dd>{clock.label}</dd>
            </div>
          ))}
        </dl>
        {footnote && <p className="hx-band-foot">{footnote}</p>}
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

export function FounderNote({
  ground = "ink",
  stamp,
}: {
  ground?: "ink" | "ivory";
  stamp?: string;
}) {
  return (
    <section
      className={`hx-section rx-${ground}`}
      data-readout={stamp ? "" : undefined}
      data-readout-clock={stamp}
    >
      <div className="container">
        <div className="hx-note">
          <h2 className="hx-h2">
            <Accent text={founderNote.heading} />
          </h2>
          <div className="hx-note-body">
            {founderNote.paragraphs.map(text => (
              <p key={text}>{text}</p>
            ))}
            <p className="hx-note-sign">
              {founderNote.name ? `${founderNote.name}, ` : ""}
              {founderNote.signature}
            </p>
          </div>
        </div>
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

export function FoundersGrid({
  ground = "ivory",
}: {
  ground?: "ink" | "ivory";
}) {
  if (!founders.length) return null;
  return (
    <section className={`hx-section rx-founders rx-${ground}`}>
      <div className="container">
        <h2 className="hx-h2">
          <Accent text="The people *building Relyxus.*" />
        </h2>
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

/** The call to action at the foot of a page, as the shared ink panel. */
export function ActionBand({
  title = "See how Relyxus *would fit your team.*",
  summary = "Walk through an incident together and see what it would mean for your team.",
  href = "/demo",
  label = "Book a 30 minute demo",
}: {
  title?: string;
  summary?: string;
  href?: string;
  label?: string;
}) {
  return (
    <CtaPanel title={title} line={summary} cta={{ label, href }} place="page" />
  );
}

/** Kept for the pages that still call it by this name. */
export const PageIntro = PageHero;

/** How pricing works: annual licence, pilot credited, no per seat fees. */
export function PricingBlock({
  ground = "ivory",
}: {
  ground?: "ink" | "ivory";
}) {
  return (
    <section
      className={`rx-pricing rx-${ground}`}
      aria-labelledby="rx-pricing-title"
    >
      <div className="container">
        <span className="rx-eyebrow">Pricing</span>
        <h2 id="rx-pricing-title" className="hx-h2">
          <Accent text="How *pricing works.*" />
        </h2>
        <ul className="rx-pricing-terms">
          {pricingTerms.map(term => (
            <li key={term.title}>
              <h3>{term.title}</h3>
              <p>{term.text}</p>
            </li>
          ))}
        </ul>
        <TextLink href="/demo?type=Pricing">Ask for a proposal</TextLink>
      </div>
    </section>
  );
}

/** A real pilot result. Renders nothing until one is filled in. */
export function PilotResult() {
  if (!pilotResult) return null;
  return (
    <figure className="rx-pilot-result">
      <strong>{pilotResult.value}</strong>
      <figcaption>
        {pilotResult.label}
        <span>{pilotResult.attribution}</span>
      </figcaption>
    </figure>
  );
}
