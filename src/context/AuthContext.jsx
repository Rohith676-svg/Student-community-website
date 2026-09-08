import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import api from '../services/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from the backend
  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/auth/me');
      if (response.data.success) {
        setUserProfile(response.data.user);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUserProfile(null);
    }
  };

  // Register with email and password
  const register = async (email, password, profileData) => {
    // 1. Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // 2. We don't fetch `/auth/me` immediately here because we need to explicitly
    // POST the complete profile data to `/auth/profile`.
    // We get the token explicitly to attach to the immediate request.
    const token = await userCredential.user.getIdToken();
    
    // 3. Create Firestore profile via Backend
    const response = await api.post('/auth/profile', profileData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.data.success) {
      setUserProfile(response.data.user);
    }
    
    return userCredential;
  };

  // Login with email and password
  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
    // onAuthStateChanged will handle fetching the profile
  };

  // Login/Register with Google
  const loginWithGoogle = async () => {
    return signInWithPopup(auth, googleProvider);
    // onAuthStateChanged will handle fetching the profile/initializing a new student
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };

  // Get ID Token
  const getIdToken = async () => {
    if (currentUser) {
      return await currentUser.getIdToken();
    }
    return null;
  };

  // Refresh user profile
  const refreshUserProfile = async () => {
    if (currentUser) {
      await fetchUserProfile();
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserProfile();
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    getIdToken,
    refreshUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
