var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');


exports.loadAll = function() {
    var sql = 'select * from nguoidung where viTri=0';
    return db.load(sql);
}
exports.loadBlock = function() {
    var sql = 'select * from nguoidung where viTri=-1';
    return db.load(sql);
}
exports.checkAccount = function (entity) {

    var d = q.defer();


    var sql = mustache.render(
        'select * from nguoidung where email = "{{email}}" and password = "{{password}}" and viTri=0',
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


exports.insert = function (entity) {

    var sql = mustache.render(
        'insert into nguoidung(email,password,hoTen,diaChi) values("{{email}}","{{password}}","{{hoTen}}","{{diaChi}}")',
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

exports.updateTinhTrang = function (entity) {
    var sql = mustache.render(
        'update nguoidung set viTri = "{{viTri}}" where idNguoiDung = {{idNguoiDung}}',
        entity
    );

    return db.update(sql);

}
exports.updatePassword = function (entity) {
    var sql = mustache.render(
        'update nguoidung set password = "{{password}}" where idNguoiDung = {{idNguoiDung}}',
        entity
    );

    return db.update(sql);

}
exports.updateInfo = function (entity) {

    var sql = mustache.render(
        'update nguoidung set hoTen = "{{hoTen}}", diaChi = "{{diaChi}}" where idNguoiDung = "{{idNguoiDung}}"',
        entity
    );

    return db.update(sql);

}
exports.loadByEmail = function(entity) {
    var d = q.defer();
    var sql = mustache.render(
        'select * from nguoidung where email = "{{email}}"',
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