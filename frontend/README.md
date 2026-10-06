# NoteShare - Student Notes Sharing Portal 🎓

A clean, modern, and spacious multi-page student study portal built with **React**, **Vite**, and **React Router**, featuring **route protection** and an authentication flow.

---

## 🔐 Route Architecture & Protection Flow

### 🌐 Public Routes (Accessible without login)
- **`/` (Landing Page)**: Public showcase with a brief description, authentic college stock photography (3 Unsplash images), statistics, "Why NoteShare?" feature highlights, and **Login**, **Register**, and **Get Started** buttons. Actual study notes and upload functionality are protected behind authentication.
- **`/login` (Student Login)**: Full-page split-screen login. Simulates authentication by storing `isLoggedIn = "true"` in `localStorage` upon submission, then automatically redirects to `/dashboard`.
- **`/register` (Create Account)**: Full-page student registration with input validation (required fields, valid email, matching passwords). Upon submission, displays a success notification and redirects to `/login` without exposing protected routes until the user explicitly logs in.

---

### 🛡️ Protected Routes (Guarded by `ProtectedRoute.jsx`)
- **`/dashboard` (Student Dashboard)**: Personalized greeting for the active student session, key statistics, quick navigation hubs to **Study Notes** and **Upload Studio**, and recently added study notes with preview and download actions.
- **`/notes` (Study Notes Repository)**: Curated notes catalog with real-time keyword and subject filter search, responsive note cards, document preview modal, and instant download simulation.
- **`/upload` (Upload Studio)**: Upload form with validation, subject dropdown (including custom subject), file picker, and automatic synchronization with the notes catalog.

> 🔒 **Direct URL Protection**: If an unauthenticated student attempts to visit `/dashboard`, `/notes`, or `/upload` directly, `ProtectedRoute` intercepts the request and automatically redirects them to `/login`.

---

### 🧭 Navbar Authentication States

- **Before Login (Guest)**:
  - Brand: `NoteShare` (links to `/`)
  - Actions: **Login** (`/login`) and **Register** (`/register`)
  - *(Dashboard, Study Notes, and Upload Notes links are hidden)*

- **After Login (Authenticated Student)**:
  - Brand: `NoteShare` (links to `/dashboard`)
  - Links: **Dashboard** (`/dashboard`), **Study Notes** (`/notes`), **Upload Notes** (`/upload`)
  - Actions: Student session badge with name + **Logout** button (clears `isLoggedIn` and redirects to `/login`)

---

## 🖼️ Authentic Stock Photography (Zero AI-Generated Images)

All visual assets use genuine, free photography from **Unsplash**:
- **Landing Hero**: Group of college students studying in campus library (`photo-1523240795612-9a054b0db644`)
- **Why NoteShare?**: Students collaborating around a table sharing notes (`photo-1522202176988-66273c2fd55f`)
- **Landing CTA Banner**: Student study desk with notebooks and laptop (`photo-1519452635265-7b1fbfd1e4e0`)
- **Study Notes Banner**: University library bookshelf (`photo-1497633762265-9d179a990aa6`)
- **Upload Notes Visual**: Student organizing handwritten lecture summaries (`photo-1456513080510-7bf3a84b82f8`)
- **Login Visual**: College students studying in modern campus lounge (`photo-1543269865-cbf427effbad`)
- **Register Visual**: Group of enthusiastic college students on campus (`photo-1529156069898-49953e39b3ac`)

---

## ⚡ Full-Stack Architecture (Frontend + Node/Express/MongoDB Backend)

NoteShare includes a complete production-ready RESTful backend built with **Node.js**, **Express.js**, and **MongoDB** located in the [`backend/`](./backend/) directory.

### Backend Capabilities:
- **Authentication**: JWT token-based auth (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`) supporting login by either Email or Student ID.
- **Notes REST API**: Complete CRUD (`/api/notes`) with query filtering by keyword, subject, and semester.
- **File Uploads**: Handles real PDF, DOCX, PPTX, and TXT uploads up to 25 MB using `multer`.
- **Note Downloads**: Automatic download counter tracking and file streaming (`/api/notes/:id/download`).
- **Database Seeding**: One-command seed script (`npm run server:seed`) to preload initial notes and demo student account into MongoDB.
- **Resilient Frontend**: Connected to the backend with automatic offline fallback to `localStorage` if MongoDB is not started.

---

## 📂 Project Structure

```text
student-notes-portal/
├── backend/                     # Node.js + Express.js + MongoDB API
│   ├── config/db.js             # Mongoose MongoDB connection
│   ├── controllers/             # Auth & Note controller functions
│   ├── middleware/              # JWT auth, Multer file upload & error handlers
│   ├── models/                  # User & Note Mongoose schemas
│   ├── routes/                  # Express API route declarations
│   ├── seeds/seedNotes.js       # MongoDB database seeder
│   ├── uploads/                 # Storage for uploaded note files
│   ├── .env                     # Backend configuration
│   └── server.js                # Express server entry point
├── src/                         # React Frontend (Vite)
│   ├── main.jsx                 # Application root entry point
│   ├── App.jsx                  # Route definitions, ProtectedRoute guards, layout
│   ├── index.css                # Pure responsive CSS (Variables, Grid, Flexbox)
│   ├── context/
│   │   └── NotesContext.jsx     # Centralized state (Backend API + localStorage cache)
│   ├── services/
│   │   └── api.js               # Frontend API client for Express backend
│   ├── components/              # UI Components (Cards, Modals, Navbar, etc.)
│   ├── pages/                   # Multi-page application views (Dashboard, Notes, etc.)
│   └── data/
│       └── sampleNotes.js       # Preloaded sample notes dataset
├── package.json                 # Unified scripts for frontend & backend
└── vite.config.js               # Dev server with /api proxy to port 5000
```

---

## 🚀 Running and Testing the Flow

```bash
# 1. Install root & frontend dependencies
npm install

# 2. Install backend dependencies
cd backend && npm install && cd ..

# 3. (Optional) Seed MongoDB with sample study notes & demo student
npm run server:seed

# 4. Start backend server (port 5000)
npm run server:dev

# 5. In another terminal, start frontend (port 5173)
npm run dev
```

Visit **`http://localhost:5173`**:

1. **Test Protected Route Guard**: Try navigating directly to `http://localhost:5173/notes` or `http://localhost:5173/upload` without logging in. Notice you are immediately redirected to `/login`.
2. **Test Register Flow**: Go to `/register`, fill out the form, and click **Create Account**. It calls `POST /api/auth/register` (or local fallback), registers the student, and redirects to `/login`.
3. **Test Login Flow**: On `/login`, enter your student email/ID and password, then click **Login to NoteShare**. Authenticates via `POST /api/auth/login`, stores JWT token, and redirects to `/dashboard`.
4. **Test Authenticated Navigation**: Notice the Navbar now displays **Dashboard**, **Study Notes**, **Upload Notes**, your student badge, and a **Logout** button.
5. **Test Upload & Notes**: Upload a new note on `/upload` (with actual document file); it saves via `POST /api/notes` with `multer` into MongoDB and the server's `uploads/` folder!
6. **Test Search & Download**: Search notes by keyword or subject filter on `/notes`. Clicking **Download** increments the MongoDB download counter and streams the document!
7. **Test Logout**: Click **Logout** in the navbar. Session and token are cleared, and protected routes are guarded again!

