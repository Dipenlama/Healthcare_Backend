const express = require('express');
const router = express.Router();
const userController= require('../controllers/userController');

const { authenticateToken } = require('../middleware/authMiddleware');

// Route to register a new user (patient or doctor)
router.post('/register', userController.registerPatient);

// Route to log in a user (returns a JWT token)
router.post('/login', userController.loginPatient);

// Route to fetch user profile (requires JWT)
router.get('/profile', authenticateToken, userController.getProfile);

module.exports = router;
