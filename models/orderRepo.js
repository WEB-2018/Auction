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
        sql = 'insert into hoadon(idNguoiDung,tenKhachHang,diaChi,soDienThoai,tongTien,NgayLap,tinhTrang)\n' +
            'values("{{idNguoiDung}}","{{hoTen}}","{{diaChi}}","{{soDienThoai}}","{{tongTien}}",NOW(),0)',
        obj
    );
    console.log(sql);
    return db.insert(sql);
}

exports.updateTonKho = function (soLuong, idSanPham) {
    var obj = {
        soLuong: soLuong,
        idSanPham: idSanPham
    }
    var sql = mustache.render(
        'update store.sanpham set daBan = daBan + "{{soLuong}}" where idSanPham = "{{idSanPham}}"',
        obj
    );
    console.log(sql);
    return db.update(sql);

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
        sql = 'select soHoaDon, date_format(NgayLap,\'%d-%m-%Y %h:%i:%s\') as NgayLap, tenKhachHang, tongTien,  ' +
            'case \n' +
            '    when tinhTrang = 0 then "Processing"\n' +
            '    when tinhTrang = 1 then "Delivered"\n' +
            '    when tinhTrang = 2 then "Cancelled"\n' +
            '    end as tinhTrang ' +
            ' from hoadon \n' +
            'where idNguoiDung = {{idNguoiDung}}',
        obj
    );
    console.log(sql);
    return db.load(sql);
}

exports.getEmailByID = function (idNguoiDung) {
    var obj = {
        idNguoiDung: idNguoiDung
    }
    var sql = mustache.render(
        sql = 'SELECT email from nguoidung\n' +
            'where idNguoiDung = {{idNguoiDung}}',
        obj
    );
    console.log(sql);

    return db.load(sql);
}

exports.getDateDeliver = function (soHoaDon) {
    var obj = {
        soHoaDon: soHoaDon
    }
    var sql = mustache.render(
        sql = 'SELECT date_format(DATE_ADD(NgayLap, INTERVAL 2 DAY),\'%a %d %M\') as dayMin,date_format(DATE_ADD(NgayLap, INTERVAL 4 DAY),\'%a %d %M\') as dayMax from hoadon\n' +
            'where soHoaDon = {{soHoaDon}}',
        obj
    );
    console.log(sql);

    return db.load(sql);
}
exports.loadOrderedByStatus = function (tinhTrang) {
    var obj = {
        tinhTrang: tinhTrang
    }
    var sql = mustache.render(
        sql = 'select soHoaDon, date_format(NgayLap,\'%d-%m-%Y %h:%i:%s\') as NgayLap, tenKhachHang, tongTien,  ' +
            'case \n' +
            '    when tinhTrang = 0 then "Processing"\n' +
            '    when tinhTrang = 1 then "Delivered"\n' +
            '    when tinhTrang = 2 then "Cancelled"\n' +
            '    end as tinhTrang ' +
            ' from hoadon \n' +
            'where tinhTrang = {{tinhTrang}}',
        obj
    );
    console.log(sql);
    return db.load(sql);
}

exports.updateTinhTrangDonHang = function (entity) {
    var sql = mustache.render(
        'update hoaDon set tinhTrang = "{{tinhTrang}}" where soHoaDon = {{soHoaDon}}',
        entity
    );

    return db.update(sql);

}

exports.getIdSanPhamFromChitiethoadon = function (soHoaDon) {
    var obj = {
        soHoaDon: soHoaDon
    }
    var sql = mustache.render(
        'select idSanPham, soLuong from chitiethoadon \n' +
        'where soHoaDon = {{soHoaDon}}',
        obj
    );
    console.log(sql);
    return db.load(sql);

}

exports.updateTonKhoCancel = function (soLuong, idSanPham) {
    var obj = {
        soLuong: soLuong,
        idSanPham: idSanPham
    }
    var sql = mustache.render(
        'update store.sanpham set  daBan = daBan - "{{soLuong}}" where idSanPham = "{{idSanPham}}"',
        obj
    );
    console.log(sql);
    return db.update(sql);

}

exports.loadOrderedDetails = function (soHoaDon) {
    var obj = {
        soHoaDon: soHoaDon
    }
    var sql = mustache.render(
        sql = 'select * from chitiethoadon where soHoadon = "{{soHoaDon}}"',
        obj
    );
    console.log(sql);
    return db.load(sql);
}


exports.loadDoanhThuTheoNgay= function () {

    var sql = mustache.render(
        sql = 'select count(soHoaDon) as soHoaDon, sum(tongTien) as tongTien, (date(NgayLap)) as tuanLap,date_format(NgayLap,\'%d-%m-%Y\') as NgayLap  \n' +
            ' from hoadon \n' +
            'where tinhTrang = 1\n' +
            'group by tuanLap\n' +
            'order by tuanLap'
    );
    console.log(sql);
    return db.load(sql);
}


exports.loadDoanhThuTheoTuan= function () {

    var sql = mustache.render(
        sql = 'select count(soHoaDon) as soHoaDon, sum(tongTien) as tongTien, (week(NgayLap) + 1) as tuanLap \n' +
            ' from hoadon \n' +
            'where tinhTrang = 1\n' +
            'group by tuanLap\n' +
            'order by tuanLap'
    );
    console.log(sql);
    return db.load(sql);
}


exports.loadDoanhThuTheoThang = function (tinhTrang) {
    var obj = {
        tinhTrang: tinhTrang,
    }
    var sql = mustache.render(
        sql = 'select count(soHoaDon) as soHoaDon, sum(tongTien) as tongTien, DATE_FORMAT((NgayLap), "%M") as ThangLap, month(NgayLap) as sort \n' +
            ' from hoadon \n' +
            'where tinhTrang = {{tinhTrang}}\n' +
            'group by ThangLap\n' +
            'order by sort',
        obj
    );
    console.log(sql);
    return db.load(sql);
}

exports.loadDoanhThuTheoQuy= function () {

    var sql = mustache.render(
        sql = 'select count(soHoaDon) as soHoaDon, sum(tongTien) as tongTien, (QUARTER(NgayLap)) as quyLap \n' +
            ' from hoadon \n' +
            'where tinhTrang = 1\n' +
            'group by quyLap\n' +
            'order by quyLap'
    );
    console.log(sql);
    return db.load(sql);
}

