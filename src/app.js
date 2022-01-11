// NECESARIOADD
// NECESARIOEDIT

// AGREGADOS

// REQUIRES
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE
const session = require('express-session');

// EXPRESS EN app
var app = express();

// REQUIRE middlewares
const localUserCheck = require('./middlewares/localsUserCheck');
const checkcookie = require('./middlewares/checkcookie');
const adminMiddleware = require('./middlewares/adminMiddleware');


// REQUIRE ROUTES
var index = require('./routes/index');
var products = require('./routes/products');
var users = require('./routes/users');
var admin = require('./routes/admin');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MIDDLEWARES DE APLICACION
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(session({
  secret: "Roma",
  resave: false,
  saveUninitialized: false // true ESTA OBSOLETO... CAMBIADO A false // EN true NO ES POSIBLE BORRAR COOKIE connect.sid
}))
app.use(localUserCheck);
app.use(checkcookie);

// INICIAN RUTAS
app.use('/', index);
app.use('/products', products);
app.use('/users', users);
app.use('/admin', /*adminMiddleware,*/ admin);
// EEDITT NECESARIOEDIT NECESARIOADD
app.use('/api', require('./routes/api'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('general/error');
});

module.exports = app;



