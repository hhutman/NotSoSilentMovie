var express = require('express');
var router = express.Router();

var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var crypto = require('crypto');
var database = require('../config/database');


/* GET users listing. */
router.get('/', function(req, res) {
    res.render('upload');
});

router.post('/', function(req, res){
    // create an incoming form object
    var form = new formidable.IncomingForm();

    var useType = "";
    var hashedName = "";

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '../public/uploaded');

    form.on('field', function(name, value) {
        useType = value;
    });
    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        fileReceived(form, file);
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        res.send(hashedName);
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

    function fileReceived(form, file){
        var extension = path.extname(file.name);
        hashedName = crypto.createHash('md5').update(file.name).digest('hex');

        fs.rename(file.path, path.join(form.uploadDir, hashedName));

        database.addContent(hashedName, extension, file.name, useType);
    }
});



module.exports = router;
