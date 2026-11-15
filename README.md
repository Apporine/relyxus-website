# relyxus-website

The Relyxus marketing website, built with Astro as a static site and deployed on Vercel.

## Run it

```
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## How it is organised

- `src/pages/index.astro` assembles the homepage from the locked sections in `src/components/home/`, in order: hero, customer marquee (hidden until real logos exist), status lights band, regulator outbox, platform bento, where your minutes went, the stakes, Ask Vigil, One night, articles spotlight and three ways in.
- `src/components/Footer.astro` is the shared footer with the interactive Resolve lines wordmark.
- `public/media/one-night/` holds the One night recordings, captured from the real Relyxus console in the demo workspace (sample data).
- `src/data/articles.ts` lists homepage articles. Set `ready: true` only once an article is written, sourced and published.
- Fonts (Bricolage Grotesque, Geist, IBM Plex Sans) and icons (Tabler) are self hosted from npm packages, so no visitor data goes to Google or a CDN.

Branches: work goes into `develop`, then `develop` is merged into `main`.
