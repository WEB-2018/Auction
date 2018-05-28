var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');

exports.loadAll = function() {
    var sql = 'select * from loai';
    return db.load(sql);
}

exports.loadById = function (id) {

    var d = q.defer();

    var obj = {
        idLoaiSanPham: id
    };

    var sql = mustache.render(
        'select * from loai where  idLoaiSanPham = {{idLoaiSanPham}}',
        obj
    );

    db.load(sql).then(function(rows) {
        d.resolve(rows[0]);
    });

    return d.promise;

}

exports.deleteById = function(id) {

    var obj = {
        idLoai: id
    };

    var sql = mustache.render(
        'delete from loai where idLoaiSanPham = {{idLoai}}',
        obj
    );

    return db.delete(sql);
}

exports.update = function (entity) {

    var sql = mustache.render(
        'update loai set tenLoaiSanPham = "{{tenLoaiSanPham}}" where idLoaiSanPham = "{{idLoaiSanPham}}"',
        entity
    );

    return db.update(sql);

}

exports.insert = function (entity) {

    var sql = mustache.render(
        'insert into loai(tenLoaiSanPham) values("{{tenLoaiSanPham}}")',
        entity
    );

    return db.insert(sql);
}

exports.loadCatOfProduct = function (id) {

    var d = q.defer();

    var obj = {
        idSanPham: id
    };

    var sql = mustache.render(
        'select * from loai where idLoaiSanPham = {{idLoaiSanPham}}',
        obj
    );

    db.load(sql).then(function(rows) {
        d.resolve(rows[0]);
    });

    return d.promise;

}