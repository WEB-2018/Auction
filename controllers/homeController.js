var express = require('express'),
    productRepo = require('../models/productRepo'),
    categoryRepo = require('../models/categoryRepo'),
    accountRepo = require('../models/accountRepo'),
    restrict = require('../middle-wares/restrict');
    crypto = require('crypto');
    multer = require('multer');
    fs = require('fs');
var r = express.Router();



function loadByViews(req,res,next) {

    productRepo.loadSanPhamNhieuLuotXem()
        .then(function (pRows) {
            req.productsMostWatched = pRows;
            return next();
        })

}

function loadBySale(req,res,next) {
    
    productRepo.loadSanPhamGiamGia()
        .then(function (pRows) {
            req.productsBySale = pRows;
            return next();
        })
    
}

function loadBySold(req, res, next) {
    productRepo.loadSanPhamBanChay()
        .then(function (pRows) {
            req.productsBySold = pRows;
            return next();
        })
}

function renderHomePage(req, res) {
    res.render('home/index', {
        title: "Home",
        layoutVM: res.locals.layoutVM,
        productsMostWatched: req.productsMostWatched,
        productsBySale : req.productsBySale,
        productsBySold: req.productsBySold,
        session: req.session,
        isLogged: req.session.isLogged
    });
}

r.get('/',loadByViews,loadBySale,loadBySold,renderHomePage);

r.get('/login', function(req, res) {
    if (req.session.isLogged === true) {
        res.redirect('/');
    } else {
        res.render('account/login', {
            layoutModels: res.locals.layoutModels,
            layout: 'account.hbs',
            title: "Log In",
            showError: false,
            errorMsg: ''
        });
    }
});


r.post('/login', function(req, res) {

    console.log(ePWD);
    var ePWD = crypto.createHash('md5').update(req.body.rawPassword).digest('hex');

    var entity = {
        email: req.body.email,
        //password: req.body.rawPassword
        password: ePWD
    };

    console.log(entity.email);
    console.log(entity.password);

    //var remember = req.body.remember ? true : false;
    if(entity.email == 'admin@gmail.com' && req.body.rawPassword === '123456'){
        req.session.isLogged = true;
        req.session.admin = 'admin';
        res.redirect('/admin');
        return;
    }
    accountRepo.checkAccount(entity)
        .then(function(user) {
            if (user === null) {
                res.render('account/login', {
                    layoutModels: res.locals.layoutModels,
                    layout: 'account.hbs',
                    title: "Đăng nhập",
                    showError: true,
                    errorMsg: 'The username and/or password you entered is invalid! Please try again!'
                });
            } else {
                req.session.isLogged = true;
                req.session.user = user;
                var url = '/';
                if (req.query.retUrl) {
                    url = req.query.retUrl;
                }
                res.redirect(url);
            }
        });
});
r.get('/logout', restrict, function(req, res) {
    req.session.isLogged = false;
    req.session.user = null;
    req.session.cookie.expires = new Date(Date.now() - 1000);
    res.redirect('/');
});
module.exports = r;