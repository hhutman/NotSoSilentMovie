var express = require('express');
var router = express.Router();

var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');


var database = require('../config/database');

/* GET users listing. */
router.get('/:target', function(req, res, next) {
    var target = req.params.target;
    database.getByTarget(target, function(err, file) {
        if (err || file == null) {
            res.redirect('../');
            return;
        }

        if( req.query.state == 'new' ){
            res.render('editFile', {
                state: 'new',
                file: file,
                fileExtension: file.extension,
                fileName: file.name,
                fileType: file.useType,
                movieTitle: file.movieTitle,
                fileDescription: file.description,
                fileTags: file.tags
            });
        } else {
            res.render('editFile', {
                file: JSON.stringify(file),
                fileExtension: file.extension,
                fileName: file.name,
                fileType: file.useType,
                movieTitle: file.movieTitle,
                fileDescription: file.description,
                fileTags: file.tags
            });
        }
    });
});
router.post('/', function(req, res, next) {
    var file = req.body;
    database.updateByTarget(file, function(result){
        var response = { status: 200, success: true};
        res.end(JSON.stringify(response));
    });
});

module.exports = router;
