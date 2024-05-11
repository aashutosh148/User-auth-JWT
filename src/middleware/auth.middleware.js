const jwt = require('jsonwebtoken');
const { revokedTokens } = require('../controllers/auth.controller.js');
console.log(revokedTokens)

const authenticateToken = (req, res, next) => {
    console.log(req.headers);
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    if (revokedTokens && revokedTokens.includes(token)) {
        return res.status(403).json({ error: 'Token has been revoked' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        req.userId = decoded.userId;
        next();
    });
};

module.exports = authenticateToken;