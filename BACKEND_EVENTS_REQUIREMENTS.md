# STC Events Module Requirements

This document outlines the requirements and expected architecture for the upcoming Phase 3: Events & Applications module.

## Core Features Required

The future backend events module must support:
- **Event Creation & Management**: Leads and Admins must be able to create, update, and cancel events.
- **Event Listing**: Public endpoints to fetch upcoming and past events.
- **Event Details**: Fetching detailed information about a specific event.
- **Event Registration**: Authenticated students must be able to register for events.
- **Registration Management**: Leads and Admins must be able to view and manage event registrations (approve, reject, waitlist).
- **Registration History**: Students must be able to view their own registration history.

## Registration Constraints

- **Authentication**: Only authenticated users with the `student` role (or `lead`/`admin`) can register.
- **Capacity Control**: Events must have an optional maximum capacity. Registrations exceeding capacity should be placed on a waitlist.
- **Idempotency (Duplicate Prevention)**: A student can only register once per event. Subsequent registration attempts must return a `409 Conflict` or silently succeed without duplicating records.
- **Isolation**: If secondary actions (like sending confirmation emails) fail, the core registration transaction MUST NOT be rolled back. 

## Firestore Schema Design

### `events` Collection
```json
{
  "id": "event_uuid",
  "title": "STC Hackathon 2026",
  "description": "...",
  "date": "2026-10-15T10:00:00Z",
  "venue": "Main Auditorium",
  "mode": "offline", // offline, online, hybrid
  "capacity": 150,
  "registrationCount": 0,
  "status": "published", // draft, published, cancelled, completed
  "url": "https://...",
  "createdBy": "lead_uid",
  "createdAt": Timestamp,
  "updatedAt": Timestamp
}
```

### `events/{eventId}/registrations` Subcollection
Using the Student's Firebase UID as the Document ID guarantees idempotency at the database level.
```json
{
  "uid": "student_uid", // Document ID = uid
  "displayName": "Student Name",
  "email": "student@email.com",
  "rollNumber": "25BFA...",
  "status": "confirmed", // confirmed, waitlisted, cancelled
  "registrationId": "REG-ABC123XYZ", // A short, readable ID for QR codes/tickets
  "registeredAt": Timestamp
}
```

## Integration with Email Service

The email service has already been implemented in `server/src/services/email.service.js`.

When the Event Registration endpoint successfully writes to the `events/{eventId}/registrations` subcollection, it MUST call the email service asynchronously:

```javascript
import emailService from '../services/email.service.js';

// ... inside the registration route handler ...
// 1. Transactionally increment capacity and write registration
// 2. Upon successful write:
emailService.sendEventRegistrationEmail(
  userProfile, // From req.user or fetched profile
  eventData,   // The event document data
  registrationId // The generated short ID
).catch(err => console.error("Non-fatal email error", err));

// 3. Return 200 OK to the client
```

Future email integrations to be added to `email.service.js` based on the events module:
- `sendEventReminderEmail()`
- `sendEventCancellationEmail()`
- `sendWaitlistPromotionEmail()`
- `sendCertificateEmail()`
