var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
var gravatar = require('gravatar');
var sha1 = require('sha1');
var url = 'mongodb://localhost:27017/test';

router.post('/', function(req, res) {
  console.log(req.body)
  var user = {
    "_id": sha1(req.body.email),
    "name": req.body.name,
    "picture": gravatar.url(req.body.email),
    "email": req.body.email,
    "phone": req.body.phone,
    "password": req.body.password //much secure password hashez
  }
  console.log(user);
  if(validateUser(user)) {
    newUser(user, function(err) {
      if(err) {
        res.status(500);
        res.send(err);
      }
      else {
        res.status(200);
        res.send("Done");
      }
    });
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
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    var usrs = db.collection('users');
    usrs.insert(user, function(err, doc) {
      callback(err);
    });
  });
}

module.exports = router;