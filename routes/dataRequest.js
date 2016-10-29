'use strict';
var express = require('express');
var fs = require('fs');
var router = express.Router();

var dataReqController = require('../controllers/sm-dataRequest');

var Promise = require("bluebird");

Promise.promisifyAll(dataReqController);
Promise.promisifyAll(fs);


router.get('/:type/:filter', function (req, res, next) {
    switch(req.params.type) {
        case "video":
            videoResponse(res, req.params.filter);
            break;
        default:
            var response = {status: 400, error: "Unknown Type"};
            res.end(JSON.stringify(response));
    }
});

function videoResponse(res, filter) {
    dataReqController.
    res.end(JSON.stringify(""));
}



module.exports = router;
