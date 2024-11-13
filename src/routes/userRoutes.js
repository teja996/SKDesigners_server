// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// @route POST /api/users/register
router.post('/register', registerUser);

// @route POST /api/users/login
router.post('/login', authUser);

// @route GET /api/users/profile
// @route PUT /api/users/profile
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
