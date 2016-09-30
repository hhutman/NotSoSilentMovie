var express = require('express');
var router = express.Router();

var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('viewFiles');
});

module.exports = router;
