// routes/authRoutes.js
const express = require('express');
const User = require('../models/User'); // Adjust the path as necessary
const jwt = require('jsonwebtoken'); // Import jwt
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

// Login route
router.post('/login', async (req, res) => {
    const { identifier, password } = req.body; // Change "email" to "identifier"

    try {
        // Find user by either username or email
        const user = await User.findOne({
            $or: [{ username: identifier }, { email: identifier }],
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.json({ token }); // Return the token
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
