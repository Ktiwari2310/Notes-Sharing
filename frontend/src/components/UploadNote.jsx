/**
 * UploadNote.jsx
 * 
 * Purpose:
 * Provides a form where students can upload and contribute new notes.
 * Fields:
 *  - Note title
 *  - Subject dropdown
 *  - Description
 *  - Student name
 *  - File upload (PDF / DOC / Image)
 * 
 * Once submitted, it validates inputs, adds the new note to the React state,
 * and notifies the user with instant feedback.
 */

import React, { useState, useRef } from 'react';
import { UploadCloudIcon, DocumentIcon, CloseIcon } from './Icons';
import { SUBJECTS_LIST } from '../data/sampleNotes';

function UploadNote({ onAddNote, initialStudentName = '' }) {
  // Local state for the form inputs
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Data Structures');
  const [customSubject, setCustomSubject] = useState('');
  const [description, setDescription] = useState('');
  const [studentName, setStudentName] = useState(initialStudentName);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef(null);

  // Filter out "All" from subjects list for dropdown options
  const formSubjects = SUBJECTS_LIST.filter(s => s !== 'All');

  // Handle file selection from input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Basic size limit check (e.g., 25MB)
      if (file.size > 25 * 1024 * 1024) {
        setErrorMessage('File size exceeds 25 MB limit.');
        return;
      }
      setSelectedFile(file);
      setErrorMessage('');
    }
  };

  // Format file size for display
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 KB';
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + ' KB';
    }
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      setErrorMessage('Please enter a note title.');
      return;
    }

    const finalSubject = subject === 'Other' && customSubject.trim() 
      ? customSubject.trim() 
      : subject;

    if (!finalSubject) {
      setErrorMessage('Please select or specify a subject.');
      return;
    }

    if (!studentName.trim()) {
      setErrorMessage('Please enter your student name.');
      return;
    }

    if (!selectedFile) {
      setErrorMessage('Please select a document or PDF file to upload.');
      return;
    }

    // Determine file type from extension
    const extension = selectedFile.name.split('.').pop().toUpperCase() || 'PDF';

    // Construct the new note object
    const newNote = {
      id: Date.now(), // Unique ID using timestamp
      title: title.trim(),
      subject: finalSubject,
      description: description.trim() || 'Uploaded study materials and lecture notes.',
      uploadedBy: studentName.trim(),
      uploadedDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      semester: 'Current',
      fileSize: formatFileSize(selectedFile.size),
      fileType: extension,
      fileName: selectedFile.name,
      downloadCount: 0,
      previewContent: description.trim() 
        ? `Note overview provided by ${studentName.trim()}:\n\n${description.trim()}`
        : `Uploaded by ${studentName.trim()} for ${finalSubject}. Ready for download and review.`
    };

    try {
      setErrorMessage('');
      // Pass new note back to parent state and wait for database response
      await onAddNote(newNote, selectedFile);

      // Reset form fields
      setTitle('');
      setSubject('Data Structures');
      setCustomSubject('');
      setDescription('');
      setStudentName('');
      setSelectedFile(null);
      setIsSuccess(true);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Hide success alert after 4 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to upload note to database.');
    }
  };

  return (
    <section className="upload-section" id="upload">
      <div className="container">
        <div className="upload-card">
          {/* Header */}
          <div className="upload-header">
            <div className="upload-header-icon">
              <UploadCloudIcon />
            </div>
            <div>
              <h2 className="upload-title">Upload Study Notes</h2>
              <p className="upload-subtitle">
                Help your classmates succeed! Share lecture notes, formulas, or summaries.
              </p>
            </div>
          </div>

          {/* Feedback messages */}
          {errorMessage && (
            <div className="alert alert-error">
              <span>{errorMessage}</span>
            </div>
          )}

          {isSuccess && (
            <div className="alert alert-success">
              <span>🎉 Note uploaded successfully! It is now visible in the Notes section.</span>
            </div>
          )}

          {/* Form */}
          <form className="upload-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Note Title */}
              <div className="form-group full-width">
                <label className="form-label" htmlFor="noteTitle">
                  Note Title <span className="required">*</span>
                </label>
                <input
                  id="noteTitle"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Data Structures Complete Unit 1 to 5 Notes"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Subject Selection */}
              <div className="form-group">
                <label className="form-label" htmlFor="noteSubject">
                  Subject <span className="required">*</span>
                </label>
                <select
                  id="noteSubject"
                  className="form-select"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                >
                  {formSubjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Custom Subject (if 'Other' is picked) */}
              {subject === 'Other' && (
                <div className="form-group">
                  <label className="form-label" htmlFor="customSubject">
                    Specify Subject Name <span className="required">*</span>
                  </label>
                  <input
                    id="customSubject"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Artificial Intelligence"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    required
                  />
                </div>
              )}

              {/* Student Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="studentName">
                  Uploaded By (Your Name) <span className="required">*</span>
                </label>
                <input
                  id="studentName"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Alex Johnson"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div className="form-group full-width">
                <label className="form-label" htmlFor="noteDescription">
                  Description / Topics Covered
                </label>
                <textarea
                  id="noteDescription"
                  className="form-textarea"
                  rows="3"
                  placeholder="Briefly describe what chapters or concepts this document covers..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              {/* File Upload Area */}
              <div className="form-group full-width">
                <label className="form-label">
                  Upload Document / PDF File <span className="required">*</span>
                </label>
                
                <div 
                  className={`file-drop-zone ${selectedFile ? 'has-file' : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden-file-input"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                    onChange={handleFileChange}
                  />

                  {selectedFile ? (
                    <div className="file-preview-box">
                      <DocumentIcon className="file-preview-icon" />
                      <div className="file-preview-info">
                        <span className="file-name">{selectedFile.name}</span>
                        <span className="file-size">{formatFileSize(selectedFile.size)}</span>
                      </div>
                      <button
                        type="button"
                        className="file-remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        title="Remove file"
                      >
                        <CloseIcon />
                      </button>
                    </div>
                  ) : (
                    <div className="drop-zone-content">
                      <div className="drop-zone-icon">
                        <UploadCloudIcon />
                      </div>
                      <p className="drop-zone-text">
                        <strong>Click to browse</strong> or drag & drop your study file here
                      </p>
                      <p className="drop-zone-hint">
                        Supports PDF, DOCX, PPTX, or TXT (Max 25 MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-submit-container">
              <button type="submit" className="btn btn-primary btn-lg submit-upload-btn">
                <UploadCloudIcon />
                <span>Upload Note</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UploadNote;
