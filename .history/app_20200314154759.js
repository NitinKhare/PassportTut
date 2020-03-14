var express = require('express');
var path = require('path')
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var app = express();
var 

mongoose.connect(db.dbUrl, {useNewUrlParser : true}).then(()=>{
    console.log("Connected to mongoDB");
})

app.use(express.static(path.join(__dirname, 'public')));

