import * as React from 'react';

export interface DataTableProps {
  /** Mono uppercase caption above the table. */
  caption?: string;
  columns: string[];
  rows: React.ReactNode[][];
  /** Render each row's first cell as a row header. */
  rowHeaders?: boolean;
}

/**
 * Hairline-bordered comparison table (`.datatable`) inside a horizontal
 * scroller. Wrap a cell's key value in `<strong>` to render it in cyan.
 */
export function DataTable({ caption, columns, rows, rowHeaders }: DataTableProps) {
  return (
    <div className="table-scroll">
      <table className="datatable">
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) =>
                rowHeaders && j === 0 ? (
                  <th key={j} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={j}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
