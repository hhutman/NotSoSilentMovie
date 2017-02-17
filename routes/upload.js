var express = require('express');
var router = express.Router();

var fileUpload = require('../controllers/sm-fileupload');
var Promise = require("bluebird");

Promise.promisifyAll(fileUpload);

/* GET users listing. */

router.get('/', function(req, res) {
    res.render('upload');
});

router.post('/', function(req, res){
    var filetype = req.param('filetype');
    if(!filetype){
        res.status(400).send();
        res.end();
    }

    fileUpload.newUpload(req, filetype)
        .then(function(data) {
            res.status(200).send(data);
            res.end()
        })
        .catch(function(data) {
            res.status(400).send( data);
            res.end();
        });
});

module.exports = router;


