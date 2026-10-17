# Relyxus website — implementation plan

## Scope and source authority

Build the complete public marketing and evaluation website described in the supplied Cursor prompt and website specification, preserving the supplied product UI semantics. The site is not the operational Relyxus application. The user's latest direction rejects the initial Ivory-and-blue treatment: a more kinetic, high-energy visual system now supersedes the earlier dark-hero recommendation and the first implementation. The archive does not contain the referenced *Relyxus Master Product Specification v2.3*; therefore release availability, supported integrations, certification, customer proof, commercial terms, legal/privacy text, and operational destinations will not be invented. Release-dependent architecture is presented as documented intent with availability requiring product confirmation. No backend, lead endpoint, analytics, or third-party service is configured; the enquiry flow will clearly remain a local preview and will never claim delivery.

## Five design principles

1. **Make the proposition immediate:** category, value, primary action and safety boundary are visible before the visitor needs to scroll or wait.
2. **Turn evidence into a readable story:** source fragments converge into a plausible explanation, with uncertainty and alternatives kept visible.
3. **Stop at human authority:** investigation, proposed action, approval and verified outcome remain separate and visibly labelled.
4. **Earn trust with specifics, not badges:** explain boundaries, limitations and evaluation methods; omit unverified proof.
5. **Compose for the reader at every size:** editorial variation on desktop, ordered and touch-friendly disclosure on mobile, and keyboard/reduced-motion parity everywhere.

## Design direction

- **Movement:** kinetic signal-noir editorial, translated into Relyxus's own evidence-to-human-gate language. Borrow only broad visual lessons from the references—oversized editorial type and a product stage, saturated energy and dark contrast, and full-bleed motion—not their identities, assets, copy, or distinctive layouts.
- **Core principles:** high-contrast hierarchy; purposeful, semantically encoded color; evidence that visibly moves and resolves into a human decision; motion that never hides essential content.
- **Colour philosophy:** use deep graphite and midnight as the stage, with bright fog-white text and smoked indigo surfaces. Seafoam `#69F0CB` represents human-controlled interaction and the primary action; signal cyan `#59D5FF` traces evidence; violet `#BD9BFF` labels AI-authored hypotheses; coral `#FF826D` marks fictional incidents. Color signals meaning, not decoration. Avoid the default beige-and-corporate-blue treatment and unstructured rainbow gradients.
- **Layout paradigm:** an asymmetrical, full-bleed dark hero with oversized condensed-feeling typography and a kinetic incident visualization; alternate dark editorial surfaces with a small number of high-energy color fields. Use long rule lines, large sequence numerals and offset compositions rather than repeating rounded card grids.
- **Signature elements:** an animated evidence trace travels between incident fragments; a luminous, unmistakable approval gate stops that trace; a quiet AI hypothesis halo remains visually distinct from verified evidence.
- **Interaction philosophy:** every transition clarifies the selected step. The user controls all explorers and disclosures. No carousel auto-advance, hidden scroll-jacking, or motion-dependent information; menus, forms and controls remain keyboard, touch and assistive-technology accessible.
- **Animation:** a short staggered hero entrance; slow, low-amplitude evidence-path and beacon pulses; source lines draw toward the hypothesis and stop at the human gate; compact panel fades on manually chosen steps; restrained hover lift/glow and menu transitions. Keep critical copy visible from first paint, do not auto-cycle content, and disable nonessential movement and scroll-linked reveals under `prefers-reduced-motion`.
- **Typography:** use a bold, tight, large-scale system-sans headline with narrow tracking and a condensed fallback where available; keep body, controls, labels and real copy highly legible with local/system fallbacks. No external font request or rasterised marketing text.
- **Brand essence:** governed incident response that helps regulated teams understand evidence before deciding what happens next; **candid, precise, kinetic**.
- **Brand voice:** direct, exact, human, and explicit about uncertainty. Example lines: “See the evidence behind this suggestion.” “The action is waiting for the approval your policy requires.”
- **Wordmark/logo:** retain the original Relyxus name and create a distinctive evidence-line/gate mark, recolored for the new dark field; do not use a reference brand's emblem or imply an approved corporate lockup.
- **Signature brand colour:** Signal Seafoam `#69F0CB`, used for interactive focus and human-controlled calls to action.

### Reference observations (visual inspiration only)

- [New Relic](https://newrelic.com/) pairs oversized condensed headline typography with a contrasting product stage, dark navigation, and bright calls to action.
- [Dynatrace](https://www.dynatrace.com/) uses a saturated electric hero and strong shifts between dark sections to make technical storytelling feel energetic.
- [Systems Limited](https://www.systemsltd.com/) opens with a full-bleed dark media stage, very large white copy, and manual directional controls.
- Translate only the rhythm, scale, contrast and sense of movement into original Relyxus visuals. Do not copy their copy, logos, art, or recognizable compositions; these references provide no evidence about Relyxus product claims.

## Implementation approach

Use the initialized React 19 + TypeScript + Vite + Wouter starter and existing dependencies; use the Lucide icon set already present, not a second icon/motion framework. Keep the website static with `pnpm dev:static` / `pnpm build:static`; managed server and database stay disabled. Implement shared public header/footer, buttons, route/page templates, metadata helpers, native accessible disclosure patterns, an original signal-led hero illustration, SVG/CSS evidence and deployment diagrams, and typed editorial content records. Reserve route-level content/data from UI logic so unverified facts can be withheld or updated centrally. Build an honest client-only demo form with field validation, accessible error recovery, editable contextual enquiry type, unchecked separate marketing consent, and an explicit message that local preview mode does not send data. Do not persist sensitive form entries or claim acceptance.

## Page and interaction scope

Routes: `/`; `/product`; `/product/investigation`; `/product/governed-actions`; `/product/reporting`; `/deployment`; `/security`; `/integrations`; `/integrations/:slug` (detail template); `/solutions/financial-services`; `/replay`; `/pricing`; `/demo`; `/resources`; `/resources/:slug`; `/company`; `/contact`; `/privacy`; `/terms`; `/accessibility`; plus a genuine not-found fallback (not included as a 404-only manifest route).

Homepage: contained accessible navigation; kinetic Signal Noir hero with a purpose-built incident visualization; fictional incident context; four-step manually controlled incident walkthrough with detail disclosures, uncertainty/blocked cases and text transcript; four-outcome product explorer that becomes adjacent-content accordions on mobile; selectable four-mode deployment explorer with synchronized boundary diagram and static textual comparison; trust explanation; Replay evaluation; resource explainers; final high-impact CTA and useful footer. Motion reinforces evidence, AI authorship and the human approval gate without inventing product functionality. Additional pages provide real, distinctive explanatory content rather than dead cards. Integrations use truthful source categories and functional filters, never unverified vendor availability. Pricing has discussion-only scope factors. Deployment modes remain marked “availability to be confirmed”. Security explicitly identifies publication/assurance dependencies without invented compliance claims. Public resource articles are substantive explanations grounded in the supplied design/product UI guidance and carry appropriate review caveats where release-specific validation is required.

## Project structure

- `client/src/App.tsx` — route table, global shell and not-found fallback.
- `client/src/components/marketing/` — public header, accessible menus, footer, CTA, section primitives, evidence/deployment diagrams, explorer/walkthrough, form controls and modal/disclosure primitives.
- `client/src/content/` — typed navigation, product/deployment/integration/resource copy, release-confirmation flags and SEO metadata.
- `client/src/pages/` — homepage, product family, deployment, security, solutions, integrations/detail, Replay, pricing, demo, resources/article, company/contact and legal/accessibility templates.
- `client/src/index.css` — starter CSS foundation, reset and shared baseline.
- `client/src/marketing.css` — base Relyxus component and responsive layout styles.
- `client/src/kinetic.css` — Signal Noir palette, high-contrast page restyling, original motion system, focus/touch treatments and reduced-motion overrides.
- `client/public/manus-routes.json` — complete synchronized website page-route manifest before dev-server startup.
- `client/public/favicon.svg` and `app.config.ts` — site favicon and stable platform logo metadata.
- `plan.md`, `TODO.md` — approved design/implementation plan and independently deliverable outcomes.

## Delivery boundary

Provide and verify a working development preview. Do not publish publicly. A successful preview/checkpoint is not a publication claim. Real enquiry delivery, legal/privacy publication, approved corporate identity/legal entity, release status, connector catalogue and sign-in/support destinations remain launch dependencies until supplied and configured.


## Follow-up polish direction

The latest request fixes the shared CTA/action-band composition: align the heading and summary as one block, align the two actions intentionally, and keep the secondary arrow inline. Remove user-visible wording that describes content as fictional/mock or AI-generated/authored, along with prototype labels. Preserve truthful scope through neutral “Example”, “Illustrative” and “Hypothesis” language as needed, and retain the clear boundary that example content is not connected to customer data or production systems. Do not imply customer proof, release status or delivered form submissions.
