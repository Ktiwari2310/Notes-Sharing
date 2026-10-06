/**
 * NoteCard.jsx
 * 
 * Purpose:
 * Renders an individual note in the portal.
 * Displays key metadata (title, subject badge, author name, file type, date),
 * along with action buttons to preview/view the note details or download the file.
 */

import React from 'react';
import { DocumentIcon, UserIcon, CalendarIcon, DownloadIcon, EyeIcon } from './Icons';

function NoteCard({ note, onView, onDownload }) {
  // Generate a distinct theme class based on subject for visual clarity
  const getSubjectColorClass = (subj) => {
    switch (subj) {
      case 'Data Structures':
        return 'tag-blue';
      case 'Database Management System':
        return 'tag-emerald';
      case 'Operating Systems':
        return 'tag-amber';
      case 'Computer Networks':
        return 'tag-purple';
      case 'Java Programming':
        return 'tag-rose';
      case 'Web Technologies':
        return 'tag-cyan';
      default:
        return 'tag-indigo';
    }
  };

  return (
    <article className="note-card">
      {/* Card Header: Document Icon & Subject Badge */}
      <div className="card-top-row">
        <div className="doc-icon-container" title={`${note.fileType || 'PDF'} Document`}>
          <DocumentIcon className="doc-svg-icon" />
          <span className="file-type-pill">{note.fileType || 'PDF'}</span>
        </div>

        <span className={`subject-badge ${getSubjectColorClass(note.subject)}`}>
          {note.subject}
        </span>
      </div>

      {/* Note Title */}
      <h3 className="note-title" title={note.title}>
        {note.title}
      </h3>

      {/* Note Brief Description */}
      <p className="note-desc">
        {note.description || "Student study material, lecture notes, and formula references."}
      </p>

      {/* Note Metadata: Author & Date */}
      <div className="note-meta">
        <div className="meta-item author-item">
          <UserIcon className="meta-icon" />
          <span>Uploaded by <strong className="author-name">{note.uploadedBy}</strong></span>
        </div>

        <div className="meta-sub-row">
          <div className="meta-item">
            <CalendarIcon className="meta-icon" />
            <span>{note.uploadedDate || 'Recently added'}</span>
          </div>
          {note.fileSize && (
            <span className="file-size-badge">{note.fileSize}</span>
          )}
        </div>
      </div>

      {/* Card Footer: Action Buttons (View & Download) */}
      <div className="note-card-actions">
        <button 
          className="btn btn-outline btn-sm action-btn-view"
          onClick={() => onView(note)}
          title="View note preview and details"
        >
          <EyeIcon />
          <span>View</span>
        </button>

        <button 
          className="btn btn-primary btn-sm action-btn-download"
          onClick={() => onDownload(note)}
          title="Download study material"
        >
          <DownloadIcon />
          <span>Download</span>
        </button>
      </div>
    </article>
  );
}

export default NoteCard;
