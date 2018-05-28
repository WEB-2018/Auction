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
        user: 'tuyettinhtieu@gmail.com',
        pass: 'inuyaiba',
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
                res.redirect('/register');
                return;
            }
            else{
                accountRepo.insert(entity);
                 var content = '<p>This email is used for creating a new account at Lucus Store' +
                    '</b><ul><li>Username:' + name + '</li><li>Passwpord:' + password;
                setMailReceiver(email);
                setMailHTML(content);
                sendMail();
                //res.send('success');
                res.redirect('/login');
            }
        });
        
   
    
});

module.exports = r;