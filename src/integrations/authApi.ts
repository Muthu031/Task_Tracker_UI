import { API_URL } from '../ApiUrl';
import { User } from '../types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  
  if (!response.ok) {
    throw new Error(`Authentication failed: ${response.statusText}`);
  }
  
  return await response.json();
}

export async function register(credentials: RegisterCredentials): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  
  if (!response.ok) {
    throw new Error(`Registration failed: ${response.statusText}`);
  }
  
  return await response.json();
}

export async function logout(): Promise<void> {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  
  if (!response.ok) {
    console.error(`Logout failed: ${response.statusText}`);
  }
  
  localStorage.removeItem('token');
}

export async function verifyToken(): Promise<User> {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  const response = await fetch(`${API_URL}/auth/verify`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    localStorage.removeItem('token');
    throw new Error(`Token verification failed: ${response.statusText}`);
  }
  
  return await response.json();
}

// src/integrations/authApi.ts
export const initializeFromStorage = (): void => {
    const token = localStorage.getItem('authToken');
    if (token) {
      console.log('Auth token found, initializing session...');
      // Add any authentication initialization logic here
    } else {
      console.log('No auth token found, user is unauthenticated.');
    }
  };
  
 
  export async function updateUserProfile(updates: Partial<User>): Promise<User> {
    const response = await fetch(`${API_URL}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(updates)
    });
    
    if (!response.ok) {
      throw new Error(`Error updating user profile: ${response.statusText}`);
    }
    
    return await response.json();
  }