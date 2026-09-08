import React from 'react';

/**
 * EmptyState Component
 * Follows STC editorial tone as specified in STC_ADMIN_DESIGN.md.
 */
export default function EmptyState({ title, description, action }) {
  return (
    <div className="admin-empty-state" role="status">
      <svg
        className="admin-empty-state__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
      <h3 className="admin-empty-state__title">{title}</h3>
      {description && <p className="admin-empty-state__desc">{description}</p>}
      {action && <div style={{ marginTop: '0.75rem' }}>{action}</div>}
    </div>
  );
}
