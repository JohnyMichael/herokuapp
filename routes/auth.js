const express = require('express');
const myRouter = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt       = require('jsonwebtoken');
const config = require('../config');
const usermiddleware = require('../middlewares/users');
let chunks = require('../chunks/navbar');
let userHelper = require('../chunks/users');


config.connectToMongo();



function router() {
    let User = require('../models/user');
    myRouter.route('/').get(usermiddleware.shouldnotLoggedin, async (req, res)=>{
        
        var admin = {
            email: config.auth.admin.email,
            password: config.auth.admin.pass,
            username: config.auth.admin.username,
            name: config.auth.admin.name,
            usertype: config.auth.admin.usertype,
            status: "new",
            description: "user by backend.",
            verified: true,
            dateadded: Date()
        };
        var userbyemail = await User.find({
            email: config.auth.admin.email
        });
        var userbyUN = await User.find({
            username: config.auth.admin.username
        });

        if(userbyemail.length === 0 && userbyUN.length === 0){
            admin.password = await bcrypt.hash(config.auth.admin.pass, 10).then(function (hash) {
                return hash;
            });
            var user = new User(admin);
            user.save((err, result) => {
                if (err) {
                    res.status(500);
                } else {
                    res.status(200).send({message: "Admin has been created."}).redirect('/Auth/Signin');
                }
            });
        }else{
            res.status(501).send({message: "You are not authorized for this operation."});
        }
    });


    // Signin

    myRouter.route('/Signin').get(usermiddleware.shouldnotLoggedin, (req, res) => {
        let nav = chunks.getnav(req);
        res.status(200).render('signin', {
            appname: config.appdata.appname,
            title: 'Signin | ' + config.appdata.appname,
            applogo: config.appdata.logo,
            nav
        });
    }).post(usermiddleware.shouldnotLoggedin, async (req, res) => {
        let nav = chunks.getnav(req);
        var errors = "";
        var userbyemail = await User.find({
            email: req.body.emailorusername
        });
        var userbyUN = await User.find({
            username: req.body.emailorusername
        });
        let user;
        if (userbyemail.length == 0 && userbyUN.length == 0) {
            errors += "Your username or password do not match. make sure that you are registered user.";
            res.status(501).render('signin', {
                appname: config.appdata.appname,
                title: 'Signin | ' + config.appdata.appname,
                applogo: config.appdata.logo,
                nav,
                errors
            });
        } else {
            if (userbyemail.length == 0) {
                const match = await bcrypt.compare(req.body.password, userbyUN[0].password);
                if (!match) {
                    errors += "Your username or password do not match.";
                }else{
                    user = userbyUN[0];
                }
                console.log('oldpassword: ' + userbyUN[0].password);
            } else {
                const match = await bcrypt.compare(req.body.password, userbyemail[0].password);
                if (!match) {
                    errors += "Your username or password do not match.";
                }else{
                    user = userbyemail[0];
                }
                console.log('oldpassword: ' + userbyemail[0].password);
            }
            if (errors != "") {
                let nav = chunks.getnav(req);
                res.status(501).render('signin', {
                    appname: config.appdata.appname,
                    title: 'Signin | ' + config.appdata.appname,
                    applogo: config.appdata.logo,
                    nav,
                    errors
                });
                console.log('error logged in');
                console.log('match: ' + typeof(match));

            } else {
                let userid = user._id.toString();
                try{
                    let token = await jwt.sign({ userid }, config.auth.secret, { expiresIn: '5h' });
                    res.cookie('auth', token, { maxAge: config.appdata.cookie.expiry, httpOnly: true });
                    userHelper.setOnline(userid);
                    res.redirect('/Dashboard');
                }catch(e){
                    res.status(502).send({error: "Error!! Signin you in.. Please contact admin"});
                    console.log(e);
                }
            }
        }
    });



    myRouter.route('/Register').get(usermiddleware.shouldnotLoggedin, (req, res) => {
        let nav = chunks.getnav(req);
        res.status(200).render('register', {
            appname: config.appdata.appname,
            title: 'Register | ' + config.appdata.appname,
            applogo: config.appdata.logo,
            nav
        });
    }).post(async (req, res) => {
        
        var userDetails = {
            email: req.body.email,
            password: req.body.pass1,
            username: req.body.username,
            name: req.body.fullname,
            usertype: "user",
            status: "new",
            description: "user by frontend.",
            verified: false,
            dateadded: Date()
        };
        console.log(userDetails);
        try {
            var getByUsername = await User.find({
                username: req.body.username
            });
            var getByEmail = await User.find({
                email: req.body.email
            });
            var errors = "";
            if (getByUsername.length !== 0) {
                errors += " username exists. ";
            }
            if (getByEmail.length !== 0) {
                errors += " email exists. ";
            }
            if (req.body.pass1 !== req.body.pass2) {
                errors += " your passwords do not match. ";
            }
            if (errors === "") {
                userDetails.password = await bcrypt.hash(req.body.pass1, 10).then(function (hash) {
                    return hash;
                });
                var user = new User(userDetails);

                user.save((err, result) => {
                    if (err) {
                        res.status(500);
                    } else {
                        res.status(200).redirect('/Auth/Signin');
                    }
                });
                console.log(encryptedpass);
            } else {
                let nav = chunks.getnav(req);
                res.status(200).render('register', {
                    appname: config.appdata.appname,
                    title: 'Register | ' + config.appdata.appname,
                    applogo: config.appdata.logo,
                    nav,
                    errors
                });
            }

        } catch (e) {
            console.log(e);
        }
    });
    return myRouter;
}

module.exports = router;