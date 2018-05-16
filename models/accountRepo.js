var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');


exports.loadAll = function() {
    var sql = 'select * from nguoidung where coQuyenBan<>-1';
    return db.load(sql);
}

exports.loadAllRateById = function(id) {
    var obj = {idNguoiDuocDanhGia: id};
    var sql = 'select nd.hoTen, nd2.hoTen, sp.tenSanPham,ct.nhanXet,ct.congHayTru,ct.thoiDiemDanhGia from chitietdanhgia ct,nguoidung nd, nguoidung nd2,sanpham sp'
    + ' where ct.idSanPham=sp.idSanPham'
    + ' and ct.idNguoiDuocDanhGia=nd.idNguoiDung'
    + ' and ct.idNguoiDanhGia=nd2.idNguoiDung'
    + ' and ct.idNguoiDuocDanhGia='+id;
    return db.load(sql)
}

exports.loadAllSaleRequesting = function() {
    var sql = 'select * from nguoidungxinban';
    return db.load(sql);
}
exports.loadByUsername = function (entity) {

    var d = q.defer();


    var sql = mustache.render(
        'select * from nguoidung where email = "{{email}}" and password = "{{password}}"',
        entity
    );

    db.load(sql).then(function(rows) {
        if (rows.length > 0) {
            var user = {
                idNguoiDung: rows[0].idNguoiDung,
                password: rows[0].password,
                hoTen: rows[0].hoTen,
                diaChi: rows[0].diaChi,
                email: rows[0].email,
                diemDanhGiaCong: rows[0].diemDanhGiaCong,
                diemDanhGiaTru: rows[0].diemDanhGiaTru,
                viTri: rows[0].viTri,
                coQuyenBan: rows[0].coQuyenBan
            }
            d.resolve(user);
        } else {
            d.resolve(null);
        }
    });

    return d.promise;

}

exports.loadByUserId = function (entity) {

    var d = q.defer();

    var obj = {
        id: entity
    };

    var sql = mustache.render(
        'select * from nguoidung where idNguoiDung = "{{id}}"',
        obj
    );

    db.load(sql).then(function(rows) {
        d.resolve(rows[0]);
    });

    return d.promise;

}

exports.updateDiemCong = function (nguoidung) {

    var obj = {
        idNguoiDung: nguoidung
    };

    var sql = mustache.render(
        'update nguoidung set diemDanhGiaCong = diemDanhGiaCong + 1 where idNguoiDung = "{{idNguoiDung}}"',
        obj
    );

    return db.update(sql);

}

exports.updateDiemTru = function (nguoidung) {

    var obj = {
        idNguoiDung: nguoidung
    };

    var sql = mustache.render(
        'update nguoidung set diemDanhGiaTru = diemDanhGiaTru + 1 where idNguoiDung = "{{idNguoiDung}}"',
        obj
    );

    return db.update(sql);

}

exports.updateQuyenBan = function (entity) {



    var sql = mustache.render(
        'update nguoidung set coQuyenBan = "{{coQuyenBan}}"  where idNguoiDung = "{{idNguoiDung}}"',
        entity
    );

    return db.update(sql);

}

exports.insert = function (entity) {

    var sql = mustache.render(
        'insert into nguoidung(email,password,hoTen,diaChi,diemDanhGiaCong,diemDanhGiaTru) values("{{email}}","{{password}}","{{hoTen}}","{{diaChi}}","{{diemDanhGiaCong}}","{{diemDanhGiaTru}}")',
        entity
    );

    return db.insert(sql);
}

exports.update = function (entity) {

    var sql = mustache.render(
        'update nguoidung set password = "{{password}}",hoTen = "{{hoTen}}",diaChi = "{{diaChi}}", coQuyenBan = "{{coQuyenBan}}" where email = "{{email}}"',
        entity
    );

    return db.update(sql);

}

exports.deleteById = function(id) {

    var obj = {
        idNguoiDung: id
    };

    var sql = mustache.render(
        'delete from nguoidung where idNguoiDung = {{idNguoiDung}}',
        obj
    );

    return db.delete(sql);
}



