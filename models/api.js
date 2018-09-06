let mongoose = require('mongoose');

module.exports = mongoose.model('Api', {
    key: String,
    userid: String,
    type: String, //Levels of Api, Access Control through Api.
    createdby: String,
    createdon: String
});