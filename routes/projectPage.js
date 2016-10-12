'use strict';
var express = require('express');
var fs = require('fs');
var router = express.Router();


var database = require('../config/database');

var Promise = require("bluebird");

Promise.promisifyAll(database);

router.get('/', function(req, res){
    res.redirect('../');
});


router.get('/:target', function(req, res) {
    if(req.params.target == "new"){
        res.redirect('../directors');
    } else {
        res.redirect('../viewProjects');
    }
/*
    database.getByTarget(req.params.target)
        .then(function(file) {
            handleNewTraffic(file, req, res);
        })
        .catch(function(err) {
            res.redirect('../');
        }); */
});


module.exports = router;
