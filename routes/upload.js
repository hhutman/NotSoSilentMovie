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
    fileUpload.newUpload(req)
        .then(function(data) {
            res.send(200,data);
            res.end();
        })
        .catch(function(data) {
            res.send(400, data);
            res.end();
        });
});

module.exports = router;


