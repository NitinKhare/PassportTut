var express = require('express');
var path = require('path')
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost/passport", {useNewUrlParser : true}).then(()=>{
    console.log("Connected to mongoDB");
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

var isLoggedIn =  function(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

app.get('/', function (req, res){
    res.render('login');
})

var authRoutes = require('./routes/auth');

app.get('/profile',isLoggedIn,function(req, res){
    res.send("Hello This is your Profile "+res.locals.user.)
})


app.use('/auth', authRoutes)
app.listen(PORT,function(){
    console.log("SERVER STARTED")
})