let mongoose = require('mongoose');

module.exports = mongoose.model('Likes', {
    type: String, // Product, Category, Blog
    fkey: String, // IDs,, Forign Key
    userid: String, 
    datetime: String
});