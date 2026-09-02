import * as React from 'react';
import { Topbar } from '@night-engines/ui';

export const Default = () => (
  <Topbar
    refNo="NE-04 · About"
    links={[
      { label: 'Brain', href: '#brain' },
      { label: 'Engine', href: '#engine' },
      { label: 'Work', href: '#work' },
      { label: 'About', href: '#about', current: true },
    ]}
    cta={{ label: 'Book a call', href: '#book' }}
  />
);
export const AppBar = () => (
  <Topbar
    brand="Ops console"
    links={[
      { label: 'Runs', href: '#runs', current: true },
      { label: 'Approvals', href: '#approvals' },
      { label: 'Records', href: '#records' },
    ]}
    cta={{ label: 'New run', href: '#new' }}
  />
);
