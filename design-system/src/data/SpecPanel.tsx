import * as React from 'react';
import { cx } from '../cx';

export interface SpecPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Mono heading in cyan, e.g. `"Record"` or `"The seal"`. */
  title?: string;
  children: React.ReactNode;
}

/**
 * Raised panel with cyan register marks in two corners (`.spec-panel`).
 * Usually holds a SpecList; also the right card for any key facts block.
 */
export function SpecPanel({ title, className, children, ...rest }: SpecPanelProps) {
  return (
    <div className={cx('spec-panel', className)} {...rest}>
      {title && <p className="spec-panel-h mono">{title}</p>}
      {children}
    </div>
  );
}
