var express = require('express'),
    accountRepo = require('../models/accountRepo'),
    productRepo = require('../models/productRepo'),
    categoryRepo = require('../models/categoryRepo'),
    restrict = require('../middle-wares/restrict'),
    crypto = require('crypto');
    fileUpload = require('express-fileupload');
    multer = require('multer');
    fs = require('fs');
var r = express.Router();

function renderAdminPage(req, res) {
    if(req.session.admin != 'admin'){
        res.redirect('/login');
        console.log("login");
        return;
    }
    else
    {
        res.render('admin/dashboard', {
        title: "Admin",
        layout: 'admin.hbs',
        session: req.session,
        isLogged: req.session.isLogged
        });
    }
   
}

r.get('/',renderAdminPage);

function loadAllUsers(req,res,next) {
    accountRepo.loadAll()
        .then(function (pRows) {
            req.users = pRows;
            console.log("pRows");
            return next();
        })

}
function loadBlockUsers(req,res,next) {
    accountRepo.loadBlock()
        .then(function (pRows) {
            req.block = pRows;
            console.log("pRows");
            return next();
        })

}

function renderUserList(req, res) {
    if(req.session.admin != 'admin'){
        res.redirect('/login');
        console.log("login");
        return;
    }
    else
    {
        res.render('admin/user', {
            title: "Admin",
            layout: 'admin.hbs',
            session: req.session,
            users: req.users,
            block: req.block,
            isLogged: req.session.isLogged
        });
    }
}

r.get('/users',loadAllUsers,loadBlockUsers,renderUserList);

function loadAllProducts(req,res,next) {
    productRepo.loadAll()
        .then(function (pRows) {
            req.products = pRows;
            console.log("pRows");
            return next();
        })

}
function loadAllCate(req,res,next) {
    categoryRepo.loadAll()
        .then(function (pRows) {
            req.categories = pRows;
            console.log("pRows");
            return next();
        })

}

function renderProductList(req, res) {
     if(req.session.admin != 'admin'){
        res.redirect('/login');
        return;
    }
    else
    {
        res.render('admin/product', {
        title: "Admin",
        layout: 'admin.hbs',
        session: req.session,
        products: req.products,
        categories: req.categories,
        isLogged: req.session.isLogged
        });
    }
}

r.get('/products',loadAllProducts,loadAllCate,renderProductList);

function CheckProductInfor(entity)
{
    if(
        entity.tenSanPham !== "" 
        &&
        entity.moTa !== ""
        &&
        entity.giaSanPham !== ""
        &&
        entity.loai !== ""
        &&
        entity.khoHang !== ""
        &&
        entity.thoiDiemKetThuc !== ""
      )
    {
         console.log("success");
        return 1;
    }
    else
    {
        console.log("fail");
        return 0;
    }
}

r.use(fileUpload());

r.post('/products',function(req, res) {
   
    //tạo đối tượng
    var entity ={
        tenSanPham: req.body.tenSanPham,
        giaSanPham: req.body.giaSanPham,
        giaHienTai: req.body.giaSanPham,
        daBan: 0,
        moTa: req.body.moTa,
        tinhTrang: 0,
        luotXem: 0,
        loai: req.body.loai,
        khoHang: req.body.khoHang
    };
    
    
    if(CheckProductInfor(entity) === 1 && req.files.file1 && req.files.file2 && req.files.file3)   //nếu thông tin hợp lệ
    {
        productRepo.insert(entity)
        .then(function(){
   
            //tạo thư mục với id tương ứng
            productRepo.loadIdSanPhamCaoNhat()
                .then(function (pRows) {
               

                var idSanPhamCaoNhat = pRows[0].idSanPham;

                var idSanPhamMoi = parseInt(idSanPhamCaoNhat);

                var dir = "./public/imgs/sp/" + idSanPhamMoi;
                
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }

                //lưu ảnh vào thư mục tương ứng
                var file1 = req.files.file1,
                    filename1 = "1.jpg";
                var file2 = req.files.file2,
                    filename2 = "2.jpg";
                var file3 = req.files.file3,
                    filename3 = "3.jpg"; 

                file1.mv(dir + "/" + filename1, function(err){})
                file2.mv(dir + "/" + filename2, function(err){})
                file3.mv(dir + "/" + filename3, function(err){})
                
            })

        })
        res.redirect('/admin/products');
        
    }
    else    //nếu thông tin không hợp lệ
    {
       res.redirect('/admin/products')
    }
});

r.post('/product/delete', function (req, res) {
    var id = req.body.id;
    console.log("Xoa product id = ", id);
    //khong xoa sp, chi doi tinh trang -> -1
    var product = {idSanPham: id, tinhTrang: -1};
    productRepo.updateTinhTrang(product).then(function () {
        res.send("success");
        return;
    })
})

r.post('/user/delete', function (req, res) {
    var id = req.body.id;
    console.log("Xoa user id = ", id);
    //khong xoa user, chi doi viTri -> -1
    var user = {idNguoiDung: id, viTri: -1};
    accountRepo.updateTinhTrang(user).then(function () {
        res.send("success");
        return;
    })
})
r.post('/user/reset', function (req, res) {
    var id = req.body.id;
    console.log("Reset user id = ", id);
    // doi viTri -1 -> 0
    var user = {idNguoiDung: id, viTri: 0};
    accountRepo.updateTinhTrang(user).then(function () {
        res.send("success");
        return;
    })
})

function loadAllCate(req,res,next) {
    categoryRepo.loadAll()
        .then(function (pRows) {
            req.categories = pRows;
            console.log("pRows");
            return next();
        })

}
function renderCategoryList(req, res) {
    if(req.session.admin != 'admin'){
        res.redirect('/login');
        console.log("login");
        return;
    }
    else
    {
        res.render('admin/category', {
            title: "Admin",
            layout: 'admin.hbs',
            session: req.session,
            categories: req.categories,
            isLogged: req.session.isLogged
        });
    }
}

r.get('/categories',loadAllCate,renderCategoryList);

r.post('/category/add', function (req, res) {
    var name = req.body.name;
    console.log("Add cate", name);
    var loai = {tenLoaiSanPham: name};
    categoryRepo.insert(loai);
    res.send("success");
})

r.post('/category/delete', function (req, res) {
    var id = req.body.id;
    console.log("delete cate where id = ", id);
    categoryRepo.deleteById(id);
    res.send("success");
})

r.post('/category/update', function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    console.log("Cap nhat loai id = ", id, " ten = ", name);
    var loai = {idLoaiSanPham: id, tenLoaiSanPham: name};
    categoryRepo.update(loai);
    res.send("success");
})

function loadProductById(req,res,next){
    var proId = req.params.id;
    productRepo.loadById(proId)
    .then(function (pRows) {
        req.product = pRows;
        console.log("pRows");
        return next();
    })
}
function loadCatOfProduct(req,res,next){
    var proId = req.params.id;
    categoryRepo.loadCatOfProduct(proId)
    .then(function (pRows) {
        req.cat = pRows;
        console.log("pRows");
        return next();
    })
}
function renderEditProduct(req, res) {
    if(req.session.admin != 'admin'){
        res.redirect('/login');
        console.log("login");
        return;
    }
    else
    {   
        res.render('product/edit', {
            title: "Edit product",
            layout: 'admin.hbs',
            session: req.session,
            categories: req.categories,
            product: req.product,
            isLogged: req.session.isLogged
        });
    }
}
r.get('/product/:id/edit',loadAllCate,loadProductById,renderEditProduct )

function loadUserById(req,res,next){
    var idNguoiDung= req.params.id;
    accountRepo.loadByUserId(idNguoiDung)
    .then(function (pRows) {
        req.user = pRows;
        return next();
    })
}
function renderUserProfile(req, res) {
    if(req.session.admin != 'admin'){
        res.redirect('/login');
        console.log("login");
        return;
    }
    else
    {   
        res.render('account/profile', {
            title: "Edit user",
            layout: 'admin.hbs',
            session: req.session,
            user: req.user,
            isLogged: req.session.isLogged
        });
    }
}
r.get('/user/:id/edit',loadUserById,renderUserProfile )
r.post('/user/:id/edit', function (req, res) {
    var id = req.body.id;
    var newName = req.body.newName;
    var newAddr = req.body.newAddr;
    console.log("Cap nhat user id = ", id, " ten = ", newName);
    //var loai = {idLoaiSanPham: id, tenLoaiSanPham: name};
    //categoryRepo.update(loai);
    res.send("success");

})
module.exports = r;