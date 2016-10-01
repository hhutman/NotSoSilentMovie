var express = require('express');
var router = express.Router();

var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');


var database = require('../config/database');

/* GET users listing. */
router.get('/:target', function(req, res, next) {
    var target = req.params.target;
    database.getByTarget(target, function(err, file) {
        if (err) {
            res.redirect('../');
        }
        res.render('editFile');
    });
});
router.post('/', function(req, res, next) {
    //TODO
});

module.exports = router;
