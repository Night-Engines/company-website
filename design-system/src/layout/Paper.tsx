import * as React from 'react';
import { cx } from '../cx';

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * The page ground: deep blue-black paper, blueprint grid, paper grain, body
 * type in Albert Sans. Wrap the whole app in it once — every other component
 * assumes it sits on this surface.
 */
export function Paper({ className, children, ...rest }: PaperProps) {
  return (
    <div className={cx('paper', className)} {...rest}>
      {children}
    </div>
  );
}
