const express = require('express');
const router = express.Router();
const {
  ensureAuthenticated
} = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => res.render('welcome', {
  login: false
}));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    login: true,
    user: req.user
  })
);

module.exports = router;