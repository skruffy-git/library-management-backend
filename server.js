// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const bookRoutes = require('./routes/bookRoutes'); // Import book routes

const app = express();
const PORT = process.env.PORT || 5001; // Use environment variable for PORT

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
app.use('/api', authRoutes); // Prefix for auth routes
app.use('/api', bookRoutes); // Prefix for book routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
