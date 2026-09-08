import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminAuth as auth } from '../../../src/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from '../services/authService';

const AdminAuthContext = createContext();

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState('');
  // 'idle' | 'checking' | 'authorized' | 'denied'
  const [authPhase, setAuthPhase] = useState('checking');

  /**
   * After Firebase Auth confirms a user, verify their actual role via the backend.
   * This calls GET /api/auth/me which reads the role from Firestore users/{uid}.
   */
  const verifyRole = async (fbUser) => {
    if (!fbUser) {
      setUser(null);
      setIsAuthenticated(false);
      setAuthPhase('idle');
      return;
    }

    setAuthPhase('checking');

    try {
      const role = await authService.verifyAdminRole(fbUser);

      if (role === 'admin') {
        setUser({
          id: fbUser.uid,
          name: fbUser.displayName || 'Administrator',
          email: fbUser.email,
          role: role, // Real role from Firestore
          avatar: (fbUser.displayName || 'AD').substring(0, 2).toUpperCase()
        });
        setIsAuthenticated(true);
        setAuthPhase('authorized');
      } else {
        // Authenticated but NOT an admin — deny access
        setUser({
          id: fbUser.uid,
          email: fbUser.email,
          role: role || 'student',
        });
        setIsAuthenticated(false);
        setAuthPhase('denied');
        setAuthError('Access denied. This portal is restricted to administrators.');
      }
    } catch (err) {
      console.error('Role verification failed:', err);
      setUser(null);
      setIsAuthenticated(false);
      setAuthPhase('denied');
      setAuthError('Failed to verify administrator permissions. Please try again.');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        verifyRole(fbUser);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setAuthPhase('idle');
        setAuthError('');
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      setAuthError('');
      setAuthPhase('checking');
      await authService.login(email, password);
      // onAuthStateChanged will fire and call verifyRole automatically
      return true;
    } catch (err) {
      setAuthError(err.message || 'Login failed');
      setAuthPhase('idle');
      return false;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setAuthPhase('idle');
    setAuthError('');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        user,
        authError,
        authPhase,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}
