var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    provider:{type: String},
    providerid : {type: String}, 
    picture:{type:String},
    name: { type: String, required: true },
    email: { type: String, required: true },
});

var Page = module.exports = mongoose.model('User', UserSchema);