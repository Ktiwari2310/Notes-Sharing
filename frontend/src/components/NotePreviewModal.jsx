/**
 * NotePreviewModal.jsx
 * 
 * Purpose:
 * Renders an interactive modal dialog when a student clicks "View" on any note card.
 * Shows detailed metadata, outline of topics, and provides direct download action.
 */

import React from 'react';
import { CloseIcon, DocumentIcon, DownloadIcon, UserIcon, CalendarIcon } from './Icons';

function NotePreviewModal({ note, onClose, onDownload }) {
  if (!note) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-info">
            <span className="modal-badge">{note.subject}</span>
            <h3 className="modal-title">{note.title}</h3>
          </div>
          <button 
            className="modal-close-btn" 
            onClick={onClose} 
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="modal-meta-grid">
            <div className="modal-meta-item">
              <UserIcon />
              <div>
                <span className="meta-label">Uploaded By</span>
                <span className="meta-val">{note.uploadedBy}</span>
              </div>
            </div>
            <div className="modal-meta-item">
              <CalendarIcon />
              <div>
                <span className="meta-label">Date Added</span>
                <span className="meta-val">{note.uploadedDate}</span>
              </div>
            </div>
            <div className="modal-meta-item">
              <DocumentIcon />
              <div>
                <span className="meta-label">Format / Size</span>
                <span className="meta-val">{note.fileType || 'PDF'} • {note.fileSize || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h4 className="modal-section-title">Description</h4>
            <p className="modal-text">{note.description}</p>
          </div>

          <div className="modal-section">
            <h4 className="modal-section-title">Document Content & Outline</h4>
            <div className="document-preview-paper">
              <div className="preview-watermark">NoteShare Document Viewer</div>
              <pre className="preview-text-block">
                {note.previewContent || "Detailed lecture notes, explanations, and diagrams included in the download file."}
              </pre>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            Close
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => {
              onDownload(note);
            }}
          >
            <DownloadIcon />
            <span>Download {note.fileType || 'File'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotePreviewModal;
