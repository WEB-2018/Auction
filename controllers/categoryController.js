var express = require('express'),
    productRepo = require('../models/productRepo'),
    categoryRepo = require('../models/categoryRepo'),
    restrict = require('../middle-wares/restrict');
var r = express.Router();

function loadAllCate(req,res,next){
    categoryRepo.loadAll()
    .then(function (pRows) {
            req.category = pRows;
            return next();
        })
}
function renderCatePage(req, res) {
    res.render('category/index', {
        title: "Category",
        layoutVM: res.locals.layoutVM,
        category: req.category,
        session: req.session,
        isLogged: req.session.isLogged
    });
}

r.get('/',loadAllCate,renderCatePage);

function loadProductByCat(req,res,next) {

    var catId = req.params.id;

    productRepo.loadAllByCat(catId)
        .then(function (pRows) {
            req.products = pRows;
            return next();
        })

}
function renderByCat(req, res) {
    res.render('product/productList', {
        title: "Product by Category",
        layoutVM: res.locals.layoutVM,
        category: req.category,
        products : req.products,
        session: req.session,
        isLogged: req.session.isLogged
    });
}

r.get('/:id',loadProductByCat,renderByCat);

module.exports = r;