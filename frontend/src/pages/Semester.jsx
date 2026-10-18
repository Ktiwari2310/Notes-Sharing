import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import { findSemester, doesSubjectMatch, getSemesterNumber } from "../data/semestersData";

function Semester() {
  const { semesterId } = useParams();
  const navigate = useNavigate();
  const { notes } = useNotes();

  const semester = findSemester(semesterId);

  if (!semester) {
    return (
      <div className="page-wrapper">
        <div className="container semester-page-content">
          <h2>Semester not found</h2>
          <p>Please select a valid semester from 2, 3, 4, 5, or 6.</p>
          <Link to="/notes" className="btn btn-primary" style={{ marginTop: '16px' }}>
            Browse All Semesters
          </Link>
        </div>
      </div>
    );
  }

  const semesterNotes = notes.filter(
    (note) => getSemesterNumber(note.semester) === semester.id
  );

  const getCount = (subject) =>
    semesterNotes.filter((note) => doesSubjectMatch(note.subject, subject)).length;

  return (
    <div className="page-wrapper semester-page-content">
      <div className="container">
        <nav className="semester-breadcrumb">
          <Link to="/notes">📁 Browse Notes</Link>
          <span> / </span>
          <span>{semester.name}</span>
        </nav>

        <div className="semester-page-header">
          <div>
            <span className="section-eyebrow">Semester Explorer</span>
            <h1>{semester.name} ({semester.shortName})</h1>
            <p>
              {semester.subjects.length} subjects · {semesterNotes.length} notes
              available
            </p>
          </div>

          <Link
            to={`/upload?semester=${encodeURIComponent(semester.name)}`}
            className="btn btn-primary"
          >
            + Upload Notes
          </Link>
        </div>

        <h2 className="semester-section-title">Subject Folders</h2>

        <div className="subject-folder-grid">
          {semester.subjects.map((subject) => (
            <button
              type="button"
              key={subject}
              className="subject-folder-card"
              onClick={() =>
                navigate(
                  `/notes?semester=${encodeURIComponent(
                    semester.id
                  )}&subject=${encodeURIComponent(subject)}`
                )
              }
              style={{ "--semester-color": semester.color }}
            >
              <span className="subject-folder-icon">📁</span>
              <span className="subject-folder-name">{subject}</span>
              <span className="subject-folder-count">
                {getCount(subject)} {getCount(subject) === 1 ? "note" : "notes"}
              </span>
              <span className="subject-folder-arrow">Open folder →</span>
            </button>
          ))}
        </div>

        <Link to="/notes" className="btn btn-secondary semester-back">
          ← Back to All Semesters
        </Link>
      </div>
    </div>
  );
}

export default Semester;
