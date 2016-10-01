var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var child_process = require('child_process');
var fluent_ffmpeg = require('fluent-ffmpeg');


var fs = require('fs');
var OBSRemote = require('obs-remote');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/**
 * Pages that can be visited
 */
var upload = require('./routes/upload');
var routes = require('./routes/index');
var theater = require('./routes/theater');
var viewFiles = require('./routes/viewFiles');
var editFile = require('./routes/editFile');

var obs = new OBSRemote();
var ejs = require('ejs');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/upload', upload);
app.use('/theater', theater);
app.use('/viewFiles', viewFiles);
app.use('/editFile', editFile);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Redirect page
app.get('*', function(req, res) {
    res.redirect('/');
});



module.exports = app;


// User Connected
io.on('connection', function (socket) {
    // User Disconnected
    socket.on('disconnect', function(){

    });
});
