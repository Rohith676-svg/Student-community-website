import React from 'react';
import { MEMBER_DEPARTMENTS, MEMBER_YEARS } from '../../contracts/member.contract';

export default function MembersToolbar({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  year,
  onYearChange,
  status,
  onStatusChange,
  totalCount,
}) {
  return (
    <div className="admin-toolbar">
      <div className="admin-toolbar__filters">
        {/* Search input */}
        <div style={{ position: 'relative', minWidth: '220px' }}>
          <input
            type="text"
            className="admin-input"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search members"
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

        {/* Department Filter */}
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

        {/* Year Filter */}
        <select
          className="admin-select"
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
          aria-label="Filter by academic year"
        >
          <option value="ALL">All Years</option>
          {MEMBER_YEARS.map((y) => (
            <option key={y} value={y}>
              {y}th Year
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          className="admin-select"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Filter by account status"
        >
          <option value="ALL">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="SUSPENDED">Suspended</option>
        </select>
      </div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--admin-muted)' }}>
        SHOWING {totalCount} MEMBERS
      </div>
    </div>
  );
}
