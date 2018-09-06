let mongoose = require('mongoose');

module.exports = mongoose.model('Logs', {
    log: String,
    type: String,
    assignto: String,
    status: String,
    datatime: String
});