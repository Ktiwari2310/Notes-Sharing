/**
 * semestersData.js
 * 
 * Centralized Semester & Subject configuration for NoteShare.
 * Configured specifically for Semesters 3, 4, 5, and 6 with exact curriculum subject names.
 */

export const SEMESTERS = [
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
    description: 'Universal Human Values, Mathematics-III, Digital Circuit Design, Data Structures & DBMS',
    subjects: [
      'Universal Human Values-II',
      'Mathematics-III',
      'Digital Circuit Design',
      'Data Structures & Algorithms',
      'Database Management Systems'
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
    description: 'Mathematics-IV, Computer Organization & Microprocessors, No SQL, and Computer Networks',
    subjects: [
      'Mathematics-IV',
      'Computer Organization Architecture & Microprocessors',
      'No SQL',
      'Computer Networks'
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
    description: 'Soft Skills, Operating System, Automata Theory, Web Programming & Cryptography',
    subjects: [
      'Soft Skill & Interpersonal Communication',
      'Operating System',
      'Automata Theory',
      'Web Programming',
      'Cryptography and Network Security'
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
    description: 'Work Place Mental Health, Data Mining, Software Engineering & Electives',
    subjects: [
      'Work Place Mental Health',
      'Data Mining and Business Intelligence',
      'Software Engineering',
      'Professional Elective-I',
      'Open Elective-I'
    ]
  }
];

// Flat list of all unique subjects across Semesters 3, 4, 5, 6
export const ALL_SEMESTER_SUBJECTS = Array.from(
  new Set(SEMESTERS.flatMap((s) => s.subjects))
);

/**
 * Normalizes any semester string to canonical number ('3', '4', '5', '6')
 */
export const getSemesterNumber = (semesterStr) => {
  if (!semesterStr) return null;
  const s = String(semesterStr).trim().toLowerCase();

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
  const n = String(noteSubject).trim().toLowerCase().replace(/[-_&]/g, ' ');
  const t = String(targetSubject).trim().toLowerCase().replace(/[-_&]/g, ' ');

  if (n === t) return true;

  const aliases = {
    // Sem 3
    'universal human values ii': ['universal human values', 'uhv', 'uhv ii', 'uhv 2', 'universal human values 2'],
    'mathematics iii': ['maths iii', 'maths 3', 'mathematics 3', 'maths-iii', 'bsc it 301'],
    'digital circuit design': ['dcd', 'esc it 301', 'digital circuit', 'digital circuits', 'digital electronics'],
    'data structures algorithms': ['dsa', 'data structures', 'pcc it 301', 'data structure', 'data structure and algorithms'],
    'database management systems': ['dbms', 'pcc it 302', 'database management system', 'database'],

    // Sem 4
    'mathematics iv': ['maths iv', 'maths 4', 'mathematics 4', 'maths-iv'],
    'computer organization architecture microprocessors': ['coa', 'esc it 401', 'computer organization', 'microprocessors', 'coa and microprocessors', 'computer organization architecture'],
    'no sql': ['nosql', 'pcc it 401', 'no-sql'],
    'computer networks': ['cn', 'pcc it 402', 'computer network', 'networks'],

    // Sem 5
    'soft skill interpersonal communication': ['ssic', 'soft skills', 'soft skill and interpersonal communication', 'interpersonal communication'],
    'operating system': ['os', 'pcc it 501', 'operating systems'],
    'automata theory': ['at', 'pcc it 502', 'theory of computation', 'toc', 'automata'],
    'web programming': ['wp', 'pcc it 503', 'web technologies', 'web tech', 'web development'],
    'cryptography and network security': ['cns', 'pcc it 504', 'cryptography', 'network security'],

    // Sem 6
    'work place mental health': ['wpmh', 'workplace mental health', 'mental health'],
    'data mining and business intelligence': ['dmbi', 'pcc it 601', 'data mining', 'business intelligence'],
    'software engineering': ['se', 'pcc it 602'],
    'professional elective i': ['pe 1', 'pec it 601x', 'professional elective 1', 'professional elective'],
    'open elective i': ['oe 1', 'oec 601x', 'open elective 1', 'open elective']
  };

  for (const [key, altList] of Object.entries(aliases)) {
    const isTarget = t.includes(key) || key.includes(t);
    const isNote = n.includes(key) || key.includes(n);

    if (isTarget && (altList.some(a => n.includes(a)) || isNote)) return true;
    if (isNote && (altList.some(a => t.includes(a)) || isTarget)) return true;
  }

  if (n.includes(t) || t.includes(n)) return true;

  return false;
};
