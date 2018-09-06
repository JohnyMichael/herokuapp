const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');

let usermodel = require('../models/user');
let getUser = async (req)=>{
    if (typeof req.cookies.auth !== 'undefined') {
        let user;
        await jwt.verify(req.cookies.auth, config.auth.secret, async function (err, decoded) {
            if(!err){
                
                user = await usermodel.findOne({_id: decoded.userid}, (err, foundData)=>{
                    if(err) console.log(err); else{
                        
                        return foundData;
                    }
                });
            }else{
                return false;
            }
        });
        if(typeof user === 'undefined'){
            return false;
        }else return user;
    }else{
        return false;
    }
};

let getuserid = async (req)=>{
    if (typeof req.cookies.auth !== 'undefined') {
        let user;
        await jwt.verify(req.cookies.auth, config.auth.secret, async function (err, decoded) {
            if(!err){
                user = decoded.userid;
            }else{
                return false;
            }
        });
        return user;
    }else{
        return false;
    }
};


let checkUsername = async (username)=>{
    username = username.toString();
    let checkDB = await usermodel.find({
        username: username
    }, (err, foundData) => {
        if (err) {
            return err;
        } else {
            return foundData;
        }
    });
    if(checkDB.length > 0){
        return true;
    }else{
        return false;
    }
};


let checkEmail = async (email)=>{
    email = email.toString();
    let checkDB = await usermodel.find({
        email: email
    }, (err, foundData) => {
        if (err) {
            return err;
        } else {
            if (err) {
                return err;
            } else {
                return foundData;
            }
        }
    });
    if(checkDB.length > 0){
        return true;
    }else{
        return false;
    }
};


let verifyPasswords = async (userpassword, dbPassword)=>{
    const match = await bcrypt.compare(req.body.password, userbyUN[0].password);
    if(!match){
        return false;
    }else{
        return true;
    }
};


let setOnline = (userid)=>{
    usermodel.updateOne({
        _id: userid
    }, {status: "Online"}, {}, () => {
        console.log("Set to Online");
    });
    return true;
};


let setOffline = (userid)=>{
    usermodel.updateOne({
        _id: userid
    }, {status: "Offline"}, {}, () => {
        console.log("Set to Online");
    });
    return true;
};

module.exports = {
    getUser,
    checkUsername,
    checkEmail,
    verifyPasswords,
    setOnline,
    setOffline,
    getuserid
};