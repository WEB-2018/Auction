var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');


exports.loadByProductId = function (id) {

   var d = q.defer();

    var obj = {
        idSanPham: id
    };

    var sql = mustache.render(
        'select * from binhluan where idSanPham = {{idSanPham}} order by thoiDiem DESC',
        obj
    );
   
    
  
    return db.load(sql);

}



exports.insert = function (entity) {

    var sql = mustache.render(
        'insert into binhluan(idSanPham,binhLuan,tenNguoiBinhLuan,thoiDiem) values("{{idSanPham}}","{{binhLuan}}","{{tenNguoiBinhLuan}}","{{thoiDiem}}")',
        entity
    );

    return db.insert(sql);
}