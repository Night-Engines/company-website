import * as React from 'react';
import { Mark } from './Mark';

export interface FooterProps {
  name?: string;
  /** One-line mono tagline under the name. */
  tagline?: string;
  links?: { label: string; href: string }[];
  /** Right-aligned plate line, e.g. `"Night Engines · Athens · © 2026"`. */
  plate?: string;
}

/**
 * Title-block footer (`.footer`): mark + name + tagline, a row of mono links,
 * and the plate line. Always the last thing on a page.
 */
export function Footer({ name = 'Night Engines', tagline, links = [], plate }: FooterProps) {
  return (
    <footer className="footer">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <Mark size={28} />
          <div>
            <p className="foot-name">{name}</p>
            {tagline && <p className="foot-tag mono">{tagline}</p>}
          </div>
        </div>
        <div className="foot-meta">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        {plate && <p className="foot-plate">{plate}</p>}
      </div>
    </footer>
  );
}
