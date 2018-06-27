var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');


exports.loadAll = function() {
    var sql = 'select * from nguoidungxinban';
    return db.load(sql);
}

exports.loadByUserId = function (entity) {

    var d = q.defer();

    var obj = {
        id: entity
    };

    var sql = mustache.render(
        'select * from nguoidungxinban where idNguoiDung = "{{id}}"',
        obj
    );

    db.load(sql).then(function(rows) {
        d.resolve(rows[0]);
    });

    return d.promise;

}

exports.insert = function (entity) {

    var sql = mustache.render(
        'insert into nguoidungxinban(idNguoiDung, thoiDiemXinBan) values("{{idNguoiDung}}",NOW())',
        entity
    );

    return db.insert(sql);
}

exports.delete = function(id) {

    var obj = {
        idNguoiDung: id,
    };

    var sql = mustache.render(
        'delete from nguoidungxinban where idNguoiDung = {{idNguoiDung}}',
        obj
    );

    return db.delete(sql);
}


