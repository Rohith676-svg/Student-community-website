import React from 'react';
import Modal from '../common/Modal';

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Event',
  message = 'Are you sure you want to delete this event? This action cannot be undone.',
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', width: '100%' }}>
          <button
            type="button"
            className="admin-btn admin-btn--secondary admin-btn--sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="admin-btn admin-btn--danger admin-btn--sm"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm Delete
          </button>
        </div>
      }
    >
      <p style={{ color: 'var(--admin-text)' }}>{message}</p>
    </Modal>
  );
}
