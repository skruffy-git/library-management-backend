// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date },
    pages: { type: Number },
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
