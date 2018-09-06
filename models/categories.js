let mongoose = require('mongoose');

module.exports = mongoose.model('Category', {
    name: String,
    slug: String,
    details: String
});