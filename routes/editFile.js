var express = require('express');
var router = express.Router();

var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

var debugUseType = require('../controllers/debug/debugUseType');
var database = require('../config/database');

var Promise = require("bluebird");

Promise.promisifyAll(database);

router.get('/', function(req, res) {
    res.redirect('../');
});

/* GET users listing. */
router.get('/:target', function(req, res) {
    //noinspection JSUnresolvedVariable
    database.getByJson(database.contentmodel,{ target : req.params.target })
        .then(function(files) {
            handleNewTraffic(files[0], req, res);
        })
        .catch(function(err) {
            res.redirect('../');
        });
});

function handleNewTraffic(file, req, res){
    /*
    debugUseType.analyzeUseType(file); */
    var responseData = file;
    responseData.state = req.query.state;
    if(file.useType == 'card'){
        responseData.image = true;
    }

    res.render('editFile',  responseData );
}

router.post('/', function(req, res) {
    var file = req.body;
    database.updateByTarget(file)
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

database.getContent()
    .then(function(files) {
        for(let file in files){
            if(file.name.substring(0,1) == "T"){
                file.useType = "card";
                database.updateByTarget(file);
            }
        }
    })
    .catch(function(err) {
        throw err;
    });


module.exports = router;
