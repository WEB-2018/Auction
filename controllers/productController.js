var express = require('express'),
    productRepo = require('../models/productRepo'),
    restrict = require('../middle-wares/restrict'),
    accountRepo = require('../models/accountRepo'),
    categoryRepo = require('../models/categoryRepo');

var r = express.Router();


function loadCat(req,res,next) {

    var catId = req.params.id;

    if (!catId) {
        res.redirect('/');
    }

    categoryRepo.loadById(catId)
        .then(function (cRows) {
            req.category = cRows;
            return next();
        })

}



function loadProductById(req,res,next) {

    var proId = req.params.id;
    console.log(1);
    productRepo.updateLuotXem(proId);
    productRepo.loadById(proId)
        .then(function (pRows) {
            req.product = pRows;
            console.log(pRows.tenSanPham);
            return next();
        })

}



function renderProductDetail(req, res) {
    res.render('product/productdetail', {
        title : "Product Detail",
        product : req.product,
        session: req.session,
        sanPhamLienQuan : req.sanPhamLienQuan,
        isLogged: req.session.isLogged
    });

}
function loadSanPhamLienQuan(req,res,next) {
    var obj = {
        loai: req.product.loai,
        idSanPham: req.params.id
    };

    productRepo.loadSanPhamLienQuan(obj)
        .then(function (pRows) {
            req.sanPhamLienQuan = pRows;
            return next();
        })
}

r.get('/detail/:id',loadProductById,loadSanPhamLienQuan,renderProductDetail);


function loadSanPham(req, res, next) {

    productRepo.loadById(req.body.idSanPham)
        .then(function (pRow) {
            req.product = pRow;
            next();
        })

}


function andSearch(keyword, pRows) {
    var products = [];
    var pureKeyword = replaceAll(keyword, '"', '');
    for(i=0;i<pRows.length;i++){
        var name = pRows[i].tenSanPham;
        if(name.indexOf(pureKeyword) != -1){
            console.log("and search: " + pureKeyword + " " + pRows[i].tenSanPham);
            products.push(pRows[i]);
        }
    }

    return products;
}

function orSearch(keyword, pRows) {
    var products = [];
    var word = [];
    word = keyword.split(' ');
    for(i=0;i<pRows.length;i++){
        var name = pRows[i].tenSanPham;
        for(j=0;j<word.length;j++){
            if(name.indexOf(word[j]) != -1){
                console.log("or search: " + word[j] + " - " + pRows[i].tenSanPham);
                products.push(pRows[i]);
                break;
            }
        }
    }

    return products;
}

r.all('/search', function (req, res) {
    var keyword = req.query.keyword;
    var count = req.query.count;
    var isNewPage = req.query.newPage;
    var sortType = req.query.sortType;
    var category = req.query.category;
    console.log("sort type: " + sortType);
    console.log("category: " + category);
    AND_SEARCH = 0;
    OR_SEARCH = 1;
    var searchFunction = [
        andSearch,
        orSearch
    ];

    console.log("count: " + count);
    var num = 4;
    console.log("keyword: " + keyword);
    if(isNewPage=='1'){
        console.log("new page");
        res.render('product/search', {
            layoutVM: res.locals.layoutVM,
            title: "Search product",
            keyword: keyword,
            session: req.session,
            isLogged: req.session.isLogged
        });
    }
    else{
        //mặc định là search cả cụm từ
        var searchType = AND_SEARCH;
        //không có "" trong keyword -> search từng từ trong cụm từ
        if(keyword.indexOf('"') == -1) {
            searchType = OR_SEARCH;
        }

        if(category == 0){//catid = 0, tìm trong tất cả loại
            if(sortType=='1') {
                productRepo.loadAllByTimeWithUserName()
                    .then(function (pRows) {
                        var products = [];
                        var returnProduct = [];
                        products = searchFunction[searchType](keyword, pRows);
                        // console.log("total: " + products.length);
                        //moi lan request tra ve num sp
                        for(i = count - num; (i < products.length && i < count); i++){
                            console.log("Return: " + products[i].tenSanPham);
                            returnProduct.push(products[i]);
                        }

                        res.json(returnProduct);
                    })
            } else if(sortType=='2') {
                productRepo.loadAllByPriceWithUserName()
                    .then(function (pRows) {
                        var products = [];
                        var returnProduct = [];
                        products = searchFunction[searchType](keyword, pRows);
                        // console.log("Total: " + products.length);
                        //moi lan request tra ve num sp
                        for(i = count - num; (i < products.length && i < count); i++){
                            console.log("Return: " + products[i].tenSanPham);
                            returnProduct.push(products[i]);
                        }

                        res.json(returnProduct);
                    })
            } else {
                productRepo.loadAllWithUserName()
                    .then(function (pRows) {
                        var products = [];
                        var returnProduct = [];
                        products = searchFunction[searchType](keyword, pRows);
                        // console.log("Total: " + products.length);
                        //moi lan request tra ve num sp
                        for(i = count - num; (i < products.length && i < count); i++){
                            console.log("Return: " + products[i].tenSanPham);
                            returnProduct.push(products[i]);
                        }

                        res.json(returnProduct);
                    })
            }
        }//catid = 0, tìm trong tất cả loại
        else {//catid != 0, tìm trong loại category
            if(sortType=='1') {
                productRepo.loadAllByCat(category)
                    .then(function (pRows) {
                        pRows.sort(postTimeCompare);
                        // console.log(pRows);
                        var products = [];
                        var returnProduct = [];
                        products = searchFunction[searchType](keyword, pRows);
                        // console.log("total: " + products.length);
                        //moi lan request tra ve num sp
                        for(i = count - num; (i < products.length && i < count); i++){
                            console.log("Return: " + products[i].tenSanPham);
                            returnProduct.push(products[i]);
                        }

                        res.json(returnProduct);
                    })
            } else if(sortType=='2') {
                productRepo.loadAllByCat(category)
                    .then(function (pRows) {
                        pRows.sort(priceCompare);
                        // console.log(pRows);
                        var products = [];
                        var returnProduct = [];
                        products = searchFunction[searchType](keyword, pRows);
                        // console.log("total" + products.length);
                        //moi lan request tra ve num sp
                        for(i = count - num; (i < products.length && i < count); i++){
                            console.log("Return: " + products[i].tenSanPham);
                            returnProduct.push(products[i]);
                        }

                        res.json(returnProduct);
                    })
            } else {
                productRepo.loadAllByCat(category)
                    .then(function (pRows) {
                        // console.log(pRows);
                        var products = [];
                        var returnProduct = [];
                        products = searchFunction[searchType](keyword, pRows);
                        // console.log("total" + products.length);
                        //moi lan request tra ve num sp
                        for(i = count - num; (i < products.length && i < count); i++){
                            console.log("Return: " + products[i].tenSanPham);
                            returnProduct.push(products[i]);
                        }

                        res.json(returnProduct);
                    })
            }
        }//catid = 0, tìm trong loại category
    }
})


module.exports = r;