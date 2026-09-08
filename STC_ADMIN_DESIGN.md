# STC ADMIN — DESIGN & IMPLEMENTATION SPECIFICATION

## 1. Purpose

Build a secure, functional admin dashboard for the Student Technology Community (STC).

The admin system should allow authorized STC administrators to:

- View community statistics
- View and manage registered members
- Add, edit, publish, unpublish, and remove STC events
- Add, edit, publish, unpublish, and remove external hackathons
- View registrations for internal STC events and hackathons
- Manage event information displayed on the public Events & Hackathons page

The admin interface is an operational product, not a showcase page.

It should feel like the backend/control room of STC: precise, structured, fast, clean, and easy to operate.

---

## 2. Core Principle

The public STC website is:

> Editorial → Human → Cinematic → Story-driven

The admin dashboard should be:

> Functional → Structured → Information-dense → Fast

Do not copy the public site's scroll-heavy storytelling into the admin dashboard.

Use the same STC visual identity, typography, colors, spacing language, and restrained interaction style, while prioritizing usability.

An administrator should be able to add or update an event in seconds.

---

## 3. Existing STC Design System

The admin page must integrate with the existing STC design system.

Do NOT create a separate visual identity.

### Light Theme — Default

```text
Background:       #F4F1EA
Surface:          #EAE6DD
Text:             #171717
Muted:            #6F6B64
Border:           #D5D0C6

Accent:           #222528
Accent Dark:      #0F1011
Graphite:         #3A3E42
Muted Graphite:   #52575C
```

The existing STC light theme remains the default.

Do not redesign the current public site's light theme.

### Dark Theme

Use the existing STC dark theme implementation.

The admin interface must correctly inherit the existing theme system.

Do not create a third theme.

---

## 4. Typography

Use the existing STC typography system.

### Space Grotesk

Use for:

- Major headings
- Page titles
- Important statistics
- Section headings

### Inter

Use for:

- Navigation
- Body text
- Form labels
- Buttons
- Tables
- Descriptions

### JetBrains Mono

Use sparingly for:

- IDs
- Dates
- Status labels
- Metadata
- Small technical information

Do not overuse monospace typography.

---

## 5. Admin Layout

Use a clean application-style layout.

```text
┌──────────────────────────────────────────────────────────────┐
│ STC ADMIN                              ADMIN / ACCOUNT       │
├───────────────┬──────────────────────────────────────────────┤
│               │                                              │
│ Overview      │                                              │
│ Members       │              Main Content                    │
│ Events        │                                              │
│ Registrations │                                              │
│               │                                              │
│ Settings      │                                              │
└───────────────┴──────────────────────────────────────────────┘
```

### Desktop

Use:

- Persistent sidebar
- Main content area
- Clear page hierarchy
- Comfortable content width
- Dense but readable information layout

### Tablet

Reduce sidebar width or convert it into collapsible navigation.

### Mobile

Use:

- Top navigation/header
- Drawer/menu for admin navigation
- Full-width content
- Responsive tables/forms

Do not allow horizontal page overflow.

---

## 6. Admin Navigation

Primary navigation:

```text
OVERVIEW
MEMBERS
EVENTS
REGISTRATIONS
SETTINGS
```

Utility area:

```text
Admin name
Account
Logout
```

Keep navigation minimal.

Do not add unnecessary dashboard categories.

---

## 7. Overview Dashboard

The Overview page should answer:

- How many members are currently registered?
- How many STC events exist?
- How many internal hackathons exist?
- How many external hackathons are listed?
- What are the latest registrations?

### Primary Statistics

#### Total Members

The main community statistic.

```text
TOTAL MEMBERS

1,248
```

The number above is only an example. Never hardcode it.

#### Event Summary

```text
STC EVENTS          08
INTERNAL HACKATHONS 04
EXTERNAL HACKATHONS 17
```

These numbers must come from the database.

Do not use fake statistics.

---

## 8. Department-wise Statistics

Provide a clear breakdown of registered members by department/branch.

Example:

```text
DEPARTMENT-WISE MEMBERS

CSE                  420
AI & DS              186
ECE                  164
EEE                  118
IT                   142
Mechanical            96
Civil                 72
Other                 50
```

The exact departments must come from member records.

The administrator should not manually maintain these counts.

The system calculates them automatically from member data.

### Visualization

Prefer a clean horizontal bar/list visualization.

Avoid:

- 3D charts
- Pie-chart overload
- Decorative graphs
- Excessive colors

Use the STC charcoal palette.

---

## 9. Year-wise Statistics

Show the number of members in each academic year.

Example:

```text
YEAR-WISE MEMBERS

1st Year          312
2nd Year          428
3rd Year          356
4th Year          152
```

Counts must be calculated automatically from member records.

Use a simple editorial bar/list treatment.

Do not turn this into a complicated analytics dashboard.

---

## 10. Members

The Members section is for viewing and managing community members.

### Member Information

Required fields:

- Full name
- Email
- Year
- Department / Branch
- Joined date
- Account status

Optional:

- Profile image, if supported by the existing member system

Do NOT add:

- Interests
- Member growth analytics
- Unnecessary personal information
- Fake engagement metrics

---

## 11. Members List

Provide a searchable member table.

```text
MEMBERS

Search members...

NAME                 EMAIL             YEAR       DEPARTMENT
─────────────────────────────────────────────────────────────
Rohith Joseph        ...               3rd        CSE
...
```

Useful filters:

- Year
- Department
- Account status

Useful actions:

- View member
- Disable/suspend account if required
- Remove member if administrator deletion is supported

Do not expose sensitive information unnecessarily.

---

## 12. Events Management

Events are divided into:

```text
STC EVENTS
INTERNAL HACKATHONS
EXTERNAL HACKATHONS
```

Recommended interface:

```text
EVENTS

[ STC EVENTS ] [ INTERNAL HACKATHONS ] [ EXTERNAL HACKATHONS ]

                                      + ADD EVENT
```

Use tabs or another simple navigation method.

Do not use a huge collection of cards.

---

## 13. STC Events

STC Events are organized by the Student Technology Community.

Examples:

- STC Inauguration
- Workshops
- Seminars
- Meetups
- Community sessions

### Event Fields

Required:

- Event title
- Description
- Date
- Time
- Location
- Event type/category
- Cover image
- Status

Optional:

- Registration deadline
- Registration requirement
- Registration capacity
- Additional information

### Status

```text
DRAFT
PUBLISHED
UNPUBLISHED
```

Only published events appear on the public website.

---

## 14. Internal Hackathons

Internal hackathons are hosted and managed by STC.

Their registration is handled by the STC platform.

### Fields

Required:

- Hackathon name
- Description
- Date
- Time
- Location / Online
- Cover image
- Registration status
- Status

Optional:

- Registration deadline
- Maximum participants
- Rules
- Problem statement
- Team size
- Prize information
- Additional resources

### Registration Authentication

Internal hackathons require STC authentication.

If a visitor is not logged in and attempts to register:

```text
User
  ↓
Internal Hackathon
  ↓
REGISTER NOW
  ↓
Authentication check
  ↓
Not logged in
  ↓
LOGIN / SIGN UP
```

After successful login/signup:

```text
LOGIN / SIGN UP
       ↓
Return to the selected hackathon
       ↓
Continue registration
```

Do NOT send the user to the generic homepage after authentication.

Preserve the intended hackathon/event route.

---

## 15. External Hackathons

External hackathons are organized by third-party platforms or organizations.

STC only displays and curates them.

Examples may include hackathons hosted on:

- Devfolio
- Unstop
- Other verified platforms

### Fields

Required:

- Hackathon name
- Organizer
- Description
- Start date
- End date
- Online / Offline
- Location, when applicable
- Registration URL
- Platform/source
- Status

Optional:

- Registration deadline
- Technologies/tags
- Prize information
- Cover image
- Featured status

### Registration Behavior

External hackathons do NOT use STC's internal registration system.

The public page should send users to the official external registration destination.

```text
EXPLORE / REGISTER
        ↓
External registration page
```

Do not collect STC registration data for external hackathons unless explicitly required later.

---

## 16. Add Event Flow

```text
EVENTS
  ↓
ADD EVENT
  ↓
SELECT TYPE
  ├── STC EVENT
  ├── INTERNAL HACKATHON
  └── EXTERNAL HACKATHON
  ↓
FORM
  ↓
SAVE DRAFT / PUBLISH
```

Do not make the administrator fill fields irrelevant to the selected event type.

The form should dynamically show fields based on event type.

---

## 17. Event Editing

Every existing event should provide:

```text
EDIT
UNPUBLISH
DELETE
```

Use confirmation for destructive actions.

Example:

> Delete this event?
>
> This action cannot be undone.

Avoid accidental deletion.

---

## 18. Event Table

Use a structured table/list rather than large event cards.

```text
EVENTS

TITLE                    TYPE                DATE        STATUS
───────────────────────────────────────────────────────────────
STC Inauguration         STC Event           TBA         DRAFT
Hackathon Alpha          Internal Hackathon  20 SEP      PUBLISHED
NexHack 2.0              External            25 SEP      PUBLISHED
```

Useful filters:

- Event type
- Status
- Date

Useful actions:

- Edit
- View
- Publish
- Unpublish
- Delete

---

## 19. Registrations

The Registrations section should show registrations for STC-managed internal events/hackathons.

Do not include external hackathon registrations because those happen on external platforms.

Example:

```text
REGISTRATIONS

EVENT: INTERNAL HACKATHON ALPHA

NAME                 EMAIL                 YEAR       DEPARTMENT
────────────────────────────────────────────────────────────────
Student Name         ...                   3rd        CSE
...
```

Useful filters:

- Event
- Year
- Department
- Registration date

Useful information:

- Student name
- Email
- Year
- Department
- Registration date
- Registration status

Do not expose unnecessary personal information.

---

## 20. Authentication & Authorization

The admin dashboard must not be publicly accessible.

Use authentication and authorization.

```text
/admin
   ↓
Is authenticated?
   ├── NO → Login
   └── YES
        ↓
Is authorized as admin?
   ├── NO → Access denied
   └── YES → Admin dashboard
```

Do not rely on hiding the admin link from the navbar as security.

The backend/API must also enforce authorization.

A user should not be able to access admin functionality by manually entering an admin URL.

---

## 21. Login Protection

Admin routes must be protected at both:

### Frontend level

Prevent unauthorized navigation to admin screens.

### Backend level

Protect:

- Member management
- Event creation
- Event editing
- Event deletion
- Publishing
- Registration management
- Admin settings

Never rely only on frontend checks.

---

## 22. Data Architecture

Use a real backend/database architecture.

Recommended conceptual entities:

```text
User
├── id
├── name
├── email
├── year
├── department
├── role
├── status
└── joinedAt

Event
├── id
├── title
├── type
├── description
├── date
├── startTime
├── endTime
├── location
├── image
├── registrationUrl
├── status
├── createdAt
└── updatedAt

Registration
├── id
├── userId
├── eventId
├── registeredAt
└── status
```

Event type:

```text
STC_EVENT
INTERNAL_HACKATHON
EXTERNAL_HACKATHON
```

Do not duplicate event models unnecessarily.

---

## 23. Statistics Architecture

Statistics must be derived from the member database.

```text
Total Members
= count(all active members)

Department Statistics
= group members by department

Year Statistics
= group members by year
```

Do not manually store duplicate counts unless there is a strong performance reason.

This prevents statistics from becoming inconsistent.

---

## 24. Public Website Integration

The admin system is the content-management layer for the public STC website.

```text
                 STC ADMIN
                     │
                     ▼
                 STC API
                     │
                     ▼
                  DATABASE
                     │
            ┌────────┴────────┐
            ▼                 ▼
     Public Events       Admin Statistics
         Page              & Members
```

When an administrator publishes an event:

```text
Admin creates event
        ↓
Save to database
        ↓
Publish
        ↓
Public Events page displays it
```

Do not hardcode event data into the public frontend if the backend/database is implemented.

---

## 25. Existing Events Data

The current STC Events section contains:

### STC Inauguration

```text
Date: TBA
Time: TBA
Location: TBA
```

Do NOT invent missing information.

The administrator should be able to fill these values later.

---

## 26. Empty States

Design intentional empty states.

### No STC Events

```text
NO EVENTS YET

Nothing has been published here yet.
```

### No External Hackathons

```text
NO HACKATHONS LISTED

New opportunities will appear here when available.
```

### No Registrations

```text
NO REGISTRATIONS YET

Registrations will appear here when students sign up.
```

Do not leave blank screens.

---

## 27. Loading States

Use clean loading states for:

- Dashboard statistics
- Members
- Events
- Registrations

Prefer restrained skeletons or simple loading indicators.

Do not use elaborate animations.

---

## 28. Error Handling

Errors should be clear and actionable.

Examples:

```text
Unable to load events.

Please try again.
```

```text
Unable to publish this event.

Check the required fields and try again.
```

Do not show raw backend errors to users.

---

## 29. Form UX

Forms should have:

- Clear labels
- Required field indicators
- Helpful validation
- Inline error messages
- Proper input types
- Date/time pickers where appropriate
- Image upload/preview where supported
- Save Draft
- Publish

Do not hide important information inside tooltips.

---

## 30. Confirmation & Feedback

After successful actions, provide concise feedback.

```text
Event published successfully.
```

```text
Event saved as draft.
```

```text
Member updated successfully.
```

Keep feedback subtle.

Do not use giant modal celebrations for ordinary CRUD operations.

---

## 31. Visual Language

Use:

- Warm off-white background in light mode
- Charcoal surfaces
- Thin borders
- Strong typography
- Small corner radii
- Minimal shadows
- Generous but functional spacing
- Clear alignment
- Editorial data presentation

The admin page can use denser spacing than the public site.

---

## 32. Avoid

Do NOT create:

- Generic SaaS dashboard aesthetics
- Neon colors
- Purple/blue gradients
- Glassmorphism
- Excessive rounded cards
- Huge colorful statistic cards
- 3D charts
- Fake analytics
- Gamification
- XP systems
- Badges
- Unnecessary animations
- Excessive shadows
- Stock images
- AI-generated people
- Decorative visual clutter

The admin page should look like STC, not a random dashboard template.

---

## 33. Motion

Use motion only where it improves usability.

Allowed:

- Page transitions
- Sidebar transitions
- Modal transitions
- Table/filter updates
- Subtle button feedback
- Form state transitions

Avoid:

- Scroll hijacking
- Large parallax
- Constant movement
- Particle effects
- Bouncing elements
- Excessive text animations

Respect:

```text
prefers-reduced-motion
```

---

## 34. Responsive Behavior

The admin system must work on:

- Desktop
- Laptop
- Tablet
- Mobile

On mobile:

- Sidebar becomes a drawer/menu
- Tables become responsive
- Forms become single-column
- Statistics recompose naturally
- Actions remain accessible

Do not simply shrink desktop layouts.

---

## 35. Accessibility

Follow accessible web practices:

- Semantic HTML
- Proper form labels
- Keyboard navigation
- Visible focus states
- Sufficient contrast
- Accessible buttons
- Accessible modals
- Screen-reader-friendly status messages
- Meaningful table headings
- Reduced-motion support

Do not rely on color alone to communicate status.

---

## 36. Performance

Keep the admin application lightweight.

Use:

- Efficient API requests
- Proper loading states
- Pagination for large member/event lists
- Debounced search where appropriate
- Optimized images
- Lazy loading where useful
- Clean event listener management

Do not load unnecessary animation libraries.

---

## 37. Component Architecture

Adapt this to the existing project's architecture rather than creating a parallel system.

Suggested structure:

```text
Admin
├── AdminLayout
├── AdminSidebar
├── AdminHeader
│
├── Overview
│   ├── CommunityStats
│   ├── DepartmentStats
│   ├── YearStats
│   ├── EventSummary
│   └── RecentRegistrations
│
├── Members
│   ├── MembersToolbar
│   ├── MembersTable
│   └── MemberDetails
│
├── Events
│   ├── EventsToolbar
│   ├── EventTabs
│   ├── EventTable
│   ├── EventForm
│   └── EventDetails
│
├── Registrations
│   ├── RegistrationFilters
│   └── RegistrationTable
│
└── Settings
```

Reuse existing shared components where possible.

---

## 38. Routing

Add dedicated admin routes:

```text
/admin
/admin/members
/admin/events
/admin/registrations
/admin/settings
```

Protect all admin routes.

Do not expose admin functionality through the public navigation.

The public website should remain focused on students and community discovery.

---

## 39. Admin Entry Point

Do not add a prominent "Admin" item to the public navbar.

The admin area should have its own protected route.

A subtle footer/admin access mechanism can be added later if required, but security must never depend on obscurity.

---

## 40. Settings

Keep the first version of Settings minimal.

Possible settings:

- Community name
- Community description
- Admin account management
- Basic public contact information

Do not build a huge CMS settings panel.

---

## 41. Data Validation

Validate data on both frontend and backend.

Examples:

- Required event title
- Valid date
- Valid time
- Valid registration URL
- Valid email
- Valid year
- Valid department
- Valid event type
- Valid status

Never trust frontend validation alone.

---

## 42. Security Requirements

The implementation must:

- Protect admin routes
- Protect admin API endpoints
- Validate user permissions server-side
- Validate incoming data
- Avoid exposing secrets in frontend code
- Store credentials securely
- Use environment variables for secrets
- Prevent unauthorized event manipulation
- Prevent unauthorized registration manipulation

Do not expose database credentials or API secrets in client-side code.

---

## 43. Implementation Instructions

Before coding:

1. Read this entire specification.
2. Inspect the existing STC project.
3. Inspect the current public Home/Landing page.
4. Inspect Leads.
5. Inspect Events & Hackathons.
6. Inspect Roadmaps.
7. Inspect navbar and footer.
8. Inspect the current theme system.
9. Inspect shared components.
10. Inspect existing backend/API architecture.
11. Inspect existing authentication, if implemented.
12. Inspect the current database/data model, if implemented.

Then implement the admin system using the existing architecture.

Do NOT rewrite existing public pages.

Do NOT create a second theme system.

Do NOT create a separate unrelated component library.

Reuse existing styles, tokens, components, routing conventions, and utilities wherever appropriate.

---

## 44. Implementation Priority

### Phase 1 — Admin Foundation

- Admin route
- Authentication/authorization
- Admin layout
- Sidebar
- Header
- Theme integration

### Phase 2 — Overview

- Total members
- STC event count
- Internal hackathon count
- External hackathon count
- Department-wise statistics
- Year-wise statistics
- Recent registrations

### Phase 3 — Members

- Member list
- Search
- Filters
- Member details
- Status management

### Phase 4 — Events

- STC events
- Internal hackathons
- External hackathons
- Event creation
- Event editing
- Publish/unpublish
- Delete
- Event filtering

### Phase 5 — Registrations

- Internal event registrations
- Internal hackathon registrations
- Filtering
- Registration details

### Phase 6 — Public Integration

Verify that published events appear correctly on the public Events page and that registration/authentication behavior works correctly.

---

## 45. Quality Bar

The final admin experience should feel like a real production system.

It should be:

- Clean
- Fast
- Secure
- Responsive
- Accessible
- Easy to maintain
- Visually consistent with STC
- Data-driven
- Practical for daily use

An administrator should be able to:

```text
Login
  ↓
See community statistics
  ↓
Check members
  ↓
Add an event
  ↓
Publish it
  ↓
See it on the public Events page
  ↓
View internal registrations
```

without confusion.

---

## 46. Final Experience

The admin system should not compete with the public STC website.

The public website says:

> **FIND YOUR PEOPLE. BUILD WHAT'S NEXT.**

The admin system quietly makes that experience possible.

It should feel like:

> **The infrastructure behind the community.**

Functional first.  
Beautiful where it matters.  
Simple where it doesn't.

---

## 47. Final Do-Not-Break Rules

While implementing:

- Do NOT redesign the existing Light Theme.
- Do NOT change existing public page layouts unnecessarily.
- Do NOT remove existing functionality.
- Do NOT introduce a new visual identity.
- Do NOT hardcode community statistics.
- Do NOT hardcode event-management data when a backend/database exists.
- Do NOT invent missing event dates, times, or locations.
- Do NOT require STC login for external hackathon registration.
- DO require authentication for internal STC event/hackathon registration.
- DO return users to the intended internal event after login/signup.
- DO enforce admin authorization on the backend.
- DO calculate department-wise and year-wise member statistics from actual member records.
- DO keep member data limited to necessary information.
- DO keep the admin interface practical and fast.
