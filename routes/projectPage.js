'use strict';
const express = require('express');
const fs = require('fs');
const router = express.Router();


const database = require('../config/database');
const projectUpload = require('../controllers/sm-projectupload');

const Promise = require("bluebird");

const swearjar = require('swearjar');

const MIN_CLIPS = 3;
const TEXT_LIMIT = 10;

Promise.promisifyAll(projectUpload);
Promise.promisifyAll(database);


router.get('/', function(req, res) {
    res.render('sm_projectPage');
});

router.post('/', function(req, res){
    const project = req.body;

    project.creator = project.creator.replace(/[^0-9a-z]/gi, '');
    project.name = project.name.replace(/[^0-9a-z]/gi, '');

    if(!project.name) {
        res.status(400).send("Invalid Movie Name");
        return;
    }
    if(!project.creator) {
        res.status(400).send("Invalid Movie Creator");
        return;
    }
    if(project.content.length < MIN_CLIPS){
        res.status(400).send("Invalid Movie Length - " + project.content.length + "/" + MIN_CLIPS);
        return;
    }
    if(swearjar.profane(project.creator) || swearjar.profane(project.name)){
        res.status(400).send("Profanity detected");
        return;
    }
    if(project.creator.length > TEXT_LIMIT || project.name.length > TEXT_LIMIT){
        res.status(400).send("Please shorten your labels to " + TEXT_LIMIT + " characters");
        return;
    }


    projectUpload.newUpload(project)
        .then(function(result) {
            const response = {status: 200, success: true};
            res.end(JSON.stringify(response));
        })
        .catch(function(err){
            //TODO: Error can return all types, not just duplicate names
            res.status(400).send("Name Already Exists");
        })
});


module.exports = router;
