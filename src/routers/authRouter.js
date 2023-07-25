const express = require('express');
const router = new express.Router();
const auth = require('../middlewares/auth');
const { login, signup, logout } = require('../controllers/authController');

// Login
router.post('/login', login);

// Signup
// router.post('/signup', signup);

// Logout
router.post('/logout', auth, logout);

module.exports = router;
