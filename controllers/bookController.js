// controllers/bookController.js
const Book = require('../models/Book');

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

// Delete a book by ID
exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully', book: deletedBook });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error: error.message });
    }
};
