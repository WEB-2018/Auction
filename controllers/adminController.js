var express = require('express'),
    accountRepo = require('../models/accountRepo'),
    productRepo = require('../models/productRepo'),
    categoryRepo = require('../models/categoryRepo'),
    orderRepo = require('../models/orderRepo'),
    restrict = require('../middle-wares/restrict'),
    crypto = require('crypto');
    fileUpload = require('express-fileupload');
    multer = require('multer');
    fs = require('fs');
var r = express.Router();





function loadAllCateXX(req,res,next) {
   
    var idCat_Arr = [];
    var labels = [];
    var dataxs = [];
    //var name;
    categoryRepo.loadAll()
    .then(function (pRows) {
            req.category = pRows;

            for( i = 0; i < pRows.length; i++)
            {
                idCat_Arr.push(pRows[i].idLoaiSanPham);
                labels.push(pRows[i].tenLoaiSanPham);
               // name+=`'`+labels[i]+    `',`;
            }
           
            req.CatId = idCat_Arr;
            req.TagName = labels;
          
            //req.namez = name;
            return next();
        })
}
function CountProduct(req,res,next){

    var idCat_Arr = req.CatId;
 
    var dataxs = [];

    for(var j = 0; j < idCat_Arr.length; j++)
       {
            productRepo.countProdByCat(idCat_Arr[j])
                .then(function(pRows){
                var x = pRows[0].total;
                dataxs.push(x)
            })
           
          
       } 
    req.dataz = dataxs;
   
    return next();
}

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
        isLogged: req.session.isLogged,
        datax: req.dataz,
        label: req.TagName,
        category: req.category 
        //name: req.namez
        });
    }
   
}

r.get('/',loadAllCateXX,CountProduct,renderAdminPage);

function getData(req,res){
    productRepo.count('')
}
r.get('/x',getData)
function loadAllUsers(req,res,next) {
    accountRepo.loadAll()
        .then(function (pRows) {
            req.users = pRows;
    
            return next();
        })

}
function loadBlockUsers(req,res,next) {
    accountRepo.loadBlock()
        .then(function (pRows) {
            req.block = pRows;
            
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
            labels: labels,
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
            
            return next();
        })

}
function loadAllCate(req,res,next) {
    categoryRepo.loadAll()
        .then(function (pRows) {
            req.categories = pRows;
            
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
    var id = req.body.idLoaiSanPham;
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
r.get('/product/edit',loadAllCate,renderEditProduct )

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
    //var id = req.body.id;
    var id = req.params.id;
    var newName = req.body.newName;
    var newAddr = req.body.newAddr;
    console.log("Cap nhat user id = ", id, " ten = ", newName, newAddr);
    var user = {idNguoiDung: id, hoTen: newName, diaChi: newAddr};
    console.log(user);
    accountRepo.updateInfo(user);
   // res.send("success");
   var url= "/admin/user/"+id+"/edit";
    res.redirect(url);
})


function loadReportMonth(req,res,next) {
    var thang = req.params.month;
    productRepo.loadDanhSachHoaDon(thang)
        .then(function (pRows) {
            req.bill = pRows;
            var tong = 0;
            for(i=0;i<req.bill.length;i++)
            {
                tong = tong + req.bill[i].tongTien;
            };
            req.tong = tong;
            console.log(req.tong);
            console.log("pRows");
            return next();
        })


}

function renderReportMonth(req, res) {
    if(req.session.admin != 'admin'){
        res.redirect('/login');
        console.log("login");
        return;
    }
    else
    {
        res.render('admin/report', {
            title: "Admin",
            layout: 'admin.hbs',
            session: req.session,
            bill: req.bill,
            tong: req.tong,
            block: req.block,
            isLogged: req.session.isLogged
        });
    }
}

r.get('/report/:month',loadReportMonth,renderReportMonth);

function loadOrderDelivered(req, res, next) {
    orderRepo.loadOrderedByStatus(1)
        .then(function (pRow) {
            req.delivered = pRow;
            next();
        })
}
function loadOrderProcessing(req, res, next) {
    orderRepo.loadOrderedByStatus(0)
        .then(function (pRow) {
            req.processing = pRow;
            next();
        })
}
function loadOrderCancelled(req, res, next) {
    orderRepo.loadOrderedByStatus(2)
        .then(function (pRow) {
            req.cancelled = pRow;
            next();
        })
}


function renderOrdersManagement(req, res) {
    if(req.session.admin != 'admin'){
        res.redirect('/login');
        console.log("login");
        return;
    }
    else
    {
        res.render('admin/ordersManagement', {
            title: "Admin",
            layout: 'admin.hbs',
            session: req.session,
            block: req.block,
            delivered: req.delivered,
            processing: req.processing,
            cancelled: req.cancelled,
            isLogged: req.session.isLogged
        });
    }
}

r.get('/ordersManagement',loadOrderDelivered,loadOrderProcessing,loadOrderCancelled,renderOrdersManagement);

r.post('/ordersManagement/toDelivered', function (req, res) {
    var soHoaDon = req.body.soHoaDon;
    console.log("Update tinh trang don hang = ", soHoaDon);
    //khong xoa user, chi doi viTri -> -1
    var order = {soHoaDon: soHoaDon, tinhTrang: 1};
    orderRepo.updateTinhTrangDonHang(order).then(function () {
        res.send("success");
        return;
    })
})

r.post('/ordersManagement/toCancelled', function (req, res) {
    var soHoaDon = req.body.soHoaDon;
    console.log("Update tinh trang don hang = ", soHoaDon);
    orderRepo.getIdSanPhamFromChitiethoadon(soHoaDon)
        .then(function (pRow) {
            for (i = 0; i < pRow.length; i++) {
                orderRepo.updateTonKhoCancel(pRow[i].soLuong,pRow[i].idSanPham);
            }
            //khong xoa user, chi doi viTri -> -1
            var order = {soHoaDon: soHoaDon, tinhTrang: 2};
            orderRepo.updateTinhTrangDonHang(order);
            res.send("success");
            return;
        })
})

function loadOrderedDetails(req, res, next) {
    var soHoaDon = req.params.id;
    req.soHoaDon = soHoaDon;
    orderRepo.loadOrderedDetails(soHoaDon)
        .then(function (pRow) {
            req.orderedDetails = pRow;
            next();
        })
}

function renderOrderedDetails(req, res) {
    res.render('admin/orderedDetails', {
        title : "Ordered Details",
        session: req.session,
        layout: 'admin.hbs',
        orderedDetails: req.orderedDetails,
        soHoaDon: req.soHoaDon,
        user: req.user,
        isLogged: req.session.isLogged
    });

}
r.get('/ordersManagement/details/:id',loadUserById,loadOrderedDetails,renderOrderedDetails);

function loadSalesStatisticsByDay(req, res, next) {
    orderRepo.loadDoanhThuTheoNgay(1)
        .then(function (pRow) {
            req.bill = pRow;
            console.log(pRow);
            next();
        })
}

function renderSalesStatisticsByDay(req, res) {
    res.render('admin/saleSttDay', {
        title : "Admin",
        session: req.session,
        layout: 'admin.hbs',
        user: req.user,
        date1: req.date1,
        bill: req.bill,
    isLogged: req.session.isLogged
    });

}
r.get('/salesStatistics/day/:date1',loadSalesStatisticsByDay,renderSalesStatisticsByDay);

function renderSalesStatistics(req, res) {
    res.render('admin/salesStatistics', {
        title : "Admin",
        session: req.session,
        layout: 'admin.hbs',
        user: req.user,
        isLogged: req.session.isLogged
    });

}

r.get('/salesStatistics',renderSalesStatistics);

function loadSalesStatisticsByMonths(req, res, next) {

    orderRepo.loadDoanhThuTheoThang(1)
        .then(function (pRow) {
            req.bill = pRow;
            console.log(pRow);
            next();
        })
}

function renderSalesStatisticsByMonths(req, res) {
    res.render('admin/saleSttMonth', {
        title : "Admin",
        session: req.session,
        layout: 'admin.hbs',
        user: req.user,
        bill: req.bill,
        isLogged: req.session.isLogged
    });

}

r.get('/salesStatistics/months',loadSalesStatisticsByMonths,renderSalesStatisticsByMonths);

function loadSalesStatisticsByWeeks(req, res, next) {

    orderRepo.loadDoanhThuTheoTuan()
        .then(function (pRow) {
            req.bill = pRow;
            console.log(pRow);
            next();
        })
}

function renderSalesStatisticsByWeeks(req, res) {
    res.render('admin/saleSttWeek', {
        title : "Admin",
        session: req.session,
        layout: 'admin.hbs',
        user: req.user,
        bill: req.bill,
        isLogged: req.session.isLogged
    });

}

r.get('/salesStatistics/weeks',loadSalesStatisticsByWeeks,renderSalesStatisticsByWeeks);

function loadSalesStatisticsByQuarters(req, res, next) {

    orderRepo.loadDoanhThuTheoQuy()
        .then(function (pRow) {
            req.bill = pRow;
            console.log(pRow);
            next();
        })
}

function renderSalesStatisticsByQuarters(req, res) {
    res.render('admin/saleSttQuarters', {
        title : "Admin",
        session: req.session,
        layout: 'admin.hbs',
        user: req.user,
        bill: req.bill,
        isLogged: req.session.isLogged
    });

}

r.get('/salesStatistics/quarters',loadSalesStatisticsByQuarters,renderSalesStatisticsByQuarters);

module.exports = r;