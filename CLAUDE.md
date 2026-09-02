# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The Night Engines company site, deployed live at nightengines.com. **Static
HTML/CSS/JS at the repo root — no build step, no framework, no package.json.**
It is round 6 ("final") of a longer design exploration; rounds 1–5 and the
variant catalog live in a separate repo (`Night-Engines/Websites`) — do not
recreate them here.

## Run / deploy

```
python3 -m http.server 4180   # local preview at http://localhost:4180
```

Deploy is automatic: `.github/workflows/deploy.yml` uploads the repo root as-is
to GitHub Pages on push to `main`. Never add a build step back unless the site
stops being plain static files. `CNAME` holds the custom domain.

## Architecture

Every page shares `style.css` and `main.js` (one ES module, feature-detects per
page). One signature animation per page, never two:

- `index.html` — boot loader (every visit, 3s hard timeout), then a
  scroll-driven three.js vault scene through 5 chapters.
  three.js comes from a CDN import map; there is no bundler.
- `brain.html` — self-drawing signal path (data half: ingestion → structure).
- `engine.html` — exploded machine, 6 plates seating on scroll (action half).
- `work.html` / `about.html` / `book.html` / `404.html` — static, ink-sweep
  headings only (`data-sweep`).

**Motion rule that must hold:** every animation degrades to a complete, labeled
static state with JS off or `prefers-reduced-motion` — the schematic draws
fully, the machine sits assembled. The landing page also has a CSS-only
`.fallback` beauty shot for no-WebGL.

## Content rules

- **We are an agency; there is no launched product.** Three offers: websites ·
  applications · agentic setups. No product framing anywhere.
- **Brain = data, Engine = action.** Keep them separate machines on separate
  pages. No agents on the brain page.
- **Work page = three organizations, outcomes over tech:** Hellas Direct
  (client #0, ran their AI lab), IBM (workshop: taxi waiting/dispatch at
  Chicago's airport), Netcompany (their biggest internal platform). Titles link
  to each org's site; logos in `assets/`. The footnote on `work.html` keeps the
  honesty guardrail: Hellas systems were built inside the AI lab Michael set up
  and ran; other Night Engines claims are capabilities, not client results.
  Don't quietly upgrade capabilities into results.
- **Outcomes and problems over tech, everywhere.** No stack chips, framework
  names, or agent-engineering jargon (MCP, skills, preloaded) in customer-facing
  copy — say what changed for the business instead.
- **No ACM / Living Wiki paper mentions, no GitHub links.** Personal links are
  only: email, LinkedIn, michangelis.github.io.
- **Landing page stays lean:** hero → 5 chapters → recap → what we sell →
  bookstrip. Don't re-add teaser/proof/seals sections; depth lives on the
  subpages.

`NOTES.md` is the authoritative design story — read it before changing pages.
Company context (offer, positioning, ops record) lives in the company brain at
`~/Projects/Brains/nightengines-brain`, not here.

## Design system (claude.ai/design)

`design-system/` is the one exception to "no package.json": a small React
package (`@night-engines/ui`) of thin wrappers over the site's real CSS
classes, synced to Claude Design with `/design-sync`. It is not part of the
site. Its build copies the root `style.css` into `dist/`, so the site's
stylesheet stays the single source of truth; `.paper` in `style.css` is an
alias of `body` that the `Paper` component uses as the app ground. Sync
config and notes live in `.design-sync/`; read `.design-sync/NOTES.md`
before touching either.
