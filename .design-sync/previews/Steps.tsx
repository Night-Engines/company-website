import * as React from 'react';
import { Steps } from '@night-engines/ui';

export const Call = () => (
  <Steps
    steps={[
      { title: 'Your bottlenecks', body: 'You describe the recurring work. No deck, no discovery questionnaire — just the tasks that repeat.' },
      { title: 'Where the data lives', body: "We map the systems: what has an API, what doesn't, what's trapped in documents." },
      { title: 'Two or three workflows', body: 'We pick the first candidates and describe what the agent would do, step by step.' },
      { title: 'The honest read', body: 'Whether this pays for itself, roughly what it takes, and the shape of the price.', badge: 'free' },
    ]}
  />
);
export const Two = () => (
  <Steps
    steps={[
      { title: 'Connect the inbox', body: 'Read-only at first. Nothing is sent without approval.' },
      { title: 'First overnight run', body: 'A digest in your chat by morning.' },
    ]}
  />
);
