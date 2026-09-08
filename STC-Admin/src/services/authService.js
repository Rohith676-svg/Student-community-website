/**
 * Frontend Authentication Abstraction
 * 
 * Provides mock authentication state and integration points.
 * When the backend developer connects real auth, they can replace this file's
 * implementation without modifying any admin UI components.
 */

const AUTH_STORAGE_KEY = 'stc_admin_auth_state';
const RETURN_CONTEXT_KEY = 'stc_auth_return_context';

const DEFAULT_ADMIN_USER = {
  id: 'admin-01',
  name: 'STC Administrator',
  email: 'admin@stc.edu',
  role: 'ADMIN',
  avatar: 'SA',
};

export const authService = {
  /**
   * Check if current session is authenticated as admin
   */
  isAuthenticated() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored === null) {
        // Default to true in development prototype for immediate usability
        return true;
      }
      return stored === 'true';
    } catch {
      return true;
    }
  },

  /**
   * Get current authenticated administrator profile
   */
  getCurrentUser() {
    return DEFAULT_ADMIN_USER;
  },

  /**
   * Simulated login
   */
  async login(email, password) {
    await new Promise((r) => setTimeout(r, 150));
    if (email && password) {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      return DEFAULT_ADMIN_USER;
    }
    throw new Error('Please provide valid administrator credentials');
  },

  /**
   * Simulated logout
   */
  async logout() {
    await new Promise((r) => setTimeout(r, 50));
    localStorage.setItem(AUTH_STORAGE_KEY, 'false');
    return true;
  },

  /**
   * Set return context (e.g. for internal hackathon registration flow)
   */
  setReturnContext(context) {
    try {
      sessionStorage.setItem(RETURN_CONTEXT_KEY, JSON.stringify(context));
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * Retrieve and clear return context
   */
  consumeReturnContext() {
    try {
      const raw = sessionStorage.getItem(RETURN_CONTEXT_KEY);
      if (raw) {
        sessionStorage.removeItem(RETURN_CONTEXT_KEY);
        return JSON.parse(raw);
      }
      return null;
    } catch {
      return null;
    }
  },
};
