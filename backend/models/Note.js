const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a note title'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    subject: {
      type: String,
      required: [true, 'Please provide a subject'],
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: 'Uploaded study materials and lecture notes.'
    },
    uploadedBy: {
      type: String,
      required: [true, 'Please specify who uploaded this note'],
      trim: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    uploadedDate: {
      type: String,
      default: () =>
        new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
    },
    semester: {
      type: String,
      default: 'Current'
    },
    fileSize: {
      type: String,
      default: '1.0 MB'
    },
    fileType: {
      type: String,
      default: 'PDF',
      uppercase: true
    },
    fileName: {
      type: String,
      required: [true, 'File name is required']
    },
    filePath: {
      type: String,
      default: ''
    },
    fileUrl: {
      type: String,
      default: ''
    },
    downloadCount: {
      type: Number,
      default: 0
    },
    previewContent: {
      type: String,
      default: 'Lecture notes summary and study material.'
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        return ret;
      }
    }
  }
);

// Index for search optimization
noteSchema.index({ title: 'text', subject: 'text', description: 'text' });

module.exports = mongoose.model('Note', noteSchema);
