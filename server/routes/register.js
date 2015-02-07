var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
var gravatar = require('gravatar');
var url = 'mongodb://localhost:27017/test';

router.post('/', function(req, res) {
  console.log(req.body)
  var user = {
    "name": req.body.name,
    "picture": gravatar.url(req.body.email),
    "email": req.body.email,
    "phone": req.body.phone,
    "password": req.body.password
  }
  if(validateUser(user)) {
    res.status(200);
    res.send("Done");
  }
  else {
    res.status(400);
    res.send("Go home, you're drunk");
  }
});

function validateUser(user) {
  if (user.name == '') {
    return false;
  }
  if (user.password == '') {
    return false;
  }
  if (user.email.indexOf('@') == -1) { // -1 Index indicates that it doesn't exist.
    return false;
  }
  if (user.phone.indexOf('+') == -1) {
    return false;
  }
  return true;
}

function newUser(user, callback) {

}

module.exports = router;