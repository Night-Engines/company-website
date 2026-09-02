import * as React from 'react';
import { Footer } from '@night-engines/ui';

export const Default = () => (
  <Footer
    tagline="Websites · applications · agentic systems, operated for your business"
    links={[
      { label: 'michael.angeles@nightengines.com', href: 'mailto:michael.angeles@nightengines.com' },
      { label: 'LinkedIn', href: '#linkedin' },
      { label: 'michangelis.github.io', href: '#site' },
    ]}
    plate="Night Engines · Athens · © 2026"
  />
);
