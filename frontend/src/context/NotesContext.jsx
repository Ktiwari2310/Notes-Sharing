/**
 * NotesContext.jsx
 *
 * Centralized State Management for NoteShare:
 * - Directly integrates with Node/Express/MongoDB backend via notesAPI and authAPI.
 * - Manages authentication flow (JWT token and user profile).
 * - Manages note uploads (including multipart file uploads to MongoDB/Multer), search, preview, and downloads.
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_NOTES } from "../data/sampleNotes";
import { notesAPI, authAPI } from "../services/api";

const NotesContext = createContext();

export function NotesProvider({ children }) {
  // 1. Centralized Notes State
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("noteshare_notes");
    if (savedNotes) {
      try {
        return JSON.parse(savedNotes);
      } catch (err) {
        console.error("Failed to parse saved notes from localStorage:", err);
      }
    }
    return INITIAL_NOTES;
  });

  // 2. Centralized Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("noteshare_user");
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (err) {
        console.error("Failed to parse saved user:", err);
      }
    }
    return null;
  });

  // 3. UI Global States
  const [previewNote, setPreviewNote] = useState(null);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sync notes from MongoDB on mount
  useEffect(() => {
    const fetchBackendNotes = async () => {
      try {
        const response = await notesAPI.getNotes();
        if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
          const normalized = response.data.map((n) => ({
            ...n,
            id: n.id || n._id
          }));
          setNotes(normalized);
        }
      } catch (err) {
        console.warn("Backend not reached on mount; displaying cached notes:", err.message);
      }
    };

    fetchBackendNotes();
  }, []);

  // Sync user profile if token exists
  useEffect(() => {
    const token = localStorage.getItem("noteshare_token");
    if (token && !currentUser) {
      authAPI
        .getMe()
        .then((res) => {
          if (res?.user) {
            setCurrentUser(res.user);
            setIsLoggedIn(true);
          }
        })
        .catch(() => {
          localStorage.removeItem("noteshare_token");
        });
    }
  }, []);

  // Cache notes in localStorage
  useEffect(() => {
    localStorage.setItem("noteshare_notes", JSON.stringify(notes));
  }, [notes]);

  // Sync user to localStorage
  useEffect(() => {
    if (currentUser && isLoggedIn) {
      localStorage.setItem("noteshare_user", JSON.stringify(currentUser));
    } else if (!isLoggedIn) {
      localStorage.removeItem("noteshare_user");
    }
  }, [currentUser, isLoggedIn]);

  // Helper to show temporary toast messages
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Add a newly uploaded note (uploads directly to MongoDB & server storage)
  const handleAddNote = async (newNote, file = null) => {
    setIsLoading(true);
    try {
      let createdNote;

      if (file) {
        const formData = new FormData();
        formData.append("title", newNote.title);
        formData.append("subject", newNote.subject);
        formData.append("description", newNote.description || "");
        formData.append("uploadedBy", newNote.uploadedBy);
        formData.append("semester", newNote.semester || "Current");
        formData.append("previewContent", newNote.previewContent || "");
        formData.append("file", file);

        const res = await notesAPI.createNote(formData);
        createdNote = res.data;
      } else {
        const res = await notesAPI.createNote(newNote);
        createdNote = res.data;
      }

      const normalized = {
        ...createdNote,
        id: createdNote.id || createdNote._id
      };

      setNotes((prevNotes) => [normalized, ...prevNotes]);
      showToast(`Note "${normalized.title}" uploaded to database successfully!`);
      return normalized;
    } catch (apiErr) {
      const msg = apiErr.message || "Failed to upload note to database";
      showToast(`Upload failed: ${msg}`);
      throw apiErr;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete an uploaded note
  const handleDeleteNote = async (noteId) => {
    try {
      await notesAPI.deleteNote(noteId);
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== noteId && note._id !== noteId)
      );
      showToast("Note deleted successfully.");
    } catch (err) {
      showToast(`Failed to delete note: ${err.message}`);
      throw err;
    }
  };

  // Login handler
  const handleLogin = async (userData) => {
    setIsLoading(true);
    try {
      const res = await authAPI.login({
        identifier: userData.identifier || userData.email || userData.studentId,
        password: userData.password
      });

      if (res?.token && res?.user) {
        localStorage.setItem("noteshare_token", res.token);
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        setCurrentUser(res.user);
        showToast(`Welcome back, ${res.user.name || res.user.fullName || "Student"}!`);
        return res.user;
      }
      throw new Error("Invalid response received from server");
    } catch (apiErr) {
      const msg = apiErr.message || "Login failed";
      showToast(`Login failed: ${msg}`);
      throw apiErr;
    } finally {
      setIsLoading(false);
    }
  };

  // Register handler
  const handleRegister = async (userData) => {
    setIsLoading(true);
    try {
      const res = await authAPI.register({
        fullName: userData.fullName || userData.name,
        studentId: userData.studentId,
        email: userData.email,
        password: userData.password
      });

      if (res?.token) {
        localStorage.setItem("noteshare_token", res.token);
      }
      showToast(`Account created for ${userData.fullName || "Student"}! Please log in.`);
      return res;
    } catch (apiErr) {
      const msg = apiErr.message || "Registration failed";
      showToast(`Registration failed: ${msg}`);
      throw apiErr;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("noteshare_user");
    localStorage.removeItem("noteshare_token");

    setIsLoggedIn(false);
    setCurrentUser(null);

    showToast("Logged out successfully.");
  };

  // Download note handler
  const handleDownloadNote = (note) => {
    const noteId = note.id || note._id;

    if (note.filePath || (typeof noteId === "string" && noteId.length === 24)) {
      try {
        const downloadUrl = notesAPI.getDownloadUrl(noteId);
        window.open(downloadUrl, "_blank");
        showToast(`Downloading "${note.title}"...`);
        return;
      } catch (e) {
        console.warn("Backend download failed, falling back to local file generation:", e.message);
      }
    }

    // Default text generator fallback
    const fileContent =
      `=========================================================\n` +
      `NoteShare - Student Notes Sharing Portal\n` +
      `=========================================================\n\n` +
      `Title: ${note.title}\n` +
      `Subject: ${note.subject}\n` +
      `Uploaded By: ${note.uploadedBy}\n` +
      `Date Added: ${note.uploadedDate}\n` +
      `Semester: ${note.semester || "N/A"}\n\n` +
      `--- Description ---\n` +
      `${note.description}\n\n` +
      `--- Content Overview ---\n` +
      `${
        note.previewContent || "Lecture notes summary and study material."
      }\n\n` +
      `=========================================================\n` +
      `Downloaded from NoteShare: Centralized College Study Hub\n` +
      `=========================================================`;

    const blob = new Blob([fileContent], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = note.fileName
      ? note.fileName.replace(/\.pdf$/i, ".txt")
      : `${note.title.replace(/\s+/g, "_")}_Notes.txt`;

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
        isLoading,

        setPreviewNote,

        handleAddNote,
        handleDeleteNote,

        handleLogin,
        handleRegister,
        handleLogout,

        handleDownloadNote,

        showToast,
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
    throw new Error("useNotes must be used within a NotesProvider");
  }

  return context;
}
