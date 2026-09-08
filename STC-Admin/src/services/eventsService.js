import { collection, onSnapshot } from 'firebase/firestore';
import { adminDb as db } from '../../../src/config/firebase';
import api from '../../../src/services/api';

/**
 * Events Service
 * Connects directly to the Express backend and Firestore real-time subscriptions.
 */
export const eventsService = {
  /**
   * Subscribe to real-time events changes from Firestore
   */
  subscribeEvents(callback) {
    try {
      const unsub = onSnapshot(collection(db, 'events'), (snapshot) => {
        const events = [];
        snapshot.forEach((doc) => {
          events.push({ id: doc.id, ...doc.data() });
        });
        callback(events);
      }, (err) => {
        console.warn('Real-time events listener warning:', err.message);
      });
      return unsub;
    } catch (e) {
      console.warn('subscribeEvents error:', e);
      return () => {};
    }
  },

  /**
   * Get all events with optional filtering
   */
  async getEvents(filters = {}) {
    try {
      const res = await api.get('/events', {
        params: { all: 'true', ...filters }
      });
      return res.data.events || [];
    } catch (error) {
      console.error('Error fetching events from backend:', error);
      return [];
    }
  },

  /**
   * Get event by ID
   */
  async getEventById(id) {
    try {
      const res = await api.get(`/events/${id}`);
      return res.data.event || null;
    } catch (error) {
      console.error('Error fetching event by id:', error);
      return null;
    }
  },

  /**
   * Create a new event
   */
  async createEvent(eventData) {
    const res = await api.post('/events', eventData);
    return res.data.event;
  },

  /**
   * Update an existing event
   */
  async updateEvent(id, updateData) {
    const res = await api.patch(`/events/${id}`, updateData);
    return res.data.event;
  },

  /**
   * Toggle publish status (PUBLISHED <-> UNPUBLISHED)
   */
  async togglePublishStatus(id) {
    const res = await api.patch(`/events/${id}/status`);
    return { id, status: res.data.status };
  },

  /**
   * Delete an event
   */
  async deleteEvent(id) {
    const res = await api.delete(`/events/${id}`);
    return res.data.success;
  },
};
