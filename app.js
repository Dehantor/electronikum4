var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressValidator = require('express-validator')
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//измененения
var app = express();
//session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))
//validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));
//flash
app.use(require('connect-flash')());
//express message
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});
//Parser
app.use(bodyParser.urlencoded({extended: true}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




//BD
const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/nodekb',{useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

db.once('open',function(){
    console.log('Connection to MongoDB');
});

db.on('error',function(err){
    console.log(err);
});

module.exports = app;
