import { Link, useLocation } from "wouter";
import { LayoutDashboard, ShieldCheck, Radio } from "lucide-react";

const items = [
  {
    href: "/product#war-room",
    label: "War Room",
    icon: Radio,
  },
  {
    href: "/product#approvals",
    label: "Approvals",
    icon: ShieldCheck,
  },
  {
    href: "/product#command-centre",
    label: "Command Centre",
    icon: LayoutDashboard,
  },
] as const;

const productPaths = ["/product", "/solutions/", "/pilot"];

/** Under the header on product-facing pages: War Room · Approvals · Command Centre. */
export function ProductBar() {
  const [location] = useLocation();
  const show = productPaths.some(
    path => location === path || location.startsWith(path)
  );
  if (!show) return null;

  return (
    <div className="product-bar on-canvas" aria-label="Product modules">
      <div className="container product-bar-inner">
        {items.map(item => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="product-bar-link">
              <span className="product-bar-icon" aria-hidden="true">
                <Icon size={16} />
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
