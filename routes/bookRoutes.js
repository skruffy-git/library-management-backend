const express = require('express');
const router = express.Router();

// Import your controller functions
const { createBook, getBooks } = require('../controllers/bookController'); // Adjust the path as necessary

// Define your routes
router.post('/books', createBook); // Ensure `createBook` is defined and imported
router.get('/books', getBooks); // Ensure `getBooks` is defined and imported

module.exports = router;
