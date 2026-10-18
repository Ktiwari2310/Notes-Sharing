/**
 * sampleNotes.js
 * 
 * Purpose:
 * Contains initial mock data for the Student Notes Sharing Portal.
 * Encompasses Semesters 2, 3, 4, 5, and 6 with realistic, rich study notes.
 */

import { ALL_SEMESTER_SUBJECTS } from './semestersData';

export const INITIAL_NOTES = [
  // Semester 2
  {
    id: 101,
    title: "Engineering Mathematics II - Calculus & Differential Equations",
    subject: "Mathematics II",
    description: "Complete handwritten notes on Ordinary Differential Equations, Laplace Transforms, Fourier Series, and Multiple Integrals with solved university exam problems.",
    uploadedBy: "Vikram Malhotra",
    uploadedDate: "Oct 10, 2026",
    semester: "Semester 2",
    fileSize: "3.2 MB",
    fileType: "PDF",
    fileName: "Maths_II_Calculus_Differential_Equations.pdf",
    downloadCount: 184,
    previewContent: "Topics covered:\n• First order and higher order Linear Differential Equations\n• Laplace and Inverse Laplace Transforms with Dirac delta & unit step\n• Fourier Series, Half-range expansions, and Harmonic Analysis\n• Double and Triple Integrals with surface area & volume applications."
  },
  {
    id: 102,
    title: "Applied Physics - Optics & Quantum Mechanics",
    subject: "Applied Physics",
    description: "Lecture summary covering Wave Optics, Interference, Diffraction, Polarization, Lasers, Fiber Optics, and introduction to Quantum Mechanics.",
    uploadedBy: "Riya Sen",
    uploadedDate: "Oct 12, 2026",
    semester: "Semester 2",
    fileSize: "2.8 MB",
    fileType: "PDF",
    fileName: "Applied_Physics_Optics_Lasers_Quantum.pdf",
    downloadCount: 145,
    previewContent: "Topics covered:\n• Wave Optics: Young's double slit, Newton's Rings, Michelson interferometer\n• Diffraction: Fraunhofer diffraction at single and double slit, Diffraction grating\n• Lasers: Population inversion, Ruby Laser, He-Ne Laser, and semiconductor lasers\n• Fiber Optics: Numerical aperture, step-index vs graded-index fibers, attenuation."
  },
  {
    id: 103,
    title: "Programming in C - Pointers, Structures & File I/O",
    subject: "Programming in C",
    description: "Practical cheat sheet and textbook notes for C programming syntax, memory management, pointers, dynamic allocation (malloc/calloc), and file handling.",
    uploadedBy: "Alex Johnson",
    uploadedDate: "Oct 8, 2026",
    semester: "Semester 2",
    fileSize: "1.9 MB",
    fileType: "PDF",
    fileName: "C_Programming_Pointers_Structures_FileIO.pdf",
    downloadCount: 220,
    previewContent: "Topics covered:\n• Pointers: Pointer arithmetic, pointer to pointer, function pointers\n• Dynamic Memory: malloc, calloc, realloc, free and memory leaks\n• Structures, Unions, and Bit Fields with practical examples\n• File operations: fopen, fclose, fread, fwrite, fprintf, fscanf."
  },

  // Semester 3
  {
    id: 1,
    title: "Complete Data Structures & Algorithms",
    subject: "Data Structures",
    description: "In-depth notes on Arrays, Linked Lists, Stacks, Queues, Binary Trees, Graphs, Sorting algorithms, and Big-O complexity diagrams.",
    uploadedBy: "Rahul Verma",
    uploadedDate: "Sep 28, 2026",
    semester: "Semester 3",
    fileSize: "4.8 MB",
    fileType: "PDF",
    fileName: "DSA_Complete_Notes_Unit1-5.pdf",
    downloadCount: 342,
    previewContent: "Topics covered:\n• Linear Data Structures: Arrays, Linked Lists (Singly, Doubly, Circular)\n• Non-Linear: Binary Search Trees, AVL Trees, Red-Black Trees, Heaps\n• Graph Algorithms: BFS, DFS, Dijkstra's, Kruskal's, Prim's\n• Dynamic Programming fundamentals with standard problems."
  },
  {
    id: 5,
    title: "Java Programming & Object Oriented Principles",
    subject: "Java Programming",
    description: "Core Java notes covering Classes, Objects, Inheritance, Polymorphism, Abstract classes, Interfaces, Exception Handling, and Java Collections Framework.",
    uploadedBy: "Karthik Reddy",
    uploadedDate: "Sep 30, 2026",
    semester: "Semester 3",
    fileSize: "3.8 MB",
    fileType: "PDF",
    fileName: "Java_Core_OOP_Collections.pdf",
    downloadCount: 520,
    previewContent: "Topics covered:\n• 4 Pillars of OOP: Encapsulation, Abstraction, Inheritance, and Polymorphism\n• Core Java: JVM architecture, Garbage Collection, String vs StringBuilder\n• Java Collections: ArrayList, LinkedList, HashMap, HashSet, and Iterators\n• Multithreading: Thread lifecycle, Runnable vs Thread, Synchronization locks."
  },
  {
    id: 104,
    title: "Digital Logic & Computer Design (DCD) Formulas",
    subject: "Digital Electronics & Logic Design (DCD)",
    description: "Boolean algebra, K-maps (up to 5 variables), logic gates, flip-flops, counters, registers, and multiplexer implementations.",
    uploadedBy: "Siddharth Das",
    uploadedDate: "Oct 5, 2026",
    semester: "Semester 3",
    fileSize: "2.4 MB",
    fileType: "PDF",
    fileName: "DCD_Digital_Electronics_KMap_FlipFlops.pdf",
    downloadCount: 168,
    previewContent: "Topics covered:\n• Boolean Algebra theorems and canonical SOP/POS expressions\n• Karnaugh Maps (K-Maps) minimization techniques\n• Combinational Circuits: Adders, Subtractors, Decoders, Encoders, Multiplexers\n• Sequential Circuits: SR, JK, D, T Flip-flops, Synchronous & Asynchronous counters."
  },

  // Semester 4
  {
    id: 2,
    title: "DBMS Lecture Notes & SQL Cheat Sheet",
    subject: "Database Management System",
    description: "Comprehensive notes covering Relational Model, ER-Diagrams, Normalization (1NF to BCNF), SQL queries, and ACID transaction properties.",
    uploadedBy: "Priya Nair",
    uploadedDate: "Oct 2, 2026",
    semester: "Semester 4",
    fileSize: "3.5 MB",
    fileType: "PDF",
    fileName: "DBMS_Notes_and_SQL_Reference.pdf",
    downloadCount: 289,
    previewContent: "Topics covered:\n• Database Architecture: 3-tier architecture, Schema vs Instance\n• ER Modeling: Entities, Attributes, Relationships, Weak entities\n• Relational Algebra and Normalization: 1NF, 2NF, 3NF, BCNF with step-by-step reduction\n• Concurrency Control: Two-Phase Locking (2PL), Deadlock prevention and detection."
  },
  {
    id: 3,
    title: "Operating Systems Concepts & Process Scheduling",
    subject: "Operating Systems",
    description: "Detailed breakdown of Process Management, CPU Scheduling Algorithms (FCFS, SJF, RR), Memory Management, Paging, and Deadlock Avoidance.",
    uploadedBy: "Amit Patel",
    uploadedDate: "Sep 15, 2026",
    semester: "Semester 4",
    fileSize: "5.1 MB",
    fileType: "PDF",
    fileName: "OS_Notes_Process_Memory_Deadlock.pdf",
    downloadCount: 410,
    previewContent: "Topics covered:\n• Process Control Block (PCB), Process States, and Context Switching\n• Scheduling: Preemptive vs Non-Preemptive, Gantt chart examples\n• Synchronization: Critical section problem, Semaphores, Peterson's algorithm, Monitors\n• Virtual Memory: Demand Paging, Page Replacement algorithms (FIFO, LRU, Optimal)."
  },
  {
    id: 105,
    title: "Computer Organization & Architecture (COA) Summary",
    subject: "Computer Organization & Architecture (COA)",
    description: "Instruction cycle, addressing modes, pipelining hazards, cache memory mapping (Direct, Associative, Set-Associative), and RAID levels.",
    uploadedBy: "Tanya Sen",
    uploadedDate: "Oct 4, 2026",
    semester: "Semester 4",
    fileSize: "3.1 MB",
    fileType: "PDF",
    fileName: "COA_Architecture_Pipelining_Cache.pdf",
    downloadCount: 198,
    previewContent: "Topics covered:\n• Von Neumann vs Harvard architecture, CPU registers, Instruction formats\n• Addressing modes with practical assembly examples\n• Pipelining: Pipeline stages, Structural, Data, and Control hazards\n• Memory Hierarchy: Cache hit/miss rates, write-through vs write-back."
  },

  // Semester 5
  {
    id: 4,
    title: "Computer Networks - OSI Model & TCP/IP",
    subject: "Computer Networks",
    description: "Quick revision notes on 7 Layers of OSI model, IP addressing (IPv4 vs IPv6), Subnetting, TCP 3-way handshake, and Routing protocols.",
    uploadedBy: "Sneha Mukherjee",
    uploadedDate: "Sep 22, 2026",
    semester: "Semester 5",
    fileSize: "2.9 MB",
    fileType: "PDF",
    fileName: "CN_OSI_TCPIP_Protocols.pdf",
    downloadCount: 195,
    previewContent: "Topics covered:\n• OSI vs TCP/IP Protocol Architectures with detailed header formats\n• Network Layer: IPv4 Addressing, Classful vs CIDR Subnetting calculations\n• Transport Layer: Flow control (Sliding Window), TCP vs UDP, Congestion Control\n• Application Layer Protocols: HTTP/HTTPS, DNS, FTP, SMTP, DHCP."
  },
  {
    id: 6,
    title: "Web Technologies & Modern Frontend Basics",
    subject: "Web Technologies",
    description: "Handy reference for HTML5 semantic tags, CSS Flexbox & Grid, JavaScript ES6+ features, and introduction to React components.",
    uploadedBy: "Ananya Roy",
    uploadedDate: "Oct 3, 2026",
    semester: "Semester 5",
    fileSize: "2.2 MB",
    fileType: "PDF",
    fileName: "WebTech_HTML_CSS_JS_React.pdf",
    downloadCount: 167,
    previewContent: "Topics covered:\n• HTML5 semantic elements and accessibility guidelines\n• Responsive Design: CSS Media queries, Flexbox layout, CSS Grid systems\n• Modern JavaScript: Arrow functions, Promises, async/await, Destructuring\n• React fundamentals: JSX, Props, State, and Component Lifecycle."
  },
  {
    id: 106,
    title: "Software Engineering & Agile Methodologies",
    subject: "Software Engineering",
    description: "SDLC phases, Waterfall, Spiral, Agile Scrum, Sprint planning, UML diagrams (Class, Sequence, Use-case), and software testing types.",
    uploadedBy: "Deepak Sharma",
    uploadedDate: "Oct 6, 2026",
    semester: "Semester 5",
    fileSize: "2.5 MB",
    fileType: "PDF",
    fileName: "SE_Agile_Scrum_UML_Testing.pdf",
    downloadCount: 132,
    previewContent: "Topics covered:\n• Software Development Life Cycles: Waterfall, V-Model, Spiral, Prototyping\n• Agile framework: Scrum roles, ceremonies, artifacts, and user stories\n• UML Modeling: Use Case diagrams, Class diagrams, Sequence diagrams\n• Software Testing: Unit, Integration, System, Black-box vs White-box techniques."
  },

  // Semester 6
  {
    id: 107,
    title: "Machine Learning Foundations & Supervised Algorithms",
    subject: "Machine Learning",
    description: "Linear Regression, Logistic Regression, Decision Trees, Random Forests, Support Vector Machines (SVM), and evaluation metrics (Confusion Matrix, ROC-AUC).",
    uploadedBy: "Karan Johar",
    uploadedDate: "Oct 9, 2026",
    semester: "Semester 6",
    fileSize: "4.1 MB",
    fileType: "PDF",
    fileName: "ML_Supervised_Learning_Algorithms.pdf",
    downloadCount: 275,
    previewContent: "Topics covered:\n• Supervised vs Unsupervised vs Reinforcement Learning\n• Regression: Simple & Multiple Linear Regression, Cost function, Gradient Descent\n• Classification: Logistic Regression, Decision Trees, Entropy, Information Gain\n• Model Evaluation: Precision, Recall, F1-Score, ROC curves, Cross-Validation."
  },
  {
    id: 108,
    title: "Compiler Design - Lexical Analysis & Parsing",
    subject: "Compiler Design",
    description: "Phases of compiler, Lexical Analyzer (Lex/Flex), Context-Free Grammars, LL(1) parsing, LR parsing (SLR, CLR, LALR), and intermediate code generation.",
    uploadedBy: "Neha Gupta",
    uploadedDate: "Oct 11, 2026",
    semester: "Semester 6",
    fileSize: "3.6 MB",
    fileType: "PDF",
    fileName: "Compiler_Design_Lexical_Parsing_TAC.pdf",
    downloadCount: 189,
    previewContent: "Topics covered:\n• Compiler phases: Lexical analysis, Syntax analysis, Semantic analysis, Optimization\n• Finite Automata and Regular Expressions, Token recognition\n• Top-down Parsing: Recursive Descent, Predictive LL(1) Parsers with FIRST and FOLLOW\n• Bottom-up Parsing: Shift-Reduce, Operator precedence, LR(0), SLR(1), LALR(1)."
  }
];

export const SUBJECTS_LIST = [
  "All",
  ...ALL_SEMESTER_SUBJECTS,
  "Other"
];
