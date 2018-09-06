let mongoose = require('mongoose');

module.exports = mongoose.model('UserDetails', {
    name: String,
    type: String,
    desc: String,
    userid: String
});