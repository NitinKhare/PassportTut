var express = require('express');
var path = require('path')
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var app = express();
const PORT = 3000;

mongoose.connect(db.dbUrl, {useNewUrlParser : true}).then(()=>{
    console.log("Connected to mongoDB");
})

app.use(express.static(path.join(__dirname, 'public')));

