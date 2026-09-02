import * as React from 'react';
import { MetricGrid } from '@night-engines/ui';

export const Four = () => (
  <MetricGrid
    items={[
      { value: '25→5', label: 'min / claim' },
      { value: '2,000+', label: 'claims processed' },
      { value: '500k+', label: 'customers served' },
      { value: '3', label: 'systems in production' },
    ]}
  />
);
export const Two = () => (
  <MetricGrid
    items={[
      { value: '14', label: 'runs tonight' },
      { value: '2', label: 'awaiting approval' },
    ]}
  />
);
