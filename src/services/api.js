import axios from 'axios';
import { auth, adminAuth } from '../config/firebase';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding the auth token
api.interceptors.request.use(
  async (config) => {
    // Check if running in admin portal context or public student context
    const isAdminContext = typeof window !== 'undefined' && 
      (window.location.pathname.includes('/STC-Admin') || window.location.pathname.includes('/admin'));

    const user = isAdminContext
      ? (adminAuth?.currentUser || auth?.currentUser)
      : (auth?.currentUser || adminAuth?.currentUser);

    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can add global error handling here (e.g., token expired -> logout)
    return Promise.reject(error);
  }
);

export default api;
