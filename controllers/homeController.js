var express = require('express'),
    productRepo = require('../models/productRepo'),
    categoryRepo = require('../models/categoryRepo'),
    restrict = require('../middle-wares/restrict');
var r = express.Router();
function calEslapseTime(product) {
    var now = new Date();
    var end = product.thoiDiemKetThuc;
    product.thoiGianConLai = end - now;
}

function formatRows(pRows) {
    for(i=0;i<pRows.length;i++){
        calEslapseTime(pRows[i]);
    }
}


function loadByBid(req,res,next) {

    productRepo.loadSanPhamNhieuLuotBid()
        .then(function (pRows) {
            req.productsByBid = pRows;
            return next();
        })

}

function loadByPrice(req,res,next) {
    
    productRepo.loadSanPhamGiaCaoNhat()
        .then(function (pRows) {
            req.productsByPrice = pRows;
            return next();
        })
    
}

function loadByTime(req, res, next) {
    productRepo.loadSanPhamGanKetThuc()
        .then(function (pRows) {
            req.productsByTime = pRows;
            return next();
        })
}

function renderHomePage(req, res) {
    res.render('home/index', {
        title: "Home",
        layoutVM: res.locals.layoutVM,
        productsByBid: req.productsByBid,
        productsByPrice : req.productsByPrice,
        productsByTime: req.productsByTime,
        session: req.session,
        isLogged: req.session.isLogged
    });
}

r.get('/',loadByBid,loadByPrice,loadByTime,renderHomePage);


module.exports = r;