import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { authService } from '../../services/authService';
import ThemeToggle from '../common/ThemeToggle';

export default function AdminLoginView() {
  const { login, authError } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Password reset state
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMsg, setResetMsg] = useState('');
  const [resetError, setResetError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(email.trim(), password);
    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    setResetMsg('');
    setResetError('');
    try {
      await authService.resetPassword(resetEmail || email);
      setResetMsg('Password reset instructions sent. Please check your email inbox.');
    } catch (err) {
      setResetError(err.message || 'Failed to send reset email.');
    } finally {
      setResetLoading(false);
    }
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

        {!showReset ? (
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="admin-form-label" htmlFor="admin-pass">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setShowReset(true);
                    setResetEmail(email);
                    setResetMsg('');
                    setResetError('');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--admin-accent)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    padding: 0,
                    textDecoration: 'underline'
                  }}
                >
                  Forgot password?
                </button>
              </div>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  id="admin-pass"
                  type={showPassword ? 'text' : 'password'}
                  className="admin-form-input"
                  style={{ paddingRight: '2.5rem' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.5rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--admin-muted)',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
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
        ) : (
          <form onSubmit={handleResetPassword}>
            <p style={{ fontSize: '0.8125rem', color: 'var(--admin-muted)', marginBottom: '1rem' }}>
              Enter your administrator email to receive a password reset link.
            </p>

            {resetMsg && (
              <div
                style={{
                  padding: '0.625rem',
                  backgroundColor: 'var(--admin-status-published-bg, rgba(46,133,64,0.1))',
                  color: '#2e8540',
                  border: '1px solid #2e8540',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.8125rem',
                  marginBottom: '1rem',
                }}
              >
                {resetMsg}
              </div>
            )}

            {resetError && (
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
                {resetError}
              </div>
            )}

            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="reset-admin-email">
                Admin Email
              </label>
              <input
                id="reset-admin-email"
                type="email"
                className="admin-form-input"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="admin-btn admin-btn--primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
              disabled={resetLoading}
            >
              {resetLoading ? 'Sending...' : 'Send Password Reset Link'}
            </button>

            <button
              type="button"
              className="admin-btn admin-btn--secondary"
              style={{ width: '100%', marginTop: '0.5rem' }}
              onClick={() => setShowReset(false)}
            >
              &larr; Back to Sign In
            </button>
          </form>
        )}

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
