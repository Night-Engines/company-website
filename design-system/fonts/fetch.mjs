// Downloads the site's three Google Fonts families as woff2 + a local @font-face
// sheet (fonts.css). Re-run only if the families/weights in the site's <link> change.
import { writeFileSync } from 'node:fs';
const URL_ = 'https://fonts.googleapis.com/css2?family=Big+Shoulders:opsz,wght@10..72,500..800&family=Albert+Sans:wght@400;500;600;700&family=Fragment+Mono&display=swap';
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
let css = await (await fetch(URL_, { headers: { 'User-Agent': UA } })).text();
const seen = new Map();
for (const m of css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/g)) {
  const u = m[1];
  if (seen.has(u)) continue;
  const name = `f${seen.size + 1}-${u.split('/').pop()}`;
  seen.set(u, name);
  writeFileSync(new URL(name, import.meta.url), Buffer.from(await (await fetch(u)).arrayBuffer()));
}
for (const [u, name] of seen) css = css.split(u).join(`./${name}`);
writeFileSync(new URL('fonts.css', import.meta.url), `/* OFL-licensed families fetched from Google Fonts by fetch.mjs */\n${css}`);
console.log(`${seen.size} font files, ${css.length} bytes of css`);
