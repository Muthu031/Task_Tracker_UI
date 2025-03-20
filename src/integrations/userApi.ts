import { API_URL } from '../ApiUrl';
import { User, UserPreferences } from '../types';

export async function fetchUserProfile(): Promise<User> {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`Error fetching user profile: ${response.statusText}`);
  }
  
  return await response.json();
}


export async function updateUserPreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
  const response = await fetch(`${API_URL}/users/me/preferences`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(preferences)
  });
  
  if (!response.ok) {
    throw new Error(`Error updating preferences: ${response.statusText}`);
  }
  
  return await response.json();
}
