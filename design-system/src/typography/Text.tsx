import * as React from 'react';
import { cx } from '../cx';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * `body` plain paragraph · `lede` intro under a page title · `big` a bold
   * one-sentence statement · `dim` supporting copy · `mono` small uppercase
   * mono label · `footnote` tiny mono caveat · `breath` the large recap line.
   */
  variant?: 'body' | 'lede' | 'big' | 'dim' | 'mono' | 'footnote' | 'breath';
  as?: 'p' | 'span' | 'div';
  children: React.ReactNode;
}

const CLS: Record<NonNullable<TextProps['variant']>, string | null> = {
  body: null,
  lede: 'lede',
  big: 'big-stmt',
  dim: 'dim-p',
  mono: 'mono',
  footnote: 'footnote',
  breath: 'breath',
};

/**
 * The site's text registers. Wrap the words that matter in `<strong>` (in
 * `big`/`dim`) or `<b>` (in `breath`/`footnote`) — the CSS lifts them to ink or cyan.
 */
export function Text({ variant = 'body', as: Tag = 'p', className, children, ...rest }: TextProps) {
  return (
    <Tag className={cx(CLS[variant], className)} {...rest}>
      {children}
    </Tag>
  );
}
