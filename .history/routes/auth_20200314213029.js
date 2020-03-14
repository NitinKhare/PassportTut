var express = require('express');
var router = express.Router();
var passport = require('passport');
var User  = require('../models/User');
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
              if(profile && profile.email){
                checkUser(profile)
          }else{
              res.redirect('/')
          }
        }
        ));
    }else if(req.params.provider == 'twitter'){ 

    }else if(req.params.provider == 'facebook'){ 

    }else {
        res.send(406)
    }
    next();
}

var checkUser = function(profile){
    User.findOne({email:profile.email},function(err, user){
        if(err){
            throw new Error(err)
        }
        var user = new User
    })
}

var providerCallback = function(req, res, next){
    passport.authenticate(req.params.provider,{ successRedirect: '/profile', failureRedirect: '/login' })(req, res, next); 
}


router.get('/:provider', setAuthProvider, function(req, res){
         passport.authenticate('google', { scope: 
            [ 'https://www.googleapis.com/auth/userinfo.profile',
            , 'https://www.googleapis.com/auth/userinfo.email' ] }
      )(req, res);

})


router.get('/:provider/callback', providerCallback)








module.exports  = router;