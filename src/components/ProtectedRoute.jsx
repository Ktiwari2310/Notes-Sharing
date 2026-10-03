/**
 * ProtectedRoute.jsx
 * 
 * Purpose:
 * Route guard component that checks whether a student is logged in.
 * - If authenticated (isLoggedIn === true): renders child components or Outlet.
 * - If unauthenticated: redirects automatically to /login.
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useNotes();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to login page and preserve destination location for after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
