var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');


mongoose.connect(db.dbUrl, {useNewUrlParser : true}).then(()=>{
    console.log("Connected to mongoDB");
})