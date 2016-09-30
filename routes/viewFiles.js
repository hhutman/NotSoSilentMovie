var express = require('express');
var router = express.Router();

var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
    fs.readdir(__dirname + '/../public/uploaded', function (err, files) {
        if (err) throw err;

        res.render('viewFiles', {  files: JSON.stringify(files) });
    });
});

module.exports = router;
