var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    provider:{type: String}
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Number}
});

var Page = module.exports = mongoose.model('User', UserSchema);