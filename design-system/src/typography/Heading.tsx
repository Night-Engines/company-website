import * as React from 'react';
import { cx } from '../cx';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** HTML heading level. Every level renders in the display face, uppercase. */
  level?: 1 | 2 | 3;
  /** `page` = the big page title, `section` = a section title (default), `plain` = the level's own size. */
  kind?: 'page' | 'section' | 'plain';
  children: React.ReactNode;
}

/**
 * Display heading in Big Shoulders, uppercase, tight leading. One `page`
 * heading per screen; `section` headings usually sit right under a Rule.
 */
export function Heading({ level = 2, kind = 'section', className, children, ...rest }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3';
  const cls = cx(kind === 'page' ? 'page-title' : kind === 'section' ? 'sec-title' : null, className);
  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  );
}
