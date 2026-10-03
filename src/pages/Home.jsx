/**
 * Home.jsx
 * 
 * Route: / (PUBLIC LANDING PAGE)
 * 
 * Features:
 *  - Heading: "Student Notes Sharing Portal"
 *  - Description: "A centralized platform where students can share, discover and access study material."
 *  - Buttons: "Get Started", "Login", "Register"
 *  - 2-3 Real stock photography images (Unsplash)
 *  - Statistics overview (500+ Notes, 20+ Subjects, 100% Free)
 *  - "Why NoteShare?" section with 3 feature cards and collaborative study image
 *  - Call to action banner directing students to create an account or sign in
 *  - NOTE: Actual notes list and upload form are protected behind login.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';
import { UserIcon, CheckCircleIcon } from '../components/Icons';

function Home() {
  const { isLoggedIn } = useNotes();

  return (
    <div className="page-wrapper home-page">
      {/* 1. Public Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
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
              Eliminate missing exam notes and unorganized chat groups with a clean, peer-powered academic repository.
            </p>

            {/* Action Buttons: Get Started, Login, Register */}
            <div className="hero-actions">
              {isLoggedIn ? (
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                  <span>Go to My Dashboard →</span>
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-lg">
                    <span>Get Started</span>
                  </Link>
                  <Link to="/login" className="btn btn-secondary btn-lg">
                    <UserIcon />
                    <span>Login</span>
                  </Link>
                  <Link to="/register" className="btn btn-outline btn-lg">
                    <span>Register</span>
                  </Link>
                </>
              )}
            </div>

            {/* Public Statistics Overview */}
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

          {/* Real Stock Photography Visual #1 */}
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                alt="Group of diverse college students studying together with books and laptops in university library"
                className="hero-real-image"
                loading="lazy"
              />
              <div className="hero-image-overlay-card">
                <span className="overlay-badge">🎓 Verified Study Material</span>
                <p className="overlay-text">Sign in to unlock semester notes and exam cheat sheets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "Why NoteShare?" Section with 3 Cards & Real Collaborative Photo #2 */}
      <section className="why-section">
        <div className="container">
          <div className="why-container">
            {/* Left Column: Why Cards */}
            <div className="why-content">
              <span className="section-eyebrow">Smart Learning Hub</span>
              <h2 className="section-title">Why NoteShare?</h2>
              <p className="section-subtitle">
                Designed specifically to solve the hassle of missing exam material and chaotic messaging groups.
              </p>

              <div className="why-cards-list">
                {/* Card 1 */}
                <div className="why-card">
                  <div className="why-card-icon">1</div>
                  <div className="why-card-text">
                    <h3 className="why-card-title">Easy Access</h3>
                    <p className="why-card-desc">
                      Find notes without searching through messaging groups. Everything is indexed in one place.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="why-card">
                  <div className="why-card-icon">2</div>
                  <div className="why-card-text">
                    <h3 className="why-card-title">Student Contributions</h3>
                    <p className="why-card-desc">
                      Students can share useful study material with others, fostering peer-to-peer academic support.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="why-card">
                  <div className="why-card-icon">3</div>
                  <div className="why-card-text">
                    <h3 className="why-card-title">Organized Resources</h3>
                    <p className="why-card-desc">
                      Notes are organized by subject for easier discovery, exam revision, and quick syllabus lookup.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Real Stock Photography Visual #2 */}
            <div className="why-visual">
              <div className="why-image-card">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
                  alt="College students sitting around a table collaborating on laptops and sharing study notes"
                  className="why-real-image"
                  loading="lazy"
                />
                <div className="why-image-badge">
                  <CheckCircleIcon />
                  <span>Peer-Driven Academic Growth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Action Callout Banner with Real Stock Image #3 */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1000&q=80"
                alt="Student desk with textbook, notebooks, pen, and laptop for focused exam preparation"
                className="cta-bg-image"
                loading="lazy"
              />
              <div className="cta-overlay"></div>
            </div>
            <div className="cta-content">
              <h2 className="cta-title">Ready to access and share college notes?</h2>
              <p className="cta-desc">
                Sign in to your student account or register in seconds to browse subject notes and contribute to the community.
              </p>
              <div className="cta-buttons">
                {isLoggedIn ? (
                  <Link to="/dashboard" className="btn btn-primary btn-lg">
                    <span>Go to Student Dashboard</span>
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="btn btn-primary btn-lg">
                      <span>Create Free Account</span>
                    </Link>
                    <Link to="/login" className="btn btn-secondary btn-lg">
                      <span>Login with Student ID</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
