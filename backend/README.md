# NoteShare Backend API

> **RESTful API Backend for Student Notes Sharing Portal** built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**.

---

## 📌 Features

- **User Authentication**: Student registration and login with encrypted passwords using `bcryptjs` and `jsonwebtoken` (JWT).
- **Dual Login Identifier**: Students can log in using either their college **Email** or **Student ID**.
- **Notes Management**: Full CRUD operations for study notes with title, subject, semester, description, author, and preview topics.
- **File Uploads**: Supports PDF, DOC, DOCX, PPT, PPTX, and TXT uploads up to 25 MB using `multer`.
- **Search & Filtering**: Search notes by keyword in title, subject, and description, or filter by specific academic subjects and semesters.
- **Download Tracking**: Instant note downloading with dynamic text fallback and download count tracking.
- **Portal Statistics**: Live statistics on total notes, subjects count, and total downloads.
- **Database Seeding**: Ready-to-run seed script (`npm run seed`) to populate initial subject notes and a test student account.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Local or MongoDB Atlas)
- **ODM**: Mongoose
- **Authentication**: JSON Web Token (JWT) + bcryptjs
- **File Handling**: Multer
- **Cross-Origin**: CORS
- **Logging**: Morgan

---

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection logic
├── controllers/
│   ├── authController.js     # User registration, login, and profile
│   └── noteController.js     # Note CRUD, search, filter, download & stats
├── middleware/
│   ├── authMiddleware.js     # JWT verification middleware
│   ├── uploadMiddleware.js   # Multer file upload setup & limits
│   └── errorMiddleware.js    # 404 handler and error response formatter
├── models/
│   ├── User.js               # User Mongoose schema & bcrypt hooks
│   └── Note.js               # Note Mongoose schema & search indexing
├── routes/
│   ├── authRoutes.js         # /api/auth routes
│   └── noteRoutes.js         # /api/notes routes
├── seeds/
│   └── seedNotes.js          # Database seed script with sample notes
├── uploads/                  # Directory for uploaded notes documents
├── .env                      # Environment variables
├── .env.example              # Template configuration
├── package.json              # Backend dependencies and scripts
└── server.js                 # Express application entry point
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally on port `27017`, **OR** a MongoDB Atlas connection string URI.

### 2. Install Dependencies
Navigate to the `backend` folder and run:
```bash
cd backend
npm install
```

### 3. Configure Environment Variables
A `.env` file is pre-configured. You can modify it or copy from `.env.example`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/notes_sharing
JWT_SECRET=supersecretnotesharejwtkey_2026_change_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```
*(If using MongoDB Atlas, replace `MONGO_URI` with your connection string: `mongodb+srv://<user>:<password>@cluster.mongodb.net/notes_sharing?retryWrites=true&w=majority`)*

### 4. Seed Database with Sample Notes
Populate the database with initial study notes and a demo student account:
```bash
npm run seed
```
Demo account created:
- **Email**: `alex@college.edu`
- **Student ID**: `2024CS102`
- **Password**: `password123`

### 5. Start the Server
- **Development Mode** (with nodemon):
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm start
  ```

The server will start at: `http://localhost:5000`

---

## 📡 API Endpoints Documentation

### 🔑 Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new student | Public |
| `POST` | `/api/auth/login` | Login with Email or Student ID | Public |
| `GET` | `/api/auth/me` | Get current logged-in student profile | Private (Bearer Token) |

#### 1. Register User
`POST /api/auth/register`
**Body (JSON):**
```json
{
  "fullName": "Alex Johnson",
  "studentId": "2024CS102",
  "email": "alex@college.edu",
  "password": "password123"
}
```
**Response (201 Created):**
```json
{
  "success": true,
  "message": "Account registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6740abcd1234567890ef1234",
    "name": "Alex Johnson",
    "fullName": "Alex Johnson",
    "studentId": "2024CS102",
    "email": "alex@college.edu",
    "role": "student"
  }
}
```

#### 2. Login User
`POST /api/auth/login`
**Body (JSON):** (Supports either `identifier`, `email`, or `studentId`)
```json
{
  "identifier": "alex@college.edu",
  "password": "password123"
}
```
**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6740abcd1234567890ef1234",
    "name": "Alex Johnson",
    "studentId": "2024CS102",
    "email": "alex@college.edu"
  }
}
```

---

### 📚 Study Notes Routes (`/api/notes`)

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/notes` | Get all notes (supports search & subject filters) | Public |
| `GET` | `/api/notes/stats` | Get portal summary statistics | Public |
| `GET` | `/api/notes/:id` | Get single note details | Public |
| `POST` | `/api/notes` | Upload a new note (with file upload) | Public / Private |
| `GET` | `/api/notes/:id/download` | Download note file (increments download count) | Public |
| `DELETE` | `/api/notes/:id` | Delete a note and remove file from disk | Public / Private |

#### 1. Get Notes with Search & Filter
`GET /api/notes?search=Data&subject=Data%20Structures`
**Response (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "total": 1,
  "page": 1,
  "pages": 1,
  "data": [
    {
      "id": "6740abcd1234567890ef5678",
      "title": "Complete Data Structures & Algorithms",
      "subject": "Data Structures",
      "description": "In-depth notes on Arrays, Linked Lists, Stacks, Queues...",
      "uploadedBy": "Rahul Verma",
      "uploadedDate": "Sep 28, 2026",
      "semester": "Semester 3",
      "fileSize": "4.8 MB",
      "fileType": "PDF",
      "fileName": "DSA_Complete_Notes_Unit1-5.pdf",
      "downloadCount": 342,
      "previewContent": "Topics covered:\n• Linear Data Structures..."
    }
  ]
}
```

#### 2. Upload Note (Multipart Form Data)
`POST /api/notes`
**Form-Data Fields:**
- `title`: "Operating Systems Process Management"
- `subject`: "Operating Systems"
- `uploadedBy`: "Alex Johnson"
- `semester`: "Semester 4"
- `description`: "Process Control Block and scheduling algorithms."
- `file`: (Select file from disk: `.pdf`, `.docx`, etc.)

**Headers:**
- `Authorization: Bearer <TOKEN>` *(optional)*

#### 3. Download Note
`GET /api/notes/:id/download`
- Automatically increments `downloadCount` by 1.
- Streams the actual uploaded file or sends a formatted study text file.

#### 4. Portal Statistics
`GET /api/notes/stats`
**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalNotes": 6,
    "uniqueSubjects": 6,
    "subjectsList": [
      "Data Structures",
      "Database Management System",
      "Operating Systems",
      "Computer Networks",
      "Java Programming",
      "Web Technologies"
    ],
    "totalDownloads": 1923
  }
}
```

---

## 🧪 Testing with cURL

### Register:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Priya Sharma","studentId":"2024CS301","email":"priya@college.edu","password":"mypassword"}'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"priya@college.edu","password":"mypassword"}'
```

### Get All Notes:
```bash
curl http://localhost:5000/api/notes
```

### Search Notes:
```bash
curl "http://localhost:5000/api/notes?search=algorithms"
```
