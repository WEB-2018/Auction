var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');

exports.loadCart = function (id) {
    var obj = {
        idKhachHang: id
    }
    var sql = mustache.render(
        sql = 'SELECT A.idSanPham as idSanPham, (A.SoLuongSP*1) as soLuong, B.tenSanPham as tenSanPham, B.giaHienTai as giaHienTai, (A.SoLuongSP * B.giaHienTai) as tong \n' +
            'FROM giohang A\n' +
            'INNER JOIN sanpham B ON A.idSanPham = B.idSanpham\n' +
            'and idNguoiDung = {{idKhachHang}}',
        obj
    );
    console.log(sql);

    return db.load(sql);
}

exports.insertCart = function (idNguoiDung, idSanPham, soLuong) {
    var obj = {
        idNguoiDung: idNguoiDung,
        idSanPham: idSanPham,
        soLuong: soLuong
    }
    var sql = mustache.render(
        sql = 'insert into giohang(idNguoiDung,idSanPham,SoLuongSP) values("{{idNguoiDung}}","{{idSanPham}}","{{soLuong}}")' +
            'ON DUPLICATE KEY UPDATE SoLuongSP = SoLuongSP + {{soLuong}}',
        obj
    );
    console.log(sql);
    return db.insert(sql);
}

exports.loadCheckout = function (id) {
    var d = q.defer();

    var obj = {
        idKhachHang: id
    }
    var sql = mustache.render(
        sql = 'SELECT * \n' +
            'FROM nguoidung\n' +
            'where idNguoiDung = {{idKhachHang}}',
        obj
    );
    console.log(sql);

    db.load(sql).then(function(rows) {
        d.resolve(rows[0]);
    });

    return d.promise;
}

exports.delete = function(id){
    var obj = {
        idSanpham: id
    };

    var sql = mustache.render(
        'delete from giohang where idSanPham = {{idSanpham}}',
        obj
    );

    return db.delete(sql);
}
exports.updateSLg = function(entity) {
  
    var sql = mustache.render(
        'update giohang set SoLuongSP = {{soLuong}} where idSanPham = {{idSanPham}} and idNguoiDung={{idNguoiDung}}',
        entity
    );

    return db.update(sql);
}
