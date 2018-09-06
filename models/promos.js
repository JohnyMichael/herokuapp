let mongoose = require('mongoose');

module.exports = mongoose.model('Promos', {
    name: String,
    type: String,   //Table info like Indivial Promo, Product etx
    value: String, 
    fkey: String,
    scheduled: Boolean,
    position: String,
    priority: String
});