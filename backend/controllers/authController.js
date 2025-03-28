const db = require('../config/db');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, address, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const [user] = await db.query(
            'INSERT INTO users (name, email, address, password, role) VALUES (?, ?, ?, ?, ?)',
            [name, email, address, hashedPassword, role]
        );
        const userId = user.insertId

        res.status(201).json({ message: 'User registered', userId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (!user || !(await bcrypt.compare(password, user[0].password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};