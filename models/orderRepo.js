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

exports.deleteCart = function(id) {

    var obj = {
        idNguoiDung: id
    };

    var sql = mustache.render(
        'delete from giohang where idNguoiDung = {{idNguoiDung}}',
        obj
    );
    console.log(sql);
    return db.delete(sql);
}

exports.insertOrder = function (idNguoiDung, hoTen, diaChi, soDienThoai, tongTien) {
    var obj = {
        idNguoiDung: idNguoiDung,
        hoTen: hoTen,
        diaChi: diaChi,
        soDienThoai: soDienThoai,
        tongTien: tongTien
    }
    var sql = mustache.render(
        sql = 'insert into hoadon(idNguoiDung,tenKhachHang,diaChi,soDienThoai,tongTien,NgayLap)\n' +
            'values("{{idNguoiDung}}","{{hoTen}}","{{diaChi}}","{{soDienThoai}}","{{tongTien}}",NOW())',
        obj
    );
    console.log(sql);
    return db.insert(sql);
}

exports.getIDOrder = function () {
    var sql = 'SELECT soHoaDon as ID from hoadon';
    console.log(sql);

    return db.load(sql);
}

exports.insertOrderDetail = function (soHoaDon, idSanPham, tenSanPham, soLuong, donGia, thanhTien) {
    var obj = {
        soHoaDon: soHoaDon,
        idSanPham: idSanPham,
        tenSanPham: tenSanPham,
        soLuong: soLuong,
        donGia: donGia,
        thanhTien: thanhTien
    }
    var sql = mustache.render(
        sql = 'insert into chitiethoadon(soHoaDon,idSanPham,tenSanPham,soLuong,donGia,thanhTien)\n' +
            'values("{{soHoaDon}}","{{idSanPham}}","{{tenSanPham}}","{{soLuong}}","{{donGia}}","{{thanhTien}}")',
        obj
    );
    console.log(sql);
    return db.insert(sql);
}

exports.loadOrdered = function (idNguoiDung) {
    var obj = {
        idNguoiDung: idNguoiDung
    }
    var sql = mustache.render(
        sql = 'select soHoaDon, date_format(NgayLap,\'%d-%m-%Y %h:%i:%s\') as NgayLap, tenKhachHang, tongTien   from hoadon \n' +
            'where idNguoiDung = {{idNguoiDung}}',
        obj
    );


    console.log(sql);

    return db.load(sql);
}
