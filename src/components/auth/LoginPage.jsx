import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

export default function LoginPage({ onNavigate }) {
  const { login, loginWithGoogle, resetPassword } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot password flow
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMsg, setResetMsg] = useState('');
  const [resetError, setResetError] = useState('');

  const handleError = (err) => {
    console.error(err);
    if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
      setError('Invalid email or password.');
    } else if (err.code === 'auth/account-exists-with-different-credential') {
      setError('An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.');
    } else if (err.code === 'auth/unauthorized-domain') {
      setError('This domain is not authorized in Firebase Console. Add student-community-website-ui.onrender.com to Firebase Console > Authentication > Settings > Authorized domains.');
    } else if (err.code === 'auth/popup-closed-by-user') {
      setError('Google sign-in popup was closed before completing.');
    } else {
      setError(err.message || 'Failed to sign in. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email.trim(), password);
      onNavigate('home');
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      onNavigate('home');
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    setResetMsg('');
    setResetError('');
    try {
      await resetPassword(resetEmail || email);
      setResetMsg('Password reset instructions sent. Please check your email inbox.');
    } catch (err) {
      setResetError(err.message || 'Failed to send reset email.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        
        {error && <div className="auth-error">{error}</div>}
        
        {!showReset ? (
          <>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label htmlFor="password">Password</label>
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
                      color: 'var(--stc-accent, #3b82f6)',
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
                    type={showPassword ? 'text' : 'password'} 
                    id="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', paddingRight: '2.5rem' }}
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
                      color: 'var(--stc-text-muted, #6b7280)',
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
              
              <button disabled={loading} type="submit" className="auth-btn primary">
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            
            <div className="auth-divider">OR</div>
            
            <button disabled={loading} onClick={handleGoogleSignIn} className="auth-btn google">
              <svg className="google-icon" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            
            <div className="auth-link">
              Don't have an account? <a href="#/register" onClick={(e) => { e.preventDefault(); onNavigate('register'); }}>Sign up here</a>
            </div>
          </>
        ) : (
          <form className="auth-form" onSubmit={handleResetPassword}>
            <p style={{ fontSize: '0.875rem', color: 'var(--stc-text-muted, #6b7280)', marginBottom: '1rem' }}>
              Enter your email address to receive a link to reset your password.
            </p>

            {resetMsg && (
              <div style={{ padding: '0.75rem', background: 'rgba(34,197,94,0.1)', color: '#16a34a', border: '1px solid #22c55e', borderRadius: '4px', fontSize: '0.8125rem', marginBottom: '1rem' }}>
                {resetMsg}
              </div>
            )}

            {resetError && (
              <div className="auth-error" style={{ marginBottom: '1rem' }}>
                {resetError}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="reset-email">Email</label>
              <input 
                type="email" 
                id="reset-email" 
                required 
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>

            <button disabled={resetLoading} type="submit" className="auth-btn primary">
              {resetLoading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <button 
              type="button" 
              className="auth-btn"
              style={{ background: 'transparent', border: '1px solid var(--stc-border)', color: 'var(--stc-text-primary)' }}
              onClick={() => setShowReset(false)}
            >
              &larr; Back to Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
