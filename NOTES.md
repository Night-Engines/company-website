# Final — the combined site (round 6)

The one that becomes nightengines.com. Round 5 produced five sites that each told
the same story five ways; this one keeps the locked brand and picks **the single
best animation for each page's specific job**, so the machine is explained in
parts instead of re-pitched on every screen.

## Pages

| Page | Animation | Borrowed from | What it teaches |
|---|---|---|---|
| `index.html` | Logo boot-in, then the scroll-driven 3D vault story (5 chapters) | Vault | The whole business, once: floor → brain → engine → airlock → morning |
| `brain.html` | Self-drawing signal path, 3 chapters | Relay | **Data only.** Scattered sources → ingestion → structured, queryable records |
| `engine.html` | Exploded machine, 6 plates seating on scroll | Assembly | **Action only.** Feed · MCP servers · skills · agents · approval gate · report |
| `work.html` | Static (ink-sweep headings) | — | Hellas Direct, three systems |
| `about.html` | Static + portrait slot | — | Michael; solo is the feature |
| `book.html` | Static | — | Calendly, on its own page |

## The brain/engine split (the round-5 fix)

Round 5's sites blurred the two halves together. Here they are deliberately
separate machines with separate pages, separate diagrams, and cross-links:

- **Brain = data.** Ingestion, cleaning, structure. Turning documents, inboxes and
  tribal knowledge into records a model can use later. No agents on that page.
- **Engine = action.** Agents that arrive *already loaded* — skills installed, MCP
  servers connected, workflows agreed up front — that work the brain on a schedule
  and report back. The exploded diagram makes "preloaded" literal: each plate is a
  part that was fitted before the machine ran.

## What we sell (made concrete)

We are an agency; there is no launched product. The landing page says so in three
offers: **websites · applications · agentic setups**. No product framing anywhere.

## Work — three organizations (2026-07-28 reframe)

Work is now a track-record page: three organizations, one small outcome-focused
section each, logos rendered white via CSS filter (`.org-logo`), each title
linking to the org's site:

1. **Hellas Direct** (hellasdirect.gr) — client #0; Michael ran their AI lab;
   outcomes only (25→5 min/claim, 2,000+ claims, award), no stack chips or
   pipeline internals.
2. **IBM** (ibm.com) — a workshop on a solution we developed for taxi waiting
   and dispatching at Chicago's airport.
3. **Netcompany** (netcompany.com) — worked on their biggest internal platform.

Logos live in `assets/` (hellasdirect.webp, ibm.svg, netcompany.svg). The old
per-project deep-dives (claims pipeline, OCR engine, MCP server) were cut —
outcomes over tech. The Living Wiki paper and ACM mentions were cut entirely.

**Framing note (2026-07-28):** Hellas Direct is presented as *client #0*, linked
to hellasdirect.gr — the AI lab Michael set up and ran there is the origin story,
and Night Engines now does the same for businesses without an AI lab. The honesty
footnote at the bottom of `work.html` stays: systems built inside that lab; other
Night Engines claims are capabilities, not client results.

**Landing page trim (2026-07-28):** the problem, teaser, proof-strip, and seals
sections were removed from `index.html` — it is now hero → 5 chapters → recap
(with the client-#0 line) → what we sell → bookstrip. ACM/Living Wiki mentions
and all GitHub links were removed site-wide; personal links are email, LinkedIn,
michangelis.github.io only.

## Placeholders to fill

- `assets/michael.jpg` — 4:5 portrait. Swap the `.portrait-slot` div in `about.html`
  for `<img src="assets/michael.jpg" alt="Michael Angeles" />`.
- Calendly — in `book.html`, replace the `.embed-slot` div with the widget div
  (real event URL in `data-url`) and uncomment the `widget.js` script at the bottom.

## Motion rules kept

One signature animation per page, never two. Ink-sweep headings everywhere
(`data-sweep`). Boot loader runs on every visit to index (2026-07-28: sessionStorage
once-per-session gate removed by request), never under
`prefers-reduced-motion`, with a 3s hard timeout so it can't trap anyone. Every
animation degrades to a complete, labeled static state with JS off or reduced
motion — the schematic draws fully, the machine sits assembled.

## Run

```
python3 -m http.server 4180    # → localhost:4180
```

Verified: no console errors on any page, no horizontal overflow at 375px, both
scroll animations confirmed running at desktop and mobile widths.
