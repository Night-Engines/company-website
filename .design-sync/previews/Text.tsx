import * as React from 'react';
import { Text } from '@night-engines/ui';

export const Body = () => <Text>The person who builds your system operates it. When something needs tuning, the person answering is the person who wrote the playbook.</Text>;
export const Lede = () => <Text variant="lede">No agents here. This page is only about getting your business's knowledge into a shape a model can actually use.</Text>;
export const Big = () => <Text variant="big">Ask your business anything — get an answer with <strong>the record it came from</strong>.</Text>;
export const Dim = () => <Text variant="dim">Search and reporting across everything at once: contracts next to invoices next to the email thread that explains them. <strong>Valuable on its own</strong>, before any agent runs.</Text>;
export const Mono = () => <Text variant="mono" as="span">NE-02 · The engine · half two of two</Text>;
export const Footnote = () => <Text variant="footnote"><b>Framing:</b> capabilities described here are capabilities, not client results.</Text>;
