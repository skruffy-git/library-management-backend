const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Ensure to use this for CORS
const authRoutes = require('./routes/authRoutes'); // Adjust the path as necessary
require('dotenv').config();

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://skruffyjr:F7AsfaYdDLg7eI1M@test.jvise.mongodb.net/?retryWrites=true&w=majority&appName=Test', { // Update your connection string
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Use the auth routes
app.use('/api', authRoutes); // Prefix your routes with /api

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
