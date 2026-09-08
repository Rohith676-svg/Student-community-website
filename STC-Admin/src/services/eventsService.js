import { INITIAL_MOCK_EVENTS } from '../data/mockEvents';
import { getStoredCollection, setStoredCollection } from './storageHelper';

const STORAGE_KEY = 'events';

/**
 * Events Service
 * Manages STC Events, Internal Hackathons, and External Hackathons.
 * Returns Promises so UI code is fully asynchronous and ready for API swapping.
 */
export const eventsService = {
  /**
   * Get all events with optional filtering
   */
  async getEvents(filters = {}) {
    await new Promise((r) => setTimeout(r, 80));

    let events = getStoredCollection(STORAGE_KEY, INITIAL_MOCK_EVENTS);
    const { type = 'ALL', status = 'ALL', search = '' } = filters;

    if (type !== 'ALL') {
      events = events.filter((e) => e.type === type);
    }

    if (status !== 'ALL') {
      events = events.filter((e) => e.status === status);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      events = events.filter((e) => {
        const title = (e.title || e.name || '').toLowerCase();
        const desc = (e.description || '').toLowerCase();
        const loc = (e.location || '').toLowerCase();
        return title.includes(q) || desc.includes(q) || loc.includes(q);
      });
    }

    return [...events];
  },

  /**
   * Get event by ID
   */
  async getEventById(id) {
    await new Promise((r) => setTimeout(r, 50));
    const events = getStoredCollection(STORAGE_KEY, INITIAL_MOCK_EVENTS);
    return events.find((e) => e.id === id) || null;
  },

  /**
   * Create a new event
   */
  async createEvent(eventData) {
    await new Promise((r) => setTimeout(r, 100));
    const events = getStoredCollection(STORAGE_KEY, INITIAL_MOCK_EVENTS);

    const newEvent = {
      ...eventData,
      id: eventData.id || `event-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    events.unshift(newEvent);
    setStoredCollection(STORAGE_KEY, events);
    return newEvent;
  },

  /**
   * Update an existing event
   */
  async updateEvent(id, updateData) {
    await new Promise((r) => setTimeout(r, 80));
    const events = getStoredCollection(STORAGE_KEY, INITIAL_MOCK_EVENTS);
    const index = events.findIndex((e) => e.id === id);
    if (index === -1) throw new Error('Event not found');

    events[index] = {
      ...events[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    setStoredCollection(STORAGE_KEY, events);
    return events[index];
  },

  /**
   * Toggle publish status (PUBLISHED <-> UNPUBLISHED)
   */
  async togglePublishStatus(id) {
    await new Promise((r) => setTimeout(r, 60));
    const events = getStoredCollection(STORAGE_KEY, INITIAL_MOCK_EVENTS);
    const index = events.findIndex((e) => e.id === id);
    if (index === -1) throw new Error('Event not found');

    const current = events[index].status;
    const nextStatus = current === 'PUBLISHED' ? 'UNPUBLISHED' : 'PUBLISHED';
    events[index] = {
      ...events[index],
      status: nextStatus,
      updatedAt: new Date().toISOString(),
    };

    setStoredCollection(STORAGE_KEY, events);
    return events[index];
  },

  /**
   * Delete an event
   */
  async deleteEvent(id) {
    await new Promise((r) => setTimeout(r, 80));
    let events = getStoredCollection(STORAGE_KEY, INITIAL_MOCK_EVENTS);
    events = events.filter((e) => e.id !== id);
    setStoredCollection(STORAGE_KEY, events);
    return true;
  },
};
