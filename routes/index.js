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
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    login: req.user,
    user: req.user
  })
);

router.get('/monitor', ensureAuthenticated, (req, res) =>
  res.render('monitor', {
    login: req.user,
    user: req.user
  })
);
router.get('/parking', ensureAuthenticated, (req, res) =>
  res.render('parking', {
    login: req.user,
    user: req.user
  })
);


module.exports = router;