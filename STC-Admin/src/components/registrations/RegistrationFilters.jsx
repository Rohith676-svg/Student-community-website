import React from 'react';
import { MEMBER_DEPARTMENTS, MEMBER_YEARS } from '../../contracts/member.contract';

export default function RegistrationFilters({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  year,
  onYearChange,
  status,
  onStatusChange,
  eventId,
  onEventChange,
  events = [],
}) {
  return (
    <div className="admin-toolbar">
      <div className="admin-toolbar__filters">
        <div style={{ position: 'relative', minWidth: '220px' }}>
          <input
            type="text"
            className="admin-input"
            placeholder="Search student or event..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search registrations"
            style={{ width: '100%', paddingLeft: '28px' }}
          />
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              position: 'absolute',
              left: '9px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--admin-muted)',
              pointerEvents: 'none',
            }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Filter by event */}
        <select
          className="admin-select"
          value={eventId}
          onChange={(e) => onEventChange(e.target.value)}
          aria-label="Filter by event"
        >
          <option value="ALL">All Internal Events</option>
          {events.map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.title || ev.name}
            </option>
          ))}
        </select>

        {/* Filter by Department */}
        <select
          className="admin-select"
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
          aria-label="Filter by department"
        >
          <option value="ALL">All Departments</option>
          {MEMBER_DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* Filter by Year */}
        <select
          className="admin-select"
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
          aria-label="Filter by year"
        >
          <option value="ALL">All Years</option>
          {MEMBER_YEARS.map((y) => (
            <option key={y} value={y}>
              {y}th Year
            </option>
          ))}
        </select>

        {/* Filter by Status */}
        <select
          className="admin-select"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Filter by registration status"
        >
          <option value="ALL">All Statuses</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="WAITLIST">Waitlist</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>
    </div>
  );
}
