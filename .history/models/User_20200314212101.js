var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    provider:{type: String},
    providerid : {type: String}, 
    picture
    name: { type: String, required: true },
    email: { type: String, required: true },
    admin: { type: Number}
});

var Page = module.exports = mongoose.model('User', UserSchema);