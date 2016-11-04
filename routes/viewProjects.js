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

// Messages sent to viewFiles will delete the given target
router.post('/', function(req, res) {
    var name = req.body.name;
    database.deleteProject(name)
        .then(function(data){
            res.end(
                JSON.stringify({ success: "true", })
            );
        })
        .catch(function(err){
            res.status(500).send({ error: err });
            res.end();
        })
});


module.exports = router;
