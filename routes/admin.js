const express = require('express');
const myRouter = express.Router();
const usermiddleware = require('../middlewares/users');
let chunks = require('../chunks/navbar');
let config = require('../config');
let userfunctions = require('../chunks/users');
let sidebars = require('../chunks/sidebars');
let shopHelper = require('../chunks/shophelper');
config.connectToMongo();

function router() {
    let Category = require('../models/categories');
    let SubCategory = require('../models/subcategories');
    let Product = require('../models/products');
    myRouter.route('/').get(usermiddleware.isloggedin, usermiddleware.isAdmin, (req, res) => {
        res.redirect('/Admin/Shop');
    });
    myRouter.route('/Shop').get(usermiddleware.isloggedin, usermiddleware.isAdmin, async (req, res) => {
        let nav = chunks.getnav(req);
        let user = await userfunctions.getUser(req);
        let sidebar = sidebars.normal();
        let adminbar = await sidebars.admin(req);
        let Superbar = await sidebars.superadmin(req);
        let categories = await shopHelper.allCats();
        let subCategories = await shopHelper.allSubCats();
        let products = await shopHelper.allProducts();
        res.render('ShopMain', {
            appname: config.appdata.appname,
            title: 'Dashboard | ' + config.appdata.appname,
            applogo: config.appdata.logo,
            user,
            nav,
            sidebar,
            adminbar,
            Superbar,
            categories,
            subCategories,
            products
        });
        //res.send("Welcome to shop configurations.");
    });

    myRouter.route('/Shop/Categories/Delete').post(usermiddleware.isloggedin, usermiddleware.isAdmin, async (req, res) => {
        Category.deleteOne({
            _id: req.body.categoryid
        }, (err) => {
            if (err) {
                res.send("Internal Error");
            } else {
                res.redirect('/Admin/Shop/Categories');
            }
        });
    });

    myRouter.route('/Shop/Categories').get(usermiddleware.isloggedin, usermiddleware.isAdmin, async (req, res) => {
        let nav = chunks.getnav(req);
        let user = await userfunctions.getUser(req);
        let sidebar = sidebars.normal();
        let adminbar = await sidebars.admin(req);
        let Superbar = await sidebars.superadmin(req);
        let categories = await shopHelper.allCats();
        
        res.render('categories_admin_template', {
            appname: config.appdata.appname,
            title: 'Manage Categories | ' + config.appdata.appname,
            applogo: config.appdata.logo,
            user,
            nav,
            sidebar,
            adminbar,
            Superbar,
            categories
        });
    }).post(usermiddleware.isloggedin, usermiddleware.isAdmin, async (req, res) => {


        let newCategory = {
            name: req.body.name,
            slug: req.body.slug,
            details: req.body.description
        };
        let existence = await shopHelper.categorySlug(newCategory.slug);
        if (existence === false) {
            let category = new Category(newCategory);
            var result = await category.save((err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.redirect('/Admin/Shop/Categories');
                }
            });
            console.log(result);
        } else {
            res.send("slug of this category exists. please change the slug.");
        }

    });
    myRouter.route('/Shop/SubCategories').get(usermiddleware.isloggedin, usermiddleware.isAdmin, async (req, res) => {
        let nav = chunks.getnav(req);
        let user = await userfunctions.getUser(req);
        let sidebar = sidebars.normal();
        let adminbar = await sidebars.admin(req);
        let Superbar = await sidebars.superadmin(req);
        let categories = await shopHelper.allCats();
        let subCategories = await shopHelper.allSubCats();
        res.render('subcategories_admin_template', {
            appname: config.appdata.appname,
            title: 'Manage Sub Categories | ' + config.appdata.appname,
            applogo: config.appdata.logo,
            user,
            nav,
            sidebar,
            adminbar,
            Superbar,
            categories,
            subCategories
        });
    }).post(usermiddleware.isloggedin, usermiddleware.isAdmin, async (req, res) => {
        let newSubCategory = {
            name: req.body.name,
            slug: req.body.slug,
            details: req.body.description,
            categoryid: req.body.catid
        };
        let existence = await shopHelper.subcategorySlug(req.body.slug);
        if (existence === false) {
            let subcategory = new SubCategory(newSubCategory);
            var result = await subcategory.save((err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.redirect('/Admin/Shop/SubCategories');
                }
            });
        } else {
            res.send("Sub Category Slug Exists. Please Change you slug.");
        }
    });
    myRouter.route('/Shop/Products').get(usermiddleware.isloggedin, usermiddleware.isAdmin, async (req, res) => {
        let nav = chunks.getnav(req);
        let user = await userfunctions.getUser(req);
        let sidebar = sidebars.normal();
        let adminbar = await sidebars.admin(req);
        let Superbar = await sidebars.superadmin(req);
        let categories = await shopHelper.allCats();
        let subCategories = await shopHelper.allSubCats();
        let products = await shopHelper.allProducts();
        res.render('products_admin_template', {
            appname: config.appdata.appname,
            title: 'Manage Products | ' + config.appdata.appname,
            applogo: config.appdata.logo,
            user,
            nav,
            sidebar,
            adminbar,
            Superbar,
            categories,
            subCategories,
            products
        });
    }).post(usermiddleware.isloggedin, usermiddleware.isAdmin, async (req, res) => {
        let existence = await shopHelper.productSlug(req.body.slug);
        if (existence === false) {
            let newProduct = {
                name: req.body.name,
                subcatid: req.body.subcatid,
                details: req.body.description,
                price: req.body.price,
                slug: req.body.slug,
                datetime: Date(),
                status: false
            };
            let product = new Product(newProduct);
            var result = await product.save((err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.redirect('/Admin/Shop/Products');
                }
            });
        } else {
            res.send("Product Slug Exists. Please Change you slug.");
        }
    });
    return myRouter;
}

module.exports = router;