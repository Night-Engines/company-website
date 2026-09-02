import * as React from 'react';
import { cx } from '../cx';

export interface LeaderNoteProps extends React.HTMLAttributes<HTMLElement> {
  /** Cyan tag line above the note, e.g. `"Honest promise"`. */
  tag: string;
  children: React.ReactNode;
}

/**
 * Margin note with a leader line (`.leader-note`): cyan dot and rule on the
 * left, mono uppercase text. The site's callout / aside.
 */
export function LeaderNote({ tag, className, children, ...rest }: LeaderNoteProps) {
  return (
    <aside className={cx('leader-note', className)} {...rest}>
      <span className="ln-tag">{tag}</span>
      {children}
    </aside>
  );
}
