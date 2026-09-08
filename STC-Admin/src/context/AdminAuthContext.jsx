import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminAuth as auth } from '../../../src/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from '../services/authService';

const AdminAuthContext = createContext();

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => authService.isAuthenticated());
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    // Check if session was active or auto-login default admin
    const storedState = localStorage.getItem('stc_admin_auth_state');
    if (storedState === 'true' && !auth.currentUser) {
      authService.ensureFirebaseAuth();
    }

    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setUser({
          id: fbUser.uid,
          name: fbUser.displayName || 'STC Administrator',
          email: fbUser.email,
          role: 'ADMIN',
          avatar: (fbUser.displayName || 'SA').substring(0, 2).toUpperCase()
        });
        setIsAuthenticated(true);
      } else {
        const stored = localStorage.getItem('stc_admin_auth_state');
        if (stored === 'true') {
          // If stored is true, try to re-authenticate
          authService.ensureFirebaseAuth();
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      setAuthError('');
      const adminUser = await authService.login(email, password);
      setUser(adminUser);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      setAuthError(err.message || 'Login failed');
      return false;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        user,
        authError,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}
