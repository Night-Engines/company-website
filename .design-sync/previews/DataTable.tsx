import * as React from 'react';
import { DataTable } from '@night-engines/ui';

export const Compare = () => (
  <DataTable
    caption="Claims pipeline · before and after"
    columns={['', 'Before', 'After']}
    rowHeaders
    rows={[
      ['Time per claim', '25 min', <strong>5 min</strong>],
      ['Documents read', 'By hand', <strong>Every one, on arrival</strong>],
      ['Audit trail', 'Partial', <strong>Every decision on record</strong>],
    ]}
  />
);
export const Runs = () => (
  <DataTable
    columns={['Run', 'Workflow', 'Started', 'Status']}
    rows={[
      ['#1042', 'Inbox digest', '02:00', <strong>Done</strong>],
      ['#1043', 'Invoice match', '02:15', 'Awaiting approval'],
      ['#1044', 'Portal check', '02:40', 'Running'],
    ]}
  />
);
