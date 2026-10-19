import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Menu, X } from "lucide-react";
import { companyDetails, nav, type NavEntry } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";

export function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="wordmark" onClick={onClick}>
      <img
        src="/logo.svg"
        alt=""
        width={28}
        height={28}
        className="wordmark-mark"
        decoding="async"
      />
      <span className="wordmark-text">
        rely<span className="wordmark-accent">x</span>us
      </span>
      <span className="sr-only"> home</span>
    </Link>
  );
}

function Dropdown({
  entry,
  open,
  onToggle,
  onNavigate,
}: {
  entry: NavEntry;
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const id = `nav-${entry.label.toLowerCase()}`;
  return (
    <li className="nav-item">
      <button
        type="button"
        className="nav-link"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
      >
        {entry.label}
        <ChevronDown size={16} aria-hidden="true" className="nav-chevron" />
      </button>
      <div className="nav-panel" id={id} hidden={!open}>
        <p className="nav-panel-title">{entry.label}</p>
        <ul>
          {entry.items?.map(item => (
            <li key={item.href}>
              <Link href={item.href} onClick={onNavigate}>
                <strong>{item.label}</strong>
                {item.description && <span>{item.description}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function DesktopNav() {
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(null);
      ref.current
        ?.querySelector<HTMLButtonElement>(
          `[aria-controls="nav-${open.toLowerCase()}"]`
        )
        ?.focus();
    };
    // Use click (not pointerdown) so dropdown links navigate before the panel
    // unmounts — pointerdown-outside was racing the Link click.
    const onDocClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onDocClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onDocClick);
    };
  }, [open]);

  return (
    <nav className="nav-desktop" aria-label="Main" ref={ref}>
      <ul>
        {nav.map(entry =>
          entry.items ? (
            <Dropdown
              key={entry.label}
              entry={entry}
              open={open === entry.label}
              onToggle={() =>
                setOpen(current =>
                  current === entry.label ? null : entry.label
                )
              }
              onNavigate={() => setOpen(null)}
            />
          ) : (
            <li key={entry.label} className="nav-item">
              <Link href={entry.href!} className="nav-link">
                {entry.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panel.current?.querySelector<HTMLElement>("button")?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panel.current) return;
      const focusable = panel.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])"
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="nav-mobile"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      ref={panel}
    >
      <div className="nav-mobile-top">
        <Wordmark onClick={onClose} />
        <button
          type="button"
          className="icon-btn"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={24} aria-hidden="true" />
        </button>
      </div>
      <ul className="nav-mobile-list">
        {nav.map(entry => (
          <li key={entry.label}>
            {entry.items ? (
              <>
                <p className="nav-mobile-group">{entry.label}</p>
                <ul>
                  {entry.items.map(item => (
                    <li key={item.href}>
                      <Link href={item.href} onClick={onClose}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link
                href={entry.href!}
                onClick={onClose}
                className="nav-mobile-top-link"
              >
                {entry.label}
              </Link>
            )}
          </li>
        ))}
        <li>
          <Link
            href="/contact"
            onClick={onClose}
            className="nav-mobile-top-link"
          >
            Contact
          </Link>
        </li>
      </ul>
      <ButtonLink href="/demo" onClick={onClose} className="nav-mobile-cta">
        Talk to sales
      </ButtonLink>
    </div>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    requestAnimationFrame(() => trigger.current?.focus());
  }, []);

  return (
    <header
      className={`site-header on-canvas ${scrolled ? "is-scrolled" : ""}`}
    >
      <div className="container header-inner">
        <Wordmark />
        <DesktopNav />
        <div className="header-actions">
          <Link href="/contact" className="nav-link nav-utility">
            Contact
          </Link>
          {companyDetails.loginUrl ? (
            <a href={companyDetails.loginUrl} className="nav-link nav-utility">
              Log in
            </a>
          ) : null}
          <ButtonLink href="/demo" variant="ghost" className="header-cta">
            Talk to sales
          </ButtonLink>
          <button
            ref={trigger}
            type="button"
            className="icon-btn nav-toggle"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>
      </div>
      {menuOpen && <MobileMenu onClose={closeMenu} />}
    </header>
  );
}
