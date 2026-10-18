/**
 * sampleNotes.js
 * 
 * Initial mock data for NoteShare across Semesters 3, 4, 5, and 6.
 * Uses exact curriculum subject names.
 */

import { ALL_SEMESTER_SUBJECTS } from './semestersData';

export const INITIAL_NOTES = [
  // Semester 3
  {
    id: 1,
    title: "Data Structures & Algorithms Complete Notes",
    subject: "Data Structures & Algorithms",
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
    id: 2,
    title: "Database Management Systems & SQL Cheat Sheet",
    subject: "Database Management Systems",
    description: "Comprehensive notes covering Relational Model, ER-Diagrams, Normalization (1NF to BCNF), SQL queries, and ACID transaction properties.",
    uploadedBy: "Priya Nair",
    uploadedDate: "Oct 2, 2026",
    semester: "Semester 3",
    fileSize: "3.5 MB",
    fileType: "PDF",
    fileName: "DBMS_Notes_and_SQL_Reference.pdf",
    downloadCount: 289,
    previewContent: "Topics covered:\n• Database Architecture: 3-tier architecture, Schema vs Instance\n• ER Modeling: Entities, Attributes, Relationships, Weak entities\n• Relational Algebra and Normalization: 1NF, 2NF, 3NF, BCNF with step-by-step reduction\n• Concurrency Control: Two-Phase Locking (2PL), Deadlock prevention and detection."
  },
  {
    id: 3,
    title: "Digital Circuit Design (DCD) Logic Gates & K-Maps",
    subject: "Digital Circuit Design",
    description: "Boolean algebra, K-maps (up to 5 variables), logic gates, flip-flops, counters, registers, and multiplexer implementations.",
    uploadedBy: "Siddharth Das",
    uploadedDate: "Oct 5, 2026",
    semester: "Semester 3",
    fileSize: "2.4 MB",
    fileType: "PDF",
    fileName: "DCD_Digital_Circuit_Design_Notes.pdf",
    downloadCount: 168,
    previewContent: "Topics covered:\n• Boolean Algebra theorems and canonical SOP/POS expressions\n• Karnaugh Maps (K-Maps) minimization techniques\n• Combinational Circuits: Adders, Subtractors, Decoders, Encoders, Multiplexers\n• Sequential Circuits: SR, JK, D, T Flip-flops, Synchronous & Asynchronous counters."
  },
  {
    id: 4,
    title: "Mathematics-III - Transforms & Numerical Methods",
    subject: "Mathematics-III",
    description: "Fourier series, Laplace transforms, Z-transforms, and numerical techniques for differential equations with solved university papers.",
    uploadedBy: "Vikram Malhotra",
    uploadedDate: "Sep 25, 2026",
    semester: "Semester 3",
    fileSize: "3.7 MB",
    fileType: "PDF",
    fileName: "Mathematics_III_Transforms_Notes.pdf",
    downloadCount: 215,
    previewContent: "Topics covered:\n• Laplace Transforms and Inverse Laplace Transforms\n• Fourier Series, Half-range expansions, Fourier Transforms\n• Z-Transforms and Difference Equations\n• Numerical Solutions of Ordinary Differential Equations."
  },
  {
    id: 5,
    title: "Universal Human Values-II Self Exploration & Ethics",
    subject: "Universal Human Values-II",
    description: "Harmony in self, family, society, and nature. Value education and professional ethics lecture summary.",
    uploadedBy: "Neha Sharma",
    uploadedDate: "Oct 1, 2026",
    semester: "Semester 3",
    fileSize: "1.8 MB",
    fileType: "PDF",
    fileName: "UHV_II_Human_Values_Ethics.pdf",
    downloadCount: 142,
    previewContent: "Topics covered:\n• Understanding Value Education and Self-exploration\n• Harmony in the Human Being (Self and Body)\n• Harmony in the Family and Society: Trust and Respect\n• Holistic Perception of Harmony in Nature and Existence."
  },

  // Semester 4
  {
    id: 6,
    title: "Mathematics-IV - Probability & Statistics",
    subject: "Mathematics-IV",
    description: "Probability distributions (Binomial, Poisson, Normal), hypothesis testing, curve fitting, and correlation/regression formulas.",
    uploadedBy: "Ankit Jain",
    uploadedDate: "Oct 3, 2026",
    semester: "Semester 4",
    fileSize: "3.1 MB",
    fileType: "PDF",
    fileName: "Mathematics_IV_Probability_Statistics.pdf",
    downloadCount: 245,
    previewContent: "Topics covered:\n• Probability Distributions: Binomial, Poisson, Normal, and Exponential\n• Sampling Theory: Large and Small samples, t-test, F-test, Chi-square test\n• Curve Fitting and Principle of Least Squares\n• Correlation, Regression, and Rank Correlation analysis."
  },
  {
    id: 7,
    title: "Computer Organization Architecture & Microprocessors",
    subject: "Computer Organization Architecture & Microprocessors",
    description: "Instruction cycle, addressing modes, 8085/8086 architecture, pipelining hazards, cache memory mapping, and interrupts.",
    uploadedBy: "Tanya Sen",
    uploadedDate: "Oct 4, 2026",
    semester: "Semester 4",
    fileSize: "4.2 MB",
    fileType: "PDF",
    fileName: "COA_Microprocessors_Complete.pdf",
    downloadCount: 198,
    previewContent: "Topics covered:\n• Von Neumann architecture, CPU registers, Instruction formats\n• 8086 Microprocessor Architecture and Pin Diagram\n• Memory Hierarchy: Cache hit/miss rates, Direct, Associative mapping\n• Pipelining: Stages, Hazards (Data, Control, Structural)."
  },
  {
    id: 8,
    title: "No SQL Databases - MongoDB & Cassandra Guide",
    subject: "No SQL",
    description: "Document databases, Key-Value stores, Column-family, Graph databases, MongoDB aggregation pipelines, and CAP theorem.",
    uploadedBy: "Amit Patel",
    uploadedDate: "Oct 7, 2026",
    semester: "Semester 4",
    fileSize: "2.6 MB",
    fileType: "PDF",
    fileName: "NoSQL_Databases_MongoDB_Cassandra.pdf",
    downloadCount: 176,
    previewContent: "Topics covered:\n• Relational vs NoSQL: ACID vs BASE properties, CAP Theorem\n• Document Stores: MongoDB CRUD operations, indexing, and aggregation\n• Key-Value and Column-family: Redis and Apache Cassandra data modeling\n• Sharding, Replication, and Distributed Consistency."
  },
  {
    id: 9,
    title: "Computer Networks - OSI Model & TCP/IP",
    subject: "Computer Networks",
    description: "Quick revision notes on 7 Layers of OSI model, IP addressing (IPv4 vs IPv6), Subnetting, TCP 3-way handshake, and Routing protocols.",
    uploadedBy: "Sneha Mukherjee",
    uploadedDate: "Sep 22, 2026",
    semester: "Semester 4",
    fileSize: "2.9 MB",
    fileType: "PDF",
    fileName: "CN_OSI_TCPIP_Protocols.pdf",
    downloadCount: 195,
    previewContent: "Topics covered:\n• OSI vs TCP/IP Protocol Architectures with detailed header formats\n• Network Layer: IPv4 Addressing, Classful vs CIDR Subnetting calculations\n• Transport Layer: Flow control (Sliding Window), TCP vs UDP, Congestion Control\n• Application Layer Protocols: HTTP/HTTPS, DNS, FTP, SMTP, DHCP."
  },

  // Semester 5
  {
    id: 10,
    title: "Soft Skill & Interpersonal Communication Handbook",
    subject: "Soft Skill & Interpersonal Communication",
    description: "Corporate etiquette, resume writing, group discussions, presentation skills, active listening, and conflict resolution.",
    uploadedBy: "Kavita Roy",
    uploadedDate: "Oct 8, 2026",
    semester: "Semester 5",
    fileSize: "1.6 MB",
    fileType: "PDF",
    fileName: "Soft_Skills_Interpersonal_Communication.pdf",
    downloadCount: 112,
    previewContent: "Topics covered:\n• Verbal and Non-verbal Communication skills\n• Group Discussion (GD) strategies and Personal Interview (PI) tips\n• Professional email writing, executive summary, and resume crafting\n• Leadership, Emotional Intelligence, and Team Dynamics."
  },
  {
    id: 11,
    title: "Operating System Concepts & CPU Scheduling",
    subject: "Operating System",
    description: "Detailed breakdown of Process Management, CPU Scheduling Algorithms (FCFS, SJF, RR), Memory Management, Paging, and Deadlock Avoidance.",
    uploadedBy: "Amit Patel",
    uploadedDate: "Sep 15, 2026",
    semester: "Semester 5",
    fileSize: "5.1 MB",
    fileType: "PDF",
    fileName: "OS_Notes_Process_Memory_Deadlock.pdf",
    downloadCount: 410,
    previewContent: "Topics covered:\n• Process Control Block (PCB), Process States, and Context Switching\n• Scheduling: Preemptive vs Non-Preemptive, Gantt chart examples\n• Synchronization: Critical section problem, Semaphores, Peterson's algorithm\n• Virtual Memory: Demand Paging, Page Replacement algorithms (FIFO, LRU)."
  },
  {
    id: 12,
    title: "Automata Theory - DFA, NFA, CFG & Turing Machines",
    subject: "Automata Theory",
    description: "Deterministic & Non-deterministic finite automata, Regular expressions, Pumping Lemma, Context-Free Grammars, Pushdown Automata, and Turing Machines.",
    uploadedBy: "Deepak Sharma",
    uploadedDate: "Oct 9, 2026",
    semester: "Semester 5",
    fileSize: "3.4 MB",
    fileType: "PDF",
    fileName: "Automata_Theory_DFA_CFG_Turing.pdf",
    downloadCount: 220,
    previewContent: "Topics covered:\n• Finite Automata: DFA, NFA, NFA-to-DFA conversion, DFA minimization\n• Regular Expressions and Pumping Lemma for Regular Languages\n• Context-Free Grammars (CFG), Ambiguity, Chomsky Normal Form (CNF)\n• Pushdown Automata (PDA) and Turing Machine design."
  },
  {
    id: 13,
    title: "Web Programming - Modern JavaScript & React",
    subject: "Web Programming",
    description: "Handy reference for HTML5 semantic tags, CSS Flexbox & Grid, JavaScript ES6+ features, REST APIs, and React component state management.",
    uploadedBy: "Ananya Roy",
    uploadedDate: "Oct 3, 2026",
    semester: "Semester 5",
    fileSize: "2.5 MB",
    fileType: "PDF",
    fileName: "Web_Programming_JS_React_FullStack.pdf",
    downloadCount: 167,
    previewContent: "Topics covered:\n• Responsive Design: CSS Flexbox, Grid systems, and Media queries\n• Modern JavaScript: Arrow functions, Promises, async/await, Fetch API\n• React fundamentals: JSX, Props, State, Hooks (useState, useEffect)\n• Full-stack integration with Node.js and Express REST endpoints."
  },
  {
    id: 14,
    title: "Cryptography and Network Security Algorithms",
    subject: "Cryptography and Network Security",
    description: "Symmetric vs Asymmetric cryptography, DES, AES, RSA, Diffie-Hellman Key Exchange, SHA-256, Digital Signatures, and Firewalls.",
    uploadedBy: "Karthik Reddy",
    uploadedDate: "Oct 11, 2026",
    semester: "Semester 5",
    fileSize: "3.8 MB",
    fileType: "PDF",
    fileName: "CNS_Cryptography_RSA_AES_Security.pdf",
    downloadCount: 280,
    previewContent: "Topics covered:\n• Classical Ciphers: Caesar, Playfair, Hill Cipher, Vigenere\n• Symmetric Ciphers: Data Encryption Standard (DES), Advanced Encryption Standard (AES)\n• Asymmetric Ciphers: RSA Algorithm, Diffie-Hellman Key Exchange\n• Message Integrity: MD5, SHA-512, Digital Signatures, SSL/TLS."
  },

  // Semester 6
  {
    id: 15,
    title: "Work Place Mental Health & Stress Management",
    subject: "Work Place Mental Health",
    description: "Workplace stress triggers, burnout prevention, ergonomic workplace wellness, mindfulness techniques, and mental health counseling protocols.",
    uploadedBy: "Dr. Sunita Rao",
    uploadedDate: "Oct 12, 2026",
    semester: "Semester 6",
    fileSize: "1.9 MB",
    fileType: "PDF",
    fileName: "Work_Place_Mental_Health_Guide.pdf",
    downloadCount: 95,
    previewContent: "Topics covered:\n• Identifying workplace burnout, chronic stress, and anxiety symptoms\n• Work-Life Balance and psychological safety in organizations\n• Mindfulness-based stress reduction strategies\n• Employee Assistance Programs (EAP) and mental wellness policies."
  },
  {
    id: 16,
    title: "Data Mining and Business Intelligence (DMBI) Notes",
    subject: "Data Mining and Business Intelligence",
    description: "Data warehousing, ETL processes, OLAP vs OLTP, Apriori algorithm for association rules, K-Means clustering, and Decision Tree classification.",
    uploadedBy: "Karan Johar",
    uploadedDate: "Oct 9, 2026",
    semester: "Semester 6",
    fileSize: "4.1 MB",
    fileType: "PDF",
    fileName: "DMBI_Data_Mining_Business_Intelligence.pdf",
    downloadCount: 275,
    previewContent: "Topics covered:\n• Data Preprocessing: Data cleaning, integration, transformation, and reduction\n• Association Rule Mining: Apriori algorithm, FP-Growth algorithm\n• Classification & Prediction: Decision Trees, Naive Bayes Classifier\n• Clustering Techniques: K-Means, Hierarchical, DBSCAN algorithms."
  },
  {
    id: 17,
    title: "Software Engineering & Agile Scrum Methodologies",
    subject: "Software Engineering",
    description: "SDLC phases, Waterfall, Agile Scrum, Sprint planning, UML diagrams (Class, Sequence, Use-case), and software testing types.",
    uploadedBy: "Deepak Sharma",
    uploadedDate: "Oct 6, 2026",
    semester: "Semester 6",
    fileSize: "2.5 MB",
    fileType: "PDF",
    fileName: "Software_Engineering_Agile_UML.pdf",
    downloadCount: 132,
    previewContent: "Topics covered:\n• Software Development Life Cycles: Waterfall, V-Model, Spiral, Prototyping\n• Agile framework: Scrum roles, ceremonies, artifacts, and user stories\n• UML Modeling: Use Case diagrams, Class diagrams, Sequence diagrams\n• Software Testing: Unit, Integration, System, Black-box vs White-box techniques."
  },
  {
    id: 18,
    title: "Professional Elective-I - Cloud Infrastructure & DevOps",
    subject: "Professional Elective-I",
    description: "Cloud computing service models (IaaS, PaaS, SaaS), AWS EC2, S3, Docker containers, Kubernetes orchestration, and CI/CD pipelines.",
    uploadedBy: "Rohan Kapoor",
    uploadedDate: "Oct 14, 2026",
    semester: "Semester 6",
    fileSize: "3.3 MB",
    fileType: "PDF",
    fileName: "PE_I_Cloud_DevOps_Containers.pdf",
    downloadCount: 160,
    previewContent: "Topics covered:\n• Cloud Computing Models: Public, Private, Hybrid; IaaS, PaaS, SaaS\n• Virtualization: Hypervisors, Containerization with Docker\n• Container Orchestration: Kubernetes Pods, Deployments, Services\n• CI/CD Pipelines: Jenkins, GitHub Actions, Automated Testing."
  },
  {
    id: 19,
    title: "Open Elective-I - Cyber Laws & Information Rights",
    subject: "Open Elective-I",
    description: "Information Technology Act (IT Act 2000), cyber crimes, intellectual property rights (IPR), digital evidence, and electronic contracts.",
    uploadedBy: "Adv. Meera Sen",
    uploadedDate: "Oct 15, 2026",
    semester: "Semester 6",
    fileSize: "2.1 MB",
    fileType: "PDF",
    fileName: "OE_I_Cyber_Laws_IT_Act.pdf",
    downloadCount: 118,
    previewContent: "Topics covered:\n• Overview of Cyber Jurisprudence and IT Act 2000 (with amendments)\n• Cyber Crimes: Hacking, Phishing, Identity theft, Cyber stalking, Ransomware\n• Intellectual Property in Cyberspace: Copyright, Patents, Trademarks, Domain disputes\n• Digital Signatures, Electronic Governance, and Admissibility of Electronic Evidence."
  }
];

export const SUBJECTS_LIST = [
  "All",
  ...ALL_SEMESTER_SUBJECTS,
  "Other"
];
