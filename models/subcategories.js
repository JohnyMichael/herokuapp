let mongoose = require('mongoose');

module.exports = mongoose.model('SubCategory', {
    name: String,
    slug: String,
    details: String,
    categoryid: String
});