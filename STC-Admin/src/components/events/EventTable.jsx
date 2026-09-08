import React from 'react';
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../common/EmptyState';

export default function EventTable({
  events = [],
  onEdit,
  onTogglePublish,
  onDelete,
}) {
  if (events.length === 0) {
    return (
      <div className="admin-table-container">
        <EmptyState
          title="NO EVENTS FOUND"
          description="Nothing matches your current search query or active category filters."
        />
      </div>
    );
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'STC_EVENT':
        return 'STC Event';
      case 'INTERNAL_HACKATHON':
        return 'Internal Hackathon';
      case 'EXTERNAL_HACKATHON':
        return 'External';
      default:
        return type;
    }
  };

  return (
    <div className="admin-table-container">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title / Name</th>
              <th>Type</th>
              <th>Date & Time</th>
              <th>Location / Source</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => {
              const title = ev.title || ev.name;
              const isPublished = ev.status === 'PUBLISHED';
              const dateDisplay = ev.date || ev.startDate || 'TBA';
              const locationDisplay = ev.location || ev.mode || ev.platform || 'TBA';

              return (
                <tr key={ev.id}>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: '13px' }}>{title}</div>
                    {ev.registrationStatus && (
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          color: 'var(--admin-muted)',
                        }}
                      >
                        REG: {ev.registrationStatus}
                      </span>
                    )}
                  </td>
                  <td>
                    <span className="admin-badge admin-badge--neutral">
                      {getTypeLabel(ev.type)}
                    </span>
                  </td>
                  <td>
                    <div className="admin-table__mono" style={{ fontWeight: 500 }}>
                      {dateDisplay}
                    </div>
                    {ev.time && ev.time !== 'TBA' && (
                      <div style={{ fontSize: '11px', color: 'var(--admin-muted)' }}>
                        {ev.time}
                      </div>
                    )}
                  </td>
                  <td>
                    <span className="admin-table__mono">{locationDisplay}</span>
                  </td>
                  <td>
                    <StatusBadge status={ev.status} />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        type="button"
                        className="admin-btn admin-btn--secondary admin-btn--sm"
                        onClick={() => onTogglePublish(ev.id)}
                        title={isPublished ? 'Unpublish event' : 'Publish event'}
                      >
                        {isPublished ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn--secondary admin-btn--sm"
                        onClick={() => onEdit(ev)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn--danger admin-btn--sm"
                        onClick={() => onDelete(ev)}
                      >
                        Delete
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
