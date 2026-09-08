import React from 'react';
import ThemeToggle from '../common/ThemeToggle';

export default function AdminHeader({ currentRoute, onToggleMobileNav }) {
  const routeLabels = {
    overview: 'Overview',
    members: 'Members Management',
    events: 'Events & Hackathons',
    registrations: 'Internal Registrations',
    settings: 'Settings & Preferences',
  };

  return (
    <header className="admin-header">
      <div className="admin-header__left">
        <button
          type="button"
          className="admin-header__menu-btn"
          onClick={onToggleMobileNav}
          aria-label="Toggle navigation menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="admin-header__breadcrumb">
          <span>STC ADMIN</span>
          <span>/</span>
          <span className="admin-header__breadcrumb-active">
            {routeLabels[currentRoute] || currentRoute.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="admin-header__right">
        <ThemeToggle />
      </div>
    </header>
  );
}
