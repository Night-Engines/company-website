import * as React from 'react';
import { Button, LinkLine } from '@night-engines/ui';

export const Email = () => <LinkLine href="mailto:michael.angeles@nightengines.com">michael.angeles@nightengines.com</LinkLine>;
export const BesideButton = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
    <Button size="lg" href="#book">Book a call</Button>
    <LinkLine href="#email">Prefer to write first?</LinkLine>
  </div>
);
