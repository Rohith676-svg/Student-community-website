import React from 'react';
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../common/EmptyState';

export default function MembersTable({
  members = [],
  onViewMember,
  onToggleStatus,
}) {
  if (members.length === 0) {
    return (
      <div className="admin-table-container">
        <EmptyState
          title="NO MEMBERS FOUND"
          description="No community members matched your search criteria or active filters."
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
              <th>Member Name</th>
              <th>Email</th>
              <th>Year</th>
              <th>Department</th>
              <th>Joined Date</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => {
              const isSuspended = member.status === 'SUSPENDED';
              return (
                <tr key={member.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{member.name}</div>
                    {member.rollNumber && (
                      <span style={{ fontSize: '11px', color: 'var(--admin-muted)', fontFamily: 'var(--font-mono)' }}>
                        {member.rollNumber}
                      </span>
                    )}
                  </td>
                  <td>
                    <span className="admin-table__mono">{member.email}</span>
                  </td>
                  <td>
                    <span className="admin-table__mono">{member.year}th Year</span>
                  </td>
                  <td>
                    <span className="admin-table__mono" style={{ fontWeight: 500 }}>
                      {member.department}
                    </span>
                  </td>
                  <td>
                    <span className="admin-table__mono" style={{ color: 'var(--admin-muted)' }}>
                      {new Date(member.joinedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={member.status} />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        type="button"
                        className="admin-btn admin-btn--secondary admin-btn--sm"
                        onClick={() => onViewMember(member)}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn--secondary admin-btn--sm"
                        onClick={() =>
                          onToggleStatus(member.id, isSuspended ? 'ACTIVE' : 'SUSPENDED')
                        }
                        title={isSuspended ? 'Activate member' : 'Suspend member'}
                      >
                        {isSuspended ? 'Activate' : 'Suspend'}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
