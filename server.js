// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const bookRoutes = require('./routes/bookRoutes'); // Import book routes
const reportRoutes = require('./routes/reportRoutes'); // New report routes

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable for PORT

require('dotenv').config(); // Load environment variables from .env file


app.use(express.json());
// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI) // Use the MONGODB_URI from the .env file
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Use the auth routes
app.use('/api', authRoutes); // Prefix for auth routes
app.use('/api', bookRoutes); // Prefix for book routes
app.use('/api/reports', reportRoutes); // Mount the report routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
