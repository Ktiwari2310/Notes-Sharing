/**
 * Hero.jsx
 * 
 * Purpose:
 * Hero section for the NoteShare home page with:
 *  - Heading: "Student Notes Sharing Portal"
 *  - Description: "A centralized platform where students can share, discover and access study material."
 *  - Buttons: "Browse Notes" (navigates to /notes) and "Upload Notes" (navigates to /upload)
 *  - Statistics: 500+ Notes, 20+ Subjects, 100% Free
 *  - Real stock photograph of college students studying in campus/library.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { UploadCloudIcon, EyeIcon } from './Icons';

function Hero() {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Heading, Description, Actions & Stats */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Centralized Study Hub for College Students
          </div>

          <h1 className="hero-title">
            Student Notes <span className="gradient-text">Sharing Portal</span>
          </h1>

          <p className="hero-description">
            A centralized platform where students can share, discover and access study material.
          </p>

          <div className="hero-actions">
            <Link to="/notes" className="btn btn-primary btn-lg">
              <EyeIcon />
              <span>Browse Notes</span>
            </Link>
            <Link to="/upload" className="btn btn-secondary btn-lg">
              <UploadCloudIcon />
              <span>Upload Notes</span>
            </Link>
          </div>

          {/* Statistics Section */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Notes</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">20+</span>
              <span className="stat-label">Subjects</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Free</span>
            </div>
          </div>
        </div>

        {/* Right Column: Real Stock Photography of College Students Studying */}
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
              alt="Group of diverse college students studying together with books and laptops in a modern university library"
              className="hero-real-image"
              loading="lazy"
            />
            <div className="hero-image-overlay-card">
              <span className="overlay-badge">🎓 Verified Study Material</span>
              <p className="overlay-text">Empowering students through peer knowledge sharing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
