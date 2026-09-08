import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayout({ currentRoute, onNavigate, counts, children }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleNavigate = (route) => {
    onNavigate(route);
    setMobileNavOpen(false);
  };

  return (
    <div className="admin-shell">
      {/* Mobile Drawer Backdrop */}
      <div
        className={`admin-backdrop ${mobileNavOpen ? 'is-open' : ''}`}
        onClick={() => setMobileNavOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar with mobile toggle state */}
      <div className={`admin-sidebar-wrapper ${mobileNavOpen ? 'is-open' : ''}`}>
        <AdminSidebar
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          counts={counts}
        />
      </div>

      {/* Main App Container */}
      <div className="admin-main">
        <AdminHeader
          currentRoute={currentRoute}
          onToggleMobileNav={() => setMobileNavOpen(!mobileNavOpen)}
        />
        <main className="admin-content" id="admin-main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
