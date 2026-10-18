/**
 * semestersData.js
 * 
 * Centralized Semester & Subject configuration for NoteShare.
 * Configured for Semesters 2, 3, 4, 5, and 6 with their respective subject folders.
 */

export const SEMESTERS = [
  {
    id: '2',
    number: 2,
    name: 'Semester 2',
    shortName: 'Sem 2',
    slug: 'sem-2',
    color: '#2563eb', // Royal Blue
    lightBg: '#eff6ff',
    borderColor: '#bfdbfe',
    icon: '📁',
    description: 'Foundational Engineering Mathematics, Physics, & Basic Programming',
    subjects: [
      'Mathematics II',
      'Applied Physics',
      'Basic Electrical Engineering',
      'Programming in C',
      'Engineering Graphics'
    ]
  },
  {
    id: '3',
    number: 3,
    name: 'Semester 3',
    shortName: 'Sem 3',
    slug: 'sem-3',
    color: '#8b5cf6', // Violet / Purple
    lightBg: '#f5f3ff',
    borderColor: '#ddd6fe',
    icon: '📁',
    description: 'Data Structures, Logic Design, Object-Oriented Programming & Discrete Math',
    subjects: [
      'Data Structures',
      'Database Management System',
      'Digital Electronics & Logic Design (DCD)',
      'Mathematics III',
      'Java Programming',
      'Universal Human Values (UHV)'
    ]
  },
  {
    id: '4',
    number: 4,
    name: 'Semester 4',
    shortName: 'Sem 4',
    slug: 'sem-4',
    color: '#0d9488', // Teal
    lightBg: '#f0fdfa',
    borderColor: '#99f6e4',
    icon: '📁',
    description: 'Operating Systems, Computer Architecture, Algorithms & Applied Math',
    subjects: [
      'Operating Systems',
      'Computer Organization & Architecture (COA)',
      'Mathematics IV',
      'Theory of Computation (TOC)',
      'Design & Analysis of Algorithms',
      'NoSQL Databases'
    ]
  },
  {
    id: '5',
    number: 5,
    name: 'Semester 5',
    shortName: 'Sem 5',
    slug: 'sem-5',
    color: '#f59e0b', // Amber / Gold
    lightBg: '#fffbeb',
    borderColor: '#fde68a',
    icon: '📁',
    description: 'Computer Networks, Web Technologies, Software Engineering & Cloud',
    subjects: [
      'Computer Networks',
      'Web Technologies',
      'Software Engineering',
      'Artificial Intelligence',
      'Cyber Security & Cryptography',
      'Cloud Computing'
    ]
  },
  {
    id: '6',
    number: 6,
    name: 'Semester 6',
    shortName: 'Sem 6',
    slug: 'sem-6',
    color: '#ec4899', // Pink / Rose
    lightBg: '#fdf2f8',
    borderColor: '#fbcfe8',
    icon: '📁',
    description: 'Machine Learning, Compiler Design, Mobile Apps & Distributed Systems',
    subjects: [
      'Machine Learning',
      'Compiler Design',
      'Mobile Application Development',
      'Internet of Things (IoT)',
      'Big Data Analytics',
      'Information Security'
    ]
  }
];

// Flat list of all unique subjects across all semesters
export const ALL_SEMESTER_SUBJECTS = Array.from(
  new Set(SEMESTERS.flatMap((s) => s.subjects))
).sort();

/**
 * Normalizes any semester string to its canonical number ('2', '3', '4', '5', '6')
 * Handles formats like 'Semester 2', 'Sem 2', 'sem-2', '2', 'Semester II', 'ii', etc.
 */
export const getSemesterNumber = (semesterStr) => {
  if (!semesterStr) return null;
  const s = String(semesterStr).trim().toLowerCase();

  if (s.includes('sem-2') || s.includes('sem 2') || s.includes('semester 2') || s === '2' || s === 'ii' || s.endsWith(' 2')) return '2';
  if (s.includes('sem-3') || s.includes('sem 3') || s.includes('semester 3') || s === '3' || s === 'iii' || s.endsWith(' 3')) return '3';
  if (s.includes('sem-4') || s.includes('sem 4') || s.includes('semester 4') || s === '4' || s === 'iv' || s.endsWith(' 4')) return '4';
  if (s.includes('sem-5') || s.includes('sem 5') || s.includes('semester 5') || s === '5' || s === 'v' || s.endsWith(' 5')) return '5';
  if (s.includes('sem-6') || s.includes('sem 6') || s.includes('semester 6') || s === '6' || s === 'vi' || s.endsWith(' 6')) return '6';

  const match = s.match(/\d+/);
  return match ? match[0] : null;
};

/**
 * Finds a semester object by query (number, slug, name, or id)
 */
export const findSemester = (query) => {
  if (!query) return null;
  const num = getSemesterNumber(query);
  if (num) {
    return SEMESTERS.find((s) => s.id === num) || null;
  }
  const clean = String(query).toLowerCase().trim();
  return (
    SEMESTERS.find(
      (s) =>
        s.slug === clean ||
        s.name.toLowerCase() === clean ||
        s.shortName.toLowerCase() === clean
    ) || null
  );
};

/**
 * Check if a note's subject matches a target subject folder
 */
export const doesSubjectMatch = (noteSubject, targetSubject) => {
  if (!noteSubject || !targetSubject) return false;
  const n = String(noteSubject).trim().toLowerCase();
  const t = String(targetSubject).trim().toLowerCase();

  if (n === t) return true;

  const aliases = {
    'dsa': ['data structures', 'data structures & algorithms', 'data structures and algorithms'],
    'dbms': ['database management system', 'database management systems', 'dbms'],
    'os': ['operating systems', 'operating system'],
    'cn': ['computer networks', 'computer network'],
    'coa': ['computer organization & architecture', 'computer organization and architecture', 'coa'],
    'wp': ['web technologies', 'web programming', 'web tech', 'web development'],
    'web technologies': ['web tech', 'web programming', 'wp', 'web development'],
    'maths ii': ['mathematics ii', 'maths 2', 'mathematics 2', 'maths ii'],
    'maths iii': ['mathematics iii', 'maths 3', 'mathematics 3', 'maths iii'],
    'maths iv': ['mathematics iv', 'maths 4', 'mathematics 4', 'maths iv'],
    'mathematics ii': ['maths ii', 'maths 2', 'mathematics 2'],
    'mathematics iii': ['maths iii', 'maths 3', 'mathematics 3'],
    'mathematics iv': ['maths iv', 'maths 4', 'mathematics 4'],
    'dcd': ['digital electronics & logic design (dcd)', 'digital logic', 'digital electronics', 'dcd'],
    'ai': ['artificial intelligence', 'ai'],
    'ml': ['machine learning', 'ml'],
    'se': ['software engineering', 'se'],
    'toc': ['theory of computation', 'theory of computation (toc)', 'toc'],
    'uhv': ['universal human values', 'universal human values (uhv)', 'uhv']
  };

  if (aliases[t] && aliases[t].includes(n)) return true;
  if (aliases[n] && aliases[n].includes(t)) return true;
  if (n.includes(t) || t.includes(n)) return true;

  return false;
};
