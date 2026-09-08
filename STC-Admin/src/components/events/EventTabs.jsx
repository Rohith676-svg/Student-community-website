import React from 'react';

export default function EventTabs({ activeType, onSelectType, counts = {} }) {
  const tabs = [
    { id: 'ALL', label: 'All Events', count: counts.all },
    { id: 'STC_EVENT', label: 'STC Events', count: counts.stc },
    { id: 'INTERNAL_HACKATHON', label: 'Internal Hackathons', count: counts.internal },
    { id: 'EXTERNAL_HACKATHON', label: 'External Hackathons', count: counts.external },
  ];

  return (
    <div className="admin-tabs" role="tablist" aria-label="Event Categories">
      {tabs.map((tab) => {
        const isActive = activeType === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`admin-tab-btn ${isActive ? 'is-active' : ''}`}
            onClick={() => onSelectType(tab.id)}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span style={{ marginLeft: '6px', opacity: 0.7 }}>({tab.count})</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
