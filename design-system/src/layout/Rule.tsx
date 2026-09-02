import * as React from 'react';
import { cx } from '../cx';

export type RuleProps = React.HTMLAttributes<HTMLHRElement>;

/** Hairline divider (`.rule`). Sits directly above a section Heading. */
export function Rule({ className, ...rest }: RuleProps) {
  return <hr className={cx('rule', className)} {...rest} />;
}
