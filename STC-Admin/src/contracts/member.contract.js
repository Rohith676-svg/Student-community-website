/**
 * @typedef {Object} Member
 * @property {string} id - Unique identifier
 * @property {string} name - Full student name
 * @property {string} email - Academic or contact email
 * @property {'1' | '2' | '3' | '4'} year - Academic year of study
 * @property {'CSE' | 'AI & DS' | 'ECE' | 'EEE' | 'IT' | 'MECH' | 'CIVIL' | 'OTHER'} department - Department or branch
 * @property {string} joinedAt - ISO date string of community join timestamp
 * @property {'ACTIVE' | 'SUSPENDED'} status - Account status
 * @property {string} [rollNumber] - Optional student identification number
 */

export const MEMBER_DEPARTMENTS = [
  'CSE',
  'AI & DS',
  'ECE',
  'EEE',
  'IT',
  'MECH',
  'CIVIL',
  'OTHER',
];

export const MEMBER_YEARS = ['1', '2', '3', '4'];

export const MEMBER_STATUSES = ['ACTIVE', 'SUSPENDED'];
