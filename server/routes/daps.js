var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
, assert = require('assert');
var url = 'mongodb://localhost:27017/test';


router.post('/', function(req, res, next) {
	insertDoc(req.body, function() {
		res.send("Done.")
	});
});

function insertDoc(doc, callback) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected correctly to server");
		var dapdb = db.collection('dapdb');
		dapdb.insert(doc, function(err) {
			db.close();
			callback();
		});
	});
}

module.exports = router;