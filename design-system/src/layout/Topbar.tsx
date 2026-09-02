import * as React from 'react';
import { Mark } from './Mark';

export interface TopbarLink {
  label: string;
  href: string;
  /** Marks the current page (cyan, with a ▸ prefix). */
  current?: boolean;
}

export interface TopbarProps {
  /** Brand word after the mark. */
  brand?: string;
  /** Drawing reference after the brand, e.g. `"NE-04 · About"`. Hidden under 900px. */
  refNo?: string;
  homeHref?: string;
  links?: TopbarLink[];
  /** Primary action at the end of the nav, rendered as a compact cyan Button. */
  cta?: { label: string; href: string };
}

/**
 * Sticky 64px top bar (`.topbar`): mark + brand on the left, mono nav links
 * and one cyan CTA on the right. Under 900px the links collapse behind the
 * hamburger, which needs the host app to toggle `.navlinks.open`.
 */
export function Topbar({ brand = 'Night Engines', refNo, homeHref = '/', links = [], cta }: TopbarProps) {
  return (
    <header className="topbar">
      <a className="brand" href={homeHref} aria-label={`${brand} home`}>
        <span className="brand-chip">
          <Mark size={24} />
        </span>
        <span className="brand-word">{brand}</span>
        {refNo && <span className="brand-ref">{refNo}</span>}
      </a>
      <nav className="nav" aria-label="Primary">
        <button className="nav-toggle" type="button" aria-expanded="false" aria-controls="navlinks" aria-label="Toggle navigation">
          <span />
          <span />
          <span />
        </button>
        <ul className="navlinks" id="navlinks">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} aria-current={l.current ? 'page' : undefined}>
                {l.label}
              </a>
            </li>
          ))}
          {cta && (
            <li>
              <a className="cta cta--nav" href={cta.href}>
                {cta.label}
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
