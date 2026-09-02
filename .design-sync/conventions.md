# Night Engines — building with this system

The look: a cyanotype drafting sheet. Deep blue-black paper, pale ink text, **one** cyan accent, 1px hairlines, uppercase mono labels, condensed uppercase display headings. No other hues, no shadows, no pill shapes — the only radius is 3px.

## 1. Wrap the app in `Paper`, once

`Paper` is the page ground (paper colour, blueprint grid, grain, body font). Without it the text is pale ink on white and every screen looks broken.

```jsx
const { Paper, Topbar, Plate, Rule, Heading, Text, Button, TitleBlock } = window.NightEngines;

<Paper>
  <Topbar brand="Ops console"
    links={[{ label: 'Runs', href: '#runs', current: true }, { label: 'Approvals', href: '#approvals' }]}
    cta={{ label: 'New run', href: '#new' }} />
  <Plate refNo="NE · §01" refLabel="tonight">
    <Rule />
    <Heading>Overnight, on your server.</Heading>
    <Text variant="dim">Two runs need your <strong>approval</strong> before anything leaves.</Text>
    <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
      <Button href="#approve">Approve run</Button>
      <Button variant="ghost" href="#hold">Hold for review</Button>
    </div>
  </Plate>
</Paper>
```

## 2. Styling idiom: CSS custom properties + the site's own classes

No utility framework, no theme object. Style your own layout glue with inline styles or a few class rules that use these tokens (all defined in `_ds_bundle.css`, imported by `styles.css`):

| Token | Use |
|---|---|
| `--paper` · `--paper-2` · `--panel` | page ground · tinted band · raised panel |
| `--hair` | every border and divider, always 1px |
| `--ink` · `--dim` · `--faint` | primary text · secondary copy · captions and labels |
| `--accent` · `--accent-ink` | the one cyan (links, keys, values that matter) · text on cyan |
| `--f-disp` · `--f-body` · `--f-mono` | Big Shoulders, uppercase headings · Albert Sans, body · Fragment Mono, uppercase letter-spaced labels |
| `--r` | 3px, the only radius |
| `--e` · `--t1` · `--t2` · `--t3` | easing and 160/300/600ms durations for hover transitions |
| `--wrap` | 1160px content column (`.wrap` applies it) |

Classes you may put on your own elements: `wrap`, `mono`, `sec-title`, `page-title`, `lede`, `big-stmt`, `dim-p`, `footnote`, `cta` (+ `cta--ghost`, `cta--lg`), `linkline`, `rule`, `spec-panel`, `chips`, `table-scroll` + `datatable`. Inside copy: `<strong>` in `dim`/`big` text lifts words to ink, `<b>` in `footnote`/`breath` text lifts them to cyan, `<em>` in a `SpecList` item turns cyan. Do not invent new class names; when nothing fits, inline-style with the tokens.

## 3. Rules of the look

- Captions and labels are uppercase mono: `Text variant="mono"`, `DimLine`, `TitleBlock`, `Chips`. Body copy is sentence case.
- One solid cyan `Button` per view. The second action is `variant="ghost"` or a `LinkLine`.
- A screen is a stack of `Plate`s, alternating `band` on and off; each opens with `Rule` then `Heading`. Give the first one a `refNo` like `"NE · §01"`.
- Numbers go in `MetricGrid`; key facts in `SpecPanel` + `SpecList`; metadata in `TitleBlock`; tabular data in `DataTable` (wrap the winning value in `<strong>`).
- Hairlines, never shadows. Panels are `--panel` on `--paper`.
- **Forms have no components.** Build inputs as plain `<input>` / `<select>` / `<textarea>` with `background: var(--paper-2); color: var(--ink); border: 1px solid var(--hair); border-radius: var(--r); padding: 12px 14px; font: inherit`, a `mono` label above, and no extra focus styling — `:focus-visible` already draws the cyan outline globally.

## 4. Where the truth lives

Read `styles.css` and the `_ds_bundle.css` it imports before styling anything — the `:root` block at the top is the complete token list, and every class above is defined there. Per-component API and examples: `components/<group>/<Name>/<Name>.prompt.md` (groups: `actions`, `typography`, `layout`, `data`).
