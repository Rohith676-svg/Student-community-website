import React from 'react';

/**
 * StatusBadge Component
 * Renders consistent, restrained status chips with appropriate colors.
 */
export default function StatusBadge({ status, label }) {
  if (!status) return null;

  const normalized = String(status).toUpperCase();
  const displayLabel = label || normalized;

  let modifier = 'neutral';

  switch (normalized) {
    case 'PUBLISHED':
    case 'ACTIVE':
    case 'CONFIRMED':
    case 'OPEN':
      modifier = 'published';
      break;

    case 'DRAFT':
    case 'WAITLIST':
    case 'UPCOMING':
      modifier = 'draft';
      break;

    case 'UNPUBLISHED':
    case 'SUSPENDED':
    case 'CANCELLED':
    case 'CLOSED':
      modifier = 'unpublished';
      break;

    default:
      modifier = 'neutral';
  }

  return (
    <span className={`admin-badge admin-badge--${modifier}`} role="status">
      {displayLabel}
    </span>
  );
}
