/**
 * Settings Service
 * Manages frontend-level preferences (theme, UI density, sound/motion).
 * Contains ZERO secrets, database strings, or server keys.
 */

const SETTINGS_STORAGE_KEY = 'stc_admin_preferences';

const DEFAULT_SETTINGS = {
  theme: 'light',
  uiDensity: 'comfortable', // 'comfortable' | 'compact'
  autoRefreshStats: false,
  confirmDestructiveActions: true,
  communityName: 'Student Technology Community',
  communityTagline: 'Different interests. One community.',
  contactEmail: 'contact@stc.edu',
};

export const settingsService = {
  getSettings() {
    try {
      const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (!raw) return { ...DEFAULT_SETTINGS };
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  },

  updateSettings(newSettings) {
    try {
      const current = this.getSettings();
      const updated = { ...current, ...newSettings };
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error(e);
      return newSettings;
    }
  },
};
