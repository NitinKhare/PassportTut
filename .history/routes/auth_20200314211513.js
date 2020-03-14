var express = require('express');
var router = express.Router();
var passport = require('passport');
require('dotenv').config()

var setAuthProvider = (req, res, next)=>{
    if(req.params.provider == 'google'){
        var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
        passport.use('google',new GoogleStrategy({
            clientID:  process.env.GOOGLE_CLIENTID   ,
            clientSecret: process.env.GOOGLE_CLIENTSECRET,
            callbackURL: "http://localhost:3000/auth/google/callback",
            passReqToCallback   : true
          },
          function(request, accessToken, refreshToken, profile, done) {
              console.log("PROFILE", profile)
          }
        ));
    }else if(req.params.provider == 'twitter'){ 
        
    }else {
        res.send(406)
    }
}

var providerCallback = function(req, res, next){
    passport.authenticate(req.params.provider,{ successRedirect: '/profile', failureRedirect: '/login' })(req, res, next); 
}


router.get('/:provider', setAuthProvider, function(req, res){
         passport.authenticate('google', { scope: 
            [ 'https://www.googleapis.com/auth/plus.login',
            , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
      )(req, res);

})


router.get('/:provider/callback', providerCallback)








module.exports  = router;