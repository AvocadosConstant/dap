var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile/:id', function(req, res, next) {
  res.render('profile', { title: 'Profile', id: req.params.id });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login Page' });
});

module.exports = router;