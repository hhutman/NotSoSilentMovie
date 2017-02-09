'use strict';
var express = require('express');
var fs = require('fs');
var router = express.Router();


var database = require('../config/database');
var projectUpload = require('../controllers/sm-projectupload');

var Promise = require("bluebird");



Promise.promisifyAll(projectUpload);
Promise.promisifyAll(database);


router.get('/', function(req, res) {
    res.render('sm_projectPage');
});

router.post('/', function(req, res){
    const project = req.body;

    if(!project.name) {
        res.status(400).send("Invalid Movie Name");
        return;
    }
    if(!project.creator) {
        res.status(400).send("Invalid Movie Creator");
        return;
    }
    if(project.content.length < 3){
        res.status(400).send("Invalid Movie Length - " + project.content.length);
        return;
    }


    projectUpload.newUpload(project)
        .then(function(result) {
            const response = {status: 200, success: true};
            res.end(JSON.stringify(response));
        })
        .catch(function(err){
            res.status(400).send(err);
        })
});


module.exports = router;
