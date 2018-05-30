var express = require('express'),
    productRepo = require('../models/productRepo'),
    categoryRepo = require('../models/categoryRepo'),
    accountRepo = require('../models/accountRepo'),
    restrict = require('../middle-wares/restrict');
    crypto = require('crypto');
    multer = require('multer');
    fs = require('fs');
var r = express.Router();

function loadUserById(req,res,next){
    var idNguoiDung= req.session.user.idNguoiDung;
    accountRepo.loadByUserId(idNguoiDung)
    .then(function (pRows) {
        req.user = pRows;
        return next();
    })
}
function renderUserProfile(req, res) {
   
        res.render('account/infor', {
            title: "Profile",
            layout: 'user.hbs',
            session: req.session,
            user: req.user,
            isLogged: req.session.isLogged
        });
    
}
r.get('/',loadUserById,renderUserProfile )
r.post('/', function (req, res) {
    //var id = req.body.id;
    var id = req.session.user.idNguoiDung;
    var newName = req.body.newName;
    var newAddr = req.body.newAddr;
    console.log("Cap nhat user id = ", id, " ten = ", newName, newAddr);
    var user = {idNguoiDung: id, hoTen: newName, diaChi: newAddr};
    //console.log(user);
    accountRepo.updateInfo(user);
    res.redirect('/user')

})
r.post('/pswchange', function (req, res) {
    //var id = req.body.id;
    var id = req.session.user.idNguoiDung;
    var password = req.session.user.password;

    var oldPWD = crypto.createHash('md5').update(req.body.oldPWD).digest('hex');
    var newPWD = crypto.createHash('md5').update(req.body.newPWD).digest('hex');
    var user = {
        password : newPWD,
        idNguoiDung : req.session.user.idNguoiDung,
    }

    if(oldPWD==password){
        accountRepo.updatePassword(user);
       
    }
    else
    {
        console.log("You must enter your current password correctly!");
    }
    res.redirect('/user')

})

module.exports = r;