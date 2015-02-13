var express = require('express');
var router = express.Router();
var express = require('express');
var passport = require('passport');
var util = require('util');
var OAuth = require('oauthio');


OAuth.initialize(process.env.OA, process.env.OAS);
router.get('/oauth/state_token', function (req, res) {
    res.send(200, {
        token: OAuth.generateStateToken(req.session)
    });
});

router.get('/signin', OAuth.auth('google', 'http://localhost:3000/'));

router.get('/oauth/redirect', OAuth.redirect(function(result, req, res) {
    //todo with result
}));

module.exports = router;