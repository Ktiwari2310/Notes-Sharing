const fs = require('fs');
const path = require('path');
const Note = require('../models/Note');

// Helper to format file size in KB/MB
const formatBytes = (bytes) => {
  if (!bytes) return '1.0 MB';
  if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(1) + ' KB';
  }
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

// @desc    Get all notes with optional search & subject filtering
// @route   GET /api/notes
// @access  Public
const getNotes = async (req, res, next) => {
  try {
    const { search, subject, semester, page = 1, limit = 50 } = req.query;

    const query = {};

    // Filter by subject
    if (subject && subject.toLowerCase() !== 'all') {
      query.subject = { $regex: new RegExp(`^${subject.trim()}$`, 'i') };
    }

    // Filter by semester
    if (semester && semester.toLowerCase() !== 'all') {
      query.semester = { $regex: new RegExp(semester.trim(), 'i') };
    }

    // Keyword search in title, subject, or description
    if (search && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: regex },
        { subject: regex },
        { description: regex }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Note.countDocuments(query);
    const notes = await Note.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: notes.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: notes
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single note by ID
// @route   GET /api/notes/:id
// @access  Public
const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    res.status(200).json({
      success: true,
      data: note
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create/Upload a new note
// @route   POST /api/notes
// @access  Public / Private (supports optional auth or authenticated user)
const createNote = async (req, res, next) => {
  try {
    const {
      title,
      subject,
      description,
      uploadedBy,
      semester,
      previewContent
    } = req.body;

    if (!title || !subject) {
      return res.status(400).json({
        success: false,
        message: 'Please provide note title and subject'
      });
    }

    const finalUploader =
      uploadedBy ||
      (req.user ? req.user.fullName : null) ||
      'Student Contributor';

    // File details
    let fileName = 'Study_Notes.pdf';
    let fileType = 'PDF';
    let fileSize = '1.5 MB';
    let filePath = '';
    let fileUrl = '';

    if (req.file) {
      fileName = req.file.originalname;
      filePath = req.file.path;
      fileType =
        path.extname(req.file.originalname).replace('.', '').toUpperCase() ||
        'PDF';
      fileSize = formatBytes(req.file.size);
      fileUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.fileName) {
      fileName = req.body.fileName;
      fileType = req.body.fileType || 'PDF';
      fileSize = req.body.fileSize || '1.0 MB';
      fileUrl = req.body.fileUrl || '';
    }

    const defaultPreview = description
      ? `Note overview provided by ${finalUploader}:\n\n${description}`
      : `Study notes uploaded for ${subject}. Ready for exam revision and download.`;

    const note = await Note.create({
      title: title.trim(),
      subject: subject.trim(),
      description: description ? description.trim() : 'Uploaded study materials and lecture notes.',
      uploadedBy: finalUploader.trim(),
      user: req.user ? req.user._id : null,
      semester: semester || 'Current',
      fileSize,
      fileType,
      fileName,
      filePath,
      fileUrl,
      downloadCount: 0,
      previewContent: previewContent ? previewContent.trim() : defaultPreview
    });

    res.status(201).json({
      success: true,
      message: 'Note uploaded successfully',
      data: note
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Download note file and increment download count
// @route   GET /api/notes/:id/download
// @access  Public
const downloadNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Increment download count
    note.downloadCount = (note.downloadCount || 0) + 1;
    await note.save();

    // If an actual uploaded file exists on disk, send it
    if (note.filePath && fs.existsSync(note.filePath)) {
      return res.download(note.filePath, note.fileName);
    }

    // Otherwise generate downloadable text revision file
    const fileContent =
      `=========================================================\n` +
      `NoteShare - Student Notes Sharing Portal\n` +
      `=========================================================\n\n` +
      `Title: ${note.title}\n` +
      `Subject: ${note.subject}\n` +
      `Uploaded By: ${note.uploadedBy}\n` +
      `Date Added: ${note.uploadedDate}\n` +
      `Semester: ${note.semester || 'N/A'}\n\n` +
      `--- Description ---\n` +
      `${note.description}\n\n` +
      `--- Content Overview ---\n` +
      `${note.previewContent || 'Lecture notes summary and study material.'}\n\n` +
      `=========================================================\n` +
      `Downloaded from NoteShare: Centralized College Study Hub\n` +
      `=========================================================`;

    const safeFileName = note.fileName
      ? note.fileName.replace(/\.pdf$/i, '.txt')
      : `${note.title.replace(/\s+/g, '_')}_Notes.txt`;

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${safeFileName}"`);
    return res.send(fileContent);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Public / Private
const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Delete file from disk if present
    if (note.filePath && fs.existsSync(note.filePath)) {
      try {
        fs.unlinkSync(note.filePath);
      } catch (err) {
        console.warn('Could not remove file from disk:', err.message);
      }
    }

    await note.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
      id: req.params.id
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get portal statistics (totals, subjects, download counts)
// @route   GET /api/notes/stats
// @access  Public
const getStats = async (req, res, next) => {
  try {
    const totalNotes = await Note.countDocuments();
    const subjects = await Note.distinct('subject');
    const downloadsAgg = await Note.aggregate([
      { $group: { _id: null, totalDownloads: { $sum: '$downloadCount' } } }
    ]);

    const totalDownloads = downloadsAgg.length > 0 ? downloadsAgg[0].totalDownloads : 0;

    res.status(200).json({
      success: true,
      data: {
        totalNotes,
        uniqueSubjects: subjects.length,
        subjectsList: subjects,
        totalDownloads
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  downloadNote,
  deleteNote,
  getStats
};
