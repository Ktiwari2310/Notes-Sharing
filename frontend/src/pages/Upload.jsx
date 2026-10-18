/**
 * Upload.jsx
 * 
 * Route: /upload
 * Upload Notes Page:
 * Allows students to upload PDFs/notes while explicitly choosing Semester (Sem 2, 3, 4, 5, 6)
 * and Subject folder, then seamlessly redirects to the corresponding folder in Browse Notes.
 */

import React from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import UploadNote from '../components/UploadNote';
import { useNotes } from '../context/NotesContext';
import { findSemester } from '../data/semestersData';

function Upload() {
  const { handleAddNote, currentUser } = useNotes();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const querySemester = searchParams.get('semester') || searchParams.get('sem') || '';
  const querySubject = searchParams.get('subject') || searchParams.get('subj') || '';

  const handleNoteCreated = async (newNote, file) => {
    const created = await handleAddNote(newNote, file);
    const semObj = findSemester(newNote.semester);
    const targetSem = semObj ? semObj.id : '';
    const targetSubj = encodeURIComponent(newNote.subject);

    // Redirect straight into the folder on Browse Notes so user immediately sees their file!
    setTimeout(() => {
      if (targetSem) {
        navigate(`/notes?semester=${targetSem}&subject=${targetSubj}`);
      } else {
        navigate('/notes');
      }
    }, 1200);
  };

  return (
    <div className="page-wrapper upload-page">
      {/* 1. Page Header with Real Stock Photography */}
      <section className="page-banner-section">
        <div className="container">
          <div className="page-banner-card upload-banner-card">
            <div className="banner-content">
              <span className="banner-tag">Student Contribution Studio</span>
              <h1 className="banner-title">Upload Study Notes & PDFs</h1>
              <p className="banner-desc">
                Share your handwritten lecture notes, formula sheets, or exam solutions with your college peers.
                Select your semester (Sem 3, 4, 5, 6) and subject folder to keep resources neatly organized.
              </p>
              <div className="upload-tips-summary">
                <span className="tip-chip">✓ Organized by Semesters 3, 4, 5 & 6</span>
                <span className="tip-chip">✓ Folder-based subject structure</span>
                <span className="tip-chip">✓ PDFs, DOCs, and PPTs supported</span>
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

      {/* Breadcrumb back to Browse Notes */}
      <div className="container">
        <nav className="folder-breadcrumb-bar" style={{ marginTop: '16px', marginBottom: '8px' }}>
          <Link to="/notes" className="breadcrumb-link">📁 Browse Notes</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Upload Notes</span>
        </nav>
      </div>

      {/* 2. Upload Form Section */}
      <UploadNote
        onAddNote={handleNoteCreated}
        initialStudentName={currentUser?.name || currentUser?.fullName || ''}
        initialSemester={querySemester}
        initialSubject={querySubject}
      />
    </div>
  );
}

export default Upload;
