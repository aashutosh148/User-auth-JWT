const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { generateToken } = require('../utils/jwt.utils');

const revokedTokens = [];

const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create(username, hashedPassword);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findByUsername(username);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user.id);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const logout = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
        revokedTokens.push(token);
    }
    console.log(revokedTokens);

    res.json({ message: 'Logout successful' });
};

module.exports = {
    revokedTokens,
    register,
    login,
    logout,
};