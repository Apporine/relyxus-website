# Designs waiting for approval

These are the designs for every inner page of the Relyxus website. They are not part of the live site: Astro only builds what is in `src/`, so nothing here is published.

- `figma/` holds one Figma importable SVG per page. Each SVG has a picture layer per section and a separate layer of live text. Install Bricolage Grotesque, Geist and IBM Plex Sans in Figma first, then drag the SVG onto the canvas.
- `site/` holds the source of each page design. Once a page is approved, move it into `src/pages/` (plus `site/components/Nav.astro`, `site/layouts/Page.astro` and `site/styles/kit.css` the first time) and it goes live with the next merge into main.

The open decisions for these pages are listed in the "Relyxus website page plan" doc, under "Designs delivered".
