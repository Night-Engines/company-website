# nightengines.com

The Night Engines company site — deployed live at
[nightengines.com](https://nightengines.com).

## About

Night Engines is an AI agency in Athens, run solo by Michael Angeles. We build
**websites, applications and agentic setups**: a private brain of a business's
knowledge, worked by agents that arrive preloaded — skills installed, MCP servers
connected, workflows agreed up front — run on a schedule and report back. Nothing
leaves without approval.

- Email: michael.angeles@nightengines.com
- Founder: [Michael Angeles](https://michangelis.github.io) — set up and ran the
  Hellas Direct AI lab (claims automation in production, 2,000+ real claims).

## The site

Six static pages, no build step, no framework:

| Page | What it does |
|---|---|
| `index.html` | The whole story once — scroll-driven 3D vault scene (three.js via CDN import map) |
| `brain.html` | The data half: ingestion → structure. Self-drawing signal path |
| `engine.html` | The action half: exploded machine, plates seating on scroll |
| `work.html` | Hellas Direct — three systems |
| `about.html` | Michael; solo is the feature |
| `book.html` | Discovery call booking |
| `404.html` | Branded not-found |

`NOTES.md` is the design story (motion rules, the brain/engine split, framing
decisions) — read it before changing pages.

## Run locally

```
python3 -m http.server 4180   # open http://localhost:4180
```

## Deploy

`.github/workflows/deploy.yml` uploads the repo root straight to GitHub Pages on
push to `main` — nothing to build. `CNAME` pins the custom domain.

DNS (at the registrar): four A records to GitHub Pages
(`185.199.108–111.153`), plus `www` CNAME → `night-engines.github.io`, then
enable *Enforce HTTPS* in repo Settings → Pages.
