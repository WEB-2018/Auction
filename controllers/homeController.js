var express = require('express'),
    productRepo = require('../models/productRepo'),
    categoryRepo = require('../models/categoryRepo'),
    restrict = require('../middle-wares/restrict');
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


module.exports = r;