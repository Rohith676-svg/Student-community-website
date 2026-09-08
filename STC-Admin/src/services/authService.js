import { adminAuth as auth } from '../../../src/config/firebase';
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import api from '../../../src/services/api';

const AUTH_STORAGE_KEY = 'stc_admin_auth_state';
const RETURN_CONTEXT_KEY = 'stc_auth_return_context';

export const authService = {
  /**
   * Check if current session is authenticated as admin
   */
  isAuthenticated() {
    return !!auth.currentUser;
  },

  /**
   * Get current authenticated administrator profile from Firebase Auth state.
   * Returns null if no user is signed in.
   */
  getCurrentUser() {
    if (auth.currentUser) {
      return {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName || 'Administrator',
        email: auth.currentUser.email,
        role: null, // Role must be verified via backend, never assumed
        avatar: (auth.currentUser.displayName || 'AD').substring(0, 2).toUpperCase()
      };
    }
    return null;
  },

  /**
   * Verify the current user's role by calling the backend.
   * Returns the Firestore role string ('admin', 'lead', 'student') or null.
   */
  async verifyAdminRole(fbUser = null) {
    try {
      const targetUser = fbUser || auth.currentUser;
      const headers = {};
      if (targetUser) {
        const token = await targetUser.getIdToken();
        headers.Authorization = `Bearer ${token}`;
      }
      const res = await api.get('/auth/me', { headers });
      if (res.data.success && res.data.user) {
        return (res.data.user.role || 'student').toLowerCase();
      }
      return null;
    } catch (error) {
      console.error('Failed to verify admin role:', error);
      return null;
    }
  },

  /**
   * Real login with Firebase Auth — requires explicit user-entered credentials
   */
  async login(email, password) {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      return {
        id: cred.user.uid,
        name: cred.user.displayName || 'Administrator',
        email: cred.user.email,
        role: null, // Must be verified separately via verifyAdminRole()
        avatar: (cred.user.displayName || 'AD').substring(0, 2).toUpperCase()
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
   * Real logout — clears Firebase Auth session and local storage flag
   */
  async logout() {
    try {
      await signOut(auth);
    } catch (e) {
      // Ignore sign-out errors
    }
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return true;
  },

  /**
   * Send password reset email
   */
  async resetPassword(email) {
    if (!email || !email.trim()) {
      throw new Error('Please enter your administrator email address.');
    }
    await sendPasswordResetEmail(auth, email.trim());
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
