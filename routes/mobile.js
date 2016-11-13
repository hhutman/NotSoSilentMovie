'use strict';
var express = require('express');
var fs = require('fs');
var router = express.Router();

var odysseyQueue = require('../odyssey/sm-odyssey-queue');
var database = require('../config/database');

var Promise = require("bluebird");

Promise.promisifyAll(database);
Promise.promisifyAll(fs);

/* GET home page. */
router.get('/', function (req, res, next) {
    database.getByJson(database.contentmodel,{ useType : "video" })
        .then(function(files) {
            let queueList = odysseyQueue.getQueue();
            res.render('mobile', {  files: files, queue: queueList });
        })
        .catch(function(err) {
            throw err;
        });
});

router.post('/emptyQueue', function(req, res){
    odysseyQueue.emptyQueue();
    res.end(JSON.stringify({status: 200, success: true}));
});


module.exports = router;
