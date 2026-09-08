import { membersService } from './membersService';
import { eventsService } from './eventsService';
import { registrationsService } from './registrationsService';
import { MEMBER_DEPARTMENTS, MEMBER_YEARS } from '../contracts/member.contract';

/**
 * Statistics Service
 * Computes all dashboard statistics dynamically from member and event records.
 * Never returns hardcoded fake metrics.
 */
export const statsService = {
  async getOverviewStats() {
    const [members, events, registrations] = await Promise.all([
      membersService.getMembers(),
      eventsService.getEvents(),
      registrationsService.getRegistrations(),
    ]);

    const totalMembers = members.length;

    // Event counts by discriminator
    const stcEventsCount = events.filter((e) => e.type === 'STC_EVENT').length;
    const internalHackathonsCount = events.filter((e) => e.type === 'INTERNAL_HACKATHON').length;
    const externalHackathonsCount = events.filter((e) => e.type === 'EXTERNAL_HACKATHON').length;

    // Department statistics dynamically grouped from member records
    const deptMap = {};
    MEMBER_DEPARTMENTS.forEach((dept) => {
      deptMap[dept] = 0;
    });

    members.forEach((m) => {
      const d = m.department || 'OTHER';
      deptMap[d] = (deptMap[d] || 0) + 1;
    });

    const departmentStats = Object.entries(deptMap)
      .map(([department, count]) => ({
        department,
        count,
        percentage: totalMembers > 0 ? Math.round((count / totalMembers) * 1000) / 10 : 0,
      }))
      .sort((a, b) => b.count - a.count); // Sort descending by count

    // Academic Year statistics dynamically grouped from member records
    const yearLabels = {
      '1': '1st Year',
      '2': '2nd Year',
      '3': '3rd Year',
      '4': '4th Year',
    };

    const yearStats = MEMBER_YEARS.map((yearCode) => {
      const count = members.filter((m) => m.year === yearCode).length;
      return {
        yearCode,
        year: yearLabels[yearCode] || `${yearCode}th Year`,
        count,
        percentage: totalMembers > 0 ? Math.round((count / totalMembers) * 1000) / 10 : 0,
      };
    });

    // Recent 5 registrations
    const recentRegistrations = [...registrations]
      .sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt))
      .slice(0, 5);

    return {
      totalMembers,
      stcEventsCount,
      internalHackathonsCount,
      externalHackathonsCount,
      departmentStats,
      yearStats,
      recentRegistrations,
    };
  },
};
