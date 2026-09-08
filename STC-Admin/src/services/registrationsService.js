import { INITIAL_MOCK_REGISTRATIONS } from '../data/mockRegistrations';
import { getStoredCollection, setStoredCollection } from './storageHelper';

const STORAGE_KEY = 'registrations';

/**
 * Registrations Service
 * Handles registrations for STC-managed events & hackathons only.
 */
export const registrationsService = {
  /**
   * Get registrations with optional filters
   */
  async getRegistrations(filters = {}) {
    await new Promise((r) => setTimeout(r, 70));

    let registrations = getStoredCollection(STORAGE_KEY, INITIAL_MOCK_REGISTRATIONS);
    const { eventId = 'ALL', department = 'ALL', year = 'ALL', status = 'ALL', search = '' } = filters;

    if (eventId !== 'ALL') {
      registrations = registrations.filter((r) => r.eventId === eventId);
    }

    if (department !== 'ALL') {
      registrations = registrations.filter((r) => r.department === department);
    }

    if (year !== 'ALL') {
      registrations = registrations.filter((r) => r.year === year);
    }

    if (status !== 'ALL') {
      registrations = registrations.filter((r) => r.status === status);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      registrations = registrations.filter(
        (r) =>
          r.studentName.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.eventTitle.toLowerCase().includes(q)
      );
    }

    return [...registrations];
  },

  /**
   * Register a student for an event (demonstrates duplicate prevention)
   */
  async registerForEvent(registrationData) {
    await new Promise((r) => setTimeout(r, 90));
    const registrations = getStoredCollection(STORAGE_KEY, INITIAL_MOCK_REGISTRATIONS);

    // Check duplicate
    const exists = registrations.some(
      (r) => r.eventId === registrationData.eventId && r.email === registrationData.email
    );

    if (exists) {
      throw new Error('You are already registered for this event.');
    }

    const newRegistration = {
      ...registrationData,
      id: `reg-${Date.now()}`,
      registeredAt: new Date().toISOString(),
      status: registrationData.status || 'CONFIRMED',
    };

    registrations.unshift(newRegistration);
    setStoredCollection(STORAGE_KEY, registrations);
    return newRegistration;
  },

  /**
   * Update status (CONFIRMED | WAITLIST | CANCELLED)
   */
  async updateRegistrationStatus(id, newStatus) {
    await new Promise((r) => setTimeout(r, 50));
    const registrations = getStoredCollection(STORAGE_KEY, INITIAL_MOCK_REGISTRATIONS);
    const index = registrations.findIndex((r) => r.id === id);
    if (index === -1) throw new Error('Registration not found');

    registrations[index] = { ...registrations[index], status: newStatus };
    setStoredCollection(STORAGE_KEY, registrations);
    return registrations[index];
  },

  /**
   * Delete registration
   */
  async deleteRegistration(id) {
    await new Promise((r) => setTimeout(r, 50));
    let registrations = getStoredCollection(STORAGE_KEY, INITIAL_MOCK_REGISTRATIONS);
    registrations = registrations.filter((r) => r.id !== id);
    setStoredCollection(STORAGE_KEY, registrations);
    return true;
  },
};
