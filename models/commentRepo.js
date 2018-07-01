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

exports.countCommentByProduct= function(ProdID){
    var sql = `select count(*) as total from binhluan where idSanPham = ${ProdID}`;
    return db.load(sql);
}
exports.loadAllByProductOffset = function(ProdID,limit,offset) {

     var sql = `select * from binhluan where idSanPham = ${ProdID} limit ${limit} offset ${offset}`;

    return db.load(sql);

}