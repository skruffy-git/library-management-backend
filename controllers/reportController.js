const Book = require('../models/Book');
const Borrow = require('../models/Borrow'); // Assume Borrow tracks borrowed books
const User = require('../models/User'); // Assume User tracks active users

// Summary statistics
exports.getSummary = async (req, res) => {
    try {
        const totalBooks = await Book.countDocuments();
        const borrowedBooks = await Borrow.countDocuments({ returned: false }); // Books not yet returned
        const activeUsers = await User.countDocuments({ active: true });

        res.status(200).json({
            totalBooks,
            borrowedBooks,
            activeUsers,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching summary data', error: error.message });
    }
};

// Borrowing trends
exports.getBorrowingTrends = async (req, res) => {
    try {
        const trends = await Borrow.aggregate([
            {
                $group: {
                    _id: { $month: '$borrowDate' }, // Group by month
                    borrowedBooks: { $sum: 1 },
                },
            },
            {
                $project: {
                    month: '$_id',
                    borrowedBooks: 1,
                    _id: 0,
                },
            },
            { $sort: { month: 1 } },
        ]);

        res.status(200).json(trends);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching borrowing trends', error: error.message });
    }
};

// Genre distribution
exports.getGenreDistribution = async (req, res) => {
    try {
        const distribution = await Book.aggregate([
            {
                $group: {
                    _id: '$genre',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    genre: '$_id',
                    value: '$count',
                    _id: 0,
                },
            },
        ]);

        res.status(200).json(distribution);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching genre distribution', error: error.message });
    }
};
