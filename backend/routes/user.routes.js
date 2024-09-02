// Import necessary modules
const express = require('express');

// Import controller functions for handling user signup and login
const {
    handleUserSignup,
    handleUserLogin
} = require('../controllers/user.controller');

// Create a router instance
const router = express.Router();

// Define routes for user signup and login
router.post('/signup', handleUserSignup); // Route for user signup
router.post('/login', handleUserLogin);   // Route for user login

// Export the router
module.exports = router;
