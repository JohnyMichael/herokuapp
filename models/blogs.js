let mongoose = require('mongoose');

module.exports = mongoose.model('Blogs', {
    title: String,
    author: String,
    slug: String,
    body: String,
    writtenon: String,
    publishon: String,
    summary: String
});