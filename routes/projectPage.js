'use strict';
var express = require('express');
var fs = require('fs');
var router = express.Router();


var database = require('../config/database');
var projectUpload = require('../controllers/sm-projectupload');

var Promise = require("bluebird");



Promise.promisifyAll(projectUpload);
Promise.promisifyAll(database);

router.get('/', function(req, res){
    res.redirect('../');
});


router.get('/:target', function(req, res) {
    if(req.params.target == "new"){
        res.render('projectPage')
    } else {
        res.render('projectPage');
    }
});

router.post('/', function(req, res){
    var project = req.body;
    projectUpload.newUpload(project)
        .then(function(result) {
            var response = {status: 200, success: true};
            res.end(JSON.stringify(response));
        })
        .catch(function(err){
            //TODO: Error not handled properly clientside
            var response = {status: 400, error: err};
            res.end(JSON.stringify(response));
        })
});


module.exports = router;
