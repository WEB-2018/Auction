var express = require('express'),
    productRepo = require('../models/productRepo'),
    restrict = require('../middle-wares/restrict'),
    accountRepo = require('../models/accountRepo'),
    categoryRepo = require('../models/categoryRepo');
    crypto = require('crypto');
var r = express.Router();

var nodemailer =  require('nodemailer');
var transporter =  nodemailer.createTransport({ // config mail server
    service: 'Gmail',
    auth: {
        user: 'ad.lucus.store@gmail.com',
        pass: '0928215770a',
    }
});

var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
    from: 'Lucus Store',
    to: '',
    subject: 'Verify your account',
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
r.get('/', function(req, res) {
    if (req.session.isLogged == true) {
        res.redirect('/');
    } else {
        var x = req.session.err;
        delete req.session.err;
        res.render('account/register', {
            layoutModels: res.locals.layoutModels,
            layout: 'account.hbs',
            title: "Create account",
            showError: true,
            errorMsg: x
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
                req.session.err = 'This email has been used!';
                res.redirect('/register');
                return;
            }
            else{
                req.session.err =   `Welcome to Lucus's Store`;
                accountRepo.insert(entity);
                 var content = '<p>Dear Mr/Mrs ' + name + ',</br><p>This email is used for creating a new account at Lucus Store' +
                    '</b><ul><li>Username:' + name + '</li><li>Password:' + password;
                setMailReceiver(email);
                setMailHTML(content);
                sendMail();
                //res.send('success');
                res.redirect('/login');
            }
        });
        
   
    
});

module.exports = r;