var express = require('express');
var router = express.Router();
require('dotenv').config()

var setAuthProvider = (req, res, next)=>{
    if(req.params.provider == 'google'){
        var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
        passport.use(new GoogleStrategy({
            clientID:  process.env.GOOGLE_CLIENTID   ,
            clientSecret: process.env.GOOGLE_CLIENTIDSECRET,
            callbackURL: "http://yourdormain:3000/auth/google/callback",
            passReqToCallback   : true
          },
          function(request, accessToken, refreshToken, profile, done) {
            User.findOrCreate({ googleId: profile.id }, function (err, user) {
              return done(err, user);
            });
          }
        ));
    }else{
        res.send(406)
    }
}

router.get('/:provider', setAuthProvider, function(req, res){
    switch (req.params.provider){
        case 'google' : res.send("Its google"); break;
        case 'twitter' : res.send("Its twitter"); break;
        case 'facebook' : res.send("Its fb"); break;
        default       :      res.send("NOT FOUND")
    }
})

router




module.exports  = router;