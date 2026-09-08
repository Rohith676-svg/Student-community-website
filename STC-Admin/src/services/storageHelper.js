/**
 * Simple localStorage persistence helper for mock data.
 * Allows mock edits, creations, and deletions to persist across page refreshes
 * without needing any real backend.
 */
export function getStoredCollection(key, initialData) {
  try {
    const raw = localStorage.getItem(`stc_mock_${key}`);
    if (!raw) {
      localStorage.setItem(`stc_mock_${key}`, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(raw);
  } catch {
    return initialData;
  }
}

export function setStoredCollection(key, data) {
  try {
    localStorage.setItem(`stc_mock_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to persist mock data', e);
  }
}
