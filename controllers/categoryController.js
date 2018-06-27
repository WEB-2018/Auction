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

   var page = req.query.page;
    if (!page) {
        page = 1;
    }
    var PRODUCTS_PER_PAGE = 4;
    var offset = (page - 1) * PRODUCTS_PER_PAGE;

    var p1 = productRepo.loadAllByCatOffset(catId,PRODUCTS_PER_PAGE, offset);
    var p2 = productRepo.countProdByCat(catId);
    Promise.all([p1, p2]).then(([pRows, countRows]) => {


        var total = countRows[0].total;
        var nPages = total / PRODUCTS_PER_PAGE;
        if (total % PRODUCTS_PER_PAGE > 0) {
            nPages++;
        }

        var numbers = [];
        for (i = 1; i <= nPages; i++) {
            numbers.push({
                value: i,
                isCurPage: i === +page
            });
        }

    
        res.render('product/list',{
            products: pRows,
            noProducts: pRows.length === 0,
            page_numbers: numbers,
            title : "Product",
            layout: 'main.hbs'
        });
    });


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