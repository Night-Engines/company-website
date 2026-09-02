import * as React from 'react';
import { cx } from '../cx';

export interface TitleBlockRow {
  k: string;
  v: React.ReactNode;
  /** Render the value in cyan (a live / current state). */
  live?: boolean;
}

export interface TitleBlockProps extends React.HTMLAttributes<HTMLElement> {
  rows: TitleBlockRow[];
}

/**
 * Drafting title block (`.titleblock`): mono key/value rows in a hairline
 * box. Use it for metadata — status, owner, version, environment.
 */
export function TitleBlock({ rows, className, ...rest }: TitleBlockProps) {
  return (
    <aside className={cx('titleblock', className)} {...rest}>
      {rows.map((r) => (
        <div className="tb-row" key={r.k}>
          <span className="tb-k">{r.k}</span>
          <span className={cx('tb-v', r.live && 'live')}>{r.v}</span>
        </div>
      ))}
    </aside>
  );
}
