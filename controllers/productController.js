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
        isLogged: req.session.isLogged
    });

}

r.get('/detail/:id',loadProductById,renderProductDetail);


function loadSanPham(req, res, next) {

    productRepo.loadById(req.body.idSanPham)
        .then(function (pRow) {
            req.product = pRow;
            next();
        })

}


var nodemailer =  require('nodemailer');
var transporter =  nodemailer.createTransport({ // config mail server
    service: 'Gmail',
    auth: {
        user: 'openmindhcmus@gmail.com',
        pass: 'openmind12345',
    }
});

var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
    from: 'Rose Studio',
    to: '',
    subject: 'Mail from Rose Studio',
    text: 'You recieved message from Rose Studio',
    html: ''
}

function setMailHTML(html) {
    mainOptions.html = html;
}

function setMailReceiver(sendTo) {
    mainOptions.to = sendTo;
}

function sendMail() {
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' +  info.response);
        }
    });
}

r.post('/buyNow',restrict,loadSanPham,function (req, res) {

    var sanPham = req.product;
    var gia = sanPham.giaMuaNgay;
    var nguoiMua = req.session.user;
    var ketThuc = new Date(sanPham.thoiDiemKetThuc);

    var entity = {
        giaHienTai:gia,
        idNguoiGiaCaoNhat: nguoiMua.idNguoiDung,
        idSanPham: sanPham.idSanPham
    };


    var lichSu = {
        idSanPham :sanPham.idSanPham,
        idNguoiDung: nguoiMua.idNguoiDung,
        thoiDiemRaGia: new Date(),
        giaDau: gia
    };

    var tinhTrang = {
        idSanPham: sanPham.idSanPham,
        tinhTrang: 1
    };


    if( (nguoiMua.diemDanhGiaCong/(nguoiMua.diemDanhGiaCong+nguoiMua.diemDanhGiaTru)) < 0.8) {
        res.send("diemDanhGiaError");
    } else {
        if (ketThuc < new Date() || sanPham.tinhTrang === 1)
            res.send("timeError"); else {

            productRepo.updateDauGia(entity);

            productRepo.updateTinhTrang(tinhTrang);
            // them vao lich su ra gia
            productRepo.themLichSuRaGia(lichSu);

            // them vào danh sách đấu giá
            productRepo.themDanhSachDauGia(lichSu);

            // goi mail thong bao
            var content = '<p>Bạn vừa mua sản phẩm với: ' +
                '</b><ul><li>Tên sản phẩm:' + sanPham.tenSanPham + '</li><li>Giá tiền:' + gia;
            setMailReceiver(nguoiMua.email);
            setMailHTML(content);
            sendMail();

            res.send("done");

        }
    }
})

r.post('/bid',restrict,loadSanPham,function (req, res) {

    var sanPham = req.product;
    var gia = req.body.giaDauGia;
    var nguoiMua = req.session.user;
    var ketThuc = new Date(sanPham.thoiDiemKetThuc);

    var entity = {
        giaHienTai:gia,
        idNguoiGiaCaoNhat: nguoiMua.idNguoiDung,
        idSanPham: sanPham.idSanPham
    };


    var lichSu = {
        idSanPham :sanPham.idSanPham,
        idNguoiDung: nguoiMua.idNguoiDung,
        thoiDiemRaGia: new Date(),
        giaDau: gia
    };

    console.log(ketThuc);

    if(false) {
        res.send("diemDanhGiaError");
    } else {
        if(ketThuc < new Date() || sanPham.tinhTrang === 1)
            res.send("timeError"); else {
                if(gia<=sanPham.giaHienTai)
                    res.send("giaError"); else {

                    // update gia moi, nguoi ra gia cao nhat, so lan bid
                    if(sanPham.tuDongGiaHan===0) {
                        productRepo.updateDauGia(entity);
                    }
                    else {
                        // tự động tăng thời gian kết thúc lên 10 p, nếu còn < 5p
                        var time = ketThuc - new Date();
                        var min = Math.floor(time / 60000);

                        productRepo.updateDauGia(entity);

                        if(min<10)
                        {
                            productRepo.updateThoiDiemKetThuc(entity);
                        }
                    }


                    // them vao lich su ra gia
                    productRepo.themLichSuRaGia(lichSu);

                    // them vào danh sách đấu giá
                    productRepo.themDanhSachDauGia(lichSu);

                    // goi mail thong bao
                    var content = '<p>Bạn vừa đấu giá sản phẩm với: ' +
                        '</b><ul><li>Tên sản phẩm:' + sanPham.tenSanPham + '</li><li>Giá tiền:' + gia;
                    setMailReceiver(nguoiMua.email);
                    setMailHTML(content);
                    sendMail();

                    res.send("done");
                }
        }
    }
})


module.exports = r;