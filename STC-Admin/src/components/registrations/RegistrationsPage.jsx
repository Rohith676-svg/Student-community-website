import React, { useState, useEffect, useCallback } from 'react';
import { registrationsService } from '../../services/registrationsService';
import { eventsService } from '../../services/eventsService';
import RegistrationFilters from './RegistrationFilters';
import RegistrationTable from './RegistrationTable';
import { TableSkeleton } from '../common/LoadingSkeleton';

export default function RegistrationsPage({ onShowToast }) {
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [eventId, setEventId] = useState('ALL');
  const [department, setDepartment] = useState('ALL');
  const [year, setYear] = useState('ALL');
  const [status, setStatus] = useState('ALL');

  useEffect(() => {
    async function loadEvents() {
      // Load STC Events and Internal Hackathons for filter options
      const allEvents = await eventsService.getEvents({});
      const internalOnly = allEvents.filter(
        (e) => e.type === 'STC_EVENT' || e.type === 'INTERNAL_HACKATHON'
      );
      setEvents(internalOnly);
    }
    loadEvents();
  }, []);

  const fetchRegistrations = useCallback(async () => {
    try {
      setLoading(true);
      const data = await registrationsService.getRegistrations({
        search,
        eventId,
        department,
        year,
        status,
      });
      setRegistrations(data);
    } catch (err) {
      console.error(err);
      if (onShowToast) onShowToast('Failed to load registrations', 'error');
    } finally {
      setLoading(false);
    }
  }, [search, eventId, department, year, status, onShowToast]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  // Real-time Firestore updates
  useEffect(() => {
    if (registrationsService.subscribeRegistrations) {
      const unsub = registrationsService.subscribeRegistrations(() => {
        fetchRegistrations();
      });
      return () => unsub();
    }
  }, [fetchRegistrations]);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const target = registrations.find(r => r.id === id || r.userId === id);
      await registrationsService.updateRegistrationStatus(id, newStatus, target?.eventId);
      if (onShowToast) onShowToast(`Registration status updated to ${newStatus}`);
      fetchRegistrations();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to update registration status';
      if (onShowToast) onShowToast(msg, 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      const target = registrations.find(r => r.id === id || r.userId === id);
      await registrationsService.deleteRegistration(id, target?.eventId);
      if (onShowToast) onShowToast('Registration record removed');
      fetchRegistrations();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to remove registration';
      if (onShowToast) onShowToast(msg, 'error');
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header__left">
          <span className="admin-page-header__eyebrow">PARTICIPATION & ROSTER</span>
          <h1 className="admin-page-header__title">Registrations</h1>
          <p className="admin-page-header__desc">
            Student sign-ups for STC-managed workshops, inaugural sessions, and internal hackathons
          </p>
        </div>
      </div>

      <RegistrationFilters
        search={search}
        onSearchChange={setSearch}
        eventId={eventId}
        onEventChange={setEventId}
        department={department}
        onDepartmentChange={setDepartment}
        year={year}
        onYearChange={setYear}
        status={status}
        onStatusChange={setStatus}
        events={events}
      />

      {loading ? (
        <TableSkeleton rows={5} cols={8} />
      ) : (
        <RegistrationTable
          registrations={registrations}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
