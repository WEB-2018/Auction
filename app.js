var express = require('express'),
    session = require('express-session'),
    handlebars = require('express-handlebars'),
    handlebars_sections = require('express-handlebars-sections'),
    MySQLStore = require('express-mysql-session')(session),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path'),
    wnumb = require('wnumb'),
    handleLayout = require('./middle-wares/handleLayout'),
    handle404 = require('./middle-wares/handle-404'),
    homeController = require('./controllers/homeController'),
    productController = require('./controllers/productController'),
    adminController = require('./controllers/adminController')
    categoryController = require('./controllers/categoryController');

var app = express();

app.use(morgan('dev'));

app.engine('hbs', handlebars({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: 'views/_layouts/',
    partialsDir: 'views/_partials/',
    helpers: {
        section: handlebars_sections(),
        now: function() {
            return moment().format('D/M/YYYY - HH:mm');
        },
        number_format: function (n) {
            var nf = wnumb({
                thousand: ','
            });
            return nf.to(n);
        }
    }

}));
app.set('view engine', 'hbs');

app.use(express.static(
    path.resolve(__dirname, 'public')
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//session
app.use(session({
    secret: 'Z7X7gXzoKBT8h18jwXBEP4T0kJ8=',
    resave: false,
    saveUninitialized: true,
    // store: new fileStore()
    store: new MySQLStore({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '1234',
        database: 'store',
        createDatabaseTable: true,
        schema: {
            tableName: 'sessions',
            columnNames: {
                session_id: 'session_id',
                expires: 'expires',
                data: 'data'
            }
        }
    }),
}));

app.use(handleLayout);
app.use('/', homeController);
app.use('/product', productController);
app.use('/category', categoryController);
app.use('/admin', adminController);
app.use(handle404);

app.listen(3000);