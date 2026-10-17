# Relyxus — Incident Response, With Control

Public marketing website for **Relyxus**, built and maintained by **Apporine**.

Relyxus helps regulated teams investigate incidents with evidence in one place and keep proposed actions behind policy and human approval.

This repository ships:

- A Vite + React marketing site (primary Vercel deployment target)
- Optional Express / tRPC / Drizzle backend (full-stack local mode)
- A contact / demo enquiry API that emails the Apporine team

**Default branch:** `main` (stub)  
**Active development branch:** `develop` (full codebase)

---

## Table of contents

1. [Quick start](#quick-start)
2. [Repository layout](#repository-layout)
3. [Architecture overview](#architecture-overview)
4. [Local development flows](#local-development-flows)
5. [Enquiry / contact email flow](#enquiry--contact-email-flow)
6. [Vercel deployment flow](#vercel-deployment-flow)
7. [Routing map](#routing-map)
8. [Scripts](#scripts)
9. [Environment variables](#environment-variables)
10. [Quality checks](#quality-checks)
11. [Git workflow](#git-workflow)
12. [Tech stack](#tech-stack)

---

## Quick start

**Requirements**

- Node.js `22.x` (see `.nvmrc`)
- pnpm `10.18.0` (via `packageManager` field)

```bash
pnpm install

# Marketing site only (recommended for UI work)
pnpm dev:static

# Full Express + Vite app
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Production-style static build:

```bash
pnpm build:static
pnpm preview
```

---

## Repository layout

```text
relyxus-website/
├── api/                  # Vercel serverless functions (contact email)
├── client/               # Vite React app (marketing site)
│   ├── public/           # Static assets, robots.txt, sitemap.xml, OG cover
│   └── src/
│       ├── components/   # UI kit + marketing shell
│       ├── content/      # Nav, product copy, resources, deployment modes
│       ├── pages/        # Route-level pages
│       └── lib/          # Helpers (SEO, utils, tRPC client)
├── server/               # Express app, tRPC, contact route, tests
├── shared/               # Shared contracts (contact validation, constants)
├── drizzle/              # Schema + SQL migrations (optional DB path)
├── vercel.json           # Static output + SPA rewrites + API function
├── vite.config.ts        # Vite + local /api/contact middleware
└── package.json
```

---

## Architecture overview

High-level system shape for the marketing site on Vercel, with the optional Express path for local full-stack work.

```mermaid
flowchart TB
  subgraph Visitors
    U[Browser visitor]
  end

  subgraph Vercel["Vercel (production)"]
    CDN[Static assets<br/>dist/public]
    SPA[SPA rewrite → index.html]
    FN["Serverless function<br/>/api/contact"]
  end

  subgraph Local["Local development"]
    VITE[Vite dev server<br/>pnpm dev:static]
    EXP[Express + Vite<br/>pnpm dev]
  end

  subgraph Delivery["Email delivery"]
    RESEND[Resend API<br/>preferred]
    FORMSUBMIT[FormSubmit<br/>fallback]
    INBOX1[aoon.syed@apporine.com]
    INBOX2[bisma.idrees@apporine.com]
  end

  U --> CDN
  U --> SPA
  U -->|POST enquiry| FN
  U -.-> VITE
  U -.-> EXP

  FN --> RESEND
  FN --> FORMSUBMIT
  VITE -->|same contact logic| RESEND
  VITE --> FORMSUBMIT
  EXP -->|POST /api/contact| RESEND
  EXP --> FORMSUBMIT

  RESEND --> INBOX1
  RESEND --> INBOX2
  FORMSUBMIT --> INBOX1
  FORMSUBMIT --> INBOX2
```

### Frontend composition

```mermaid
flowchart LR
  A[client/index.html] --> B[main.tsx]
  B --> C[App.tsx routes]
  C --> D[PublicLayout]
  D --> E[SiteHeader / SiteFooter]
  D --> F[Page components]
  F --> G[PageMeta SEO]
  F --> H[content/site.ts]
  F --> I[Demo / Contact forms]
  I --> J[POST /api/contact]
```

---

## Local development flows

### Option A — Static marketing site (matches Vercel)

```mermaid
sequenceDiagram
  participant Dev as Developer
  participant Vite as Vite (dev:static)
  participant MW as Vite contact middleware
  participant Mail as Resend / FormSubmit

  Dev->>Vite: pnpm dev:static
  Dev->>Vite: Browse pages on :3000
  Dev->>Vite: Submit /demo form
  Vite->>MW: POST /api/contact
  MW->>Mail: deliverContactEmail()
  Mail-->>MW: ok / error
  MW-->>Dev: JSON success or error
```

Use this when working on marketing pages, SEO, layout, and the enquiry form.

### Option B — Full Express stack

```mermaid
sequenceDiagram
  participant Dev as Developer
  participant Exp as Express server
  participant Vite as Vite middleware (dev)
  participant TRPC as tRPC /api/trpc
  participant Contact as /api/contact
  participant DB as MySQL via Drizzle<br/>(optional)

  Dev->>Exp: pnpm dev
  Exp->>Vite: Serve app in development
  Dev->>TRPC: Optional auth / platform APIs
  Dev->>Contact: Enquiry submit
  Contact-->>Dev: Email delivery result
  Exp -.-> DB: Only when DATABASE_URL is set
```

Use this when extending server routers, auth, storage, or database behaviour.

---

## Enquiry / contact email flow

The demo form (`/demo`) and contact page (`/contact`) are live. Submissions are emailed to:

- `aoon.syed@apporine.com`
- `bisma.idrees@apporine.com`

Both addresses are also shown as `mailto:` links on `/contact`.

```mermaid
flowchart TD
  A[Visitor opens /demo or /contact] --> B[Fill enquiry form]
  B --> C{Client validation}
  C -->|Invalid| D[Inline errors + error summary]
  C -->|Valid| E[POST /api/contact]
  E --> F[shared/contact.ts<br/>validateContactPayload]
  F -->|Invalid| G[400 + field errors]
  F -->|Valid| H{RESEND_API_KEY set?}
  H -->|Yes| I[Send via Resend<br/>to both inboxes]
  H -->|No| J[Send via FormSubmit<br/>primary + CC]
  I --> K{Provider OK?}
  J --> K
  K -->|Yes| L[200 ok<br/>Success message in UI]
  K -->|No| M[502/500<br/>Show error + mailto fallback]
```

### Implementation map

| Layer                        | Path                                  | Role                                              |
| ---------------------------- | ------------------------------------- | ------------------------------------------------- |
| Shared validation + delivery | `shared/contact.ts`                   | Payload rules, email body, Resend/FormSubmit send |
| Vercel function              | `api/contact.ts`                      | Production `POST /api/contact`                    |
| Express route                | `server/contact.ts`                   | Local full-stack `POST /api/contact`              |
| Vite middleware              | `vite.config.ts`                      | Local static-dev `POST /api/contact`              |
| Form UI                      | `client/src/pages/Demo.tsx`           | Validation, submit, success/error states          |
| Contact page                 | `client/src/pages/MarketingPages.tsx` | Routing cards + mailto list                       |

### First-time FormSubmit note

If `RESEND_API_KEY` is not set, the first FormSubmit delivery may send an activation email to `aoon.syed@apporine.com`. Confirm that email once so later enquiries flow normally.

---

## Vercel deployment flow

Configured in `vercel.json`:

- **Install:** `pnpm install`
- **Build:** `pnpm build:static`
- **Output:** `dist/public`
- **SPA rewrite:** all non-`/api/*` routes → `index.html`
- **Function:** `api/contact.ts`

```mermaid
flowchart LR
  A[Push / merge to GitHub] --> B[Vercel build]
  B --> C[pnpm install]
  C --> D[pnpm build:static]
  D --> E[Vite → dist/public]
  E --> F[Publish static site]
  F --> G[Register /api/contact function]
  G --> H[Live site]

  subgraph Runtime
    H --> I[Static pages + assets]
    H --> J[SPA deep links]
    H --> K[Enquiry API]
  end
```

### Recommended Vercel env vars

| Variable             | Required    | Purpose                                                     |
| -------------------- | ----------- | ----------------------------------------------------------- |
| `RESEND_API_KEY`     | Recommended | Preferred transactional email provider                      |
| `CONTACT_FROM_EMAIL` | Optional    | Verified sender, e.g. `Relyxus Website <hello@your-domain>` |

Without Resend, FormSubmit fallback is used (see note above).

Deploy from the **`develop`** branch (or connect Vercel to `develop`) so production tracks the full codebase. `main` remains the repository default but only holds the initial stub README unless you promote releases deliberately.

---

## Routing map

Client routes live in `client/src/App.tsx` and are mirrored in `client/public/manus-routes.json`.

```mermaid
flowchart TD
  Home["/"] --> Product["/product"]
  Home --> Demo["/demo"]
  Home --> Deploy["/deployment"]

  Product --> Inv["/product/investigation"]
  Product --> Gov["/product/governed-actions"]
  Product --> Rep["/product/reporting"]
  Product --> Sec["/security"]
  Product --> Int["/integrations"]

  Int --> IntDetail["/integrations/:slug"]

  Deploy --> Replay["/replay"]
  Deploy --> Pricing["/pricing"]

  Home --> Resources["/resources"]
  Resources --> Article["/resources/:slug"]

  Home --> Company["/company"]
  Company --> Contact["/contact"]
  Company --> Privacy["/privacy"]
  Company --> Terms["/terms"]
  Company --> A11y["/accessibility"]

  Demo --> API["POST /api/contact"]
  Contact --> Demo
  Contact --> Mail["mailto: Apporine inboxes"]
```

SEO helpers:

- Per-page meta / Open Graph / Twitter / JSON-LD via `PageMeta`
- `client/public/robots.txt`
- `client/public/sitemap.xml`
- Social image: `client/public/og-cover.svg`

---

## Scripts

| Command             | Description                                      |
| ------------------- | ------------------------------------------------ |
| `pnpm dev:static`   | Vite marketing site on port `3000`               |
| `pnpm dev`          | Express + Vite full stack                        |
| `pnpm build:static` | Production static build → `dist/public` (Vercel) |
| `pnpm build`        | Static build + bundled Express server → `dist/`  |
| `pnpm start`        | Run bundled Express server (`dist/index.js`)     |
| `pnpm preview`      | Preview static production build                  |
| `pnpm check`        | TypeScript (`tsc --noEmit`)                      |
| `pnpm test`         | Vitest unit tests                                |
| `pnpm format`       | Prettier write                                   |
| `pnpm db:migrate`   | Apply Drizzle migrations                         |
| `pnpm db:push`      | Generate + migrate schema changes                |

---

## Environment variables

See `.env.example`.

| Variable               | Used by                   | Notes                                        |
| ---------------------- | ------------------------- | -------------------------------------------- |
| `RESEND_API_KEY`       | Contact delivery          | Preferred path for production email          |
| `CONTACT_FROM_EMAIL`   | Contact delivery          | Must be allowed/verified by Resend           |
| `PORT`                 | Express                   | Defaults to `3000`                           |
| `DATABASE_URL`         | Drizzle / server          | Optional; unused for static marketing deploy |
| `MANUS_*` / OAuth vars | Platform template helpers | Only needed for full platform/auth features  |

Never commit real secrets. Configure production values in the Vercel project settings.

---

## Quality checks

Automated gates keep `develop` deployable:

| Gate               | When                   | What runs                                                         |
| ------------------ | ---------------------- | ----------------------------------------------------------------- |
| Husky `pre-commit` | Every local commit     | `lint-staged` (Prettier) → `pnpm check` → `pnpm test`             |
| Husky `pre-push`   | Every local push       | `pnpm build:static`                                               |
| GitHub Actions CI  | Push / PR to `develop` | format check, typecheck, tests, static build, output verification |

Before opening a PR (or run the same suite CI uses):

```bash
pnpm ci
```

Contact smoke check (with local static server running):

1. Open `/demo`
2. Submit a valid enquiry
3. Confirm success UI
4. Confirm inbox delivery (or FormSubmit activation on first use)
5. Confirm `/contact` mailto links open correctly

---

## Git workflow

```mermaid
gitGraph
  commit id: "main stub"
  branch develop
  commit id: "initial codebase"
  branch feat_contact
  commit id: "contact email"
  checkout develop
  merge feat_contact
  branch feat_seo
  commit id: "seo + robots"
  checkout develop
  merge feat_seo
  branch docs_readme
  commit id: "readme diagrams"
  checkout develop
  merge docs_readme
```

Practical rules used in this repo:

1. Keep **`main`** as the GitHub default branch.
2. Land product work on **`develop`** via PRs.
3. Prefer small, reviewable PRs (feature / fix / content / docs).
4. Do not push application code only to `main` unless promoting a release.

---

## Tech stack

| Area           | Choice                                                     |
| -------------- | ---------------------------------------------------------- |
| UI             | React 19, Wouter, Tailwind CSS 4, Radix UI, Framer Motion  |
| Build          | Vite 7, TypeScript 5.9, pnpm                               |
| API (optional) | Express, tRPC, Drizzle ORM, MySQL                          |
| Contact        | Shared validator + Resend / FormSubmit                     |
| Hosting        | Vercel static output + serverless `/api/contact`           |
| SEO            | Meta tags, canonical, OG/Twitter, JSON-LD, robots, sitemap |

---

## Product note

Marketing pages intentionally avoid invented certifications, customer logos, prices, or regulatory outcomes. Where availability depends on a customer environment or release, the site points visitors to an evaluation conversation instead of over-claiming.

For enquiry follow-up, contact:

- `aoon.syed@apporine.com`
- `bisma.idrees@apporine.com`
