// controllers/bookController.js

const Book = require('../models/bookModel'); // Example model import

// Create a new book
exports.createBook = async (req, res) => {
    try {
        const newBook = await Book.create(req.body);
        res.status(201).json({ book: newBook });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all books
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
