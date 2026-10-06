/**
 * api.js
 * 
 * Central API client for interacting with the Node/Express/MongoDB backend.
 * Base URL defaults to http://localhost:5000/api
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Helper to get auth header
const getAuthHeaders = () => {
  const token = localStorage.getItem('noteshare_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Generic request wrapper
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    ...getAuthHeaders(),
    ...options.headers
  };

  // If body is NOT FormData, default to application/json
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage = data?.message || `Request failed with status ${response.status}`;
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// Authentication API methods
export const authAPI = {
  // Register a new user
  register: (userData) => {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  // Login with identifier (email or studentId) and password
  login: (credentials) => {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  // Get current logged-in user profile
  getMe: () => {
    return request('/auth/me', {
      method: 'GET'
    });
  }
};

// Notes API methods
export const notesAPI = {
  // Fetch notes with optional search query & subject filter
  getNotes: (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.subject && params.subject !== 'All') query.append('subject', params.subject);
    if (params.semester && params.semester !== 'All') query.append('semester', params.semester);

    const queryString = query.toString();
    return request(`/notes${queryString ? `?${queryString}` : ''}`, {
      method: 'GET'
    });
  },

  // Get single note by ID
  getNoteById: (id) => {
    return request(`/notes/${id}`, {
      method: 'GET'
    });
  },

  // Create a new note (accepts FormData for file upload or plain JSON)
  createNote: (noteData) => {
    if (noteData instanceof FormData) {
      return request('/notes', {
        method: 'POST',
        body: noteData
      });
    }

    return request('/notes', {
      method: 'POST',
      body: JSON.stringify(noteData)
    });
  },

  // Delete a note
  deleteNote: (id) => {
    return request(`/notes/${id}`, {
      method: 'DELETE'
    });
  },

  // Get portal statistics
  getStats: () => {
    return request('/notes/stats', {
      method: 'GET'
    });
  },

  // Download URL
  getDownloadUrl: (id) => {
    return `${API_BASE_URL}/notes/${id}/download`;
  }
};
