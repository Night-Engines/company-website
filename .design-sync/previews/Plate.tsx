import * as React from 'react';
import { Plate, Rule, Heading, Text, Button } from '@night-engines/ui';

export const Plain = () => (
  <Plate>
    <Rule />
    <Heading>Yours. Plain files. Portable.</Heading>
    <Text variant="big">The brain is version-controlled plain files on your own server — <strong>not rows in someone else's SaaS</strong>.</Text>
    <Text variant="dim">Walk away any day and it walks with you.</Text>
  </Plate>
);
export const Band = () => (
  <Plate band>
    <Rule />
    <Heading>Three things. Priced per project.</Heading>
    <Text variant="dim">Websites · applications · agentic setups. One operator, direct line.</Text>
    <Button href="#book">Book a call</Button>
  </Plate>
);
export const WithRef = () => (
  <Plate band refNo="NE · §02" refLabel="What we sell">
    <Rule />
    <Heading>Overnight, on your server.</Heading>
    <Text variant="dim">Agents run the workflows you agreed to and ask approval before anything leaves.</Text>
  </Plate>
);
