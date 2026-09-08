import api from '../../../src/services/api';

/**
 * Statistics Service
 * Retrieves live calculated statistics from the backend computed directly from Firestore.
 */
export const statsService = {
  async getOverviewStats() {
    try {
      const res = await api.get('/admin/stats');
      if (res.data.success && res.data.stats) {
        return res.data.stats;
      }
    } catch (error) {
      console.error('Error fetching admin overview stats:', error);
    }

    return {
      totalMembers: 0,
      stcEventsCount: 0,
      internalHackathonsCount: 0,
      externalHackathonsCount: 0,
      departmentStats: [],
      yearStats: [],
      recentRegistrations: [],
      totalRegistrations: 0,
    };
  },
};
