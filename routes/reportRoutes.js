const express = require('express');
const router = express.Router();
const { getSummary, getBorrowingTrends, getGenreDistribution } = require('../controllers/reportController');

// Summary statistics
router.get('/summary', getSummary);

// Borrowing trends
router.get('/trends', getBorrowingTrends);

// Genre distribution
router.get('/genres', getGenreDistribution);

module.exports = router;
