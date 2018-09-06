let mongoose = require('mongoose');

module.exports = mongoose.model('Tasks', {
    details: String,
    type: String,
    componentid: String
});