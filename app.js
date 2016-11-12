"use strict";
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pug = require('pug');
var thumbnailController = require('./controllers/thumbnailController');
var fs = require('fs');
var app = express();
var http = require('http').Server(app);




/**
 * Pages that can be visited
 */
var upload = require('./routes/upload');
var routes = require('./routes/index');
var theater = require('./routes/theater');
var viewFiles = require('./routes/viewFiles');
var editFile = require('./routes/editFile');
var directors = require('./routes/directors');
var projectPage = require('./routes/projectPage');
var aboutPage = require('./routes/about');
var viewProjects = require('./routes/viewProjects');
var dataRequest = require('./routes/dataRequest');
/**
 * Odyssey-Pages
 */
var theater1 = require('./routes/theater1');
var mobile = require('./routes/mobile');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Register subdomains
 */
app.use('/', routes);
app.use('/upload', upload);
app.use('/theater', theater);
app.use('/viewFiles', viewFiles);
app.use('/editFile', editFile);
app.use('/directors', directors);
app.use('/projectPage',projectPage);
app.use('/viewProjects',viewProjects);
app.use('/dataRequest',dataRequest);
app.use('/about',aboutPage);
app.use('/theater1',theater1);
app.use('/mobile',mobile);

// handle blank image references
app.get('/thumbnails/:filename', function(req, res) {
    res.sendFile(__dirname + '/public/thumbnails/missing_image.png');
    let target = path.basename(req.params.filename, '.png');
    thumbnailController.makeThumbnailByTarget(target)
});


// production error handler
// no stacktraces leaked to user
app.use(function(req, res, err) {
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
