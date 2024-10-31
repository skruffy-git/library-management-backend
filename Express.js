app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Find user in the database and check password (add your logic)
    const user = await User.findOne({ email });
    if (!user || !isValidPassword(user, password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Send back user data (excluding sensitive info)
    res.json({ user: { id: user.id, name: user.name, email: user.email } });
});
