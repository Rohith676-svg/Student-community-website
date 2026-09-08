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
  const { isAuthenticated } = useAdminAuth();

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
  }, [currentRoute]);

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
