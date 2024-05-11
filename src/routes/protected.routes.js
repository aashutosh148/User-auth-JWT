const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth.middleware');

router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to the dashboard!', userId: req.userId });
});

module.exports = router;