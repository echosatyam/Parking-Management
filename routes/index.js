const express = require('express');
const router = express.Router();
var numbers = new Array(40);
for (var i = 0; i < numbers.length; i++) {
  numbers[i] = 'bg-success';
}
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
router.get('/dashboard', ensureAuthenticated, function (req, res) {
  processParking();
  res.render('dashboard', {
    login: req.user,
    user: req.user
    // user.image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog '
  })
});

router.get('/monitor', ensureAuthenticated, (req, res) =>
  res.render('monitor', {
    login: req.user,
    user: req.user
  })
);

function processParking() {
  db.collection('Slot').find({}).toArray(function (err, result) {
    console.log(result);
    for (var i = 0; i < result.length; i++) {
      numbers[parseInt(result[i].slot)] = "bg-danger";
    }
    console.log(numbers);
  });
}
router.get('/parking', ensureAuthenticated, function (req, res) {
  // console.log(req.user);rs
  // for (var i = 0; i < numbers.length; i++) {
  //   numbers[i] = 'bg-success';
  // }
  processParking();

  res.render('parking', {
    login: req.user,
    user: req.user,
    success_msg: "",
    error_msg: "",
    color: numbers
  })

});


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
router.post('/parking', (req, res) => {

  console.log("post");
  console.log(numbers)
  const slot = parseInt(req.body.slot);
  const newSlot = new Slot({
    slot: req.body.slot
  });
  if (slot > 0 && slot < 25) {
    db.collection('Slot').findOne({
      slot: req.body.slot
    }, function (err, result) {
      if (result == null) {
        numbers[slot] = "bg-danger";
        db.collection('Slot').insertOne(newSlot, (err, result) => {
          if (err) {
            return console.log(err);
          }
        });

        //  console.log("slot booked");

        res.render('parking', {
          login: req.user,
          user: req.user,
          success_msg: "Slot Booked",
          error_msg: "",
          color: numbers
        })
      } else {

        res.render('parking', {
          login: req.user,
          user: req.user,
          success_msg: "",
          error_msg: "Slot already Booked",
          color: numbers
        });
      }
    });
  } else {


    res.render('parking', {
      login: req.user,
      user: req.user,
      error_msg: "Please select Slot in range",
      color: numbers
    });
  }


});


module.exports = router;