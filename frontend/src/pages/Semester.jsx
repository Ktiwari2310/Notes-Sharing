import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useNotes } from "../context/NotesContext";

const semesters = {
  iii: {
    name: "Semester III",
    subjects: ["UHV", "Maths III", "DCD", "DSA", "DBMS"],
    color: "#8b5cf6",
  },
  iv: {
    name: "Semester IV",
    subjects: ["Maths IV", "COA", "NoSQL", "CN"],
    color: "#0d9488",
  },
  v: {
    name: "Semester V",
    subjects: ["SSIC", "OS", "AT", "WP", "CNS"],
    color: "#6366f1",
  },
};

function Semester() {
  const { semesterId } = useParams();
  const navigate = useNavigate();
  const { notes } = useNotes();

  const semester = semesters[semesterId?.toLowerCase()];

  if (!semester) {
    return (
      <div className="page-wrapper">
        <div className="container semester-page-content">
          <h2>Semester not found</h2>
          <Link to="/dashboard" className="btn btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const semesterNumber = { iii: "3", iv: "4", v: "5" }[
    semesterId.toLowerCase()
  ];

  const semesterNotes = notes.filter(
    (note) => String(note.semester || "").match(/\d+/)?.[0] === semesterNumber,
  );

  const getCount = (subject) =>
    semesterNotes.filter((note) => {
      const actual = (note.subject || "").toLowerCase();
      const wanted = subject.toLowerCase();

      const aliases = {
        dsa: ["data structures", "data structures and algorithms"],
        dbms: ["database management system", "dbms"],
        os: ["operating systems", "operating system"],
        wp: ["web technologies", "web programming"],
        cn: ["computer networks", "computer network"],
        "maths iii": ["mathematics iii", "maths iii", "mathematics 3"],
        "maths iv": ["mathematics iv", "maths iv", "mathematics 4"],
      };

      return actual === wanted || (aliases[wanted] || []).includes(actual);
    }).length;

  return (
    <div className="page-wrapper semester-page-content">
      <div className="container">
        <nav className="semester-breadcrumb">
          <Link to="/dashboard">Dashboard</Link>
          <span> / </span>
          <span>{semester.name}</span>
        </nav>

        <div className="semester-page-header">
          <div>
            <span className="section-eyebrow">Semester Explorer</span>
            <h1>{semester.name}</h1>
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
                    semester.name,
                  )}&subject=${encodeURIComponent(subject)}`,
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

        <Link to="/dashboard" className="btn btn-secondary semester-back">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Semester;
