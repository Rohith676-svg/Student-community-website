import React, { useState, useEffect, useCallback } from 'react';
import { AdminThemeProvider } from './context/AdminThemeContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import AdminLayout from './components/layout/AdminLayout';
import OverviewDashboard from './components/overview/OverviewDashboard';
import MembersPage from './components/members/MembersPage';
import EventsManagement from './components/events/EventsManagement';
import RegistrationsPage from './components/registrations/RegistrationsPage';
import SettingsPage from './components/settings/SettingsPage';
import AdminLoginView from './components/auth/AdminLoginView';
import Toast from './components/common/Toast';
import { membersService } from './services/membersService';
import { eventsService } from './services/eventsService';
import { registrationsService } from './services/registrationsService';
import './admin.css';

function AdminAppInner() {
  const { isAuthenticated, authPhase, authError, logout } = useAdminAuth();

  // Hash-based routing for admin screens
  const getRouteFromHash = () => {
    const hash = window.location.hash || '';
    if (hash.includes('members')) return 'members';
    if (hash.includes('events')) return 'events';
    if (hash.includes('registrations')) return 'registrations';
    if (hash.includes('settings')) return 'settings';
    return 'overview';
  };

  const [currentRoute, setCurrentRoute] = useState(getRouteFromHash);
  const [counts, setCounts] = useState({ members: 0, events: 0, registrations: 0 });
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  }, []);

  const handleNavigate = (route) => {
    setCurrentRoute(route);
    window.location.hash = `#/${route}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Sync hash changes (e.g. browser back/forward)
  useEffect(() => {
    const handleHash = () => {
      setCurrentRoute(getRouteFromHash());
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Update badge counts
  useEffect(() => {
    if (!isAuthenticated) return; // Don't load data if not authorized
    async function loadCounts() {
      try {
        const [m, e, r] = await Promise.all([
          membersService.getMembers(),
          eventsService.getEvents(),
          registrationsService.getRegistrations(),
        ]);
        setCounts({
          members: m.length,
          events: e.length,
          registrations: r.length,
        });
      } catch (err) {
        console.error(err);
      }
    }
    loadCounts();

    const unsubEvents = eventsService.subscribeEvents?.(() => loadCounts());
    const unsubRegs = registrationsService.subscribeRegistrations?.(() => loadCounts());

    return () => {
      if (unsubEvents) unsubEvents();
      if (unsubRegs) unsubRegs();
    };
  }, [currentRoute, isAuthenticated]);

  // --- Auth gating: do NOT render admin UI until role is verified ---

  // Phase: checking — show loading, never flash the admin dashboard
  if (authPhase === 'checking') {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text)',
      }}>
        <div style={{ fontSize: '1.125rem', fontWeight: 500 }}>Verifying administrator permissions…</div>
      </div>
    );
  }

  // Phase: denied — authenticated user is NOT an admin
  if (authPhase === 'denied') {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '1rem',
        backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text)',
      }}>
        <div style={{
          padding: '2rem', maxWidth: '400px', textAlign: 'center',
          backgroundColor: 'var(--admin-surface)', border: '1px solid var(--admin-border)',
          borderRadius: 'var(--radius-sm)',
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem', color: '#e53e3e' }}>
            Access Denied
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--admin-muted)', marginBottom: '1rem' }}>
            {authError || 'Your account does not have administrator privileges.'}
          </p>
          <button
            className="admin-btn admin-btn--primary"
            style={{ width: '100%' }}
            onClick={() => logout()}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  // Phase: idle (not authenticated) — show login
  if (!isAuthenticated) {
    return <AdminLoginView />;
  }

  return (
    <AdminLayout
      currentRoute={currentRoute}
      onNavigate={handleNavigate}
      counts={counts}
    >
      {currentRoute === 'overview' && (
        <OverviewDashboard onNavigate={handleNavigate} onShowToast={showToast} />
      )}
      {currentRoute === 'members' && (
        <MembersPage onShowToast={showToast} />
      )}
      {currentRoute === 'events' && (
        <EventsManagement onShowToast={showToast} />
      )}
      {currentRoute === 'registrations' && (
        <RegistrationsPage onShowToast={showToast} />
      )}
      {currentRoute === 'settings' && (
        <SettingsPage onShowToast={showToast} />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </AdminLayout>
  );
}

export default function AdminApp() {
  return (
    <AdminThemeProvider>
      <AdminAuthProvider>
        <AdminAppInner />
      </AdminAuthProvider>
    </AdminThemeProvider>
  );
}
