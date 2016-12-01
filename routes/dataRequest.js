'use strict';
var express = require('express');
var fs = require('fs');
var router = express.Router();

var dataReqController = require('../controllers/sm-dataRequest');
var database = require('../config/database');

var Promise = require("bluebird");




Promise.promisifyAll(database);
Promise.promisifyAll(dataReqController);
Promise.promisifyAll(fs);


router.get('/:type/:filter', function (req, res, next) {
    var filter = req.params.filter;

/*    if(filter == "all"){
        handleAll(req, res);
    } else { */
        handleInt(req, res);
//    }
});

function handleInt (req, res) {
    database.getByJson(database.contentmodel,{ useType : req.params.type, extension : ".mp4" })
        .then(function(files) {
            let filteredFiles = spliceRandom(files, 6);
            res.end(JSON.stringify(filteredFiles));
        })
        .catch(function(err) {
            res.status(500).send({ error: err });
            res.end();
        });
}

function spliceRandom(array, count) {
    count = Math.min(array.length, count);
    let newArray = [];
    for(let i = 0; i < count; i++){
        newArray.push(getRandomFromArray(array));
    }
    return newArray;
}

function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function handleAll (req, res) {
    database.getByJson(database.contentmodel,{ useType : req.params.type })
        .then(function(files) {
            res.end(JSON.stringify(files));
        })
        .catch(function(err) {
            res.status(500).send({ error: err });
            res.end();
        });
}


module.exports = router;
