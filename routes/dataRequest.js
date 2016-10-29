'use strict';
var express = require('express');
var fs = require('fs');
var router = express.Router();

var dataReqController = require('../controllers/sm-dataRequest');


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
    res.end(JSON.stringify(""));
}



module.exports = router;
