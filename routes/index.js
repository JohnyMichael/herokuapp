const express = require('express');
const myRouter = express.Router();
let chunks = require('../chunks/navbar');
let config = require('../config');
let userfunctions = require('../chunks/users');



function router(app) {
  app.get('/Logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect("/");
});
app.get('/', (req, res) => {
    console.log(req.originalUrl);
    let nav = chunks.getnav(req);
    res.render("index", {
        appname: config.appdata.appname,
        title: 'Home ' + config.appdata.appname,
        applogo: config.appdata.logo,
        nav
    });
});
}

module.exports = router;