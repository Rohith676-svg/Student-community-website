/**
 * @typedef {'STC_EVENT' | 'INTERNAL_HACKATHON' | 'EXTERNAL_HACKATHON'} EventType
 * @typedef {'DRAFT' | 'PUBLISHED' | 'UNPUBLISHED'} EventStatus
 * @typedef {'OPEN' | 'CLOSED'} RegistrationStatus
 * 
 * @typedef {Object} STCEvent
 * @property {string} id - Unique identifier
 * @property {string} title - Event title
 * @property {'STC_EVENT'} type - Fixed discriminator
 * @property {string} description - Editorial description
 * @property {string} date - Event date or 'TBA'
 * @property {string} time - Event time or 'TBA'
 * @property {string} location - Physical or online location or 'TBA'
 * @property {string} category - e.g. 'Inauguration', 'Workshop', 'Meetup'
 * @property {string} coverImage - Image URL or placeholder
 * @property {EventStatus} status - Publication state
 * @property {string} [registrationDeadline] - Optional ISO date string
 * @property {number} [capacity] - Maximum attendees
 * @property {string} [additionalInfo] - Extra notes
 * @property {string} createdAt - ISO date string
 * @property {string} updatedAt - ISO date string
 * 
 * @typedef {Object} InternalHackathon
 * @property {string} id - Unique identifier
 * @property {string} name - Hackathon name
 * @property {'INTERNAL_HACKATHON'} type - Fixed discriminator
 * @property {string} description - Detailed problem & hackathon scope
 * @property {string} date - Event date
 * @property {string} time - Schedule details
 * @property {string} location - Venue or 'Online'
 * @property {'ONLINE' | 'OFFLINE'} mode - Mode of participation
 * @property {string} coverImage - Banner image URL
 * @property {RegistrationStatus} registrationStatus - Open or Closed for entries
 * @property {EventStatus} status - Publication state
 * @property {string} [registrationDeadline] - Cut-off date
 * @property {number} [maximumParticipants] - Capacity limit
 * @property {string} [rules] - Rules & guidelines
 * @property {string} [problemStatement] - Core tracks/statements
 * @property {string} [teamSize] - e.g. '2-4 Members'
 * @property {string} [prizes] - Prize pool details
 * @property {string} [resources] - Useful links & starter kits
 * @property {string} createdAt - ISO date string
 * @property {string} updatedAt - ISO date string
 * 
 * @typedef {Object} ExternalHackathon
 * @property {string} id - Unique identifier
 * @property {string} name - Hackathon name
 * @property {'EXTERNAL_HACKATHON'} type - Fixed discriminator
 * @property {string} organizer - Organizing entity or platform
 * @property {string} description - Short brief
 * @property {string} startDate - Start date string
 * @property {string} endDate - End date string
 * @property {'ONLINE' | 'OFFLINE'} mode - Mode
 * @property {string} location - City or 'Online'
 * @property {string} registrationUrl - Direct external application URL
 * @property {string} platform - Devfolio, Unstop, MLH, etc.
 * @property {EventStatus} status - Publication state
 * @property {string[]} [categories] - 'AI', 'WEB', 'HARDWARE', 'OTHER'
 * @property {string} [prizes] - Prize information
 * @property {string} [coverImage] - Banner URL
 * @property {string} createdAt - ISO date string
 * @property {string} updatedAt - ISO date string
 * 
 * @typedef {STCEvent | InternalHackathon | ExternalHackathon} AnyEvent
 */

export const EVENT_TYPES = {
  STC_EVENT: 'STC_EVENT',
  INTERNAL_HACKATHON: 'INTERNAL_HACKATHON',
  EXTERNAL_HACKATHON: 'EXTERNAL_HACKATHON',
};

export const EVENT_STATUSES = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  UNPUBLISHED: 'UNPUBLISHED',
};
