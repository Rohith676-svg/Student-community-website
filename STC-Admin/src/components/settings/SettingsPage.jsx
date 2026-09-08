import React, { useState, useEffect } from 'react';
import { settingsService } from '../../services/settingsService';
import { useAdminTheme } from '../../context/AdminThemeContext';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function SettingsPage({ onShowToast }) {
  const { theme, toggleTheme } = useAdminTheme();
  const { user, isAuthenticated, toggleMockAuth } = useAdminAuth();
  const [settings, setSettings] = useState(settingsService.getSettings());

  useEffect(() => {
    setSettings(settingsService.getSettings());
  }, []);

  const handleTogglePreference = (key) => {
    const updated = settingsService.updateSettings({ [key]: !settings[key] });
    setSettings(updated);
    if (onShowToast) onShowToast('Preference updated');
  };

  const handleResetData = () => {
    if (
      window.confirm(
        'Reset all mock events, members, and registrations to their factory initial state?'
      )
    ) {
      try {
        localStorage.removeItem('stc_mock_members');
        localStorage.removeItem('stc_mock_events');
        localStorage.removeItem('stc_mock_registrations');
        if (onShowToast) onShowToast('Mock data reset to initial defaults');
        setTimeout(() => window.location.reload(), 300);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header__left">
          <span className="admin-page-header__eyebrow">CONFIGURATION</span>
          <h1 className="admin-page-header__title">Settings</h1>
          <p className="admin-page-header__desc">
            Interface preferences, theme configuration, and local frontend mock state
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '720px' }}>
        {/* Interface Preferences */}
        <div className="admin-card">
          <h3 className="admin-card__title">Interface & Theme</h3>
          <div className="admin-card__subtitle">Control panel appearance</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600 }}>Appearance Theme</div>
                <div style={{ fontSize: '12px', color: 'var(--admin-muted)' }}>
                  Current: {theme === 'dark' ? 'Editorial Dark' : 'Warm Paper Light (Default)'}
                </div>
              </div>
              <button
                type="button"
                className="admin-btn admin-btn--secondary admin-btn--sm"
                onClick={toggleTheme}
              >
                Toggle to {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
            </div>

            <hr style={{ borderColor: 'var(--admin-border)', borderWidth: '0.5px' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600 }}>Confirm Destructive Actions</div>
                <div style={{ fontSize: '12px', color: 'var(--admin-muted)' }}>
                  Require confirmation modal before deleting an event or member
                </div>
              </div>
              <button
                type="button"
                className={`admin-btn admin-btn--sm ${
                  settings.confirmDestructiveActions
                    ? 'admin-btn--primary'
                    : 'admin-btn--secondary'
                }`}
                onClick={() => handleTogglePreference('confirmDestructiveActions')}
              >
                {settings.confirmDestructiveActions ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>

        {/* Administrator Profile View */}
        <div className="admin-card">
          <h3 className="admin-card__title">Administrator Account</h3>
          <div className="admin-card__subtitle">Active frontend session</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--admin-accent)',
                color: 'var(--admin-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
              }}
            >
              {user?.avatar || 'AD'}
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>{user?.name || 'Administrator'}</div>
              <div style={{ fontSize: '12px', color: 'var(--admin-muted)' }}>{user?.email}</div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <span className="admin-badge admin-badge--published">
                {user?.role || 'ADMIN'}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '12px', color: 'var(--admin-muted)', lineHeight: 1.5 }}>
            Note: Authentication is currently managed via the frontend service layer.
            When the backend auth server is integrated, credentials and sessions will be validated against server tokens.
          </p>
        </div>

        {/* Development & Mock Data Management */}
        <div className="admin-card">
          <h3 className="admin-card__title">Development & Mock Storage</h3>
          <div className="admin-card__subtitle">Reset local sandbox state</div>

          <p style={{ fontSize: '13px', color: 'var(--admin-muted)', marginBottom: '1rem' }}>
            All additions, edits, and status changes made in this admin prototype are stored in your browser's local sandbox storage.
            You can restore initial starter records at any time.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="admin-btn admin-btn--secondary admin-btn--sm"
              onClick={handleResetData}
            >
              Reset Mock Data to Initial State
            </button>

            <button
              type="button"
              className="admin-btn admin-btn--secondary admin-btn--sm"
              onClick={toggleMockAuth}
              title="Test unauthenticated / login redirect flow"
            >
              Simulate {isAuthenticated ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
