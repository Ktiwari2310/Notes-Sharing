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

## 📂 Project Structure

```text
student-notes-portal/
├── index.html                   # HTML entry with Google Fonts (Inter)
├── package.json                 # Dependencies & scripts
├── vite.config.js               # Vite config (dev server port 5173)
├── README.md                    # Project documentation
├── src/
│   ├── main.jsx                 # Application root entry point
│   ├── App.jsx                  # Route definitions, ProtectedRoute guards, layout
│   ├── index.css                # Pure responsive CSS (Variables, Grid, Flexbox)
│   ├── context/
│   │   └── NotesContext.jsx     # Centralized notes state, auth state (isLoggedIn), localStorage
│   ├── components/
│   │   ├── ProtectedRoute.jsx   # Route guard checking authentication
│   │   ├── Navbar.jsx           # Adaptive navbar (before/after login states)
│   │   ├── Footer.jsx           # Reusable site footer
│   │   ├── Hero.jsx             # Public hero banner with real stock photo
│   │   ├── SearchBar.jsx        # Dual-filter search (keyword + subject)
│   │   ├── NoteCard.jsx         # Card component with View/Download actions
│   │   ├── NotesList.jsx        # Grid layout & empty-state fallback
│   │   ├── UploadNote.jsx       # Student upload form with validation
│   │   ├── NotePreviewModal.jsx # Document details & outline preview dialog
│   │   └── Icons.jsx            # Lightweight, dependency-free SVG icons
│   ├── pages/
│   │   ├── Home.jsx             # Public landing page (no exposed notes/upload)
│   │   ├── Dashboard.jsx        # Protected student dashboard
│   │   ├── Notes.jsx            # Protected study notes catalog
│   │   ├── Upload.jsx           # Protected upload studio
│   │   ├── Login.jsx            # Full-page login
│   │   └── Register.jsx         # Full-page registration (redirects to login)
│   └── data/
│       └── sampleNotes.js       # Preloaded sample notes (DSA, DBMS, OS, CN, Java, Web)
```

---

## 🚀 Running and Testing the Flow

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Visit **`http://localhost:5173`**:

1. **Test Protected Route Guard**: Try navigating directly to `http://localhost:5173/notes` or `http://localhost:5173/upload` without logging in. Notice you are immediately redirected to `/login`.
2. **Test Register Flow**: Go to `/register`, fill out the form, and click **Create Account**. A success alert appears and you are redirected to `/login`.
3. **Test Login Flow**: On `/login`, enter your student email/ID and password, then click **Login to NoteShare**. You are authenticated (`isLoggedIn = "true"`) and redirected to `/dashboard`.
4. **Test Authenticated Navigation**: Notice the Navbar now displays **Dashboard**, **Study Notes**, **Upload Notes**, your student badge, and a **Logout** button.
5. **Test Upload & Notes**: Upload a new note on `/upload`; it instantly appears on `/notes` and persists in `localStorage`.
6. **Test Logout**: Click **Logout** in the navbar. `isLoggedIn` is cleared and you are redirected back to `/login`. Visiting `/dashboard` or `/notes` is protected again!
