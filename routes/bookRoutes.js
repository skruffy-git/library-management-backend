const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // Import the Book model
const { createBook, getBooks, deleteBook } = require('../controllers/bookController'); // Import deleteBook controller

// Route to create a new book
router.post('/books', async (req, res) => {
    try {
        const { title, author, publishedDate, pages } = req.body;
        const newBook = new Book({ title, author, publishedDate, pages });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(500).json({ message: 'Error creating book', error: error.message });
    }
});

// Route to get all books
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
});

// Route to delete a book by ID
router.delete('/books/:id', deleteBook); // New delete route

module.exports = router;
