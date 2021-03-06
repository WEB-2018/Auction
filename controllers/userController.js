var express = require('express'),
    productRepo = require('../models/productRepo'),
    categoryRepo = require('../models/categoryRepo'),
    accountRepo = require('../models/accountRepo'),
    orderRepo = require('../models/orderRepo'),
    cartRepo = require('../models/cartRepo'),
    restrict = require('../middle-wares/restrict');
    crypto = require('crypto');
    multer = require('multer');
    fs = require('fs');
var r = express.Router();

function loadUserById(req,res,next){
    var idNguoiDung= req.session.user.idNguoiDung;
    accountRepo.loadByUserId(idNguoiDung)
    .then(function (pRows) {
        req.user = pRows;
        return next();
    })
}
function renderUserProfile(req, res) {
        var x = req.session.err;
        delete req.session.err;
        res.render('account/infor', {
            title: "Profile",
            layout: 'user.hbs',
            session: req.session,
            user: req.user,
            isLogged: req.session.isLogged,
            showError: true,
            errorMsg: x
        });
    
}
r.get('/',loadUserById,renderUserProfile )
r.post('/', function (req, res) {
    //var id = req.body.id;
    var id = req.session.user.idNguoiDung;
    var newName = req.body.newName;
    var newAddr = req.body.newAddr;
    console.log("Cap nhat user id = ", id, " ten = ", newName, newAddr);
    var user = {idNguoiDung: id, hoTen: newName, diaChi: newAddr};
    //console.log(user);
    accountRepo.updateInfo(user);
    res.redirect('/user')

})
r.post('/cart/del', function (req, res) {
    var idSanPham = req.body.idSanPham;
    cartRepo.delete(idSanPham);
    res.send('success');

})
r.post('/cart/update', function (req, res) {
    var data={
        idNguoiDung: req.session.user.idNguoiDung,
        idSanPham: req.body.idSanPham,
        soLuong: req.body.soLuong
    }
    cartRepo.updateSLg(data);
    res.send('success');

})
r.post('/pswchange', function (req, res) {
    //var id = req.body.id;
    var id = req.session.user.idNguoiDung;
    var password = req.session.user.password;

    var oldPWD = crypto.createHash('md5').update(req.body.oldPWD).digest('hex');
    var newPWD = crypto.createHash('md5').update(req.body.newPWD).digest('hex');
    var user = {
        password : newPWD,
        idNguoiDung : req.session.user.idNguoiDung,
    }

    if(oldPWD==password){
        req.session.err = 'Your password has been changed!'
        accountRepo.updatePassword(user);
       
    }
    else
    {
        req.session.err = 'You must enter current password correctly!'
        console.log("You must enter your current password correctly!");
    }
    res.redirect('/user')

})

function loadCart(req, res, next) {
    var id = req.session.user.idNguoiDung;
    orderRepo.loadCart(id)
        .then(function (pRow) {
            req.cart = pRow;
            var tong = 0;
            for(i=0;i<req.cart.length;i++)
            {
                tong = tong + req.cart[i].tong;
            };
            console.log(tong);
            req.tongCong = tong;
            next();
        })

}

function renderCart(req, res) {
    res.render('user/cart', {
        title : "Cart",
        session: req.session,
        layout: 'user.hbs',
        cart: req.cart,
        user: req.user,
        tongCong: req.tongCong,
        isLogged: req.session.isLogged
    });

}

r.get('/cart',loadUserById,loadCart,renderCart);

function loadInforCheckout(req, res, next) {
    var id = req.session.user.idNguoiDung;
    orderRepo.loadCheckout(id)
        .then(function (pRow) {
            req.infor = pRow;
            console.log(req.infor.diaChi);
            next();
        })
}

function loadCartCheckout(req, res, next) {
    var id = req.session.user.idNguoiDung;
    orderRepo.loadCart(id)
        .then(function (pRow) {
            req.cart = pRow;
            var tong = 0;
            var tongSoLuong = 0;
            for(i=0;i<req.cart.length;i++)
            {
                tong = tong + req.cart[i].tong;
            };
            for(i=0;i<req.cart.length;i++)
            {
                tongSoLuong = tongSoLuong + req.cart[i].soLuong;
            };
            console.log(tong);
            req.tongCong = tong;
            req.tongSoLuong = tongSoLuong;
            next();
        })

}


function renderCheckout(req, res) {
    res.render('user/checkout', {
        title : "Checkout",
        session: req.session,
        layout: 'blank.hbs',
        user: req.user,
        infor: req.infor,
        cart: req.cart,
        tongCong: req.tongCong,
        isLogged: req.session.isLogged
    });

}

r.get('/checkout',loadUserById,loadInforCheckout,loadCartCheckout,renderCheckout);

r.post('/finishPayment', function (req, res) {
    var idNguoiDung = req.session.user.idNguoiDung;
    var hoTen= req.body.hoTen;
    var diaChi = req.body.diaChi;
    var soDienThoai = req.body.sdt;
    var tongTien = req.body.tongTien;
    var idHoaDon;
    if(soDienThoai == '' || diaChi == '' || hoTen == '') {
        res.send("input");
    }
    else {
        orderRepo.insertOrder(idNguoiDung, hoTen, diaChi, soDienThoai, tongTien);
        orderRepo.getIDOrder()
            .then(function (pRow) {
                idHoaDon = pRow[pRow.length - 1].ID + 1;
                orderRepo.loadCart(idNguoiDung)
                    .then(function (pRow1) {
                        console.log(pRow1);
                        for (i = 0; i < pRow1.length; i++) {
                            orderRepo.updateTonKho(pRow1[i].soLuong,pRow1[i].idSanPham)
                            orderRepo.insertOrderDetail(idHoaDon, pRow1[i].idSanPham, pRow1[i].tenSanPham, pRow1[i].soLuong, pRow1[i].giaHienTai, pRow1[i].tong);
                        }
                        orderRepo.deleteCart(idNguoiDung);
                    })
            })
        res.send("success");
    }




})

function loadOrdered(req, res, next) {
    var id = req.session.user.idNguoiDung;
    orderRepo.loadOrdered(id)
        .then(function (pRow) {
            console.log(pRow);
            req.orders = pRow;
            next();
        })
}

function renderOrdered(req, res) {
    res.render('user/ordered', {
        title : "Your Orders",
        session: req.session,
        layout: 'user.hbs',
        user: req.user,
        orders: req.orders,
        isLogged: req.session.isLogged
    });

}

r.get('/orders',loadUserById,loadOrdered,renderOrdered);

function loadFinishPayment(req, res, next) {
    var id = req.session.user.idNguoiDung;
    orderRepo.getIDOrder()
        .then(function (pRow) {
            idHoaDon = pRow[pRow.length - 1].ID ;
            req.idHoaDon = idHoaDon;
            orderRepo.getEmailByID(id)
                .then(function (pRow1) {
                    req.email = pRow1[0].email;
                    console.log(req.email);
                    next();
                })

        })
}

function loadFinishPayment1(req, res, next) {
    var id = req.session.user.idNguoiDung;
    orderRepo.getIDOrder()
        .then(function (pRow) {
            idHoaDon = pRow[pRow.length - 1].ID ;
            orderRepo.getDateDeliver(idHoaDon)
                .then(function (pRow1) {
                    req.dayMax = pRow1[0].dayMax;
                    req.dayMin = pRow1[0].dayMin;
                    next();
                })

        })
}



function renderFinishPayment(req, res) {
    res.render('user/finishPayment', {
        title : "Finish Your Order",
        session: req.session,
        layout: 'blank.hbs',
        user: req.user,
        email: req.email,
        dayMax: req.dayMax,
        dayMin: req.dayMin,
        idHoaDon: req.idHoaDon,
        isLogged: req.session.isLogged
    });

}
r.get('/finishPayment',loadFinishPayment,loadFinishPayment1,renderFinishPayment);

function loadOrderedDetails(req, res, next) {
    var soHoaDon = req.params.id;
    req.soHoaDon = soHoaDon;
    orderRepo.loadOrderedDetails(soHoaDon)
        .then(function (pRow) {
            req.orderedDetails = pRow;
            next();
        })
}

function renderOrderedDetails(req, res) {
    res.render('user/orderedDetails', {
        title : "Ordered Details",
        session: req.session,
        layout: 'user.hbs',
        orderedDetails: req.orderedDetails,
        soHoaDon: req.soHoaDon,
        user: req.user,
        isLogged: req.session.isLogged
    });

}
r.get('/orders/details/:id',loadUserById,loadOrderedDetails,renderOrderedDetails);
module.exports = r;