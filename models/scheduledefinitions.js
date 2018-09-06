let mongoose = require('mongoose');

module.exports = mongoose.model('Scheduledefinitions', {
    name: String,   //one-time, Custom Days (M,T,W,T,F,S), Custom Weeks, Custom Months, 
    subname: String, //   , Mo:Tu:Th:Fr , 1:2:3:4, 
    value: String, // 24, 1
    type: String, // Day, Hours, Minute, Seconds, Years, Months
    valueUnit: String,  //Hrs
    expiresat: String
});