var express = require('express'),
    productRepo = require('../models/productRepo'),
    categoryRepo = require('../models/categoryRepo'),
    accountRepo = require('../models/accountRepo'),
    restrict = require('../middle-wares/restrict');
    crypto = require('crypto');
    multer = require('multer');
    fs = require('fs');
var r = express.Router();

var nodemailer =  require('nodemailer');
var transporter =  nodemailer.createTransport({ // config mail server
    service: 'Gmail',
    auth: {
        user: 'tuyettinhtieu@gmail.com',
        pass: 'inuyaiba',
    }
});


var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
    from: 'Lucus Store',
    to: '',
    subject: 'Reset password',
    text: 'You recieved message from Lucus Store',
    html: ''
}

function setMailHTML(html) {
    mainOptions.html = html;
}

function setMailReceiver(sendTo) {
    mainOptions.to = sendTo;
}

function sendMail() {
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' +  info.response);
        }
    });
}

function loadByViews(req,res,next) {

    productRepo.loadSanPhamNhieuLuotXem()
        .then(function (pRows) {
            req.productsMostWatched = pRows;
            return next();
        })

}

function loadBySale(req,res,next) {
    
    productRepo.loadSanPhamGiamGia()
        .then(function (pRows) {
            req.productsBySale = pRows;
            return next();
        })
    
}

function loadBySold(req, res, next) {
    productRepo.loadSanPhamBanChay()
        .then(function (pRows) {
            req.productsBySold = pRows;
            return next();
        })
}

function renderHomePage(req, res) {
    res.render('home/index', {
        title: "Home",
        layoutVM: res.locals.layoutVM,
        productsMostWatched: req.productsMostWatched,
        productsBySale : req.productsBySale,
        productsBySold: req.productsBySold,
        session: req.session,
        isLogged: req.session.isLogged
    });
}

r.get('/',loadByViews,loadBySale,loadBySold,renderHomePage);

r.get('/login', function(req, res) {
    if (req.session.isLogged === true) {
        res.redirect('/');
    } else {
        res.render('account/login', {
            layoutModels: res.locals.layoutModels,
            layout: 'account.hbs',
            title: "Log In",
            showError: false,
            errorMsg: ''
        });
    }
});
r.get('/resetPWD', function(req, res) {
    if (req.session.isLogged == true) {
        res.redirect('/');
    } else {
        res.render('account/forgetPW', {
            layoutModels: res.locals.layoutModels,
            layout: 'account.hbs',
            title: "Create account",
            showError: false,
            errorMsg: ''
        });
    }
});

r.get('/newpwd', function(req, res) {
    if (req.session.isLogged == true) {
        res.redirect('/');
    } else {
        res.render('account/newPW', {
            layoutModels: res.locals.layoutModels,
            layout: 'account.hbs',
            title: "New password",
            showError: false,
            errorMsg: ''
        });
    }
});
function makecode() {
  var text = "";
 var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
r.post('/resetPWD', function(req, res) {
    var email = req.body.email;
    var userlg = {
        email: email
    }
    accountRepo.loadByEmail(userlg)
        .then(function(user) {
            req.user = user;
            if (user === null) {

                res.render('account/forgetPW', {
                layoutModels: res.locals.layoutModels,
                layout: 'account.hbs',
                title: "Create account",
                showError: true,
                errorMsg: 'Email not found!'
            });
                
            } else {
                var code = makecode();
                var data={
                    resetCode: code,
                    email: email
                }
                accountRepo.createCode(data);
                console.log(code);
                var content = '<p style="font-size:14pt">Hello '+ user.hoTen+',</p>'
                    +'<p>We have received a request to reset your password at Lucus Store.</p>'
                    +'<a>Click here to change your password</a>'
                    +'<p>Alternatively, you can enter the following password reset code:</p>'
                    + '<p style="font-size:20pt">'+code+'</p>'
                    +'<p>If you did not request a new password, let us know!</p>';
                setMailReceiver(email);
                setMailHTML(content);
                sendMail();
                 res.redirect('/newpwd')
            }
        });
});

r.post('/newpwd', function(req, res) {

    var ePWD = crypto.createHash('md5').update(req.body.newpw).digest('hex');
    var infor = {
        email: req.body.email,
        newpassword : ePWD,
        confirm : req.body.pwdconfirm,
        code : req.body.verify
    }
    accountRepo.checkCode(infor)
        .then(function(user) {
            console.log(user);
            if(user==null)
            {
                res.render('account/newPW', {
                layoutModels: res.locals.layoutModels,
                layout: 'account.hbs',
                title: "New password",
                showError: true,
                errorMsg: 'Can not reset your password! Try again!'
                });
            }
            else
            {
                accountRepo.changePWD(infor);
                res.redirect("/login");
            }
    });

 
   
});

r.post('/login', function(req, res) {

   
    var ePWD = crypto.createHash('md5').update(req.body.rawPassword).digest('hex');

    var entity = {
        email: req.body.email,
        //password: req.body.rawPassword
        password: ePWD
    };

 

    //var remember = req.body.remember ? true : false;
    if(entity.email == 'admin@gmail.com' && req.body.rawPassword === '123456'){
        req.session.isLogged = true;
        req.session.admin = 'admin';
        res.redirect('/admin');
        return;
    }
    accountRepo.checkAccount(entity)
        .then(function(user) {
            if (user === null) {
                res.render('account/login', {
                    layoutModels: res.locals.layoutModels,
                    layout: 'account.hbs',
                    title: "Đăng nhập",
                    showError: true,
                    errorMsg: 'The username and/or password you entered is invalid! Please try again!'
                });
            } else {
                req.session.isLogged = true;
                req.session.user = user;
                var url = '/';
                if (req.query.retUrl) {
                    url = req.query.retUrl;
                }
                res.redirect(url);
            }
        });
});
r.get('/logout', restrict, function(req, res) {
    req.session.isLogged = false;
    req.session.user = null;
    req.session.cookie.expires = new Date(Date.now() - 1000);
    res.redirect('/');
});
module.exports = r;