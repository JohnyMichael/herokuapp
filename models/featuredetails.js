let mongoose = require('mongoose');

module.exports = mongoose.model('Featuredetails', {
    featureid: String,
    type: String, // Product, Category
    fkey: String, // IDs,, Forign Key
    featurevalue: String,
    effect: Boolean, //If we need to add something to price or delete.
    operaion: String,
    amount: String
});