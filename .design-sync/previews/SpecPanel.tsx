import * as React from 'react';
import { SpecPanel, SpecList, Text } from '@night-engines/ui';

export const Record = () => (
  <SpecPanel title="Record">
    <SpecList
      items={[
        { k: '01', t: <>Set up &amp; ran the <em>Hellas Direct AI lab</em> — client #0</> },
        { k: '02', t: <>Claims automation in production — 500k+ customer insurer</> },
        { k: '03', t: <>Night Engines runs on its own stack</> },
      ]}
    />
  </SpecPanel>
);
export const KeyFacts = () => (
  <SpecPanel title="Tonight's run">
    <Text variant="dim" style={{ margin: 0 }}>14 workflows scheduled. Two need your approval before anything leaves the server.</Text>
  </SpecPanel>
);
