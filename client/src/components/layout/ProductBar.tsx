import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { LayoutDashboard, ShieldCheck, Radio } from "lucide-react";
import { scrollToHash } from "@/lib/scrollToHash";

const items = [
  {
    id: "war-room",
    label: "War Room",
    icon: Radio,
  },
  {
    id: "approvals",
    label: "Approvals",
    icon: ShieldCheck,
  },
  {
    id: "command-centre",
    label: "Command Centre",
    icon: LayoutDashboard,
  },
] as const;

const productPaths = ["/product", "/solutions/", "/pilot"];

function goToModule(
  id: string,
  alreadyOnProduct: boolean,
  navigate: (path: string) => void
) {
  const href = `/product#${id}`;
  if (alreadyOnProduct) {
    window.history.pushState(null, "", href);
    scrollToHash(id);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    return;
  }
  // wouter strips hashes — park the target, then land on /product
  sessionStorage.setItem("relyxus-module", id);
  navigate("/product");
}

/** Under the header on product-facing pages: War Room · Approvals · Command Centre. */
export function ProductBar() {
  const [location, navigate] = useLocation();
  const path = location.split("#")[0];
  const [hash, setHash] = useState(() =>
    typeof window !== "undefined" ? window.location.hash.slice(1) : ""
  );

  useEffect(() => {
    const sync = () => setHash(window.location.hash.slice(1));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [location]);

  // After navigating from Pilot/Solutions, scroll to the parked module.
  useEffect(() => {
    if (path !== "/product") return;
    const parked = sessionStorage.getItem("relyxus-module");
    if (!parked) return;
    sessionStorage.removeItem("relyxus-module");
    window.history.replaceState(null, "", `/product#${parked}`);
    setHash(parked);
    requestAnimationFrame(() => scrollToHash(parked, "auto"));
  }, [path]);

  const show = productPaths.some(
    base => path === base || path.startsWith(base)
  );
  if (!show) return null;

  const onProduct = path === "/product";

  return (
    <div className="product-bar on-canvas" aria-label="Product modules">
      <div className="container product-bar-inner">
        {items.map(item => {
          const Icon = item.icon;
          const href = `/product#${item.id}`;
          const isActive = onProduct && hash === item.id;
          return (
            <a
              key={item.id}
              href={href}
              className={`product-bar-link${isActive ? " is-active" : ""}`}
              aria-current={isActive ? "location" : undefined}
              onClick={event => {
                event.preventDefault();
                goToModule(item.id, onProduct, navigate);
                if (onProduct) setHash(item.id);
              }}
            >
              <span className="product-bar-icon" aria-hidden="true">
                <Icon size={16} strokeWidth={2} />
              </span>
              {item.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
