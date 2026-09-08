import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import ThemeToggle from '../common/ThemeToggle';

export default function AdminLoginView() {
  const { login, authError } = useAdminAuth();
  const [email, setEmail] = useState('admin@stc.edu');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundColor: 'var(--admin-bg)',
      }}
    >
      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
        <ThemeToggle />
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          backgroundColor: 'var(--admin-surface)',
          border: '1px solid var(--admin-border)',
          borderRadius: 'var(--radius-sm)',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
        }}
      >
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1rem',
              backgroundColor: 'var(--admin-accent)',
              color: 'var(--admin-bg)',
              padding: '0.25rem 0.625rem',
              borderRadius: 'var(--radius-xs)',
              marginBottom: '0.75rem',
            }}
          >
            STC
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 600,
              letterSpacing: '-0.01em',
            }}
          >
            Operational Control Center
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--admin-muted)', marginTop: '0.25rem' }}>
            Authorized Administrator Access
          </p>
        </div>

        {authError && (
          <div
            style={{
              padding: '0.625rem',
              backgroundColor: 'var(--admin-status-unpublished-bg)',
              color: 'var(--admin-status-unpublished-text)',
              border: '1px solid var(--admin-status-unpublished-border)',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.8125rem',
              marginBottom: '1rem',
            }}
          >
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="admin-email">
              Admin Email
            </label>
            <input
              id="admin-email"
              type="email"
              className="admin-form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="admin-pass">
              Password
            </label>
            <input
              id="admin-pass"
              type="password"
              className="admin-form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="admin-btn admin-btn--primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In to Control Center'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <a
            href="../#/"
            style={{
              fontSize: '0.75rem',
              color: 'var(--admin-muted)',
              textDecoration: 'underline',
            }}
          >
            &larr; Return to STC Public Website
          </a>
        </div>
      </div>
    </div>
  );
}
