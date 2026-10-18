/**
 * Notes.jsx
 * 
 * Route: /notes (Browse Notes)
 * Hierarchical Folder Explorer & Notes Repository:
 *  - Level 1: Semesters 2, 3, 4, 5, 6 folder cards with subject previews and file counts.
 *  - Level 2: Subject folders inside the chosen semester (predefined + custom subjects).
 *  - Level 3: Files / PDFs inside the chosen subject folder, with in-folder upload functionality.
 *  - Direct folder deep-linking via URL (?semester=3&subject=Data%20Structures).
 *  - Integrated search with folder attribution and view mode switcher.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';
import NoteCard from '../components/NoteCard';
import UploadNote from '../components/UploadNote';
import SearchBar from '../components/SearchBar';
import {
  DocumentIcon,
  UploadCloudIcon,
  EyeIcon,
  CheckCircleIcon
} from '../components/Icons';
import {
  SEMESTERS,
  findSemester,
  getSemesterNumber,
  doesSubjectMatch
} from '../data/semestersData';

function Notes() {
  const { notes, setPreviewNote, handleDownloadNote, handleAddNote, currentUser } = useNotes();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL state
  const semesterParam = searchParams.get('semester') || searchParams.get('sem') || '';
  const subjectParam = searchParams.get('subject') || searchParams.get('subj') || '';

  // Active folder selection derived from URL params
  const activeSemester = useMemo(() => {
    return semesterParam ? findSemester(semesterParam) : null;
  }, [semesterParam]);

  const activeSubject = subjectParam ? decodeURIComponent(subjectParam) : null;

  // Search and view states
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('folders'); // 'folders' or 'all'
  const [selectedFilterSubject, setSelectedFilterSubject] = useState('All');
  const [showInFolderUploader, setShowInFolderUploader] = useState(false);

  // Helper to update navigation via search params
  const navigateToFolder = (semId, subjName = null) => {
    const params = new URLSearchParams();
    if (semId) params.set('semester', semId);
    if (subjName) params.set('subject', subjName);
    setSearchParams(params);
    setShowInFolderUploader(false);
  };

  const navigateToRoot = () => {
    setSearchParams(new URLSearchParams());
    setShowInFolderUploader(false);
  };

  // Helper to filter notes belonging to a semester
  const getNotesForSemester = (sem) => {
    if (!sem) return [];
    const targetNum = sem.id || String(sem.number);
    return notes.filter((n) => {
      const semNum = getSemesterNumber(n.semester);
      return semNum === targetNum;
    });
  };

  // Helper to get notes for a specific subject within a semester
  const getNotesForSubject = (sem, subjName) => {
    const semNotes = getNotesForSemester(sem);
    return semNotes.filter((n) => doesSubjectMatch(n.subject, subjName));
  };

  // Dynamic subject list for active semester (combines predefined subjects + uploaded subjects)
  const activeSemesterSubjects = useMemo(() => {
    if (!activeSemester) return [];
    const baseSubjects = [...activeSemester.subjects];
    const semNotes = getNotesForSemester(activeSemester);

    semNotes.forEach((n) => {
      if (
        n.subject &&
        !baseSubjects.some((s) => doesSubjectMatch(n.subject, s))
      ) {
        baseSubjects.push(n.subject);
      }
    });

    return baseSubjects;
  }, [activeSemester, notes]);

  // Notes in the active subject folder
  const activeFolderNotes = useMemo(() => {
    if (!activeSemester || !activeSubject) return [];
    return getNotesForSubject(activeSemester, activeSubject);
  }, [activeSemester, activeSubject, notes]);

  // Filtered notes for "All Notes" flat view or keyword search
  const searchedNotes = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return notes;
    return notes.filter((n) => {
      const titleMatch = (n.title || '').toLowerCase().includes(term);
      const subjMatch = (n.subject || '').toLowerCase().includes(term);
      const descMatch = (n.description || '').toLowerCase().includes(term);
      const semMatch = (n.semester || '').toLowerCase().includes(term);
      const authorMatch = (n.uploadedBy || '').toLowerCase().includes(term);
      return titleMatch || subjMatch || descMatch || semMatch || authorMatch;
    });
  }, [notes, searchTerm]);

  // Filtered notes for flat view with subject dropdown
  const flatViewNotes = useMemo(() => {
    return searchedNotes.filter((n) => {
      if (selectedFilterSubject === 'All') return true;
      return (n.subject || '').toLowerCase() === selectedFilterSubject.toLowerCase();
    });
  }, [searchedNotes, selectedFilterSubject]);

  // In-folder upload success handler
  const handleInFolderUpload = async (newNote, file) => {
    await handleAddNote(newNote, file);
    setShowInFolderUploader(false);
  };

  return (
    <div className="page-wrapper notes-page">
      {/* 1. Page Header Banner */}
      <section className="page-banner-section">
        <div className="container">
          <div className="page-banner-card">
            <div className="banner-content">
              <span className="banner-tag">Student Library &amp; Archives</span>
              <h1 className="banner-title">Browse Study Notes</h1>
              <p className="banner-desc">
                Organized hierarchically into <strong>Semesters 3, 4, 5, and 6</strong> folders.
                Navigate into your semester, select a subject folder, and access or upload lecture notes and PDFs.
              </p>

              {/* View Switcher Pills */}
              <div className="view-toggle-container">
                <button
                  type="button"
                  className={`view-toggle-btn ${viewMode === 'folders' ? 'active' : ''}`}
                  onClick={() => setViewMode('folders')}
                >
                  <span className="toggle-icon">📁</span>
                  <span>Folder Explorer</span>
                </button>
                <button
                  type="button"
                  className={`view-toggle-btn ${viewMode === 'all' ? 'active' : ''}`}
                  onClick={() => setViewMode('all')}
                >
                  <span className="toggle-icon">📄</span>
                  <span>All Notes Grid ({notes.length})</span>
                </button>
              </div>
            </div>

            <div className="banner-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80"
                alt="University library filled with curated textbooks, journals, and reference study notes"
                className="banner-real-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Global Search & Filter Bar */}
      <section className="search-section">
        <div className="container">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedSubject={selectedFilterSubject}
            onSubjectChange={setSelectedFilterSubject}
            onClearFilters={() => {
              setSearchTerm('');
              setSelectedFilterSubject('All');
            }}
            totalResults={searchTerm ? searchedNotes.length : notes.length}
          />
        </div>
      </section>

      {/* 3. Main Explorer Body */}
      <section className="folder-explorer-section">
        <div className="container">
          {/* SEARCH ACTIVE: When user types in search bar, display instant search results */}
          {searchTerm.trim() !== '' ? (
            <div className="search-results-container">
              <div className="results-header-row">
                <div>
                  <h2 className="explorer-view-title">
                    Search Results for "{searchTerm}"
                  </h2>
                  <p className="explorer-view-subtitle">
                    Found {searchedNotes.length} matching {searchedNotes.length === 1 ? 'note' : 'notes'} across all semester folders.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search &amp; Return to Folders
                </button>
              </div>

              {searchedNotes.length > 0 ? (
                <div className="notes-grid">
                  {searchedNotes.map((note) => (
                    <div key={note.id} className="search-note-wrapper">
                      {/* Folder Location Ribbon */}
                      <div className="note-folder-tagline">
                        <span>📁 {note.semester || 'Semester'}</span>
                        <span className="tag-arrow">/</span>
                        <span>📂 {note.subject}</span>
                        <button
                          type="button"
                          className="open-folder-link"
                          onClick={() => {
                            const sem = findSemester(note.semester);
                            if (sem) {
                              navigateToFolder(sem.id, note.subject);
                              setSearchTerm('');
                            }
                          }}
                        >
                          Go to folder →
                        </button>
                      </div>
                      <NoteCard
                        note={note}
                        onView={(n) => setPreviewNote(n)}
                        onDownload={handleDownloadNote}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <DocumentIcon className="empty-icon" />
                  <h3 className="empty-title">No notes match your search</h3>
                  <p className="empty-description">
                    We couldn't find any documents matching "{searchTerm}". Try another keyword or upload this note.
                  </p>
                  <Link to="/upload" className="btn btn-primary">
                    <UploadCloudIcon />
                    <span>Upload Notes for "{searchTerm}"</span>
                  </Link>
                </div>
              )}
            </div>
          ) : viewMode === 'all' ? (
            /* FLAT GRID VIEW: If user explicitly switched to "All Notes Grid" */
            <div className="all-notes-view">
              <div className="results-header-row">
                <div>
                  <h2 className="explorer-view-title">All Study Notes</h2>
                  <p className="explorer-view-subtitle">
                    Displaying all {flatViewNotes.length} uploaded files in a flat grid.
                  </p>
                </div>
              </div>

              {flatViewNotes.length > 0 ? (
                <div className="notes-grid">
                  {flatViewNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onView={(n) => setPreviewNote(n)}
                      onDownload={handleDownloadNote}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <DocumentIcon className="empty-icon" />
                  <h3 className="empty-title">No notes found</h3>
                  <p className="empty-description">No study notes available for this selection.</p>
                </div>
              )}
            </div>
          ) : (
            /* HIERARCHICAL FOLDER EXPLORER VIEW (Primary Default View) */
            <div className="folder-explorer-wrapper">
              {/* Folder Breadcrumb Navigation Bar */}
              <nav className="folder-breadcrumb-bar">
                <button
                  type="button"
                  className={`breadcrumb-item ${!activeSemester ? 'active' : ''}`}
                  onClick={navigateToRoot}
                >
                  <span className="breadcrumb-icon">📁</span>
                  <span>Browse Notes (All Semesters)</span>
                </button>

                {activeSemester && (
                  <>
                    <span className="breadcrumb-separator">/</span>
                    <button
                      type="button"
                      className={`breadcrumb-item ${activeSemester && !activeSubject ? 'active' : ''}`}
                      onClick={() => navigateToFolder(activeSemester.id)}
                    >
                      <span className="breadcrumb-icon">📂</span>
                      <span>{activeSemester.name} ({activeSemester.shortName})</span>
                    </button>
                  </>
                )}

                {activeSemester && activeSubject && (
                  <>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-item active breadcrumb-leaf">
                      <span className="breadcrumb-icon">📂</span>
                      <span>{activeSubject}</span>
                    </span>
                  </>
                )}
              </nav>

              {/* LEVEL 1: TOP LEVEL - SEMESTER FOLDERS (Sem 2, 3, 4, 5, 6) */}
              {!activeSemester && (
                <div className="semester-folders-view">
                  <div className="explorer-section-header">
                    <div>
                      <span className="section-eyebrow">Academic Catalog</span>
                      <h2 className="explorer-view-title">Semester Folders</h2>
                      <p className="explorer-view-subtitle">
                        Select a semester folder below to browse subject folders and study resources.
                      </p>
                    </div>

                    <Link to="/upload" className="btn btn-outline btn-sm">
                      <UploadCloudIcon />
                      <span>Upload Notes to a Semester</span>
                    </Link>
                  </div>

                  <div className="semester-folders-grid">
                    {SEMESTERS.map((sem) => {
                      const semNotes = getNotesForSemester(sem);
                      const noteCount = semNotes.length;
                      const subjectCount = sem.subjects.length;

                      return (
                        <div
                          key={sem.id}
                          className="semester-folder-item"
                          onClick={() => navigateToFolder(sem.id)}
                          style={{
                            '--sem-color': sem.color,
                            '--sem-bg': sem.lightBg,
                            '--sem-border': sem.borderColor
                          }}
                        >
                          <div className="folder-top-tab">
                            <span className="folder-tab-badge">{sem.shortName}</span>
                          </div>

                          <div className="folder-body">
                            <div className="folder-icon-large">
                              <span className="folder-emoji">📁</span>
                            </div>

                            <div className="folder-header-details">
                              <h3 className="folder-name">{sem.name}</h3>
                              <span className="folder-short-tag">{sem.shortName}</span>
                            </div>

                            <p className="folder-desc">{sem.description}</p>

                            <div className="folder-stats-row">
                              <div className="stat-chip">
                                <strong>{subjectCount}</strong> Subjects
                              </div>
                              <div className="stat-chip highlight">
                                <strong>{noteCount}</strong> {noteCount === 1 ? 'Note' : 'Notes'}
                              </div>
                            </div>

                            <div className="folder-subjects-preview">
                              <span className="preview-label">Folders inside:</span>
                              <div className="preview-chips-list">
                                {sem.subjects.slice(0, 4).map((subj) => (
                                  <span key={subj} className="subj-preview-chip">
                                    {subj}
                                  </span>
                                ))}
                                {sem.subjects.length > 4 && (
                                  <span className="subj-preview-chip more">
                                    +{sem.subjects.length - 4} more
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="folder-footer-action">
                              <span className="open-folder-prompt">
                                Open {sem.shortName} Folders →
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* LEVEL 2: SUBJECT FOLDERS INSIDE SELECTED SEMESTER */}
              {activeSemester && !activeSubject && (
                <div className="subject-folders-view">
                  <div className="explorer-sub-header">
                    <button
                      type="button"
                      className="btn btn-outline btn-sm back-to-parent-btn"
                      onClick={navigateToRoot}
                    >
                      ← Back to All Semesters
                    </button>

                    <div className="sub-header-details">
                      <div className="semester-pill-title" style={{ backgroundColor: activeSemester.lightBg, borderColor: activeSemester.borderColor, color: activeSemester.color }}>
                        📁 {activeSemester.name} ({activeSemester.shortName})
                      </div>
                      <h2 className="explorer-view-title">Subject Folders</h2>
                      <p className="explorer-view-subtitle">
                        Select any subject folder below to open files or upload notes directly into it.
                      </p>
                    </div>

                    <Link
                      to={`/upload?semester=${encodeURIComponent(activeSemester.name)}`}
                      className="btn btn-primary"
                    >
                      <UploadCloudIcon />
                      <span>+ Upload Notes to {activeSemester.shortName}</span>
                    </Link>
                  </div>

                  <div className="subject-folders-grid">
                    {activeSemesterSubjects.map((subjectName) => {
                      const notesInSubject = getNotesForSubject(activeSemester, subjectName);
                      const fileCount = notesInSubject.length;

                      return (
                        <div
                          key={subjectName}
                          className="subject-folder-card-interactive"
                          onClick={() => navigateToFolder(activeSemester.id, subjectName)}
                          style={{
                            '--subj-accent': activeSemester.color,
                            '--subj-bg': activeSemester.lightBg
                          }}
                        >
                          <div className="subj-folder-icon-row">
                            <span className="folder-graphic-icon">📂</span>
                            <span className="subj-file-count-pill">
                              {fileCount} {fileCount === 1 ? 'file' : 'files'}
                            </span>
                          </div>

                          <h3 className="subj-folder-name" title={subjectName}>
                            {subjectName}
                          </h3>

                          <p className="subj-folder-hint">
                            {fileCount > 0
                              ? `Contains ${fileCount} lecture notes & study resources`
                              : 'Empty folder. Click to upload the first file!'}
                          </p>

                          <div className="subj-card-footer">
                            <span className="folder-open-text">Open folder →</span>
                          </div>
                        </div>
                      );
                    })}

                    {/* "+ Add / Upload to Custom Subject" Card */}
                    <div
                      className="subject-folder-card-interactive add-custom-card"
                      onClick={() =>
                        navigate(`/upload?semester=${encodeURIComponent(activeSemester.name)}&subject=Other`)
                      }
                    >
                      <div className="subj-folder-icon-row">
                        <span className="folder-graphic-icon">➕</span>
                        <span className="subj-file-count-pill new-tag">New</span>
                      </div>
                      <h3 className="subj-folder-name">+ Upload to New Subject</h3>
                      <p className="subj-folder-hint">
                        Upload notes for any additional subject in {activeSemester.shortName}.
                      </p>
                      <div className="subj-card-footer">
                        <span className="folder-open-text">Add Subject &amp; Upload →</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LEVEL 3: INSIDE SUBJECT FOLDER - VIEW & UPLOAD FILES */}
              {activeSemester && activeSubject && (
                <div className="inside-subject-folder-view">
                  <div className="folder-action-header">
                    <div>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm back-to-parent-btn"
                        onClick={() => navigateToFolder(activeSemester.id)}
                      >
                        ← Back to {activeSemester.shortName} Folders
                      </button>

                      <div className="folder-title-row">
                        <h2 className="current-folder-title">
                          📂 {activeSubject}
                        </h2>
                        <span
                          className="folder-semester-tag"
                          style={{
                            backgroundColor: activeSemester.lightBg,
                            borderColor: activeSemester.borderColor,
                            color: activeSemester.color
                          }}
                        >
                          {activeSemester.name} ({activeSemester.shortName})
                        </span>
                      </div>

                      <p className="current-folder-subtitle">
                        {activeFolderNotes.length} {activeFolderNotes.length === 1 ? 'study note / PDF' : 'study notes / PDFs'} uploaded inside this folder.
                      </p>
                    </div>

                    <div className="folder-top-actions">
                      <button
                        type="button"
                        className={`btn ${showInFolderUploader ? 'btn-outline' : 'btn-primary'} in-folder-upload-btn`}
                        onClick={() => setShowInFolderUploader(!showInFolderUploader)}
                      >
                        <UploadCloudIcon />
                        <span>
                          {showInFolderUploader ? '✕ Close Upload Form' : '+ Upload File to this Folder'}
                        </span>
                      </button>

                      <Link
                        to={`/upload?semester=${encodeURIComponent(activeSemester.name)}&subject=${encodeURIComponent(activeSubject)}`}
                        className="btn btn-outline btn-sm"
                        title="Open full page upload studio"
                      >
                        Open Full Studio ↗
                      </Link>
                    </div>
                  </div>

                  {/* IN-FOLDER QUICK UPLOAD PANEL */}
                  {showInFolderUploader && (
                    <div className="in-folder-uploader-panel">
                      <div className="uploader-panel-header">
                        <div className="panel-header-title">
                          <UploadCloudIcon />
                          <div>
                            <h3>Upload PDF into {activeSemester.shortName} &gt; {activeSubject}</h3>
                            <p>Select your PDF file and enter note details to add it directly to this folder.</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          onClick={() => setShowInFolderUploader(false)}
                        >
                          ✕
                        </button>
                      </div>

                      <UploadNote
                        onAddNote={handleInFolderUpload}
                        initialStudentName={currentUser?.name || currentUser?.fullName || ''}
                        initialSemester={activeSemester.name}
                        initialSubject={activeSubject}
                        lockSemester={true}
                        lockSubject={true}
                        isCompact={true}
                      />
                    </div>
                  )}

                  {/* FILES GRID INSIDE THIS FOLDER */}
                  {activeFolderNotes.length > 0 ? (
                    <div className="folder-files-container">
                      <div className="files-summary-bar">
                        <span className="files-count-badge">
                          {activeFolderNotes.length} {activeFolderNotes.length === 1 ? 'Document' : 'Documents'} in {activeSubject}
                        </span>
                      </div>

                      <div className="notes-grid">
                        {activeFolderNotes.map((note) => (
                          <NoteCard
                            key={note.id}
                            note={note}
                            onView={(n) => setPreviewNote(n)}
                            onDownload={handleDownloadNote}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="empty-state folder-empty-state">
                      <div className="empty-icon-wrapper">
                        <DocumentIcon className="empty-icon" />
                      </div>
                      <h3 className="empty-title">This folder is empty</h3>
                      <p className="empty-description">
                        No notes have been uploaded to <strong>{activeSubject}</strong> in {activeSemester.name} yet.
                        Be the first to share your study materials or formulas!
                      </p>
                      <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        onClick={() => setShowInFolderUploader(true)}
                      >
                        <UploadCloudIcon />
                        <span>Upload the First PDF to {activeSubject}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Notes;
