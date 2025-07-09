const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../services/authService');
const verifyToken = require('../middleware/verifyToken');
const requireAdmin = require('../middleware/requireAdmin');

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes are live' });
});

router.get('/admin/dashboard', verifyToken, requireAdmin, (req, res) => {
  res.json({
    message: `Welcome to the admin dashboard, ${req.user.name}`,
    time: new Date().toLocaleTimeString()
  });
});

module.exports = router;
