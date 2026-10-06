/**
 * Navbar.jsx
 * 
 * Purpose:
 * Navigation bar adapting dynamically to authentication state:
 * 
 * BEFORE LOGIN:
 *  - NoteShare (links to /)
 *  - Login (/login)
 *  - Register (/register)
 *  - (Does NOT show Dashboard, Notes, or Upload Notes)
 * 
 * AFTER LOGIN:
 *  - NoteShare (links to /dashboard)
 *  - Dashboard (/dashboard)
 *  - Study Notes (/notes)
 *  - Upload Notes (/upload)
 *  - Student badge
 *  - Logout (clears isLoggedIn, redirects to /login)
 */

import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { LogoIcon, UserIcon } from './Icons';
import { useNotes } from '../context/NotesContext';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, currentUser, handleLogout } = useNotes();
  const navigate = useNavigate();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const onLogoutClick = () => {
    handleLogout();
    closeMobileMenu();
    navigate('/login');
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar container">
        {/* Brand Logo: Links to /dashboard if logged in, otherwise / */}
        <Link to={isLoggedIn ? "/dashboard" : "/"} className="navbar-brand" onClick={closeMobileMenu}>
          <div className="brand-icon-wrapper">
            <LogoIcon className="brand-icon" />
          </div>
          <span className="brand-name">
            Note<span className="brand-highlight">Share</span>
          </span>
        </Link>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className={`hamburger-bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Navigation Links and Action Buttons */}
        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {/* AFTER LOGIN: Show Dashboard, Study Notes, Upload Notes */}
          {isLoggedIn ? (
            <ul className="nav-links">
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/notes"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Study Notes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/upload"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Upload Notes
                </NavLink>
              </li>
            </ul>
          ) : (
            /* BEFORE LOGIN: Do not show inner links */
            <div className="nav-links public-links"></div>
          )}

          {/* Right Side: Auth Actions */}
          <div className="nav-actions">
            {isLoggedIn ? (
              /* Authenticated user actions: Student badge + Logout button */
              <div className="user-profile-actions">
                <div className="user-badge" title={`Logged in as ${currentUser?.email || currentUser?.studentId || 'Student'}`}>
                  <UserIcon />
                  <span className="user-name">
                    {currentUser?.name || currentUser?.fullName || 'Student'}
                  </span>
                </div>
                <button
                  className="btn btn-outline btn-sm logout-btn"
                  onClick={onLogoutClick}
                  title="Sign out of student portal"
                >
                  Logout
                </button>
              </div>
            ) : (
              /* Public / Unauthenticated: Login and Register buttons */
              <>
                <Link
                  to="/login"
                  className="btn btn-outline nav-btn"
                  onClick={closeMobileMenu}
                >
                  <UserIcon />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary nav-btn register-nav-btn"
                  onClick={closeMobileMenu}
                >
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
