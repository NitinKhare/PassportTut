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

app.get('/', function (req, res){
    res.render('login');
})

app.listen(PORT,function(){
    console.log("SERVER STARTED")
})