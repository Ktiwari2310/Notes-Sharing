/**
 * Login.jsx
 * 
 * Route: /login
 * Full-page student login with split layout:
 *  - Left: Real stock photography of college students studying
 *  - Right: NoteShare branding, "Welcome Back", Email/ID input, Password input,
 *           Remember me checkbox, Login button, and Link to /register.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoIcon, UserIcon } from '../components/Icons';
import { useNotes } from '../context/NotesContext';

function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const { handleLogin } = useNotes();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!identifier.trim()) {
      setError('Please enter your college email or Student ID.');
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    // Determine student name from email or ID
    const generatedName = identifier.includes('@')
      ? identifier.split('@')[0].replace(/[._]/g, ' ')
      : identifier;

    // Capitalize words
    const formattedName = generatedName
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    try {
      setError('');
      await handleLogin({
        name: formattedName || 'Student Learner',
        email: identifier.includes('@') ? identifier : `${identifier}@college.edu`,
        studentId: identifier.includes('@') ? 'STU-' + Math.floor(1000 + Math.random() * 9000) : identifier,
        identifier: identifier.trim(),
        password: password,
        rememberMe
      });

      // Navigate to dashboard upon successful login
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your credentials or server connection.');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card-container">
        {/* Left Side: Real Stock Photography */}
        <div className="auth-visual-side">
          <img
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=80"
            alt="Smiling college students studying together in a modern campus lounge"
            className="auth-real-image"
          />
          <div className="auth-visual-overlay">
            <div className="auth-quote-box">
              <span className="quote-tag">Student Community</span>
              <h3>"Collaborative learning makes university exams manageable."</h3>
              <p>Join thousands of students accessing verified peer notes.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
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

            <h1 className="auth-heading">Welcome Back</h1>
            <p className="auth-subheading">
              Access your college notes, bookmarked resources, and uploads.
            </p>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label" htmlFor="studentIdentifier">
                Email or Student ID <span className="required">*</span>
              </label>
              <input
                id="studentIdentifier"
                type="text"
                className="form-input"
                placeholder="e.g. alex@college.edu or 2024CS102"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  setError('');
                }}
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="studentPassword">
                Password <span className="required">*</span>
              </label>
              <input
                id="studentPassword"
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                required
              />
            </div>

            <div className="auth-checkbox-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-lg auth-submit-btn">
              <UserIcon />
              <span>Login to NoteShare</span>
            </button>
          </form>

          <div className="auth-footer-prompt">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="auth-inline-link">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
