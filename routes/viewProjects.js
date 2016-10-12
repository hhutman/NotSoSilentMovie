'use strict';
var express = require('express');
var fs = require('fs');
var router = express.Router();


var database = require('../config/database');

var Promise = require("bluebird");

Promise.promisifyAll(database);

/* GET home page. */
router.get('/', function (req, res, next) {
    database.getProjects()
        .then(function(projects) {
            res.render('viewProjects', {  projects: projects });
        })
        .catch(function(err) {
            throw err;
        });
});


module.exports = router;
