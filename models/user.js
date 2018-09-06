let mongoose = require('mongoose');
let usermodel = {
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    usertype: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    },
    dateadded: {
        type: String,
        required: true
    }
};
let userSchema = mongoose.model('User', usermodel);
module.exports = userSchema;