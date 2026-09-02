import * as React from 'react';
import { cx } from '../cx';

export interface PlateProps extends React.HTMLAttributes<HTMLElement> {
  /** Tinted band with hairline top and bottom (`.plate--band`). Alternate with plain plates. */
  band?: boolean;
  /** Drawing reference in the left gutter, e.g. `"NE-02"`. Switches on the two-column plate grid. */
  refNo?: string;
  /** Caption under the reference, e.g. `"the brain"`. */
  refLabel?: string;
  children: React.ReactNode;
}

/**
 * A page section (`.plate`): generous vertical padding, content centred in
 * the 1160px `.wrap`. Give it `refNo` to get the blueprint-style gutter label.
 */
export function Plate({ band, refNo, refLabel, className, children, ...rest }: PlateProps) {
  return (
    <section className={cx('plate', band && 'plate--band', className)} {...rest}>
      <div className={refNo ? 'wrap plate-grid' : 'wrap'}>
        {refNo && (
          <p className="plate-ref">
            <b>{refNo}</b>
            {refLabel}
          </p>
        )}
        {refNo ? <div>{children}</div> : children}
      </div>
    </section>
  );
}
