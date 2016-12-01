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
            let int1 = Math.floor(Math.random() * movies.length);
            let int2 = Math.floor(Math.random() * movies.length);
            let int3 = Math.floor(Math.random() * movies.length);
            let short_movies = [];
            short_movies.push(movies[int1]);
            short_movies.push(movies[int2]);
            short_movies.push(movies[int3]);
            res.render('sm_index', {  movies: short_movies });
        })
        .catch(function(err) {
            console.log(err);
            res.render('sm_index', {  movies: [] });
        });
});


module.exports = router;
