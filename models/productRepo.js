var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');


exports.loadAll = function() {

    var sql = 'select * from sanpham where tinhTrang=0';

    return db.load(sql);
}

exports.loadSanPhamNhieuLuotXem = function () {

    var sql = 'select * from sanpham where tinhTrang=0 order by sanpham.luotXem DESC limit 5'
    return db.load(sql);
}

exports.loadSanPhamGiamGia = function () {

    var sql = 'select * from sanpham where tinhTrang=0 order by (sanpham.giaSanPham - sanpham.giaHienTai) DESC limit 5'

    return db.load(sql);

}

exports.loadSanPhamBanChay = function () {
    var sql = 'select * from sanpham order by sanpham.daBan DESC limit 5';
    return db.load(sql);

}
exports.loadSanPhamLienQuan = function (entity) {

    var d = q.defer();

    var sql = mustache.render(
        'select * from sanpham where idSanPham!={{idSanPham}} and tinhTrang=0 and loai={{loai}} limit 5',
        entity
    );

    return db.load(sql);

}
exports.updateLuotXem = function(id) {
  
    var obj={
        idSanPham : id
    }
    var sql = mustache.render(
        'update sanpham set luotXem = luotXem + 1 where idSanPham = {{idSanPham}}',
        obj
    );

    return db.update(sql);
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

exports.loadAllByCat1 = function (id) {

    var d = q.defer();

    var obj = {
        loai: id
    };

        var sql = mustache.render(
            'select * from sanpham where loai = {{loai}} and tinhTrang=0',
            obj
        );
    
  
    return db.load(sql);

}

exports.loadAllByCat = function (id, priFrm, priTo) {

    var d = q.defer();

    var obj = {
        loai: id,
        gia1: priFrm,
        gia2: priTo
    };
    if (obj.loai != 0) {
        var sql = mustache.render(
            'select * from sanpham where loai = {{loai}} and tinhTrang=0 and giahientai between {{gia1}} and {{gia2}}',
            obj
        );
    }
    else
    {
        var sql = mustache.render(
            'select * from sanpham where tinhTrang=0 and giahientai between {{gia1}} and {{gia2}}',
            obj
        );
    }

    return db.load(sql);

}
exports.loadAllWithUserName = function() {

    var sql = 'select * from sanpham where tinhTrang=0';

    return db.load(sql);
}

exports.insert = function(entity) {
    var sql = mustache.render(
        'insert into sanpham(tenSanPham,giaSanPham,giaHienTai,daBan,moTa,tinhTrang,luotXem,loai,khoHang) values("{{tenSanPham}}","{{giaSanPham}}","{{giaHienTai}}","{{daBan}}","{{moTa}}","{{tinhTrang}}","{{luotXem}}","{{loai}}","{{khoHang}}")',
        entity
    );         


    return db.insert(sql);
}
exports.loadIdSanPhamCaoNhat = function () {

    var sql = 'select sanpham.idSanPham from sanpham where sanpham.idSanPham in (select max(idSanPham) from sanpham)';
    return db.load(sql);
}

exports.updateTinhTrang = function (entity) {


    var sql = mustache.render(
        'update sanpham set tinhTrang = "{{tinhTrang}}" where idSanPham = {{idSanPham}}',
        entity
    );

    return db.update(sql);

}

exports.loadDanhSachHoaDon = function (month) {
    var obj = {
        thang: month
    }
    if(month!=0) {
        var sql = mustache.render(
            sql = 'select soHoaDon, date_format(NgayLap,\'%d-%m-%Y %h:%i:%s\') as NgayLap, tenKhachHang, tongTien   from hoadon \n' +
                'where NgayLap between "2018-{{thang}}-00" and "2018-{{thang}}-31"',
            obj
        );
    }
    else {
        var sql = 'select soHoaDon, date_format(NgayLap,\'%d-%m-%Y %h:%i:%s\') as NgayLap, tenKhachHang, tongTien  from hoadon \n';
    }
    console.log(sql);

    return db.load(sql);
}

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