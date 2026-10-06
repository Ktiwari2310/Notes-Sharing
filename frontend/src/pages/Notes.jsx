/**
 * Notes.jsx
 * 
 * Route: /notes
 * Study Notes Repository Page containing:
 *  - Real stock photo banner (university library reference material)
 *  - Page heading: "Study Notes" & short description
 *  - Dual-filter SearchBar (title/keyword and subject dropdown)
 *  - Filtered notes grid with NoteCards
 *  - View and Download action handlers
 */

import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import NoteCard from '../components/NoteCard';
import { useNotes } from '../context/NotesContext';
import { DocumentIcon, UploadCloudIcon } from '../components/Icons';
import { Link } from 'react-router-dom';

function Notes() {
  const { notes, setPreviewNote, handleDownloadNote } = useNotes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedSubject('All');
  };

  // Filter notes based on both search term and selected subject
  const filteredNotes = notes.filter((note) => {
    const term = searchTerm.toLowerCase().trim();

    const matchesSearch =
      term === '' ||
      note.title.toLowerCase().includes(term) ||
      note.subject.toLowerCase().includes(term) ||
      (note.description && note.description.toLowerCase().includes(term));

    const matchesSubject =
      selectedSubject === 'All' ||
      note.subject.toLowerCase() === selectedSubject.toLowerCase();

    return matchesSearch && matchesSubject;
  });

  return (
    <div className="page-wrapper notes-page">
      {/* 1. Page Header Banner with Real Stock Photography */}
      <section className="page-banner-section">
        <div className="container">
          <div className="page-banner-card">
            <div className="banner-content">
              <span className="banner-tag">Student Library</span>
              <h1 className="banner-title">Study Notes</h1>
              <p className="banner-desc">
                Access verified lecture notes, handwritten formulas, and exam preparation material uploaded by fellow students across all branches and semesters.
              </p>
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

      {/* 2. Search & Subject Filter Bar */}
      <section className="search-section">
        <div className="container">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedSubject={selectedSubject}
            onSubjectChange={setSelectedSubject}
            onClearFilters={handleClearFilters}
            totalResults={filteredNotes.length}
          />
        </div>
      </section>

      {/* 3. Notes Grid Display */}
      <section className="notes-section">
        <div className="container">
          {filteredNotes.length > 0 ? (
            <div className="notes-grid">
              {filteredNotes.map((note) => (
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
              <div className="empty-icon-wrapper">
                <DocumentIcon className="empty-icon" />
              </div>
              <h3 className="empty-title">No notes found</h3>
              <p className="empty-description">
                We couldn't find any study notes matching your search criteria.
                Try adjusting your search terms or be the first to upload one!
              </p>
              <div className="empty-actions">
                <button
                  className="btn btn-outline"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </button>
                <Link to="/upload" className="btn btn-primary">
                  <UploadCloudIcon />
                  <span>Upload This Note</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Notes;
