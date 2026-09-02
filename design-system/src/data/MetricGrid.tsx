import * as React from 'react';
import { cx } from '../cx';

export interface Metric {
  /** The big cyan figure, e.g. `"25→5"` or `"2,000+"`. */
  value: React.ReactNode;
  /** Mono caption under it, e.g. `"min / claim"`. */
  label: string;
}

export interface MetricGridProps extends React.HTMLAttributes<HTMLUListElement> {
  items: Metric[];
}

/**
 * Two-column grid of headline numbers (`.metricgrid`): display-face value in
 * cyan over a mono caption, cells separated by hairlines. Four items is the
 * canonical count.
 */
export function MetricGrid({ items, className, ...rest }: MetricGridProps) {
  return (
    <ul className={cx('metricgrid', className)} {...rest}>
      {items.map((m, i) => (
        <li key={i}>
          <b>{m.value}</b>
          <span>{m.label}</span>
        </li>
      ))}
    </ul>
  );
}
