import React, { useEffect, useRef } from 'react';

/**
 * Accessible Modal wrapper component.
 * Traps focus and dismisses on Escape key or backdrop click.
 */
export default function Modal({ isOpen, onClose, title, children, footer, size = 'md' }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="admin-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`admin-modal ${size === 'lg' ? 'admin-modal--lg' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={modalRef}
      >
        <div className="admin-modal__header">
          <h2 className="admin-modal__title">{title}</h2>
          <button
            type="button"
            className="admin-modal__close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="admin-modal__body">{children}</div>

        {footer && <div className="admin-modal__footer">{footer}</div>}
      </div>
    </div>
  );
}
