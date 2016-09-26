'use strict';
var express = require('express');
var fs = require('fs');
var router = express.Router();

var uploadManager = require('./uploadManager')(router);
/* GET home page. */
router.get('/', function(req, res, next) {
	// fs.readdir(__dirname + '/../public/uploaded/files', function (err, files) {
       fs.readdir(__dirname + '/../public/thumbnails', function (err, files) {
                if (err) throw err;
                // console.log(files);
        	res.render('silentmovie', { title: 'Twitch Odyssey', files: files });
	});
});

/*router.get('/philly', function(req, res, next) {
      //   fs.readdir(__dirname + '/../public/uploaded/files', function (err, files) {
                fs.readdir(__dirname + '/../public/thumbnails', function (err, files) {
                                if (err) throw err;
                                                 //console.log(files);
                    res.render('philly.html', { title: 'Twitch Odyssey', files: files });
        	});
        });*/

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
router.get('/contentphilly', function (req, res) {
        fs.readdir(__dirname + '/../public/uploaded/files', function (err, files) {
                if (err) throw err;
                // console.log(files);
                                 res.render('contentphilly.html', {files: files });
        });
});
router.get('/homer', function (req, res) {
        fs.readdir(__dirname + '/../public/uploaded/files', function (err, files) {
                if (err) throw err;
                res.render('homer.html', {files: files });
        });
});
router.get('/homerphilly', function (req, res) {
        fs.readdir(__dirname + '/../public/uploaded/files', function (err, files) {
                if (err) throw err;
                res.render('homerphilly.html', {files: files });
        });
});
router.get('/instructions', function (req, res) {
	//console.log('instructions');
    res.render('instructions.html');
});

router.get('/theatre', function (req, res) {
	res.render('index.html');
});

router.get('/couch', function (req, res) {
        res.render('couch.html');
});

// router.get('/chat', function (req, res) {
//     res.render('chat.html');
// });


router.get('/chat', function (req, res) {
        fs.readdir(__dirname + '/../public/uploaded/files', function (err, files) {
                if (err) throw err;
                // console.log(files);
                res.render('chat.html', {files: files });
        });
});

router.get('/streamOnly', function (req, res) {
        fs.readdir(__dirname + '/../public/uploaded/files', function (err, files) {
                if (err) throw err;
                // console.log(files);
                res.render('streamOnly.html', {files: files });
        });
});

router.get('/mobile', function (req, res) {
        fs.readdir(__dirname + '/../public/thumbnails', function (err, files) {
                if (err) throw err;
                // console.log(files);
                res.render('mobile.html', {files: files });
        });
});
router.get('/silentmovie', function (req, res) {
        fs.readdir(__dirname + '/../public/uploaded/files', function (err, files) {
                if (err) throw err;
                // console.log(files);
                res.render('silentmovie.html', {files: files });
        });
});

module.exports = router;
