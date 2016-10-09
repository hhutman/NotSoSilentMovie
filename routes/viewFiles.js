var express = require('express');
var router = express.Router();

var formidable = require('formidable');
var fs = require('fs');


var database = require('../config/database');

var Promise = require("bluebird");

Promise.promisifyAll(database);

/* GET users listing. */
router.get('/', function(req, res) {
    database.getContent()
        .then(function(files) {
            res.render('viewFiles', {  files: JSON.stringify(files) });
        })
        .catch(function(err) {
            throw err;
        });
});
router.post('/', function(req, res) {
    var target = req.body.target;
    database.deleteByTarget(target)
        .then(function(data) {
            res.end(
                JSON.stringify({ success: "true", })
            );
        })
        .catch(function(err){
            res.end(
                JSON.stringify({ error: err, })
            );
        })
});

module.exports = router;
