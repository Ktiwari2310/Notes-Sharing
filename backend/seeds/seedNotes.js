const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Note = require('../models/Note');
const User = require('../models/User');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const SAMPLE_NOTES = [
  {
    title: 'Complete Data Structures & Algorithms',
    subject: 'Data Structures',
    description:
      'In-depth notes on Arrays, Linked Lists, Stacks, Queues, Binary Trees, Graphs, Sorting algorithms, and Big-O complexity diagrams.',
    uploadedBy: 'Rahul Verma',
    uploadedDate: 'Sep 28, 2026',
    semester: 'Semester 3',
    fileSize: '4.8 MB',
    fileType: 'PDF',
    fileName: 'DSA_Complete_Notes_Unit1-5.pdf',
    downloadCount: 342,
    previewContent:
      'Topics covered:\n• Linear Data Structures: Arrays, Linked Lists (Singly, Doubly, Circular)\n• Non-Linear: Binary Search Trees, AVL Trees, Red-Black Trees, Heaps\n• Graph Algorithms: BFS, DFS, Dijkstra\'s, Kruskal\'s, Prim\'s\n• Dynamic Programming fundamentals with standard problems.'
  },
  {
    title: 'DBMS Lecture Notes & SQL Cheat Sheet',
    subject: 'Database Management System',
    description:
      'Comprehensive notes covering Relational Model, ER-Diagrams, Normalization (1NF to BCNF), SQL queries, and ACID transaction properties.',
    uploadedBy: 'Priya Nair',
    uploadedDate: 'Oct 2, 2026',
    semester: 'Semester 4',
    fileSize: '3.5 MB',
    fileType: 'PDF',
    fileName: 'DBMS_Notes_and_SQL_Reference.pdf',
    downloadCount: 289,
    previewContent:
      'Topics covered:\n• Database Architecture: 3-tier architecture, Schema vs Instance\n• ER Modeling: Entities, Attributes, Relationships, Weak entities\n• Relational Algebra and Normalization: 1NF, 2NF, 3NF, BCNF with step-by-step reduction\n• Concurrency Control: Two-Phase Locking (2PL), Deadlock prevention and detection.'
  },
  {
    title: 'Operating Systems Concepts & Process Scheduling',
    subject: 'Operating Systems',
    description:
      'Detailed breakdown of Process Management, CPU Scheduling Algorithms (FCFS, SJF, RR), Memory Management, Paging, and Deadlock Avoidance.',
    uploadedBy: 'Amit Patel',
    uploadedDate: 'Sep 15, 2026',
    semester: 'Semester 4',
    fileSize: '5.1 MB',
    fileType: 'PDF',
    fileName: 'OS_Notes_Process_Memory_Deadlock.pdf',
    downloadCount: 410,
    previewContent:
      'Topics covered:\n• Process Control Block (PCB), Process States, and Context Switching\n• Scheduling: Preemptive vs Non-Preemptive, Gantt chart examples\n• Synchronization: Critical section problem, Semaphores, Peterson\'s algorithm, Monitors\n• Virtual Memory: Demand Paging, Page Replacement algorithms (FIFO, LRU, Optimal).'
  },
  {
    title: 'Computer Networks - OSI Model & TCP/IP',
    subject: 'Computer Networks',
    description:
      'Quick revision notes on 7 Layers of OSI model, IP addressing (IPv4 vs IPv6), Subnetting, TCP 3-way handshake, and Routing protocols.',
    uploadedBy: 'Sneha Mukherjee',
    uploadedDate: 'Sep 22, 2026',
    semester: 'Semester 5',
    fileSize: '2.9 MB',
    fileType: 'PDF',
    fileName: 'CN_OSI_TCPIP_Protocols.pdf',
    downloadCount: 195,
    previewContent:
      'Topics covered:\n• OSI vs TCP/IP Protocol Architectures with detailed header formats\n• Network Layer: IPv4 Addressing, Classful vs CIDR Subnetting calculations\n• Transport Layer: Flow control (Sliding Window), TCP vs UDP, Congestion Control\n• Application Layer Protocols: HTTP/HTTPS, DNS, FTP, SMTP, DHCP.'
  },
  {
    title: 'Java Programming & Object Oriented Principles',
    subject: 'Java Programming',
    description:
      'Core Java notes covering Classes, Objects, Inheritance, Polymorphism, Abstract classes, Interfaces, Exception Handling, and Java Collections Framework.',
    uploadedBy: 'Karthik Reddy',
    uploadedDate: 'Sep 30, 2026',
    semester: 'Semester 3',
    fileSize: '3.8 MB',
    fileType: 'PDF',
    fileName: 'Java_Core_OOP_Collections.pdf',
    downloadCount: 520,
    previewContent:
      'Topics covered:\n• 4 Pillars of OOP: Encapsulation, Abstraction, Inheritance, and Polymorphism\n• Core Java: JVM architecture, Garbage Collection, String vs StringBuilder\n• Java Collections: ArrayList, LinkedList, HashMap, HashSet, and Iterators\n• Multithreading: Thread lifecycle, Runnable vs Thread, Synchronization locks.'
  },
  {
    title: 'Web Technologies & Modern Frontend Basics',
    subject: 'Web Technologies',
    description:
      'Handy reference for HTML5 semantic tags, CSS Flexbox & Grid, JavaScript ES6+ features, and introduction to React components.',
    uploadedBy: 'Ananya Roy',
    uploadedDate: 'Oct 3, 2026',
    semester: 'Semester 5',
    fileSize: '2.2 MB',
    fileType: 'PDF',
    fileName: 'WebTech_HTML_CSS_JS_React.pdf',
    downloadCount: 167,
    previewContent:
      'Topics covered:\n• HTML5 semantic elements and accessibility guidelines\n• Responsive Design: CSS Media queries, Flexbox layout, CSS Grid systems\n• Modern JavaScript: Arrow functions, Promises, async/await, Destructuring\n• React fundamentals: JSX, Props, State, and Component Lifecycle.'
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/notes_sharing';
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB: ${mongoUri}`);

    // Clear existing data
    await Note.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing notes and users collections.');

    // Create a demo student user
    const demoUser = await User.create({
      fullName: 'Alex Johnson',
      studentId: '2024CS102',
      email: 'alex@college.edu',
      password: 'password123'
    });
    console.log(`Created demo student user: ${demoUser.email} (password: password123)`);

    // Insert initial notes linked to the demo user
    const notesWithUser = SAMPLE_NOTES.map((note) => ({
      ...note,
      user: demoUser._id
    }));

    await Note.insertMany(notesWithUser);
    console.log(`Successfully seeded ${SAMPLE_NOTES.length} initial notes!`);

    await mongoose.disconnect();
    console.log('MongoDB connection closed. Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
