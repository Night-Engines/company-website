import * as React from 'react';
import { cx } from '../cx';

export interface Step {
  title: string;
  body: React.ReactNode;
  /** Small cyan pill after the title, e.g. `"free"`. */
  badge?: string;
}

export interface StepsProps extends React.HTMLAttributes<HTMLOListElement> {
  steps: Step[];
}

/**
 * Numbered process (`.process` / `.step`): a vertical hairline connects the
 * mono step numbers; each step has a display title and dim body.
 */
export function Steps({ steps, className, ...rest }: StepsProps) {
  return (
    <ol className={cx('process', className)} {...rest}>
      {steps.map((s, i) => (
        <li className="step" key={i}>
          <span className="step-no mono">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <h3>
              {s.title}
              {s.badge && <span className="free">{s.badge}</span>}
            </h3>
            <p>{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
