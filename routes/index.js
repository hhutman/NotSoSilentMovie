'use strict';
var express = require('express');
var fs = require('fs');
var router = express.Router();


var database = require('../config/database');

var Promise = require("bluebird");

Promise.promisifyAll(database);
Promise.promisifyAll(fs);

/* GET home page. */
router.get('/', function (req, res, next) {
    database.getProjects()
        .then(function(movies) {
            if(!movies || movies.length == 0){
                throw "error - movies empty";
            }
            res.render('sm_index', {  movies: movies });
        })
        .catch(function(err) {
            console.log(err);
            res.render('sm_index', {  movies: [] });
        });
});


module.exports = router;
