/**
 * Dashboard.jsx
 * 
 * Route: /dashboard (PROTECTED)
 * Authenticated Student Dashboard:
 *  - Welcome header personalized with student name
 *  - Navigation cards to Study Notes and Upload Notes
 *  - Quick statistics overview (total notes, subjects, recent contributions)
 *  - Recent study materials grid with View & Download functionality
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';
import NoteCard from '../components/NoteCard';
import { EyeIcon, UploadCloudIcon, DocumentIcon, UserIcon } from '../components/Icons';

function Dashboard() {
  const { notes, currentUser, setPreviewNote, handleDownloadNote } = useNotes();

  const studentName = currentUser?.name || currentUser?.fullName || 'Student';
  const recentNotes = notes.slice(0, 4);

  // Calculate unique subjects count
  const uniqueSubjects = new Set(notes.map((n) => n.subject)).size;

  return (
    <div className="page-wrapper dashboard-page">
      {/* 1. Dashboard Welcome Banner */}
      <section className="dashboard-header-section">
        <div className="container">
          <div className="dashboard-welcome-card">
            <div className="welcome-text-col">
              <div className="welcome-badge">
                <span className="badge-dot"></span>
                <span>Active Student Session</span>
              </div>
              <h1 className="welcome-title">
                Welcome back, <span className="gradient-text">{studentName}</span>! 👋
              </h1>
              <p className="welcome-subtitle">
                This is your centralized study dashboard. Discover lecture notes shared by peers
                or contribute your own revision summaries to help classmates.
              </p>

              {/* Primary Dashboard Navigation Actions */}
              <div className="dashboard-quick-actions">
                <Link to="/notes" className="btn btn-primary btn-lg">
                  <EyeIcon />
                  <span>Browse Study Notes</span>
                </Link>
                <Link to="/upload" className="btn btn-secondary btn-lg">
                  <UploadCloudIcon />
                  <span>Upload New Notes</span>
                </Link>
              </div>
            </div>

            <div className="welcome-stats-col">
              <div className="dash-stat-box">
                <span className="dash-stat-num">{notes.length}</span>
                <span className="dash-stat-title">Study Resources</span>
                <span className="dash-stat-desc">Available for instant download</span>
              </div>
              <div className="dash-stat-box">
                <span className="dash-stat-num">{uniqueSubjects}</span>
                <span className="dash-stat-title">Course Subjects</span>
                <span className="dash-stat-desc">Organized by semester</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Navigation Quick Hub Cards */}
      <section className="dashboard-nav-cards-section">
        <div className="container">
          <div className="dash-hub-grid">
            {/* Card 1: Explore Notes */}
            <div className="dash-hub-card">
              <div className="dash-hub-icon-wrapper">
                <DocumentIcon className="dash-hub-icon" />
              </div>
              <div className="dash-hub-content">
                <h3 className="dash-hub-title">Study Notes Repository</h3>
                <p className="dash-hub-desc">
                  Browse and search lecture notes, handwritten formulas, and past papers by subject or topic.
                </p>
                <Link to="/notes" className="btn btn-outline btn-sm">
                  <span>Open Notes Catalog →</span>
                </Link>
              </div>
            </div>

            {/* Card 2: Upload Notes */}
            <div className="dash-hub-card">
              <div className="dash-hub-icon-wrapper accent">
                <UploadCloudIcon className="dash-hub-icon" />
              </div>
              <div className="dash-hub-content">
                <h3 className="dash-hub-title">Upload & Share Material</h3>
                <p className="dash-hub-desc">
                  Have handwritten cheat sheets or summaries? Upload them to keep a backup and support fellow students.
                </p>
                <Link to="/upload" className="btn btn-primary btn-sm">
                  <span>Go to Upload Studio →</span>
                </Link>
              </div>
            </div>

            {/* Card 3: Student Profile / Session Info */}
            <div className="dash-hub-card">
              <div className="dash-hub-icon-wrapper info">
                <UserIcon className="dash-hub-icon" />
              </div>
              <div className="dash-hub-content">
                <h3 className="dash-hub-title">Student Profile</h3>
                <p className="dash-hub-desc">
                  Logged in as <strong>{studentName}</strong>
                  {currentUser?.email ? ` (${currentUser.email})` : ''}.
                  Your session is actively authenticated.
                </p>
                <span className="profile-active-tag">✓ Authenticated Session</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Recently Added Study Notes */}
      <section className="dashboard-recent-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">Quick Access</span>
              <h2 className="section-title">Recently Added Notes</h2>
              <p className="section-subtitle">
                Latest lecture notes and cheat sheets uploaded to the portal.
              </p>
            </div>
            <Link to="/notes" className="btn btn-outline">
              <EyeIcon />
              <span>View All ({notes.length})</span>
            </Link>
          </div>

          <div className="notes-grid">
            {recentNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onView={(n) => setPreviewNote(n)}
                onDownload={handleDownloadNote}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
