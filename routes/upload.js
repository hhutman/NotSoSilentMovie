var express = require('express');
var router = express.Router();

var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var resourceController = require('../controllers/resourcecontroller');
var content = require('../models/content');
var fileUpload = require('../controllers/sm-fileupload');
var Promise = require("bluebird");

Promise.promisifyAll(fileUpload);

/* GET users listing. */

router.get('/', function(req, res) {
    res.render('upload');
});

router.post('/', function(req, res){
    fileUpload.newUpload(req,res)
        .then(function(data) {
            if (data) {
                res.send(data);
            }
            res.end();
        })
});

module.exports = router;


