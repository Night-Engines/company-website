import * as React from 'react';
import { Paper, Plate, Rule, Heading, Text, Button } from '@night-engines/ui';

export const Ground = () => (
  <Paper>
    <Plate>
      <Rule />
      <Heading>Overnight, on your server.</Heading>
      <Text variant="dim">Agents run the workflows you agreed to and ask approval before anything leaves.</Text>
      <Button href="#book">Book a call</Button>
    </Plate>
  </Paper>
);
