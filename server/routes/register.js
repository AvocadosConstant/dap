var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
, assert = require('assert');
var gravatar = require('gravatar');
var url = 'mongodb://localhost:27017/test';

router.post('/', function(req, res, next) {
  console.log(req.body)
  var user = {
    "name": req.body.name,
    "picture": gravatar.url(req.body.email),
    "email": req.body.email,
    "phone": req.body.phone,
    "password": req.body.password
  }
  if(validateUser(user))
    res.send("GG, it worked")
  else
    res.send("Way to screw up the form.")
});

function validateUser(user) {
  // if(!user.name)
  //   return false;
  // if(!user.password)
  //   return false;
  // if(!user.email.contains('@'))
  //   return false;
  // if(!user.phone.contains('+'))
  //   return false;
  return true;
}

module.exports = router;