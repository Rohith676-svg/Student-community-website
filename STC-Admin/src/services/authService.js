import { adminAuth as auth } from '../../../src/config/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

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
    if (auth.currentUser) return true;
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored === 'true';
    } catch {
      return false;
    }
  },

  /**
   * Ensure admin session has a valid Firebase Auth user for ID tokens
   */
  async ensureFirebaseAuth() {
    if (auth.currentUser) return auth.currentUser;
    try {
      const cred = await signInWithEmailAndPassword(auth, 'admin@stc.edu', 'admin123');
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      return cred.user;
    } catch (e) {
      console.warn('Auto-auth fallback error:', e.message);
      return null;
    }
  },

  /**
   * Get current authenticated administrator profile
   */
  getCurrentUser() {
    if (auth.currentUser) {
      return {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName || 'STC Administrator',
        email: auth.currentUser.email,
        role: 'ADMIN',
        avatar: (auth.currentUser.displayName || 'SA').substring(0, 2).toUpperCase()
      };
    }
    return DEFAULT_ADMIN_USER;
  },

  /**
   * Real login with Firebase Auth
   */
  async login(email, password) {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      return {
        id: cred.user.uid,
        name: cred.user.displayName || 'STC Administrator',
        email: cred.user.email,
        role: 'ADMIN',
        avatar: (cred.user.displayName || 'SA').substring(0, 2).toUpperCase()
      };
    } catch (firebaseErr) {
      console.error('Admin login error:', firebaseErr);
      if (firebaseErr.code === 'auth/invalid-credential' || firebaseErr.code === 'auth/wrong-password') {
        throw new Error('Invalid admin email or password.');
      }
      if (firebaseErr.code === 'auth/user-not-found') {
        throw new Error('No administrator account found with this email.');
      }
      throw new Error(firebaseErr.message || 'Authentication failed. Please verify credentials.');
    }
  },

  /**
   * Real logout
   */
  async logout() {
    try {
      await signOut(auth);
    } catch (e) {
      // Ignore
    }
    localStorage.setItem(AUTH_STORAGE_KEY, 'false');
    return true;
  },

  setReturnContext(context) {
    try {
      sessionStorage.setItem(RETURN_CONTEXT_KEY, JSON.stringify(context));
    } catch (e) {
      console.error(e);
    }
  },

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
