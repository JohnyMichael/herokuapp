let mongoose = require('mongoose');

module.exports = mongoose.model('Demands', {
    name: String,
    details: String
});