let mongoose = require('mongoose');
//EVERY Category will have different Features....
module.exports = mongoose.model('Features', {
    name: String,
    priority: String, //Like to sort them or give them any importance..
    fkey: String  // catid
});