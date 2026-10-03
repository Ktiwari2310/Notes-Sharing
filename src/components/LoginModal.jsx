/**
 * LoginModal.jsx
 * 
 * Purpose:
 * Beginner-friendly mock login modal.
 * Since backend authentication is out of scope for now,
 * this component simulates student login using React state.
 */

import React, { useState } from 'react';
import { CloseIcon, UserIcon } from './Icons';

function LoginModal({ isOpen, onClose, onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onLogin({
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@student.edu`
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container login-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-info">
            <h3 className="modal-title">Student Login</h3>
            <p className="modal-subtitle-text">Log in to track your uploads and bookmarks</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="studentLoginName">Student Name</label>
              <input
                id="studentLoginName"
                type="text"
                className="form-input"
                placeholder="e.g. Alex Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="studentEmail">College Email (Optional)</label>
              <input
                id="studentEmail"
                type="email"
                className="form-input"
                placeholder="e.g. alex@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <p className="mock-auth-note">
              ℹ️ <strong>Demo Note:</strong> No password needed! This project uses mock state for simplicity.
            </p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <UserIcon />
              <span>Continue as Student</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
