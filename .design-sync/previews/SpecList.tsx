import * as React from 'react';
import { SpecList } from '@night-engines/ui';

export const Intake = () => (
  <SpecList
    items={[
      { k: '01', t: <>Ingest &amp; deduplicate</> },
      { k: '02', t: <>Docs → <em>structured records</em></> },
      { k: '03', t: <>Resolve entities &amp; dates</> },
    ]}
  />
);
