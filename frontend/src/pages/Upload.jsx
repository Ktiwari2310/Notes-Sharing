/**
 * Upload.jsx
 * 
 * Route: /upload
 * Upload Notes Page containing:
 *  - Heading: "Upload Study Notes"
 *  - Short explanation
 *  - One relevant real stock image (student desk with study notes, books, and laptop)
 *  - Upload notes form with all existing validation, file picker, and localStorage state persistence
 *  - Seamless redirection or navigation link to /notes upon upload
 */

import React from 'react';
import UploadNote from '../components/UploadNote';
import { useNotes } from '../context/NotesContext';
import { useNavigate } from 'react-router-dom';

function Upload() {
  const { handleAddNote, currentUser } = useNotes();
  const navigate = useNavigate();

  const handleNoteCreated = (newNote, file) => {
    handleAddNote(newNote, file);
    // Automatically transition to /notes after brief feedback or user can see it right away
    setTimeout(() => {
      navigate('/notes');
    }, 1200);
  };

  return (
    <div className="page-wrapper upload-page">
      {/* 1. Page Header with Real Stock Photography */}
      <section className="page-banner-section">
        <div className="container">
          <div className="page-banner-card upload-banner-card">
            <div className="banner-content">
              <span className="banner-tag">Student Contribution</span>
              <h1 className="banner-title">Upload Study Notes</h1>
              <p className="banner-desc">
                Share your handwritten lecture notes, formula sheets, or exam solutions with your college peers.
                Help classmates prepare while keeping your own notes safely backed up in the cloud.
              </p>
              <div className="upload-tips-summary">
                <span className="tip-chip">✓ Clear handwriting or typed docs</span>
                <span className="tip-chip">✓ Select accurate subject tags</span>
                <span className="tip-chip">✓ PDFs, DOCs, or PPTs supported</span>
              </div>
            </div>
            <div className="banner-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1000&q=80"
                alt="Student desk with textbook, notebooks, pens, and laptop organizing study notes"
                className="banner-real-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Upload Form Section */}
      <UploadNote
        onAddNote={handleNoteCreated}
        initialStudentName={currentUser?.name || currentUser?.fullName || ''}
      />
    </div>
  );
}

export default Upload;
