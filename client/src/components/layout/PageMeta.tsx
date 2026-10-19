import { useEffect } from "react";
import { pageMeta } from "@/content/meta";
import { SITE_NAME, upsertJsonLd, upsertLink, upsertMeta } from "@/lib/seo";

/**
 * Title, description, Open Graph and canonical URL for one route. Copy comes
 * from content/pageMeta.json (also read by the prerender script) unless the
 * page passes its own, as articles and incident files do.
 */
export function PageMeta({
  route,
  title: titleOverride,
  description: descriptionOverride,
  noindex = false,
}: {
  route?: string;
  title?: string;
  description?: string;
  noindex?: boolean;
}) {
  const copy = route ? pageMeta[route] : undefined;
  const title = titleOverride ?? copy?.title ?? SITE_NAME;
  const description = descriptionOverride ?? copy?.description ?? "";

  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`;
    const canonical = new URL(window.location.pathname, window.location.origin)
      .href;
    const image = new URL("/og-cover.png", window.location.origin).href;

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta(
      "name",
      "robots",
      noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"
    );
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", image);
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);
    upsertLink("canonical", canonical);
    upsertJsonLd("relyxus-webpage-schema", {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: fullTitle,
      description,
      url: canonical,
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: window.location.origin,
      },
      publisher: { "@type": "Organization", name: "Apporine" },
    });
  }, [title, description, noindex]);

  return null;
}
