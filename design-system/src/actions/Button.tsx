import * as React from 'react';
import { cx } from '../cx';

export interface ButtonProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** Solid cyan plate (default) or ghost outline for the secondary action. */
  variant?: 'solid' | 'ghost';
  /** `lg` is the hero / end-of-page size. */
  size?: 'md' | 'lg';
  /** Renders an `<a>` when set, otherwise a `<button type="button">`. */
  href?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

/**
 * The one button: mono uppercase label on a cyan plate (`.cta`). Pair a solid
 * primary with a ghost secondary; never two solids side by side.
 */
export function Button({ variant = 'solid', size = 'md', href, className, children, ...rest }: ButtonProps) {
  const cls = cx('cta', variant === 'ghost' && 'cta--ghost', size === 'lg' && 'cta--lg', className);
  if (href) {
    return (
      <a className={cls} href={href} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
