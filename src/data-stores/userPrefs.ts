import { UserPreferences } from '../types';

const PREFS_KEY = 'todo_app_user_preferences';

export function saveUserPrefsToLocalStorage(prefs: UserPreferences): void {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch (error) {
    console.error('Failed to save user preferences to local storage:', error);
  }
}

export function getUserPrefsFromLocalStorage(): UserPreferences | null {
  try {
    const prefsJson = localStorage.getItem(PREFS_KEY);
    if (!prefsJson) return null;
    
    return JSON.parse(prefsJson);
  } catch (error) {
    console.error('Failed to load user preferences from local storage:', error);
    return null;
  }
}