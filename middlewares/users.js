const user_helper = require('../chunks/users');


let shouldnotLoggedin = async (req, res, next) => {
    let user = await user_helper.getUser(req);
    if (user !== false) {
        res.redirect('/Dashboard');
    } else {
        next();
    }
};


let isloggedin = async (req, res, next) => {
    let user = await user_helper.getUser(req);
    if (user !== false) {
        next();
    } else {
        res.redirect('/Logout');
    }
};


let tester = () => {
    console.log("Testing the function");
};


let isAdmin = async (req, res, next) => {
    let user = await user_helper.getUser(req);
    let usertype = user.usertype;
    let typearr = usertype.split(".");
    if (typearr[0] === 'Admin') {
        next();
    } else {
        res.redirect('/Dashboard');
    }
};


let isSuperAdmin = async (req, res, next) => {
    let user = await user_helper.getUser(req);
    let usertype = user.usertype;
    let typearr = usertype.split(".");
    if (typearr[1] === 'Super') {
        next();
    } else {
        res.redirect('/Dashboard');
    }
};

module.exports = {
    isloggedin,
    tester,
    isAdmin,
    isSuperAdmin,
    shouldnotLoggedin
};