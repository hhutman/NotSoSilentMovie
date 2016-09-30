var express = require('express');
var router = express.Router();

var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');


var database = require('../config/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
    database.getContent( function(err, files) {
        if (err) return;
        res.render('viewFiles', {  files: JSON.stringify(files) });
    });
});

module.exports = router;
