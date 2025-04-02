const dbPromise = require('../config/db');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, address, password, role } = req.body;

        const db = await dbPromise;

        const getQuery = `SELECT * FROM users WHERE email = ?`
        const dbUser = await db.get(getQuery, [email]) 

        if (dbUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const postQuery = 'INSERT INTO users (name, email, address, password, role) VALUES (?, ?, ?, ?, ?)'
        const dbResponse = await db.run(postQuery, [name, email, address, hashedPassword, role])
        res.status(201).json({ message: 'User registered Successfully', userId: dbResponse.lastID });
        
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const db = await dbPromise;
        const dbUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);

        if (!dbUser || !(await bcrypt.compare(password, dbUser.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: dbUser.id, role: dbUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, dbUser, message: "User Login Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};