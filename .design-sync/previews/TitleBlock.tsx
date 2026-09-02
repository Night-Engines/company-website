import * as React from 'react';
import { TitleBlock } from '@night-engines/ui';

export const Default = () => (
  <TitleBlock
    rows={[
      { k: 'Project', v: 'Night Engines' },
      { k: 'Sells', v: 'Sites · apps · agents' },
      { k: 'Mode', v: 'Approved playbooks only' },
      { k: 'Client #0', v: 'Hellas Direct', live: true },
    ]}
  />
);
export const Status = () => (
  <TitleBlock
    rows={[
      { k: 'Environment', v: 'Production' },
      { k: 'Version', v: '2.4.1' },
      { k: 'Status', v: 'Running', live: true },
    ]}
  />
);
