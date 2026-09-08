import React, { useState, useEffect, useCallback } from 'react';
import { eventsService } from '../../services/eventsService';
import EventTabs from './EventTabs';
import EventsToolbar from './EventsToolbar';
import EventTable from './EventTable';
import EventFormModal from './EventFormModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import { TableSkeleton } from '../common/LoadingSkeleton';

export default function EventsManagement({ onShowToast }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [activeType, setActiveType] = useState('ALL');
  const [status, setStatus] = useState('ALL');
  const [search, setSearch] = useState('');

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deletingEvent, setDeletingEvent] = useState(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await eventsService.getEvents({
        type: activeType,
        status,
        search,
      });
      setEvents(data);
    } catch (err) {
      console.error(err);
      if (onShowToast) onShowToast('Failed to load events', 'error');
    } finally {
      setLoading(false);
    }
  }, [activeType, status, search, onShowToast]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Real-time Firestore updates
  useEffect(() => {
    if (eventsService.subscribeEvents) {
      const unsub = eventsService.subscribeEvents(() => {
        fetchEvents();
      });
      return () => unsub();
    }
  }, [fetchEvents]);

  // Counts for tabs
  const [allEvents, setAllEvents] = useState([]);
  useEffect(() => {
    async function loadAllForCounts() {
      const all = await eventsService.getEvents({});
      setAllEvents(all);
    }
    loadAllForCounts();
  }, [events]);

  const counts = {
    all: allEvents.length,
    stc: allEvents.filter((e) => e.type === 'STC_EVENT').length,
    internal: allEvents.filter((e) => e.type === 'INTERNAL_HACKATHON').length,
    external: allEvents.filter((e) => e.type === 'EXTERNAL_HACKATHON').length,
  };

  const handleTogglePublish = async (id) => {
    try {
      const updated = await eventsService.togglePublishStatus(id);
      if (onShowToast) {
        onShowToast(
          `Event "${updated.title || updated.name}" is now ${updated.status.toLowerCase()}`
        );
      }
      fetchEvents();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to change publish status';
      if (onShowToast) onShowToast(msg, 'error');
    }
  };

  const handleFormSubmit = async (payload) => {
    try {
      if (editingEvent) {
        await eventsService.updateEvent(editingEvent.id, payload);
        if (onShowToast) onShowToast('Event updated successfully');
      } else {
        await eventsService.createEvent(payload);
        if (onShowToast) onShowToast('New event created successfully');
      }
      fetchEvents();
    } catch (err) {
      console.error('Save event error:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to save event';
      if (onShowToast) onShowToast(msg, 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingEvent) return;
    try {
      await eventsService.deleteEvent(deletingEvent.id);
      if (onShowToast) onShowToast('Event deleted successfully');
      setDeletingEvent(null);
      fetchEvents();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to delete event';
      if (onShowToast) onShowToast(msg, 'error');
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header__left">
          <span className="admin-page-header__eyebrow">PROGRAMMING & CALENDAR</span>
          <h1 className="admin-page-header__title">Events & Hackathons</h1>
          <p className="admin-page-header__desc">
            Manage official STC events, internal campus hackathons, and curated external opportunities
          </p>
        </div>
      </div>

      <EventTabs
        activeType={activeType}
        onSelectType={setActiveType}
        counts={counts}
      />

      <EventsToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        onAddEvent={() => {
          setEditingEvent(null);
          setIsFormOpen(true);
        }}
      />

      {loading ? (
        <TableSkeleton rows={5} cols={6} />
      ) : (
        <EventTable
          events={events}
          onEdit={(ev) => {
            setEditingEvent(ev);
            setIsFormOpen(true);
          }}
          onTogglePublish={handleTogglePublish}
          onDelete={(ev) => setDeletingEvent(ev)}
        />
      )}

      {/* Add / Edit Event Form Modal */}
      <EventFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingEvent(null);
        }}
        onSubmit={handleFormSubmit}
        initialEvent={editingEvent}
        defaultType={activeType === 'ALL' ? 'STC_EVENT' : activeType}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingEvent}
        onClose={() => setDeletingEvent(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Event"
        message={`Are you sure you want to delete "${
          deletingEvent?.title || deletingEvent?.name
        }"? This cannot be undone.`}
      />
    </div>
  );
}
