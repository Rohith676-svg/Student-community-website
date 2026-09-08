/**
 * @typedef {'CONFIRMED' | 'WAITLIST' | 'CANCELLED'} RegistrationStatus
 * 
 * @typedef {Object} Registration
 * @property {string} id - Unique registration ID
 * @property {string} userId - ID of the registering student
 * @property {string} studentName - Student's full name
 * @property {string} email - Student's email
 * @property {'1' | '2' | '3' | '4'} year - Academic year
 * @property {string} department - Department / branch
 * @property {string} eventId - Associated STC event or internal hackathon ID
 * @property {string} eventTitle - Title of the event
 * @property {string} registeredAt - ISO timestamp of registration
 * @property {RegistrationStatus} status - Registration status
 */

export const REGISTRATION_STATUSES = {
  CONFIRMED: 'CONFIRMED',
  WAITLIST: 'WAITLIST',
  CANCELLED: 'CANCELLED',
};
