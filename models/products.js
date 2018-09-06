let mongoose = require('mongoose');

module.exports = mongoose.model('Products', {
    name: String,
    subcatid: String,
    details: String,
    price: String,
    slug: String,
    datetime: String,
    status: Boolean
});