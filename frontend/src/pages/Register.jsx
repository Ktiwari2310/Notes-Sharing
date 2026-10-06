/**
 * Register.jsx
 * 
 * Route: /register
 * Full-page student registration with split layout:
 *  - Left: Real stock photography of college students
 *  - Right: NoteShare branding, registration form fields:
 *           Full Name, Student ID, Email, Password, Confirm Password,
 *           "Create Account" button, and link to /login.
 *  - Full frontend validation.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoIcon, CheckCircleIcon } from '../components/Icons';
import { useNotes } from '../context/NotesContext';

function Register() {
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { handleRegister } = useNotes();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation: Required fields
    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!studentId.trim()) {
      setError('Please enter your College / Student ID.');
      return;
    }

    if (!email.trim()) {
      setError('Please enter your college email address.');
      return;
    }

    // 2. Validation: Email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    // 3. Validation: Password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // 4. Validation: Passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    try {
      setError('');
      await handleRegister({
        name: fullName.trim(),
        fullName: fullName.trim(),
        studentId: studentId.trim(),
        email: email.trim(),
        password: password
      });
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed. Please check backend connection.');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card-container">
        {/* Left Side: Real Stock Photography */}
        <div className="auth-visual-side">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80"
            alt="Group of diverse, enthusiastic college students walking on campus"
            className="auth-real-image"
          />
          <div className="auth-visual-overlay">
            <div className="auth-quote-box">
              <span className="quote-tag">Student Community</span>
              <h3>"Every student has something valuable to contribute."</h3>
              <p>Sign up to unlock thousands of handwritten notes and exam solutions.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="auth-form-side">
          <div className="auth-form-header">
            <Link to="/" className="auth-brand">
              <div className="brand-icon-wrapper small">
                <LogoIcon className="brand-icon" />
              </div>
              <span className="brand-name">
                Note<span className="brand-highlight">Share</span>
              </span>
            </Link>

            <h1 className="auth-heading">Create Account</h1>
            <p className="auth-subheading">
              Join your college peer community on NoteShare.
            </p>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label" htmlFor="regFullName">
                Full Name <span className="required">*</span>
              </label>
              <input
                id="regFullName"
                type="text"
                className="form-input"
                placeholder="e.g. Alex Johnson"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setError('');
                }}
                required
                autoFocus
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="regStudentId">
                  Student ID / Roll No <span className="required">*</span>
                </label>
                <input
                  id="regStudentId"
                  type="text"
                  className="form-input"
                  placeholder="e.g. 2024CS102"
                  value={studentId}
                  onChange={(e) => {
                    setStudentId(e.target.value);
                    setError('');
                  }}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="regEmail">
                  College Email <span className="required">*</span>
                </label>
                <input
                  id="regEmail"
                  type="email"
                  className="form-input"
                  placeholder="e.g. alex@college.edu"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  required
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="regPassword">
                  Password <span className="required">*</span>
                </label>
                <input
                  id="regPassword"
                  type="password"
                  className="form-input"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="regConfirmPassword">
                  Confirm Password <span className="required">*</span>
                </label>
                <input
                  id="regConfirmPassword"
                  type="password"
                  className="form-input"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError('');
                  }}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg auth-submit-btn">
              <CheckCircleIcon />
              <span>Create Account</span>
            </button>
          </form>

          <div className="auth-footer-prompt">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-inline-link">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
