'use strict';
var express = require('express');
var fs = require('fs');
var router = express.Router();


var database = require('../config/database');

var Promise = require("bluebird");

Promise.promisifyAll(database);
Promise.promisifyAll(fs);

/* GET home page. */
router.get('/', function (req, res, next) {
    database.getContent()
        .then(function(files) {
            res.render('mobile', {  files: files });
        })
        .catch(function(err) {
            throw err;
        });
});


module.exports = router;
