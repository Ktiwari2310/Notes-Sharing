/**
 * NotesList.jsx
 * 
 * Purpose:
 * Receives the filtered array of notes from App.jsx and renders them
 * in a responsive grid using the reusable NoteCard component.
 * Displays a friendly empty state if no notes match the current search or filters.
 */

import React from 'react';
import NoteCard from './NoteCard';
import { DocumentIcon, UploadCloudIcon } from './Icons';

function NotesList({ notes, onViewNote, onDownloadNote, onResetFilters, onGoToUpload }) {
  return (
    <section className="notes-section" id="notes">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-header-text">
            <h2 className="section-title">Available Study Notes</h2>
            <p className="section-subtitle">
              Browse verified lecture notes, handwritten summaries, and past papers uploaded by fellow students.
            </p>
          </div>
          <div className="section-badge">
            {notes.length} {notes.length === 1 ? 'Resource' : 'Resources'}
          </div>
        </div>

        {/* Notes Grid or Empty State */}
        {notes.length > 0 ? (
          <div className="notes-grid">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onView={onViewNote}
                onDownload={onDownloadNote}
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
              We couldn't find any notes matching your search criteria.
              Try adjusting your keywords or selected subject, or be the first to contribute!
            </p>
            <div className="empty-actions">
              <button 
                className="btn btn-outline"
                onClick={onResetFilters}
              >
                Clear Filters
              </button>
              <button 
                className="btn btn-primary"
                onClick={onGoToUpload}
              >
                <UploadCloudIcon />
                <span>Upload New Note</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default NotesList;
