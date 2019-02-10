const express = require('express');
const router = express.Router();
const {
  ensureAuthenticated
} = require('../config/auth');
const Slot = require('../models/slots');
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
    // user.image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog '
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
    user: req.user,
    slotSuccess: "",
    slotFailure: ""
  })
);


// Database for parking Slots 
const MongoClient = require('mongodb').MongoClient;
let db;
var url = "mongodb://localhost:27017/login";
MongoClient.connect(url, (err, database) => {
  if (err) {
    return console.log(err);
  }
  db = database.db('login');
  db.createCollection('Slot', function (err, res) {
    if (err) throw err;
    console.log("collection created");
  });
  console.log("connected to database ")
  // start the express web server listening on 8080
});

router.post('/dashboard', (req, res) => {
  // console.log(req.body)
  var smsg = "";
  var emsg = "";
  const slot = parseInt(req.body.slot);
  const newSlot = new Slot({
    slot: slot
  });

  if (slot > 0 && slot < 25) {
    db.collection('Slot').findOne({
      slot: slot.toString
    }, function (err, result) {
      if (err) {
        db.collection('Slot').insertOne(newSlot, (err, result) => {
          if (err) {
            return console.log(err);
          }

        });
        smsg = "Slot Booked"
      } else {
        console.log(result.slot + " result ")
      }
    });
  } else {
    emsg = "Please select slot in range!"

  }



});


module.exports = router;