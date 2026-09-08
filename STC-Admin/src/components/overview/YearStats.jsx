import React from 'react';

export default function YearStats({ yearStats = [] }) {
  const maxCount = Math.max(...yearStats.map((y) => y.count), 1);

  return (
    <div className="admin-card">
      <h3 className="admin-card__title">Year-wise Members</h3>
      <div className="admin-card__subtitle">Academic year distribution of community</div>

      <div className="admin-bar-list">
        {yearStats.map((item) => {
          const barWidth = `${Math.round((item.count / maxCount) * 100)}%`;
          return (
            <div key={item.yearCode} className="admin-bar-item">
              <div className="admin-bar-item__header">
                <span className="admin-bar-item__label">{item.year}</span>
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

        {yearStats.length === 0 && (
          <div style={{ color: 'var(--admin-muted)', padding: '1rem 0' }}>
            No academic year data available.
          </div>
        )}
      </div>
    </div>
  );
}
