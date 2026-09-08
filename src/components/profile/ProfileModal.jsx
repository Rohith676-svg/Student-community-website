import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './ProfileModal.css';

export default function ProfileModal({ isOpen, onClose }) {
  const { userProfile, currentUser, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    displayName: '',
    rollNumber: '',
    department: '',
    year: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (userProfile) {
      setFormData({
        displayName: userProfile.displayName || currentUser?.displayName || '',
        rollNumber: userProfile.rollNumber || '',
        department: userProfile.department || '',
        year: userProfile.year || ''
      });
    } else if (currentUser) {
      setFormData({
        displayName: currentUser.displayName || '',
        rollNumber: '',
        department: '',
        year: ''
      });
    }
    setError('');
    setSuccess('');
  }, [userProfile, currentUser, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        displayName: formData.displayName.trim(),
        rollNumber: formData.rollNumber.trim() || null, // Allows clearing optional field
        department: formData.department || null,
        year: formData.year || null
      };

      await updateProfile(payload);
      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to update profile.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-modal-backdrop" onClick={onClose}>
      <div 
        className="profile-modal-card" 
        onClick={(e) => e.stopPropagation()}
        role="dialog" 
        aria-modal="true"
        aria-labelledby="profile-modal-title"
      >
        <div className="profile-modal-header">
          <div>
            <span className="profile-modal-eyebrow label-mono">STUDENT IDENTITY</span>
            <h2 id="profile-modal-title" className="profile-modal-title">Your Community Profile</h2>
          </div>
          <button 
            type="button" 
            className="profile-modal-close" 
            onClick={onClose}
            aria-label="Close profile modal"
          >
            &times;
          </button>
        </div>

        {error && <div className="profile-modal-alert error">{error}</div>}
        {success && <div className="profile-modal-alert success">{success}</div>}

        <form onSubmit={handleSubmit} className="profile-modal-form">
          <div className="profile-form-group">
            <label htmlFor="profile-email">Email Address</label>
            <input 
              id="profile-email" 
              type="email" 
              disabled 
              value={currentUser?.email || ''} 
              className="profile-input disabled"
            />
            <span className="profile-help-text">Managed securely via Firebase Authentication</span>
          </div>

          <div className="profile-form-group">
            <label htmlFor="profile-name">Full Name</label>
            <input 
              id="profile-name" 
              type="text" 
              required
              value={formData.displayName} 
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              className="profile-input"
            />
          </div>

          <div className="profile-form-group">
            <label htmlFor="profile-roll">
              Roll Number <span className="profile-label-opt">(Optional — leave blank to clear)</span>
            </label>
            <input 
              id="profile-roll" 
              type="text" 
              placeholder="e.g. 21CS001"
              value={formData.rollNumber} 
              onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
              className="profile-input"
            />
          </div>

          <div className="profile-form-row">
            <div className="profile-form-group">
              <label htmlFor="profile-dept">Department</label>
              <select 
                id="profile-dept" 
                value={formData.department} 
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="profile-select"
              >
                <option value="">Select Department</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
                <option value="IT">IT</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="profile-form-group">
              <label htmlFor="profile-year">Year of Study</label>
              <select 
                id="profile-year" 
                value={formData.year} 
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="profile-select"
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </div>

          <div className="profile-modal-actions">
            <button 
              type="button" 
              className="btn btn-secondary profile-cancel-btn" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="btn btn-primary profile-save-btn"
            >
              {loading ? 'Saving Changes...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
