import React from 'react';

export default function CommunityStats({ stats }) {
  const {
    totalMembers = 0,
    stcEventsCount = 0,
    internalHackathonsCount = 0,
    externalHackathonsCount = 0,
  } = stats || {};

  return (
    <div className="admin-metrics-grid">
      <div className="admin-metric-card">
        <span className="admin-metric-card__label">TOTAL MEMBERS</span>
        <span className="admin-metric-card__val">
          {totalMembers.toLocaleString()}
        </span>
        <span className="admin-metric-card__sub">Registered student community</span>
      </div>

      <div className="admin-metric-card">
        <span className="admin-metric-card__label">STC EVENTS</span>
        <span className="admin-metric-card__val">
          {String(stcEventsCount).padStart(2, '0')}
        </span>
        <span className="admin-metric-card__sub">Workshops, meetups & inauguration</span>
      </div>

      <div className="admin-metric-card">
        <span className="admin-metric-card__label">INTERNAL HACKATHONS</span>
        <span className="admin-metric-card__val">
          {String(internalHackathonsCount).padStart(2, '0')}
        </span>
        <span className="admin-metric-card__sub">STC-organized campus sprints</span>
      </div>

      <div className="admin-metric-card">
        <span className="admin-metric-card__label">EXTERNAL HACKATHONS</span>
        <span className="admin-metric-card__val">
          {String(externalHackathonsCount).padStart(2, '0')}
        </span>
        <span className="admin-metric-card__sub">Curated third-party opportunities</span>
      </div>
    </div>
  );
}
