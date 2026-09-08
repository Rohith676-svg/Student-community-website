import React from 'react';

export default function EventsToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  onAddEvent,
}) {
  return (
    <div className="admin-toolbar">
      <div className="admin-toolbar__filters">
        <div style={{ position: 'relative', minWidth: '220px' }}>
          <input
            type="text"
            className="admin-input"
            placeholder="Search events & hackathons..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search events"
            style={{ width: '100%', paddingLeft: '28px' }}
          />
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              position: 'absolute',
              left: '9px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--admin-muted)',
              pointerEvents: 'none',
            }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        <select
          className="admin-select"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Filter by publication status"
        >
          <option value="ALL">All Statuses</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="UNPUBLISHED">Unpublished</option>
        </select>
      </div>

      <button
        type="button"
        className="admin-btn admin-btn--primary admin-btn--sm"
        onClick={onAddEvent}
      >
        + Add Event
      </button>
    </div>
  );
}
