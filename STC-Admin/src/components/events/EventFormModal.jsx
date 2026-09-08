import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';

export default function EventFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialEvent = null,
  defaultType = 'STC_EVENT',
}) {
  const [eventType, setEventType] = useState(initialEvent?.type || defaultType);

  // Form State
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialEvent) {
      setEventType(initialEvent.type || defaultType);
      setFormData({ ...initialEvent });
    } else {
      setEventType(defaultType);
      // Sensible defaults
      if (defaultType === 'STC_EVENT') {
        setFormData({
          title: '',
          category: 'Workshop',
          description: '',
          date: 'TBA',
          time: 'TBA',
          location: 'TBA',
          capacity: '',
          registrationDeadline: '',
          additionalInfo: '',
          status: 'DRAFT',
        });
      } else if (defaultType === 'INTERNAL_HACKATHON') {
        setFormData({
          name: '',
          description: '',
          date: '',
          time: '09:00 AM – Next Day 09:00 AM',
          location: 'Innovation Lab',
          mode: 'OFFLINE',
          registrationStatus: 'OPEN',
          maximumParticipants: 100,
          rules: '',
          problemStatement: '',
          teamSize: '2–4 Members',
          prizes: '',
          status: 'DRAFT',
        });
      } else {
        setFormData({
          name: '',
          organizer: '',
          description: '',
          startDate: '',
          endDate: '',
          mode: 'OFFLINE',
          location: 'BENGALURU',
          registrationUrl: 'https://',
          platform: 'DEVFOLIO',
          status: 'PUBLISHED',
        });
      }
    }
    setErrors({});
  }, [initialEvent, defaultType, isOpen]);

  const handleTypeChange = (newType) => {
    setEventType(newType);
    if (!initialEvent) {
      if (newType === 'STC_EVENT') {
        setFormData((prev) => ({
          ...prev,
          title: prev.name || prev.title || '',
          category: 'Workshop',
          date: prev.date || 'TBA',
          time: prev.time || 'TBA',
          location: prev.location || 'TBA',
          status: 'DRAFT',
        }));
      } else if (newType === 'INTERNAL_HACKATHON') {
        setFormData((prev) => ({
          ...prev,
          name: prev.title || prev.name || '',
          mode: 'OFFLINE',
          registrationStatus: 'OPEN',
          status: 'DRAFT',
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          name: prev.title || prev.name || '',
          organizer: '',
          registrationUrl: 'https://',
          platform: 'DEVFOLIO',
          status: 'PUBLISHED',
        }));
      }
    }
  };

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (eventType === 'STC_EVENT') {
      if (!formData.title?.trim()) errs.title = 'Title is required';
      if (!formData.description?.trim()) errs.description = 'Description is required';
    } else if (eventType === 'INTERNAL_HACKATHON') {
      if (!formData.name?.trim()) errs.name = 'Hackathon name is required';
      if (!formData.description?.trim()) errs.description = 'Description is required';
      if (!formData.date?.trim()) errs.date = 'Date is required';
    } else {
      if (!formData.name?.trim()) errs.name = 'Hackathon name is required';
      if (!formData.organizer?.trim()) errs.organizer = 'Organizer is required';
      if (!formData.registrationUrl?.trim() || !formData.registrationUrl.startsWith('http')) {
        errs.registrationUrl = 'Valid registration URL is required';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (targetStatus) => {
    if (!validate()) return;

    const payload = {
      ...formData,
      type: eventType,
      status: targetStatus || formData.status || 'DRAFT',
    };

    onSubmit(payload);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialEvent ? 'Edit Event' : 'Add New Event'}
      size="lg"
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <button
            type="button"
            className="admin-btn admin-btn--secondary admin-btn--sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className="admin-btn admin-btn--secondary admin-btn--sm"
              onClick={() => handleSubmit('DRAFT')}
            >
              Save as Draft
            </button>
            <button
              type="button"
              className="admin-btn admin-btn--primary admin-btn--sm"
              onClick={() => handleSubmit('PUBLISHED')}
            >
              Publish Event
            </button>
          </div>
        </div>
      }
    >
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Event Type Selector */}
        {!initialEvent && (
          <div className="admin-form-group">
            <label className="admin-form-label">
              EVENT TYPE <span className="admin-form-label__req">*</span>
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { id: 'STC_EVENT', label: 'STC Event' },
                { id: 'INTERNAL_HACKATHON', label: 'Internal Hackathon' },
                { id: 'EXTERNAL_HACKATHON', label: 'External Hackathon' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`admin-btn admin-btn--sm ${
                    eventType === t.id ? 'admin-btn--primary' : 'admin-btn--secondary'
                  }`}
                  onClick={() => handleTypeChange(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 1. STC EVENT FIELDS */}
        {eventType === 'STC_EVENT' && (
          <>
            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="stc-title">
                Event Title <span className="admin-form-label__req">*</span>
              </label>
              <input
                id="stc-title"
                type="text"
                className="admin-form-input"
                placeholder="e.g. STC Inauguration, System Design Workshop"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
              />
              {errors.title && <span className="admin-form-error">{errors.title}</span>}
            </div>

            <div className="admin-form-group--row">
              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="stc-category">Category</label>
                <select
                  id="stc-category"
                  className="admin-form-select"
                  value={formData.category || 'Workshop'}
                  onChange={(e) => handleChange('category', e.target.value)}
                >
                  <option value="Community Inauguration">Community Inauguration</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Meetup">Meetup</option>
                  <option value="Tech Talk">Tech Talk</option>
                  <option value="Build Session">Build Session</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="stc-capacity">
                  Registration Capacity <span className="admin-form-label__opt">(Optional)</span>
                </label>
                <input
                  id="stc-capacity"
                  type="number"
                  className="admin-form-input"
                  placeholder="e.g. 100"
                  value={formData.capacity || ''}
                  onChange={(e) => handleChange('capacity', e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="stc-desc">
                Description <span className="admin-form-label__req">*</span>
              </label>
              <textarea
                id="stc-desc"
                className="admin-form-textarea"
                placeholder="Brief editorial overview of the event..."
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
              />
              {errors.description && <span className="admin-form-error">{errors.description}</span>}
            </div>

            <div className="admin-form-group--row">
              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="stc-date">
                  Date <span className="admin-form-label__opt">(Use 'TBA' if unannounced)</span>
                </label>
                <input
                  id="stc-date"
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. TBA or 15 OCT 2026"
                  value={formData.date || 'TBA'}
                  onChange={(e) => handleChange('date', e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="stc-time">
                  Time <span className="admin-form-label__opt">(Use 'TBA' if unannounced)</span>
                </label>
                <input
                  id="stc-time"
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. TBA or 02:00 PM"
                  value={formData.time || 'TBA'}
                  onChange={(e) => handleChange('time', e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="stc-location">
                Location <span className="admin-form-label__opt">(Use 'TBA' if unannounced)</span>
              </label>
              <input
                id="stc-location"
                type="text"
                className="admin-form-input"
                placeholder="e.g. TBA or Auditorium A"
                value={formData.location || 'TBA'}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </div>
          </>
        )}

        {/* 2. INTERNAL HACKATHON FIELDS */}
        {eventType === 'INTERNAL_HACKATHON' && (
          <>
            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="hack-name">
                Hackathon Name <span className="admin-form-label__req">*</span>
              </label>
              <input
                id="hack-name"
                type="text"
                className="admin-form-input"
                placeholder="e.g. STC Internal HackSprint 2026"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              {errors.name && <span className="admin-form-error">{errors.name}</span>}
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="hack-desc">
                Description & Theme <span className="admin-form-label__req">*</span>
              </label>
              <textarea
                id="hack-desc"
                className="admin-form-textarea"
                placeholder="Details of the hackathon..."
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
              />
              {errors.description && <span className="admin-form-error">{errors.description}</span>}
            </div>

            <div className="admin-form-group--row">
              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="hack-date">Date <span className="admin-form-label__req">*</span></label>
                <input
                  id="hack-date"
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. 20 SEP 2026"
                  value={formData.date || ''}
                  onChange={(e) => handleChange('date', e.target.value)}
                />
                {errors.date && <span className="admin-form-error">{errors.date}</span>}
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="hack-time">Schedule / Time</label>
                <input
                  id="hack-time"
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. 09:00 AM – Next Day 09:00 AM"
                  value={formData.time || ''}
                  onChange={(e) => handleChange('time', e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-group--row">
              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="hack-mode">Participation Mode</label>
                <select
                  id="hack-mode"
                  className="admin-form-select"
                  value={formData.mode || 'OFFLINE'}
                  onChange={(e) => handleChange('mode', e.target.value)}
                >
                  <option value="OFFLINE">Offline (On Campus)</option>
                  <option value="ONLINE">Online</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="hack-reg-status">Registration Status</label>
                <select
                  id="hack-reg-status"
                  className="admin-form-select"
                  value={formData.registrationStatus || 'OPEN'}
                  onChange={(e) => handleChange('registrationStatus', e.target.value)}
                >
                  <option value="OPEN">Registration Open</option>
                  <option value="CLOSED">Registration Closed</option>
                </select>
              </div>
            </div>

            <div className="admin-form-group--row">
              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="hack-team">Team Size</label>
                <input
                  id="hack-team"
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. 2–4 Members"
                  value={formData.teamSize || ''}
                  onChange={(e) => handleChange('teamSize', e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="hack-prizes">Prize Details</label>
                <input
                  id="hack-prizes"
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. ₹50,000 Total Pool"
                  value={formData.prizes || ''}
                  onChange={(e) => handleChange('prizes', e.target.value)}
                />
              </div>
            </div>
          </>
        )}

        {/* 3. EXTERNAL HACKATHON FIELDS */}
        {eventType === 'EXTERNAL_HACKATHON' && (
          <>
            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="ext-name">
                Hackathon Name <span className="admin-form-label__req">*</span>
              </label>
              <input
                id="ext-name"
                type="text"
                className="admin-form-input"
                placeholder="e.g. HACKRIT, NEXHACK 2.0"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              {errors.name && <span className="admin-form-error">{errors.name}</span>}
            </div>

            <div className="admin-form-group--row">
              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="ext-org">
                  Organizer / Host <span className="admin-form-label__req">*</span>
                </label>
                <input
                  id="ext-org"
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. Devfolio Community, RIT"
                  value={formData.organizer || ''}
                  onChange={(e) => handleChange('organizer', e.target.value)}
                />
                {errors.organizer && <span className="admin-form-error">{errors.organizer}</span>}
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="ext-platform">Platform / Source</label>
                <input
                  id="ext-platform"
                  type="text"
                  className="admin-form-input"
                  placeholder="DEVFOLIO, UNSTOP, MLH"
                  value={formData.platform || 'DEVFOLIO'}
                  onChange={(e) => handleChange('platform', e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="ext-url">
                Official External Registration URL <span className="admin-form-label__req">*</span>
              </label>
              <input
                id="ext-url"
                type="url"
                className="admin-form-input"
                placeholder="https://devfolio.co/..."
                value={formData.registrationUrl || ''}
                onChange={(e) => handleChange('registrationUrl', e.target.value)}
              />
              {errors.registrationUrl && (
                <span className="admin-form-error">{errors.registrationUrl}</span>
              )}
              <span className="admin-form-help">
                Students will be directed to this external link; STC does not collect registrations for it.
              </span>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="ext-desc">Description</label>
              <textarea
                id="ext-desc"
                className="admin-form-textarea"
                placeholder="Short description of the opportunity..."
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>

            <div className="admin-form-group--row">
              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="ext-dates">Dates</label>
                <input
                  id="ext-dates"
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. 25–26 SEP 2026"
                  value={formData.startDate || ''}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="ext-loc">Location</label>
                <input
                  id="ext-loc"
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. BENGALURU or ONLINE"
                  value={formData.location || ''}
                  onChange={(e) => handleChange('location', e.target.value)}
                />
              </div>
            </div>
          </>
        )}
      </form>
    </Modal>
  );
}
