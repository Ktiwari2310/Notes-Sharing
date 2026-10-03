/**
 * NotesContext.jsx
 * 
 * Centralized State Management for NoteShare:
 * - Stores and syncs notes across all routes (/dashboard, /notes, /upload) using localStorage.
 * - Manages authentication flow state (isLoggedIn in localStorage).
 * - Manages preview modal and toast alerts across pages.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_NOTES } from '../data/sampleNotes';

const NotesContext = createContext();

export function NotesProvider({ children }) {
  // 1. Centralized Notes State (persisted in localStorage)
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('noteshare_notes');
    if (savedNotes) {
      try {
        return JSON.parse(savedNotes);
      } catch (err) {
        console.error('Failed to parse saved notes from localStorage:', err);
      }
    }
    return INITIAL_NOTES;
  });

  // 2. Centralized Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('noteshare_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (err) {
        console.error('Failed to parse saved user:', err);
      }
    }
    return null;
  });

  // 3. UI Global States: Note Preview Modal & Toast Notifications
  const [previewNote, setPreviewNote] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync notes to localStorage
  useEffect(() => {
    localStorage.setItem('noteshare_notes', JSON.stringify(notes));
  }, [notes]);

  // Sync user to localStorage
  useEffect(() => {
    if (currentUser && isLoggedIn) {
      localStorage.setItem('noteshare_user', JSON.stringify(currentUser));
    } else if (!isLoggedIn) {
      localStorage.removeItem('noteshare_user');
    }
  }, [currentUser, isLoggedIn]);

  // Helper to show temporary toast messages
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Add a newly uploaded note
  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    showToast(`Note "${newNote.title}" uploaded successfully!`);
  };

  // Login handler: sets isLoggedIn flag in localStorage
  const handleLogin = (userData) => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    setCurrentUser(userData);
    showToast(`Welcome back, ${userData.name || userData.fullName || 'Student'}!`);
  };

  // Register handler: shows confirmation without auto-login
  const handleRegister = (userData) => {
    showToast(`Account created for ${userData.fullName || 'Student'}! Please log in.`);
  };

  // Logout handler: removes isLoggedIn and clears session
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('noteshare_user');
    setIsLoggedIn(false);
    setCurrentUser(null);
    showToast('Logged out successfully.');
  };

  // Download simulation
  const handleDownloadNote = (note) => {
    const fileContent = `=========================================================\n` +
      `NoteShare - Student Notes Sharing Portal\n` +
      `=========================================================\n\n` +
      `Title: ${note.title}\n` +
      `Subject: ${note.subject}\n` +
      `Uploaded By: ${note.uploadedBy}\n` +
      `Date Added: ${note.uploadedDate}\n` +
      `Semester: ${note.semester || 'N/A'}\n\n` +
      `--- Description ---\n` +
      `${note.description}\n\n` +
      `--- Content Overview ---\n` +
      `${note.previewContent || 'Lecture notes summary and study material.'}\n\n` +
      `=========================================================\n` +
      `Downloaded from NoteShare: Centralized College Study Hub\n` +
      `=========================================================`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = note.fileName ? note.fileName.replace(/\.pdf$/i, '.txt') : `${note.title.replace(/\s+/g, '_')}_Notes.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Downloading "${note.title}"...`);
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        isLoggedIn,
        currentUser,
        previewNote,
        toast,
        setPreviewNote,
        handleAddNote,
        handleLogin,
        handleRegister,
        handleLogout,
        handleDownloadNote,
        showToast
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

// Custom hook for consuming NotesContext
export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}
