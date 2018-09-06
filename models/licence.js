let mongoose = require('mongoose');

module.exports = mongoose.model('Licence', {
    licence: String,
    dateadded: String,
    addedby: String,
    expiresat: String
});