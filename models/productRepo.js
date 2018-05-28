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