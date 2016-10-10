var express = require('express');
var router = express.Router();

var formidable = require('formidable');
var fs = require('fs');


var database = require('../config/database');

var Promise = require("bluebird");

Promise.promisifyAll(database);
Promise.promisifyAll(fs);

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

// Messages sent to viewFiles will delete the given target
router.post('/', function(req, res) {
    var target = req.body.target;
    var extension = req.body.extension;
    database.deleteByTarget(target)
        .then(function(data) {
            return fs.unlink("public/uploaded/" +  target + extension);
        })
        .then(function(data){
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
