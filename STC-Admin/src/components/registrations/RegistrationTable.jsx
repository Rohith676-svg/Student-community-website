import React from 'react';
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../common/EmptyState';

export default function RegistrationTable({
  registrations = [],
  onUpdateStatus,
  onDelete,
}) {
  if (registrations.length === 0) {
    return (
      <div className="admin-table-container">
        <EmptyState
          title="NO REGISTRATIONS YET"
          description="Registrations will appear here when students sign up for internal STC events and hackathons."
        />
      </div>
    );
  }

  return (
    <div className="admin-table-container">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Email</th>
              <th>Year</th>
              <th>Department</th>
              <th>Event Title</th>
              <th>Registered At</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.id}>
                <td>
                  <div style={{ fontWeight: 600 }}>{reg.studentName}</div>
                </td>
                <td>
                  <span className="admin-table__mono">{reg.email}</span>
                </td>
                <td>
                  <span className="admin-table__mono">{reg.year}th Year</span>
                </td>
                <td>
                  <span className="admin-table__mono" style={{ fontWeight: 500 }}>
                    {reg.department}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 500 }}>{reg.eventTitle}</div>
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
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '6px' }}>
                    <select
                      className="admin-select"
                      style={{ padding: '2px 6px', fontSize: '11px' }}
                      value={reg.status}
                      onChange={(e) => onUpdateStatus(reg.id, e.target.value)}
                      aria-label="Change registration status"
                    >
                      <option value="CONFIRMED">Confirm</option>
                      <option value="WAITLIST">Waitlist</option>
                      <option value="CANCELLED">Cancel</option>
                    </select>

                    <button
                      type="button"
                      className="admin-btn admin-btn--danger admin-btn--sm"
                      onClick={() => {
                        if (window.confirm('Remove this registration record?')) {
                          onDelete(reg.id);
                        }
                      }}
                      title="Remove registration"
                    >
                      &times;
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
