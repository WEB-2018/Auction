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
        title: "Admin",
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
        title: "Admin",
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
        title: "Admin",
        layout: 'admin.hbs',
        session: req.session,
        categories: req.categories,
        isLogged: req.session.isLogged
    });
}

r.get('/categories',loadAllCate,renderCategoryList);

r.post('/category/add', function (req, res) {
    var name = req.body.name;
    console.log("Add cate", name);
    var loai = {tenLoaiSanPham: name};
    categoryRepo.insert(loai);
    res.send("success");
})

r.post('/category/delete', function (req, res) {
    var id = req.body.id;
    console.log("delete cate where id = ", id);
    categoryRepo.deleteById(id);
    res.send("success");
})

r.post('/category/update', function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    console.log("Cap nhat loai id = ", id, " ten = ", name);
    var loai = {idLoaiSanPham: id, tenLoaiSanPham: name};
    categoryRepo.update(loai);
    res.send("success");
})


module.exports = r;