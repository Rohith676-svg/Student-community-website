import React from 'react';

export default function DepartmentStats({ departmentStats = [] }) {
  const maxCount = Math.max(...departmentStats.map((d) => d.count), 1);

  return (
    <div className="admin-card">
      <h3 className="admin-card__title">Department-wise Members</h3>
      <div className="admin-card__subtitle">Calculated automatically from member records</div>

      <div className="admin-bar-list">
        {departmentStats.map((item) => {
          const barWidth = `${Math.round((item.count / maxCount) * 100)}%`;
          return (
            <div key={item.department} className="admin-bar-item">
              <div className="admin-bar-item__header">
                <span className="admin-bar-item__label">{item.department}</span>
                <span className="admin-bar-item__counts">
                  <strong>{item.count}</strong>
                  <span>({item.percentage}%)</span>
                </span>
              </div>
              <div className="admin-bar-item__track" aria-hidden="true">
                <div
                  className="admin-bar-item__fill"
                  style={{ width: barWidth }}
                />
              </div>
            </div>
          );
        })}

        {departmentStats.length === 0 && (
          <div style={{ color: 'var(--admin-muted)', padding: '1rem 0' }}>
            No department data available.
          </div>
        )}
      </div>
    </div>
  );
}
