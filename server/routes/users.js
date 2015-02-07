var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
, assert = require('assert');
var url = 'mongodb://localhost:27017/test';

/* GET users public listing. */
router.get('/:id', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected correctly to server");
		var usrs = db.collection('users');
		usrs.find({"user": req.params.id}, function(err, data) {
			res.send(data);
		});
	});
}

module.exports = router;