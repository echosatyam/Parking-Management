const express = require('express');
const router = express.Router();
const {
  ensureAuthenticated
} = require('../config/auth');

// Welcome Page
router.get('/', function (req, res) {
  if (req.user) {
    res.render('portfolio', {
      login: req.user
    })
  } else {
    res.render('welcome', {
      login: req.user
    });
  }
  // console.log(req.user);
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    login: req.user,
    user: req.user
  })
);

module.exports = router;