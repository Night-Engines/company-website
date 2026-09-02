import * as React from 'react';

export interface MarkProps extends React.SVGAttributes<SVGSVGElement> {
  /** Rendered width and height in px. */
  size?: number;
}

/** The Night Engines mark: pale ring, cyan key. Decorative (aria-hidden). */
export function Mark({ size = 28, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" {...rest}>
      <path d="M21 14.5 A22 22 0 1 0 43 14.5" fill="none" stroke="#D9E6F2" strokeWidth="6.5" strokeLinecap="round" />
      <path d="M32 6 l4.2 5.2 v14.6 L32 31 l-4.2 -5.2 V11.2 Z" fill="#54C6FF" />
    </svg>
  );
}
