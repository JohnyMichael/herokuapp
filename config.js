const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
let onlineLinkMongo = "mongodb://ashbeel:thatsmypack3211@ds245532.mlab.com:45532/node_app";
let offlinelinkMongo = 'mongodb://localhost:27017/node_app';

let MongoLink = onlineLinkMongo;

let connectToMongo = () => {
    mongoose.Promise = Promise;
    mongoose.connect(MongoLink, {
        useNewUrlParser: true
    });
}


let getAuth = () => {
    let authentication = {
        secret: "5D9b8Os99)}{}()",
        admin: {
            pass: "8D9B0",
            email: "ash.ghouri8@outlook.com",
            username: "ashbeel",
            usertype: "Admin.Super",
            name: "Administrator Account"
        }
    };
    return authentication;
};

let appdata = () => {
    let app = {
        appname: "node app",
        logo: '/logo.jpg',
        cookie: {
            expiry: 172800000
        },
        port: process.env.port || 3000
    };
    return app;
};

let staticSettings = (app) => {
    app.use('/', express.static(path.join(__dirname, './static/css')));
    app.use('/', express.static(path.join(__dirname, './static/js')));
    app.use('/', express.static(path.join(__dirname, './static/images')));
    app.use('/', express.static(path.join(__dirname, './node_modules/@fortawesome/fontawesome-free/css'))); //all.min.css
    app.use('/', express.static(path.join(__dirname, './node_modules/@fortawesome/fontawesome-free')));
    app.use('/', express.static(path.join(__dirname, './node_modules/bootstrap/dist/css')));
    app.use('/', express.static(path.join(__dirname, './node_modules/bootstrap/dist/js')));
    app.use('/', express.static(path.join(__dirname, './node_modules/jquery/dist')));
    app.use('/', express.static(path.join(__dirname, './node_modules/popper.js/dist')));
    app.use('/images', express.static(path.join(__dirname, './static/images')));
};


let appSetup = (app) => {
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.set('views', './templates');
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({
        extended: true
    }));
};

module.exports = {
    auth: getAuth(),
    appdata: appdata(),
    staticSettings,
    appSetup,
    connectToMongo
};