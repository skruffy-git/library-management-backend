const express = require('express');
const { addBook, updateBook, deleteBook, getBooks } = require('../controllers/bookController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/books', auth, addBook);
router.put('/books/:id', auth, updateBook);
router.delete('/books/:id', auth, deleteBook);
router.get('/books', auth, getBooks);

module.exports = router;
