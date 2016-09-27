'use strict';
var express = require('express');
var fs = require('fs');
var router = express.Router();

var uploadManager = require('./uploadManager')(router);
/* GET home page. */
router.get('/', function(req, res, next) {
       fs.readdir(__dirname + '/../public/thumbnails', function (err, files) {
                if (err) throw err;
                // console.log(files);
        	res.render('index.html', { title: 'Twitch Odyssey', files: files });
	});
});

router.get('/files', function (req, res) {
  	fs.readdir(__dirname + '/../public/uploaded/files', function (err, files) {
  		if (err) throw err;
             	// console.log(files);
                res.render('files.html', {files: files });
        });
});
router.get('/content', function (req, res) {
        fs.readdir(__dirname + '/../public/uploaded/files', function (err, files) {
                if (err) throw err;
                // console.log(files);
                res.render('content.html', {files: files });
        });
});
router.get('/instructions', function (req, res) {
	//console.log('instructions');
    res.render('instructions.html');
});
router.get('/mobile', function (req, res) {
        fs.readdir(__dirname + '/../public/thumbnails', function (err, files) {
                if (err) throw err;
                // console.log(files);
                res.render('mobile.html', {files: files });
        });
});

module.exports = router;
