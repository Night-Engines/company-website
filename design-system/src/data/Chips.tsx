import * as React from 'react';
import { cx } from '../cx';

export interface ChipsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: string[];
}

/** Row of hairline mono tags (`.chips`). Scope lists, capabilities, filters. */
export function Chips({ items, className, ...rest }: ChipsProps) {
  return (
    <ul className={cx('chips', className)} {...rest}>
      {items.map((it) => (
        <li key={it}>{it}</li>
      ))}
    </ul>
  );
}
