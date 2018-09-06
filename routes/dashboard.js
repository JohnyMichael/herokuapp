const express = require('express');
const myRouter = express.Router();
const usermiddleware = require('../middlewares/users');
let chunks = require('../chunks/navbar');
let config = require('../config');
let userfunctions = require('../chunks/users');
let sidebars = require('../chunks/sidebars');
let helpers = require('../chunks/helpers');


config.connectToMongo();

function router() {
    let User = require('../models/user');
    myRouter.route('/').get(usermiddleware.isloggedin, async (req, res) => {
        let nav = chunks.getnav(req);
        let user = await userfunctions.getUser(req);
        let sidebar = sidebars.normal();
        let adminbar = await sidebars.admin(req);
        let Superbar = await sidebars.superadmin(req);
        res.render('dashboard', {
            appname: config.appdata.appname,
            title: 'Dashboard | ' + config.appdata.appname,
            applogo: config.appdata.logo,
            user,
            nav,
            sidebar,
            adminbar,
            Superbar
        });
    });
    myRouter.route('/Account-Settings').get(usermiddleware.isloggedin, async (req, res) => {
        let nav = chunks.getnav(req);
        let user = await userfunctions.getUser(req);
        let sidebar = sidebars.normal();
        let adminbar = await sidebars.admin(req);
        let Superbar = await sidebars.superadmin(req);
        res.render('accountsettings', {
            appname: config.appdata.appname,
            title: 'Dashboard | ' + config.appdata.appname,
            applogo: config.appdata.logo,
            user,
            nav,
            sidebar,
            adminbar,
            Superbar,
            errors: false
        });
    }).post(usermiddleware.isloggedin, async (req, res) => {
        let errors = [];

        let oldaccount = await userfunctions.getUser(req);
        let newInfo = {
            username: req.body.username,
            email: req.body.email,
            name: req.body.name,
            verified: oldaccount.verified
        };


        if (oldaccount.username === req.body.username) {
            delete newInfo.username;
        } else {
            let checkDB = await userfunctions.checkUsername(newInfo.username);
            if (checkDB === true) {
                delete newInfo.username;
                errors.push({
                    message: "This username is taken. Please choose another one."
                });
                console.log("this username is taken");
            }
        }


        if (oldaccount.name === req.body.name) {
            delete newInfo.name;
        }

        if (oldaccount.email === req.body.email) {
            delete newInfo.email;
        } else {
            let checkDB = await userfunctions.checkEmail(newInfo.email);
            if (checkDB === true) {
                delete newInfo.email;
                errors.push({
                    message: "This email is registered. Please use forgot password if you are a valid user of this email account."
                });
                console.log("This email is registered.");
            } else {
                newInfo.verified = false;
            }
            
        }
        if (helpers.isEmpty(errors) === false) {
            let nav = chunks.getnav(req);
            let user = await userfunctions.getUser(req);
            let sidebar = sidebars.normal();
            let adminbar = await sidebars.admin(req);
            let Superbar = await sidebars.superadmin(req);
            res.render('accountsettings', {
                appname: config.appdata.appname,
                title: 'Dashboard | ' + config.appdata.appname,
                applogo: config.appdata.logo,
                user,
                nav,
                sidebar,
                adminbar,
                Superbar,
                errors
            });
        } else {
            if (helpers.isEmpty(newInfo) === false) {
                User.updateOne({
                    _id: oldaccount._id
                }, newInfo, {}, () => {
                    console.log("We have updated your data.");
                });
                res.redirect('/Dashboard/Account-Settings');
                console.log(newInfo);
            } else {
                res.redirect('/Dashboard');
            }
        }
        errors = [];
    });
    myRouter.route('/Change-Password').get(usermiddleware.isloggedin, async (req, res) => {
        let nav = chunks.getnav(req);
        let user = await userfunctions.getUser(req);
        let sidebar = sidebars.normal();
        let adminbar = await sidebars.admin(req);
        let Superbar = await sidebars.superadmin(req);
        res.render('changePassword', {
            appname: config.appdata.appname,
            title: 'Dashboard | ' + config.appdata.appname,
            applogo: config.appdata.logo,
            user,
            nav,
            sidebar,
            adminbar,
            Superbar
        });
    }).post(async (req, res)=>{
        res.send(req.body);
    });
    myRouter.route('/TestAdmin').get(usermiddleware.isloggedin, usermiddleware.isAdmin, (req, res) => {
        let nav = chunks.getnav(req);
        res.send("This user is an Admin");
    });
    myRouter.route('/TestSuper').get(usermiddleware.isloggedin, usermiddleware.isSuperAdmin, (req, res) => {
        let nav = chunks.getnav(req);
        res.send("This user is an Super");
    });
    return myRouter;
}

module.exports = router;