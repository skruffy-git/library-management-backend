const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes'); // Adjust path as needed

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB (add your connection string)
mongoose.connect('your_connection_string', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Use the routes
app.use('/api', bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
