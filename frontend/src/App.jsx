/**
 * App.jsx
 * 
 * Multi-Page Application Layout & Router Configuration for NoteShare.
 * Configures public & protected routes using React Router:
 * 
 * PUBLIC ROUTES:
 *  - /         : Landing Page (Public overview, 2-3 real stock images, CTA)
 *  - /login    : Full-Page Login (Public)
 *  - /register : Full-Page Register (Public)
 * 
 * PROTECTED ROUTES:
 *  - /dashboard: Student Dashboard (Protected by ProtectedRoute)
 *  - /notes    : Study Notes Catalog (Protected by ProtectedRoute)
 *  - /upload   : Upload Notes Studio (Protected by ProtectedRoute)
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Notes from './pages/Notes';
import Upload from './pages/Upload';
import Login from './pages/Login';
import Register from './pages/Register';
import NotePreviewModal from './components/NotePreviewModal';
import { NotesProvider, useNotes } from './context/NotesContext';
import { CheckCircleIcon } from './components/Icons';

// Automatically scroll window to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Inner Application Layout handling Navbar, Route views, Modal, and Toasts
function AppContent() {
  const location = useLocation();
  const { previewNote, setPreviewNote, handleDownloadNote, toast } = useNotes();

  // Hide standard Navbar and Footer on dedicated auth pages (/login and /register)
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="app-layout">
      <ScrollToTop />

      {/* Global Navigation Bar (Adapts before/after login) */}
      {!isAuthPage && <Navbar />}

      {/* Main Routes View Outlet */}
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes: guarded by ProtectedRoute */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />

          {/* Fallback to Public Landing Page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Footer */}
      {!isAuthPage && <Footer />}

      {/* Interactive Document Preview Modal */}
      {previewNote && (
        <NotePreviewModal
          note={previewNote}
          onClose={() => setPreviewNote(null)}
          onDownload={handleDownloadNote}
        />
      )}

      {/* Global Toast Notification */}
      {toast && (
        <div className="toast-notification">
          <CheckCircleIcon />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <NotesProvider>
      <Router>
        <AppContent />
      </Router>
    </NotesProvider>
  );
}

export default App;
