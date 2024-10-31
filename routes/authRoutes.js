// routes/auth.js
const express = require('express');
const User = require('../models/User'); // Adjust the path as necessary
const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Create a new user instance
        const newUser = new User({ username, email, password });
        // Save the user to the database
        await newUser.save();
        // Respond with success message
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        // Handle duplicate username or email errors
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Username or email already exists.' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
