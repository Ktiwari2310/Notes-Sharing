/**
 * Footer.jsx
 * 
 * Reusable Footer component with links to portal sections.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon } from './Icons';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="footer-brand-header">
            <div className="brand-icon-wrapper small">
              <LogoIcon className="brand-icon" />
            </div>
            <span className="brand-name">
              Note<span className="brand-highlight">Share</span>
            </span>
          </div>
          <p className="footer-desc">
            A centralized platform where students can share, discover, and access study material.
            Built to make college exam preparation organized, accessible, and collaborative.
          </p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Home / Dashboard</Link></li>
              <li><Link to="/notes">Study Notes</Link></li>
              <li><Link to="/upload">Upload Notes</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Student Account</h4>
            <ul>
              <li><Link to="/login">Student Login</Link></li>
              <li><Link to="/register">Create Account</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} NoteShare Student Notes Sharing Portal. Designed for college learners.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
