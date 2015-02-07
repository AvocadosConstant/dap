var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
var sha1 = require('sha1');
var url = 'mongodb://localhost:27017/test';

/* GET users public listing. */
router.get('/:id', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log(req.params);
    var usrs = db.collection('users');
    usrs.findOne({"_id": req.params.id}, function(err, data) {
      assert.equal(null, err);
      res.send(data);
    });
  });
});

module.exports = router;