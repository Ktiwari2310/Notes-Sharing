const express = require('express');
const router = express.Router();
const {
  getNotes,
  getNoteById,
  createNote,
  downloadNote,
  deleteNote,
  getStats
} = require('../controllers/noteController');
const { optionalAuth } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Statistics route must be placed before :id route
router.get('/stats', getStats);

// Main notes endpoints
router
  .route('/')
  .get(getNotes)
  .post(optionalAuth, upload.single('file'), createNote);

// Specific note endpoints
router
  .route('/:id')
  .get(getNoteById)
  .delete(optionalAuth, deleteNote);

// Download endpoint
router.get('/:id/download', downloadNote);

module.exports = router;
