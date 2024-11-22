// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Title is required'], 
        trim: true 
    },
    author: { 
        type: String, 
        required: [true, 'Author is required'], 
        trim: true 
    },
    publishedDate: { 
        type: Date,
        default: null // Optional published date
    },
    pages: { 
        type: Number, 
        min: [1, 'Pages must be at least 1'],
        default: null // Optional page count
    },
}, { 
    timestamps: true // Adds createdAt and updatedAt fields
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
