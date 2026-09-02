# design-sync notes — Night Engines site → Claude Design

- **This repo is a static site, not a component library.** The design system is the
  `design-system/` package: 19 thin React wrappers over the site's real CSS classes.
  `npm run build` there runs `tsc` and copies the root `style.css` (+ `ui.css`) to
  `dist/style.css`, which is the `cssEntry`. Never edit `dist/style.css` by hand — the
  site's `style.css` is the single source of truth.
- **Display-font fallbacks are stripped in the DS copy** (`"Big Shoulders Display"`,
  `"Archivo Narrow"` — legacy names that only matter when the webfont fails to load).
  The `sed` in `design-system/package.json`'s build script does it; without it validate
  fires `[FONT_MISSING]` on names the bundle never needs.
- **Fonts** come from Google Fonts (OFL): `design-system/fonts/fetch.mjs` downloads the
  woff2 files and writes `fonts/fonts.css`; both are committed. Re-run it only if the
  families/weights in the site's `<link>` change.
- **`.paper` is an alias of `body` in the site's `style.css`** (`body,.paper{…}` plus the
  `::before` grid and `::after` grain). The `Paper` component wraps apps in that ground,
  and `cfg.provider` wraps every preview in it — without it the cards render pale ink on
  the harness's light background and every text component looks washed out.
- **Playwright**: the machine caches chromium 1228 (`~/Library/Caches/ms-playwright`),
  which is pinned by playwright 1.61.0 — install exactly that into `.ds-sync/`.
- **Topbar** collapses its links behind the hamburger at ≤900px (site behaviour), so its
  card renders at `viewport: 1200x160`. The hamburger does nothing without host JS.

## Known render warns
- `[RENDER_THIN] Mark` — the mark is an SVG with no text; the screenshot shows it. Benign.

## Re-sync risks
- `style.css` edits on the site flow into the DS only after `cd design-system && npm run build`.
- Google Fonts URLs in `fonts/fonts.css` were rewritten to local files; a re-fetch
  replaces the file set (names include the upstream hash).

## Sync state (2026-09-02)
- Local build, validate, capture and grading are complete (19 components, 43 cells good).
- Target Claude Design project: **create a fresh one named "Night Engines"** (user's choice).
  Not created yet — `DesignSync` needed `/design-login`. Once `projectId` is in
  `config.json` this note is obsolete.
