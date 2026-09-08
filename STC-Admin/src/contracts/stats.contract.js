/**
 * @typedef {Object} DepartmentCount
 * @property {string} department - Department code (e.g. CSE, AI & DS)
 * @property {number} count - Total members
 * @property {number} percentage - Share percentage rounded to 1 decimal place
 * 
 * @typedef {Object} YearCount
 * @property {string} year - Year label (e.g. 1st Year, 2nd Year)
 * @property {string} yearCode - '1' | '2' | '3' | '4'
 * @property {number} count - Total members
 * @property {number} percentage - Share percentage
 * 
 * @typedef {Object} OverviewStats
 * @property {number} totalMembers - Total active + suspended members
 * @property {number} stcEventsCount - Count of STC-organized events
 * @property {number} internalHackathonsCount - Count of internal hackathons
 * @property {number} externalHackathonsCount - Count of external hackathons
 * @property {DepartmentCount[]} departmentStats - Breakdown by branch
 * @property {YearCount[]} yearStats - Breakdown by year
 * @property {import('./registration.contract').Registration[]} recentRegistrations - Latest signups
 */
export {};
