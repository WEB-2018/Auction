var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');


exports.loadAll = function() {

    var sql = 'select * from sanpham where thoiDiemKetThuc > NOW() and tinhTrang=0';

    return db.load(sql);
}

exports.loadAllByTime = function () {


   var sql = 'select * from sanpham left join nguoidung on (nguoidung.idNguoiDung = sanpham.idNguoiGiaCaoNhat) where thoiDiemKetThuc > NOW() and tinhTrang=0 order by thoiDiemKetThuc ASC';
    return db.load(sql);

}

exports.loadAllByPrice = function () {

   var sql = 'select * from sanpham left join nguoidung on (nguoidung.idNguoiDung = sanpham.idNguoiGiaCaoNhat) where thoiDiemKetThuc > NOW() and tinhTrang=0 order by giaHienTai ASC';

    return db.load(sql);

}

exports.loadAllWithUserName = function() {

    var sql = 'select * from sanpham left join nguoidung on (nguoidung.idNguoiDung = sanpham.idNguoiGiaCaoNhat) where thoiDiemKetThuc > NOW() and tinhTrang=0';

    return db.load(sql);
}

exports.loadAllByTimeWithUserName = function () {


    var sql = 'select * from sanpham left join nguoidung on (nguoidung.idNguoiDung = sanpham.idNguoiGiaCaoNhat) where thoiDiemKetThuc > NOW() and tinhTrang=0 order by thoiDiemKetThuc ASC';
    return db.load(sql);

}

exports.loadAllByPriceWithUserName = function () {

    var sql = 'select * from sanpham left join nguoidung on (nguoidung.idNguoiDung = sanpham.idNguoiGiaCaoNhat) where thoiDiemKetThuc > NOW() and tinhTrang=0 order by giaHienTai';

    return db.load(sql);

}


exports.loadSanPhamNhieuLuotBid = function () {

    var sql = 'select * from sanpham left join nguoidung on (nguoidung.idNguoiDung = sanpham.idNguoiGiaCaoNhat) where (sanpham.thoiDiemKetThuc > NOW() and tinhTrang=0) order by sanpham.luotBid DESC limit 5'
    return db.load(sql);
}

exports.loadSanPhamGiaCaoNhat = function () {

    var sql = 'select * from sanpham left join nguoidung on (nguoidung.idNguoiDung = sanpham.idNguoiGiaCaoNhat) where (sanpham.thoiDiemKetThuc > NOW() and tinhTrang=0) order by sanpham.giaHienTai DESC limit 5'

    return db.load(sql);

}

exports.loadSanPhamGanKetThuc = function () {
    var sql = 'select * from sanpham left join nguoidung on (nguoidung.idNguoiDung = sanpham.idNguoiGiaCaoNhat) where (sanpham.thoiDiemKetThuc > NOW() and tinhTrang=0) order by sanpham.thoiDiemKetThuc ASC limit 5';
    return db.load(sql);

}


exports.loadById = function(id) {
    var d = q.defer();

    var obj = {
        idSanPham: id
    };

    var sql = mustache.render(
        'select * from sanpham where idSanPham = "{{idSanPham}}"',
        obj
    );

    db.load(sql).then(function(rows) {
        d.resolve(rows[0]);
    });

    return d.promise;
}


exports.loadAllByCat = function (id) {

    var d = q.defer();

    var obj = {
        loai: id
    };

    var sql = mustache.render(
        'select * from sanpham where loai = {{loai}} and thoiDiemKetThuc > NOW() and tinhTrang=0',
        obj
    );

    return db.load(sql);

}

