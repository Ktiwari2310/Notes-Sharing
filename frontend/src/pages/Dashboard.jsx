import React from "react";
import { Link } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import {
  EyeIcon,
  UploadCloudIcon,
  DocumentIcon,
  UserIcon,
} from "../components/Icons";

import { SEMESTERS } from "../data/semestersData";

function Dashboard() {
  const { notes, currentUser } = useNotes();
  const studentName = currentUser?.name || currentUser?.fullName || "Student";

  const uniqueSubjects = new Set(notes.map((note) => note.subject)).size;

  return (
    <div className="page-wrapper dashboard-page">
      <section className="dashboard-header-section">
        <div className="container">
          <div className="dashboard-welcome-card">
            <div className="welcome-text-col">
              <div className="welcome-badge">
                <span className="badge-dot" />
                <span>Active Student Session</span>
              </div>

              <h1 className="welcome-title">
                Welcome back,{" "}
                <span className="gradient-text">{studentName}</span>! 👋
              </h1>

              <p className="welcome-subtitle">
                Discover study notes shared by your classmates or upload your
                own revision material.
              </p>

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
                <span className="dash-stat-desc">
                  Available for instant download
                </span>
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

      <section className="dashboard-nav-cards-section">
        <div className="container">
          <div className="dash-hub-grid">
            <div className="dash-hub-card">
              <div className="dash-hub-icon-wrapper">
                <DocumentIcon className="dash-hub-icon" />
              </div>
              <div className="dash-hub-content">
                <h3 className="dash-hub-title">Study Notes Repository</h3>
                <p className="dash-hub-desc">
                  Browse and search lecture notes, formulas, and past papers.
                </p>
                <Link to="/notes" className="btn btn-outline btn-sm">
                  Open Notes Catalog →
                </Link>
              </div>
            </div>

            <div className="dash-hub-card">
              <div className="dash-hub-icon-wrapper accent">
                <UploadCloudIcon className="dash-hub-icon" />
              </div>
              <div className="dash-hub-content">
                <h3 className="dash-hub-title">Upload & Share Material</h3>
                <p className="dash-hub-desc">
                  Share your revision notes and support fellow students.
                </p>
                <Link to="/upload" className="btn btn-primary btn-sm">
                  Go to Upload Studio →
                </Link>
              </div>
            </div>

            <div className="dash-hub-card">
              <div className="dash-hub-icon-wrapper info">
                <UserIcon className="dash-hub-icon" />
              </div>
              <div className="dash-hub-content">
                <h3 className="dash-hub-title">Student Profile</h3>
                <p className="dash-hub-desc">
                  Logged in as <strong>{studentName}</strong>
                  {currentUser?.email ? ` (${currentUser.email})` : ""}.
                </p>
                <span className="profile-active-tag">
                  ✓ Authenticated Session
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Semester Folder Explorer */}
      <section className="semester-explorer-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">Your Study Space</span>
              <h2 className="section-title">Explore by Semester</h2>
              <p className="section-subtitle">
                Choose a semester to explore its subject folders.
              </p>
            </div>
          </div>

          <div className="semester-folder-grid">
            {SEMESTERS.map((semester) => (
              <Link
                key={semester.id}
                to={`/notes?semester=${semester.id}`}
                className="semester-folder-card"
                style={{ "--semester-color": semester.color }}
              >
                <div className="semester-folder-icon">📁</div>
                <h3>{semester.name}</h3>
                <p>{semester.subjects.length} subject folders</p>
                <div className="semester-subject-preview">
                  {semester.subjects.slice(0, 3).join(" · ")}
                  {semester.subjects.length > 3 ? " · ..." : ""}
                </div>
                <span className="semester-folder-link">Open folder →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="dashboard-recent-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">Study Repository</span>
              <h2 className="section-title">Your Notes Are Ready</h2>
              <p className="section-subtitle">
                Explore {notes.length} study resources across {uniqueSubjects}{" "}
                subjects in your Notes Catalog.
              </p>
            </div>
            <Link to="/notes" className="btn btn-primary">
              <EyeIcon />
              <span>Browse All Notes</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
