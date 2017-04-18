'use strict';
var express = require('express');
var fs = require('fs');
var router = express.Router();

/* Get home page. */
router.get('/', function (req, res) {
    res.render('home');
});


module.exports = router;
