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
        console.log(req.params.provider,process.env.FACEBOOK_CLIENTSECRET)
        req.params.provider = req.params.provider.toLowerCase();
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
        next()
    }else if(req.params.provider == 'twitter'){ 
        var TwitterStrategy = require('passport-twitter').Strategy;
        console.log(process.env.TWITTER_CONSUMERKEY)
        passport.use('twitter',new TwitterStrategy({
            consumerKey:  process.env.TWITTER_CONSUMERKEY   ,
            consumerSecret:process.env.TWITTER_CONSUMERSECRET,
            callbackURL: "http://localhost:3000/auth/twitter/callback",
            userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
            passReqToCallback   : true
          },
           function(request, accessToken, refreshToken, profile, done) {
              console.log("PROFILE", profile)
              if(profile){
                 checkUser(profile, done);
          }else{
              res.redirect('/')
          }
        }
        ))
        next();
    }else if(req.params.provider == 'facebook'){ 
        var FacebookStrategy = require('passport-facebook').Strategy;
        passport.use('facebook',new FacebookStrategy({
            clientID:  process.env.FACEBOOK_CLIENTID   ,
            clientSecret:process.env.FACEBOOK_CLIENTSECRET,
            callbackURL: "http://localhost:3000/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'profileUrl', 'name', 'gender', 'birthday', 'photos', 'emails'],
            passReqToCallback   : true
          },
           function(request, accessToken, refreshToken, profile, done) {
              console.log("PROFILE", profile)
              if(profile){
                 checkUser(profile, done);
          }else{
              res.redirect('/')
          }
        }
        ))
        next();

    }else {
        res.send(406)
    }

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
            providerid:profile.id,
            picture: profile.photos[0].value }} ,
            name: profile._json.name ,
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
    if(req.params.provider == 'facebook'){
        scopes = ['email']
    }
    passport.authenticate(req.params.provider, { scope: scopes })(req, res);

})


router.get('/:provider/callback', providerCallback)








module.exports  = router;