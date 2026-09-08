import { INITIAL_MOCK_MEMBERS } from '../data/mockMembers';
import { getStoredCollection, setStoredCollection } from './storageHelper';

const STORAGE_KEY = 'members';

/**
 * Members Service
 * Provides mock member operations that return Promises,
 * ready to be swapped with fetch/axios requests when backend is implemented.
 */
export const membersService = {
  /**
   * Get all members with optional filtering and search
   */
  async getMembers(filters = {}) {
    // Simulate slight async delay
    await new Promise((r) => setTimeout(r, 80));

    let members = getStoredCollection(STORAGE_KEY, INITIAL_MOCK_MEMBERS);

    const { search = '', department = 'ALL', year = 'ALL', status = 'ALL' } = filters;

    if (search.trim()) {
      const q = search.toLowerCase();
      members = members.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          (m.rollNumber && m.rollNumber.toLowerCase().includes(q))
      );
    }

    if (department !== 'ALL') {
      members = members.filter((m) => m.department === department);
    }

    if (year !== 'ALL') {
      members = members.filter((m) => m.year === year);
    }

    if (status !== 'ALL') {
      members = members.filter((m) => m.status === status);
    }

    return [...members];
  },

  /**
   * Get single member by ID
   */
  async getMemberById(id) {
    await new Promise((r) => setTimeout(r, 50));
    const members = getStoredCollection(STORAGE_KEY, INITIAL_MOCK_MEMBERS);
    return members.find((m) => m.id === id) || null;
  },

  /**
   * Update member status (ACTIVE | SUSPENDED)
   */
  async updateMemberStatus(id, newStatus) {
    await new Promise((r) => setTimeout(r, 60));
    const members = getStoredCollection(STORAGE_KEY, INITIAL_MOCK_MEMBERS);
    const index = members.findIndex((m) => m.id === id);
    if (index === -1) throw new Error('Member not found');

    members[index] = { ...members[index], status: newStatus };
    setStoredCollection(STORAGE_KEY, members);
    return members[index];
  },

  /**
   * Delete member
   */
  async deleteMember(id) {
    await new Promise((r) => setTimeout(r, 60));
    let members = getStoredCollection(STORAGE_KEY, INITIAL_MOCK_MEMBERS);
    members = members.filter((m) => m.id !== id);
    setStoredCollection(STORAGE_KEY, members);
    return true;
  },
};
