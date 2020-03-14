var express = require('express');
var router = express.Router();
var passport = require('passport');
var User  = require('../models/User');
require('dotenv').config()

passport.serializeUser(function (user, done) {
    done(null, user._id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function(err, user) {
		done(err, user);
	});
});

var setAuthProvider = (req, res, next)=>{
    try{
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
                 checkUser(profile, done);
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
}catch(err){
    res.send(406, err)
}
}

var checkUser = function(profile, done){
    User.findOne({email:profile.email},function(err, user){
        if(err){
            throw new Error(err);
        }
        if(user){
            console.log(user)
            return done(err, user)
        }else{
        var newUser = new User({
            provider:profile.provider,
            providerid:profile._json.sub,
            picture: profile._json.picture,
            name: profile._json.name,
            email: profile._json.email
        })
        newUser.save(function(err){
            if(err){
                throw new Error(err);
            }else{
                 return done(err, newUser);
            }
        })
    }
    })
}

var providerCallback = function(req, res, next){
    passport.authenticate(req.params.provider,{ successRedirect: '/profile', failureRedirect: '/' })(req, res, next); 
}


router.get('/:provider', setAuthProvider, function(req, res){
    var scopes = [];
    if(req.params.provider == 'google'){
     scopes =  [ 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email' ]
    }
        passport.authenticate(req.params.provider, { scope: scopes }
      )(req, res);

})


router.get('/:provider/callback', providerCallback)








module.exports  = router;