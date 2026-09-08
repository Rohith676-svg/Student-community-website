import api from '../../../src/services/api';

/**
 * Members Service
 * Retrieves real community members from the backend connected to Firestore users collection.
 */
export const membersService = {
  /**
   * Get all members with optional filtering and search
   */
  async getMembers(filters = {}) {
    try {
      const res = await api.get('/admin/members', { params: filters });
      return res.data.members || [];
    } catch (error) {
      console.error('Error fetching admin members:', error);
      return [];
    }
  },

  /**
   * Get single member by ID
   */
  async getMemberById(id) {
    try {
      const members = await this.getMembers();
      return members.find((m) => m.id === id || m.uid === id) || null;
    } catch (error) {
      console.error('Error fetching member by id:', error);
      return null;
    }
  },

  /**
   * Update member status (ACTIVE | INACTIVE | SUSPENDED)
   */
  async updateMemberStatus(id, newStatus) {
    const res = await api.patch(`/admin/members/${id}/status`, { status: newStatus });
    return res.data;
  },

  /**
   * Delete member (Admin only)
   */
  async deleteMember(id) {
    const res = await api.delete(`/admin/members/${id}`);
    return res.data.success;
  },
};
