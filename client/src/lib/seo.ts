export const SITE_NAME = "Relyxus";
export const DEFAULT_DESCRIPTION =
  "Relyxus helps regulated teams investigate incidents with evidence in one place and keep proposed actions behind policy and human approval.";
export const DEFAULT_KEYWORDS = [
  "Relyxus",
  "incident response",
  "AI incident response",
  "governed automation",
  "SRE",
  "security operations",
  "regulated industries",
  "deployment boundaries",
].join(", ");

export const STATIC_ROUTES = [
  "/",
  "/product",
  "/product/investigation",
  "/product/governed-actions",
  "/product/reporting",
  "/deployment",
  "/security",
  "/integrations",
  "/solutions/financial-services",
  "/replay",
  "/pricing",
  "/demo",
  "/resources",
  "/resources/governed-incident-response",
  "/resources/deployment-choices",
  "/resources/replay-methodology",
  "/company",
  "/contact",
  "/privacy",
  "/terms",
  "/accessibility",
] as const;

export function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
  return element;
}

export function upsertLink(rel: string, href: string) {
  let element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
  return element;
}

export function upsertJsonLd(id: string, data: Record<string, unknown>) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}
