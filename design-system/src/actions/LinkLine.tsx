import * as React from 'react';
import { cx } from '../cx';

export interface LinkLineProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

/**
 * Quiet mono link with a hairline underline (`.linkline`) — the secondary
 * action beside a Button, or a bare email address.
 */
export function LinkLine({ className, children, ...rest }: LinkLineProps) {
  return (
    <a className={cx('linkline', className)} {...rest}>
      {children}
    </a>
  );
}
