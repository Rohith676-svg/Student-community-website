import React from 'react';

/**
 * Restrained Loading Skeletons
 */
export function TableSkeleton({ rows = 5, cols = 5 }) {
  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i}>
                <div className="admin-skeleton" style={{ height: '14px', width: '70%' }} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r}>
              {Array.from({ length: cols }).map((_, c) => (
                <td key={c}>
                  <div
                    className="admin-skeleton"
                    style={{ height: '14px', width: c === 0 ? '60%' : '85%' }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MetricSkeleton() {
  return (
    <div className="admin-metric-card">
      <div className="admin-skeleton" style={{ height: '12px', width: '50%', marginBottom: '12px' }} />
      <div className="admin-skeleton" style={{ height: '36px', width: '35%', marginBottom: '8px' }} />
      <div className="admin-skeleton" style={{ height: '12px', width: '70%' }} />
    </div>
  );
}
