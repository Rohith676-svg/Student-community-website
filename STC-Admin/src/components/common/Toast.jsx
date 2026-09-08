import React from 'react';

/**
 * Toast Notification banner
 */
export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  return (
    <div className="admin-toast-container">
      <div className={`admin-toast admin-toast--${type}`} role="alert">
        <span>{message}</span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            style={{ marginLeft: 'auto', opacity: 0.7, padding: '2px' }}
            aria-label="Close notification"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
}
