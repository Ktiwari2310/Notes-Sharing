const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper function to sign JWT token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'supersecretnotesharejwtkey_2026_change_in_production',
    {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    }
  );
};

// @desc    Register a new student account
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { fullName, name, studentId, email, password } = req.body;
    const finalName = fullName || name;

    if (!finalName || !studentId || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, student ID, email, and password'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if email already registered
    const emailExists = await User.findOne({ email: email.toLowerCase().trim() });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists'
      });
    }

    // Check if studentId already registered
    const studentIdExists = await User.findOne({
      studentId: studentId.toUpperCase().trim()
    });
    if (studentIdExists) {
      return res.status(400).json({
        success: false,
        message: 'An account with this Student ID already exists'
      });
    }

    // Create user
    const user = await User.create({
      fullName: finalName.trim(),
      studentId: studentId.toUpperCase().trim(),
      email: email.toLowerCase().trim(),
      password
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      token,
      user: {
        id: user._id,
        _id: user._id,
        name: user.fullName,
        fullName: user.fullName,
        studentId: user.studentId,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { identifier, email, studentId, password } = req.body;
    const loginIdentifier = identifier || email || studentId;

    if (!loginIdentifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your email/Student ID and password'
      });
    }

    // Search user by either email or studentId, and explicitly include password
    const user = await User.findOne({
      $or: [
        { email: loginIdentifier.toLowerCase().trim() },
        { studentId: loginIdentifier.toUpperCase().trim() }
      ]
    }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. User not found.'
      });
    }

    // Verify password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Incorrect password.'
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        _id: user._id,
        name: user.fullName,
        fullName: user.fullName,
        studentId: user.studentId,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        _id: user._id,
        name: user.fullName,
        fullName: user.fullName,
        studentId: user.studentId,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe
};
