import React from 'react';
import Modal from '../common/Modal';
import StatusBadge from '../common/StatusBadge';

export default function MemberDetailsModal({
  isOpen,
  onClose,
  member,
  onToggleStatus,
  onDelete,
}) {
  if (!member) return null;

  const isSuspended = member.status === 'SUSPENDED';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Member Details"
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <button
            type="button"
            className="admin-btn admin-btn--danger admin-btn--sm"
            onClick={() => {
              if (window.confirm(`Are you sure you want to remove ${member.name}?`)) {
                onDelete(member.id);
                onClose();
              }
            }}
          >
            Remove Member
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className="admin-btn admin-btn--secondary admin-btn--sm"
              onClick={() => onToggleStatus(member.id, isSuspended ? 'ACTIVE' : 'SUSPENDED')}
            >
              {isSuspended ? 'Activate Account' : 'Suspend Account'}
            </button>
            <button
              type="button"
              className="admin-btn admin-btn--primary admin-btn--sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--admin-accent)',
              color: 'var(--admin-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{member.name}</h3>
            <span style={{ fontSize: '12px', color: 'var(--admin-muted)' }}>{member.email}</span>
          </div>

          <div style={{ marginLeft: 'auto' }}>
            <StatusBadge status={member.status} />
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            backgroundColor: 'var(--admin-surface-alt)',
            padding: '12px',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--admin-border)',
          }}
        >
          <div>
            <span className="admin-sidebar__subtitle">DEPARTMENT</span>
            <div style={{ fontWeight: 600, marginTop: '2px' }}>{member.department}</div>
          </div>
          <div>
            <span className="admin-sidebar__subtitle">ACADEMIC YEAR</span>
            <div style={{ fontWeight: 600, marginTop: '2px' }}>{member.year}th Year</div>
          </div>
          <div>
            <span className="admin-sidebar__subtitle">ROLL NUMBER</span>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', marginTop: '2px' }}>
              {member.rollNumber || 'Not recorded'}
            </div>
          </div>
          <div>
            <span className="admin-sidebar__subtitle">JOINED STC</span>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', marginTop: '2px' }}>
              {new Date(member.joinedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
