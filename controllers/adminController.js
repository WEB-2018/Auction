var express = require('express'),
    accountRepo = require('../models/accountRepo'),
    productRepo = require('../models/productRepo'),
    categoryRepo = require('../models/categoryRepo'),
    salerRepo = require('../models/salerRepo'),
    restrict = require('../middle-wares/restrict'),
    crypto = require('crypto');
var r = express.Router();

function renderAdminPage(req, res) {
    res.render('admin/dashboard', {
        title: "Admin",
        layout: 'admin.hbs',
        session: req.session,
        isLogged: req.session.isLogged
    });
}

r.get('/',renderAdminPage);

function loadAllUsers(req,res,next) {
    accountRepo.loadAll()
        .then(function (pRows) {
            req.users = pRows;
            console.log("pRows");
            return next();
        })

}

function renderUserList(req, res) {
    res.render('admin/user', {
        title: "Users",
        layout: 'admin.hbs',
        session: req.session,
        users: req.users,
        isLogged: req.session.isLogged
    });
}

r.get('/users',loadAllUsers,renderUserList);

function loadAllProducts(req,res,next) {
    productRepo.loadAll()
        .then(function (pRows) {
            req.products = pRows;
            console.log("pRows");
            return next();
        })

}
function renderProductList(req, res) {
    res.render('admin/product', {
        title: "Products",
        layout: 'admin.hbs',
        session: req.session,
        products: req.products,
        isLogged: req.session.isLogged
    });
}

r.get('/products',loadAllProducts,renderProductList);


function loadAllCate(req,res,next) {
    categoryRepo.loadAll()
        .then(function (pRows) {
            req.categories = pRows;
            console.log("pRows");
            return next();
        })

}
function renderCategoryList(req, res) {
    res.render('admin/category', {
        title: "Products",
        layout: 'admin.hbs',
        session: req.session,
        categories: req.categories,
        isLogged: req.session.isLogged
    });
}

r.get('/categories',loadAllCate,renderCategoryList);

module.exports = r;