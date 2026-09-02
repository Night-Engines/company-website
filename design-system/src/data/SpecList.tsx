import * as React from 'react';
import { cx } from '../cx';

export interface SpecItem {
  /** Short cyan key, e.g. `"01"` or `"S1"`. */
  k: string;
  /** The line. Wrap key words in `<em>` to render them cyan and bold. */
  t: React.ReactNode;
}

export interface SpecListProps extends React.HTMLAttributes<HTMLUListElement> {
  items: SpecItem[];
}

/** Numbered specification list (`.spec-list`): mono key, hairline-separated rows. */
export function SpecList({ items, className, ...rest }: SpecListProps) {
  return (
    <ul className={cx('spec-list', className)} {...rest}>
      {items.map((it) => (
        <li key={it.k}>
          <span className="spec-k mono">{it.k}</span>
          <span className="spec-t">{it.t}</span>
        </li>
      ))}
    </ul>
  );
}
