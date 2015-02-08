var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile/:id', ensureAuthenticated, function(req, res, next) {
  res.render('profile', { title: 'Profile' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login Page' });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/')
}

module.exports = router;