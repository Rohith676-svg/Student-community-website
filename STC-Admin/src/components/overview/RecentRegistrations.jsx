import React from 'react';
import StatusBadge from '../common/StatusBadge';

export default function RecentRegistrations({ registrations = [], onViewAll }) {
  return (
    <div className="admin-card" style={{ marginTop: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
        <h3 className="admin-card__title">Recent Registrations</h3>
        {onViewAll && (
          <button
            type="button"
            className="admin-btn admin-btn--secondary admin-btn--sm"
            onClick={onViewAll}
          >
            View All &rarr;
          </button>
        )}
      </div>
      <div className="admin-card__subtitle">Latest internal event & hackathon sign-ups</div>

      <div className="admin-table-container">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Department</th>
                <th>Year</th>
                <th>Event</th>
                <th>Registered</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(registrations || []).map((reg) => (
                <tr key={reg.id}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{reg.studentName}</div>
                    <div style={{ fontSize: '11px', color: 'var(--admin-muted)' }}>
                      {reg.email}
                    </div>
                  </td>
                  <td>
                    <span className="admin-table__mono">{reg.department}</span>
                  </td>
                  <td>
                    <span className="admin-table__mono">{reg.year}th Year</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 500 }}>{reg.eventTitle}</span>
                  </td>
                  <td>
                    <span className="admin-table__mono" style={{ color: 'var(--admin-muted)' }}>
                      {new Date(reg.registeredAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={reg.status} />
                  </td>
                </tr>
              ))}

              {registrations.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--admin-muted)' }}>
                    No registrations recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
