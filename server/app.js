var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');


var lunbotus = require('./routes/lunbotus');
var news = require('./routes/news');
var users = require('./routes/users');
var pictures = require('./routes/pictures');
var goods = require('./routes/goodslists');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: '12345',
    name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 8000000},  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));

app.use(function (req, res, next) {
    if (req.session.userId) {
        next()
    } else {
        if (req.path == "/lunbotus/list" || req.path == "/users/login" || req.path == "/users/logout" || req.path == "/news/newslist" || req.path == "/news/newsinfo" || req.path == "/news/comment"
        || req.path == "/pictures/picturestitle" || req.path == "/pictures/pictureslist" || req.path=="/goods/goodslist" || req.path=="/goods/goodsinfo"
        ) {
            next()
        } else {
            res.json({
                status: "10001",
                msg: "当前未登录",
                result: ""
            })
        }
    }

});


app.use('/lunbotus', lunbotus);
app.use('/news', news);
app.use('/users', users);
app.use('/pictures',pictures);
app.use('/goods',goods);


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
    res.render('error');
});

module.exports = app;



