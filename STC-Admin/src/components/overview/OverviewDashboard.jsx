import React, { useEffect, useState } from 'react';
import { statsService } from '../../services/statsService';
import { registrationsService } from '../../services/registrationsService';
import { eventsService } from '../../services/eventsService';
import CommunityStats from './CommunityStats';
import DepartmentStats from './DepartmentStats';
import YearStats from './YearStats';
import RecentRegistrations from './RecentRegistrations';
import { MetricSkeleton, TableSkeleton } from '../common/LoadingSkeleton';

export default function OverviewDashboard({ onNavigate }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadStats() {
      try {
        const data = await statsService.getOverviewStats();
        if (isMounted) setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadStats();

    const unsubRegs = registrationsService.subscribeRegistrations?.(() => {
      loadStats();
    });
    const unsubEvents = eventsService.subscribeEvents?.(() => {
      loadStats();
    });

    return () => {
      isMounted = false;
      if (unsubRegs) unsubRegs();
      if (unsubEvents) unsubEvents();
    };
  }, []);

  if (loading) {
    return (
      <div>
        <div className="admin-page-header">
          <div className="admin-page-header__left">
            <span className="admin-page-header__eyebrow">CONTROL CENTER</span>
            <h1 className="admin-page-header__title">Overview</h1>
            <p className="admin-page-header__desc">Live community statistics and operational summary</p>
          </div>
        </div>
        <div className="admin-metrics-grid">
          <MetricSkeleton />
          <MetricSkeleton />
          <MetricSkeleton />
          <MetricSkeleton />
        </div>
        <TableSkeleton rows={4} cols={5} />
      </div>
    );
  }

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header__left">
          <span className="admin-page-header__eyebrow">CONTROL CENTER</span>
          <h1 className="admin-page-header__title">Overview</h1>
          <p className="admin-page-header__desc">
            Live community statistics and operational summary
          </p>
        </div>
        <div className="admin-page-header__actions">
          <button
            type="button"
            className="admin-btn admin-btn--primary admin-btn--sm"
            onClick={() => onNavigate('events')}
          >
            + Manage Events
          </button>
        </div>
      </div>

      {/* 4 Core Summary Metric Cards */}
      <CommunityStats stats={stats} />

      {/* 2-Column Distribution Split: Department-wise and Year-wise */}
      <div className="admin-grid-2col">
        <DepartmentStats departmentStats={stats?.departmentStats} />
        <YearStats yearStats={stats?.yearStats} />
      </div>

      {/* Recent Registrations Table */}
      <RecentRegistrations
        registrations={stats?.recentRegistrations}
        onViewAll={() => onNavigate('registrations')}
      />
    </div>
  );
}
