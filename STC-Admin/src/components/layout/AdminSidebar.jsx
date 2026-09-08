import React from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminSidebar({ currentRoute, onNavigate, counts = {} }) {
  const { user, logout } = useAdminAuth();

  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="admin-sidebar__icon">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      id: 'members',
      label: 'Members',
      count: counts.members,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="admin-sidebar__icon">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: 'events',
      label: 'Events',
      count: counts.events,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="admin-sidebar__icon">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      id: 'registrations',
      label: 'Registrations',
      count: counts.registrations,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="admin-sidebar__icon">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="admin-sidebar__icon">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="admin-sidebar" aria-label="Admin Navigation">
      <div className="admin-sidebar__brand">
        <span className="admin-sidebar__logo-badge">STC</span>
        <div className="admin-sidebar__brand-text">
          <span className="admin-sidebar__title">ADMIN PORTAL</span>
          <span className="admin-sidebar__subtitle">Control Center</span>
        </div>
      </div>

      <nav className="admin-sidebar__nav">
        {navItems.map((item) => {
          const isActive = currentRoute === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`admin-sidebar__link ${isActive ? 'is-active' : ''}`}
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="admin-sidebar__link-left">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && item.count !== null && (
                <span className="admin-sidebar__badge">{item.count}</span>
              )}
            </button>
          );
        })}

        <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
          <a
            href="../#/"
            className="admin-sidebar__link"
            style={{ opacity: 0.7 }}
            title="Return to STC Public Site"
          >
            <div className="admin-sidebar__link-left">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="admin-sidebar__icon">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Public Website</span>
            </div>
            <span className="admin-sidebar__badge" style={{ fontSize: '10px' }}>&rarr;</span>
          </a>
        </div>
      </nav>

      <div className="admin-sidebar__footer">
        <div className="admin-sidebar__user">
          <div className="admin-sidebar__avatar">{user?.avatar || 'AD'}</div>
          <div className="admin-sidebar__user-info">
            <span className="admin-sidebar__user-name">{user?.name || 'Administrator'}</span>
            <span className="admin-sidebar__user-role">{user?.role || 'admin'}</span>
          </div>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn--secondary admin-btn--sm"
          onClick={logout}
          style={{ width: '100%', marginTop: '4px' }}
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
