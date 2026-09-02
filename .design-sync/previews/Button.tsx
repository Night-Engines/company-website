import * as React from 'react';
import { Button } from '@night-engines/ui';

export const Solid = () => <Button href="#book">Book a call</Button>;
export const Ghost = () => <Button variant="ghost" href="#work">See the work</Button>;
export const Large = () => <Button size="lg" href="#book">Book a 30-min call</Button>;
export const Pair = () => (
  <div style={{ display: 'flex', gap: 22, alignItems: 'center', flexWrap: 'wrap' }}>
    <Button>Approve run</Button>
    <Button variant="ghost">Hold for review</Button>
  </div>
);
export const AsButton = () => <Button onClick={() => {}}>Run overnight</Button>;
