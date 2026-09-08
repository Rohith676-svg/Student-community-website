# BACKEND REQUIREMENTS - STC Website

## A. Existing Frontend Pages

Based on the repository analysis, the STC website is a single-page application structure utilizing hash-based routing. The existing pages are:

1. **Home Page (`/` or `#home`)**
   - **Components:** `Hero`, `Purpose`, `FacultyPreview`, `FinalCTA`
   - **Functionality:** Primarily a static landing page introducing the STC, its purpose, and faculty preview. Includes animations and a final Call to Action.
2. **Leads Page (`#/leads`)**
   - **Components:** `LeadsPage` (and `NetworkCanvas`)
   - **Functionality:** Displays the community leads (technical and non-technical teams) with interactive scroll tracking and member selection.
3. **Events Page (`#/events`)**
   - **Components:** `EventsPage` (and `EventsNetworkCanvas`)
   - **Functionality:** Displays external hackathons and events. Includes filtering by category (e.g., AI, WEB, HARDWARE) and mode (ONLINE/OFFLINE), as well as an accordion-style expansion for details.
4. **Roadmaps Page (`#/roadmaps`)**
   - **Components:** `RoadmapsPage` (and `RoadmapsHeroCanvas`)
   - **Functionality:** Displays learning roadmaps with stages, filtering, and detailed expanding sections for each domain.

## B. Existing Forms

**Current Status:** There are **NO** HTML forms (`<form>`) or input elements (`<input>`) currently implemented in the frontend repository. 
- All interactions are navigation, theme toggling, scrolling, and filtering of static data.
- There are no submission fields for "Join STC" or "Contact Us" yet.
- There is no user login/registration interface in the frontend yet.

Since the prompt expects an architecture that supports role-based auth, applications, and events, these forms will need to be built in the frontend eventually, but currently, there are none to document.

## C. Existing Hardcoded Data

1. **Community Leads (`LeadsPage.jsx`)**
   - `NON_TECH_MEMBERS` array (and other implicit leads like Sumanth, Kusmitha).
   - *Classification:* Should move to Firestore. This should become admin-managed later so the team can be updated year-over-year without touching code.
2. **Hackathons/Events (`events/hackathonsData.js`)**
   - `EXTERNAL_HACKATHONS` array containing name, date, mode, categories, location, description, and external URLs.
   - `HACKATHON_FILTERS`, `MODE_FILTERS`.
   - *Classification:* Events (`EXTERNAL_HACKATHONS`) should move to Firestore. Filters can remain static constants in the frontend. Admin should manage new events.
3. **Roadmaps (`roadmaps/roadmapsData.js`)**
   - Large static dataset outlining learning paths.
   - *Classification:* Can remain static for now (or move to Firestore if the curriculum changes frequently). Given the complexity, static is fine initially, but moving to Firestore enables admin updates.
4. **Faculty Preview / Purpose text (`Purpose.jsx`, `FacultyPreview.jsx`)**
   - *Classification:* Can remain static.

## D. Backend Requirements

Even though the frontend lacks forms, the backend architecture must be built to support a full-stack transition.

1. **Events API**
   - `GET /api/events` - Public - Fetch all events/hackathons
   - `GET /api/events/:id` - Public - Fetch single event
   - `POST /api/events` - Admin - Create event
   - `PATCH /api/events/:id` - Admin - Update event
   - `DELETE /api/events/:id` - Admin - Delete event
   - *Firestore:* `events` collection
2. **Leads API**
   - `GET /api/leads` - Public - Fetch community leads
   - `POST /api/leads` - Admin - Add lead
   - `PATCH /api/leads/:id` - Admin - Update lead
   - `DELETE /api/leads/:id` - Admin - Delete lead
   - *Firestore:* `leads` collection
3. **Roadmaps API (Optional for Phase 1/2)**
   - `GET /api/roadmaps` - Public - Fetch roadmaps
   - *Firestore:* `roadmaps` collection
4. **Auth & Users API (Future-proofing for Phase 2/3)**
   - `GET /api/users/profile` - Authenticated (Any) - Get user profile
   - `PATCH /api/users/profile` - Authenticated (Any) - Update profile
   - `GET /api/users` - Admin - List all users
   - *Firestore:* `users` collection
5. **Applications API (Future-proofing for Phase 6)**
   - `POST /api/applications` - Authenticated (Student) - Submit join application
   - `GET /api/applications` - Admin - List applications
   - `PATCH /api/applications/:id` - Admin - Update application status
   - *Firestore:* `applications` collection
6. **Announcements API (Future-proofing for Phase 7)**
   - `GET /api/announcements` - Public - Fetch announcements
   - `POST /api/announcements` - Admin - Create announcement
   - *Firestore:* `announcements` collection

## E. Firebase Requirements

1. **Firebase Authentication**
   - Methods: Email/Password and/or Google Sign-in (to be decided when frontend UI is added).
   - Roles: `admin`, `lead`, `student`. Managed via Firestore `users` collection or Custom Claims.
2. **Firestore Collections**
   - `events`
   - `events/{eventId}/registrations` (Subcollection for attendees)
   - `leads`
   - `users`
   - `applications`
   - `announcements`
   - `roadmaps`
3. **Firebase Storage**
   - Required for storing user profile pictures, event banners, and lead profile images (e.g., `sumanth.jpeg`, `Kusmitha.png` currently in `src/assets`).
   - Path structure: `/leads/{id}/profile.jpg`, `/events/{id}/banner.jpg`
4. **Security Considerations**
   - Firebase Admin SDK must be initialized strictly on the backend using a securely stored Service Account Key JSON.
   - Frontend must only receive the public Firebase config.
   - Express backend will use `firebase-admin` to verify ID tokens sent by the frontend via `Authorization: Bearer <token>`.
