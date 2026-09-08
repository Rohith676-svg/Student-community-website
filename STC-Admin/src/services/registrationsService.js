import { collectionGroup, onSnapshot } from 'firebase/firestore';
import { adminDb as db } from '../../../src/config/firebase';
import api from '../../../src/services/api';

/**
 * Registrations Service
 * Handles live event registrations and real-time Firestore subscriptions.
 */
export const registrationsService = {
  /**
   * Subscribe to real-time registration changes across all events
   */
  subscribeRegistrations(callback) {
    try {
      const unsub = onSnapshot(collectionGroup(db, 'registrations'), (snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        callback(list);
      }, (err) => {
        console.warn('Real-time registrations listener warning:', err.message);
      });
      return unsub;
    } catch (e) {
      console.warn('subscribeRegistrations error:', e);
      return () => {};
    }
  },

  /**
   * Get registrations with optional filters
   */
  async getRegistrations(filters = {}) {
    try {
      const res = await api.get('/admin/registrations', { params: filters });
      return res.data.registrations || [];
    } catch (error) {
      console.error('Error fetching admin registrations:', error);
      return [];
    }
  },

  /**
   * Update registration status (CONFIRMED | WAITLIST | CANCELLED)
   */
  async updateRegistrationStatus(id, newStatus, eventId = null) {
    const res = await api.patch(`/admin/registrations/${id}/status`, {
      status: newStatus,
      eventId
    });
    return res.data;
  },

  /**
   * Delete registration
   */
  async deleteRegistration(id, eventId = null) {
    const res = await api.delete(`/admin/registrations/${id}`, {
      params: { eventId }
    });
    return res.data.success;
  },
};
