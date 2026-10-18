/**
 * UploadNote.jsx
 * 
 * Purpose:
 * Provides a rich form where students upload and contribute study notes / PDFs.
 * Fields:
 *  - Note Title
 *  - Semester selection (Sem 2, 3, 4, 5, 6, etc.)
 *  - Subject selection (dynamically adapts to chosen semester, plus custom subject option)
 *  - Uploader Name
 *  - Description / Topics Covered
 *  - File upload (PDF / DOC / PPT) with drag-and-drop
 * 
 * Supports initial pre-selection via props or URL query params (e.g., ?semester=Semester%203&subject=Data%20Structures).
 */

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UploadCloudIcon, DocumentIcon, CloseIcon } from './Icons';
import { SEMESTERS, findSemester } from '../data/semestersData';

function UploadNote({
  onAddNote,
  initialStudentName = '',
  initialSemester = '',
  initialSubject = '',
  lockSemester = false,
  lockSubject = false,
  isCompact = false
}) {
  const [searchParams] = useSearchParams();

  // Resolve initial semester and subject from props or query parameters
  const querySem = searchParams.get('semester') || searchParams.get('sem') || '';
  const querySubj = searchParams.get('subject') || searchParams.get('subj') || '';

  const defaultSemesterObj =
    findSemester(initialSemester || querySem) ||
    SEMESTERS.find((s) => s.id === '3') ||
    SEMESTERS[0];

  const defaultSemester = defaultSemesterObj.name; // e.g. "Semester 3"
  const defaultSubject =
    initialSubject || querySubj || defaultSemesterObj.subjects[0] || 'Data Structures';

  // Form states
  const [semester, setSemester] = useState(defaultSemester);
  const [subject, setSubject] = useState(defaultSubject);
  const [customSubject, setCustomSubject] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [studentName, setStudentName] = useState(initialStudentName);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  // Sync state if initialSemester or initialSubject changes from outside
  useEffect(() => {
    if (initialSemester) {
      const semObj = findSemester(initialSemester);
      if (semObj) setSemester(semObj.name);
    }
  }, [initialSemester]);

  useEffect(() => {
    if (initialSubject) {
      setSubject(initialSubject);
    }
  }, [initialSubject]);

  useEffect(() => {
    if (initialStudentName && !studentName) {
      setStudentName(initialStudentName);
    }
  }, [initialStudentName]);

  // Current semester object to derive its subjects
  const currentSemesterObj = findSemester(semester);
  const availableSubjects = currentSemesterObj ? currentSemesterObj.subjects : [];

  // When semester changes, if current subject is not in that semester's subjects and not 'Other',
  // automatically default to the semester's first subject
  const handleSemesterChange = (newSemName) => {
    setSemester(newSemName);
    const newSemObj = findSemester(newSemName);
    if (newSemObj && newSemObj.subjects.length > 0) {
      // If the current subject isn't among the new semester's subjects, pick first one
      if (!newSemObj.subjects.includes(subject) && subject !== 'Other') {
        setSubject(newSemObj.subjects[0]);
      }
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        setErrorMessage('File size exceeds 25 MB limit.');
        return;
      }
      setSelectedFile(file);
      setErrorMessage('');

      // Auto-suggest title if user hasn't typed one
      if (!title.trim()) {
        const cleanName = file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[_-]/g, ' ')
          .trim();
        if (cleanName) {
          setTitle(cleanName);
        }
      }
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

    if (!title.trim()) {
      setErrorMessage('Please enter a title for the note.');
      return;
    }

    if (!semester) {
      setErrorMessage('Please select a semester.');
      return;
    }

    const finalSubject =
      subject === 'Other' && customSubject.trim()
        ? customSubject.trim()
        : subject;

    if (!finalSubject) {
      setErrorMessage('Please select or specify a subject name.');
      return;
    }

    if (!studentName.trim()) {
      setErrorMessage('Please enter your student name.');
      return;
    }

    if (!selectedFile) {
      setErrorMessage('Please select a PDF or document file to upload.');
      return;
    }

    const extension =
      selectedFile.name.split('.').pop().toUpperCase() || 'PDF';

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      semester: semester.trim(),
      subject: finalSubject,
      description:
        description.trim() || 'Uploaded study materials and lecture notes.',
      uploadedBy: studentName.trim(),
      uploadedDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      fileSize: formatFileSize(selectedFile.size),
      fileType: extension,
      fileName: selectedFile.name,
      downloadCount: 0,
      previewContent: description.trim()
        ? `Note overview provided by ${studentName.trim()}:\n\n${description.trim()}`
        : `Uploaded by ${studentName.trim()} for ${finalSubject} (${semester.trim()}). Ready for download and review.`
    };

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      await onAddNote(newNote, selectedFile);

      // Reset form
      setTitle('');
      setDescription('');
      setSelectedFile(null);
      setCustomSubject('');
      setIsSuccess(true);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to upload note to database.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`upload-section ${isCompact ? 'upload-section-compact' : ''}`} id="upload">
      <div className={isCompact ? 'compact-container' : 'container'}>
        <div className={`upload-card ${isCompact ? 'upload-card-compact' : ''}`}>
          {/* Header */}
          {!isCompact && (
            <div className="upload-header">
              <div className="upload-header-icon">
                <UploadCloudIcon />
              </div>
              <div>
                <h2 className="upload-title">Upload Study Notes</h2>
                <p className="upload-subtitle">
                  Help your classmates succeed! Share lecture notes, formulas, or summaries across Semesters 3, 4, 5, and 6.
                </p>
              </div>
            </div>
          )}

          {/* Feedback messages */}
          {errorMessage && (
            <div className="alert alert-error">
              <span>{errorMessage}</span>
            </div>
          )}

          {isSuccess && (
            <div className="alert alert-success">
              <span>🎉 Note uploaded successfully into <strong>{semester} &gt; {subject}</strong>!</span>
            </div>
          )}

          {/* Form */}
          <form className="upload-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Semester Field */}
              <div className="form-group">
                <label className="form-label" htmlFor="noteSemester">
                  Semester <span className="required">*</span>
                </label>
                {lockSemester ? (
                  <div className="locked-field-badge">
                    <span>📁 {semester}</span>
                    <input type="hidden" value={semester} />
                  </div>
                ) : (
                  <select
                    id="noteSemester"
                    className="form-select semester-select"
                    value={semester}
                    onChange={(e) => handleSemesterChange(e.target.value)}
                    required
                  >
                    {SEMESTERS.map((sem) => (
                      <option key={sem.id} value={sem.name}>
                        {sem.name} ({sem.shortName})
                      </option>
                    ))}
                  </select>
                )}
                <span className="field-hint">Choose which semester folder this note belongs to (Sem 3, 4, 5, or 6)</span>
              </div>

              {/* Subject Field */}
              <div className="form-group">
                <label className="form-label" htmlFor="noteSubject">
                  Subject Folder <span className="required">*</span>
                </label>
                {lockSubject ? (
                  <div className="locked-field-badge">
                    <span>📂 {subject}</span>
                    <input type="hidden" value={subject} />
                  </div>
                ) : (
                  <select
                    id="noteSubject"
                    className="form-select"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  >
                    {availableSubjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                    <option value="Other">+ Other (Custom Subject)</option>
                  </select>
                )}
                <span className="field-hint">The specific subject folder inside {semester}</span>
              </div>

              {/* Custom Subject (if 'Other' is picked) */}
              {subject === 'Other' && !lockSubject && (
                <div className="form-group full-width">
                  <label className="form-label" htmlFor="customSubject">
                    Specify Custom Subject Name <span className="required">*</span>
                  </label>
                  <input
                    id="customSubject"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Artificial Intelligence, Cloud Computing, etc."
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    required
                  />
                </div>
              )}

              {/* Note Title */}
              <div className="form-group full-width">
                <label className="form-label" htmlFor="noteTitle">
                  Note / Document Title <span className="required">*</span>
                </label>
                <input
                  id="noteTitle"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Unit 1 to 3 Handwritten Complete Notes & Formulas"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Student Name */}
              <div className="form-group full-width">
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
                  Description / Chapters Covered
                </label>
                <textarea
                  id="noteDescription"
                  className="form-textarea"
                  rows={isCompact ? 2 : 3}
                  placeholder="Summary of topics, modules, or formulas included in this document..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* File Upload Area */}
              <div className="form-group full-width">
                <label className="form-label">
                  PDF / Document File <span className="required">*</span>
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
                        <strong>Click to select PDF</strong> or drag & drop your study file here
                      </p>
                      <p className="drop-zone-hint">
                        Supports PDF (recommended), DOCX, PPTX, or TXT (Max 25 MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-submit-container">
              <button
                type="submit"
                className="btn btn-primary btn-lg submit-upload-btn"
                disabled={isSubmitting}
              >
                <UploadCloudIcon />
                <span>
                  {isSubmitting
                    ? 'Uploading...'
                    : `Upload to ${semester} > ${subject === 'Other' ? (customSubject || 'Custom Subject') : subject}`}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UploadNote;
