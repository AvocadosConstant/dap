var express = require('express');
var router = express.Router();
var express = require('express');
var passport = require('passport');
var util = require('util');
var GooglePlusStrategy = require('passport-google-plus');

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Google profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var GooglePlusStrategy = require('passport-google-plus');
 
passport.use(new GooglePlusStrategy({
    clientId: process.env.GCLIENT,
    clientSecret: process.env.GSECRET
  },
  function(tokens, profile, done) {
    // Create or update user, call done() when complete... 
    done(null, profile, tokens);
  }
));

var ret = {
  err: null,
  ok: null
};

router.post('/google/callback', function (req, res, next) {
  var sessionStateToken = req.session['state'];
  var clientStateToken  = req.body['state'];
  console.log( 'csrf', sessionStateToken, clientStateToken );
  if( !sessionStateToken ||
      !clientStateToken ||
      sessionStateToken !== clientStateToken ){
    ret.err = {
      msg: 'state token does not match'
    };
    res.send(ret);
    return;
  }

  var oauth2 = new googleapis.OAuth2Client( process.env.GCLIENT,
                                            process.env.GSECRET,
                                            'postmessage' );
  oauth2.getToken( req.body.code, function(err, tokens){
    oauth2.credentials = tokens;
    console.log( now(), err, tokens );
    client.plus.people.get({
      userId: 'me'
    })
    .withAuthClient(oauth2)
    .execute(function(err,result){
      ret.err = err;
      ret.ok = result;
      res.send(ret);
      if( result ){
        var key = result.id;
        var user = {
          auth: oauth2,
          plusInfo: result
        };
        plusUsers[key] = user;
      }
    });
  });
});

module.exports = router;