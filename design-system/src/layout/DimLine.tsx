import * as React from 'react';
import { cx } from '../cx';

export interface DimLineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Short mono label, e.g. `"NE-01 · The Brain · half one of two"`. */
  children: React.ReactNode;
}

/**
 * Dimension line: a cyan measured rule with end ticks and a centred mono
 * label (`.dimline`). Opens a page or a major section like a drawing callout.
 */
export function DimLine({ className, children, ...rest }: DimLineProps) {
  return (
    <div className={cx('dimline', className)} {...rest}>
      <span>{children}</span>
    </div>
  );
}
