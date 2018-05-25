var express = require('express'),
    productRepo = require('../models/productRepo'),
    restrict = require('../middle-wares/restrict'),
    accountRepo = require('../models/accountRepo'),
    categoryRepo = require('../models/categoryRepo');
    crypto = require('crypto');
var r = express.Router();


r.get('/', function(req, res) {
    if (req.session.isLogged == true) {
        res.redirect('/');
    } else {
        res.render('account/register', {
            layoutModels: res.locals.layoutModels,
            layout: 'account.hbs',
            title: "Create account",
            showError: false,
            errorMsg: ''
        });
    }
});

r.post('/',function(req, res) {
    var name = req.body.name;
    var address = req.body.address;
    var password = req.body.password;
    var email = req.body.email;
  

    var ePWD = crypto.createHash('md5').update(req.body.password).digest('hex');
      
    var entity = {
        hoTen: name,
        email: email,
        diaChi: address,
        password: ePWD
    };
    console.log(entity);


    //kiểm tra email này đã được sử dụng chưa
    accountRepo.loadByEmail(entity)
        .then(function (user) {
            if(user!==null) {
                //không hợp lệ thì thông báo chỗ này
                console.log('email không hợp lệ');
                res.send('email');
                return;
            }
            else{
                accountRepo.insert(entity);
                res.send('success');
            }
        });
        /*
    var content = '<p>Email này vừa được sử dụng để đăng ký tài khoản tại trang web của chúng tôi với: ' +
        '</b><ul><li>Tên người dùng:' + name + '</li><li>Mật khẩu:' + password;
    setMailReceiver(email);
    setMailHTML(content);
    sendMail();*/
    //recaptcha đúng thì thêm tài khoản và gửi thông báo cho client
    
});

module.exports = r;