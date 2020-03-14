var express = require('express');
var router = express.Router();
var passport = require('passport');
var User  = require('../models/User');
require('dotenv').config()

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
          async function(request, accessToken, refreshToken, profile, done) {
              console.log("PROFILE", profile)
              if(profile && profile.email){
                await checkUser(profile, done);
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
             done(err, null)
        }
        if(user){
            console.log(user)
            return done(err, user)
        }else{
        var user = new User({
            provider:profile.provider,
            providerid:profile._json.sub,
            picture: profile._json.picture,
            name: profile._json.name,
            email: profile._json.email
        })
        user.save(function(err){
            if(err){
                 done(err, null);
            }else{
                 resolve(null);
            }
        })
    }
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