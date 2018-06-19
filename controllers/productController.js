var express = require('express'),
    productRepo = require('../models/productRepo'),
    restrict = require('../middle-wares/restrict'),
    accountRepo = require('../models/accountRepo'),
    categoryRepo = require('../models/categoryRepo'),
    commentRepo = require('../models/commentRepo');

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
    productRepo.loadById(proId)
        .then(function (pRows) {
            req.product = pRows;
            console.log(pRows.tenSanPham);
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
function loadComment(req,res,next){

    var idSanPham = req.params.id;
    commentRepo.loadByProductId(idSanPham)
        .then(function(pRows){
            req.comment = pRows;
            console.log(pRows);
            return next();
        })

}
function renderProductDetail(req, res) {
    res.render('product/productdetail', {
        title : "Product Detail",
        product : req.product,
        layout: 'main.hbs',
        session: req.session,
        sanPhamLienQuan : req.sanPhamLienQuan,
        comment : req.comment,
        isLogged: req.session.isLogged
    });

}
r.get('/detail/:id',loadProductById,loadSanPhamLienQuan,loadComment,renderProductDetail);


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
    var priFrm = req.query.priFrm;
    var priTo = req.query.priTo;
  
    AND_SEARCH = 0;
    OR_SEARCH = 1;
    var searchFunction = [
        andSearch,
        orSearch
    ];
    var num = 4;
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
            if(sortType=='1') {
                productRepo.loadAllByCat(category, priFrm, priTo)
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
                productRepo.loadAllByCat(category, priFrm, priTo)
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
                productRepo.loadAllByCat(category, priFrm, priTo)
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

})
r.post('/comment', function (req, res) {
    var name = req.body.usercmt;
    if(name==null)
    {
        name = req.session.user.hoTen;
    }
    var idSanPham = req.body.prodID;
    var user = req.body.idNguoiDung;
    var comment = req.body.comment;

    var dt = new Date();
    var month = dt.getMonth() +1;
    var time = dt.getFullYear() + ":" + month +  ":" + dt.getDate() + ":" + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

    var data = {idSanPham: idSanPham, tenNguoiBinhLuan: name, binhLuan: comment, thoiDiem:time};
    console.log(data);
    commentRepo.insert(data).then(function () {
        res.send("success");
        return;
    })
})

r.post('/addCart', function (req, res) {

    if(req.session.isLogged != true){
        res.send("fail");
    }
    else{
        var idNguoiDung = req.session.user.idNguoiDung;
        var idSanPham = req.body.idSanPham;
        var soLuong = req.body.soLuong;
        productRepo.insertCart(idNguoiDung,idSanPham,soLuong);
        res.send("success");
    }

})

module.exports = r;