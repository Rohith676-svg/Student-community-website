import React, { createContext, useContext, useState } from 'react';
import { authService } from '../services/authService';

const AdminAuthContext = createContext();

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => authService.isAuthenticated());
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [authError, setAuthError] = useState('');

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
    setIsAuthenticated(false);
  };

  const toggleMockAuth = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login('admin@stc.edu', 'mockpassword');
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        user,
        authError,
        login,
        logout,
        toggleMockAuth,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}
