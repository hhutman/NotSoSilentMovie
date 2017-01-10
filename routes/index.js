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
            let short_movies = [];
            short_movies.push(getMovie(movies));
            short_movies.push(getMovie(movies));
            short_movies.push(getMovie(movies));
            res.render('sm_index', {  movies: short_movies });
        })
        .catch(function(err) {
            console.log(err);
            res.render('sm_index', {  movies: [] });
        });
});

function getMovie(movies) {
    if(!movies ||
        movies.length < 1){
        throw "Error: getMovie has bad 'movies' list";
    }

    let movie = movies[Math.floor(Math.random() * movies.length)];

    if(movie.content &&
        movie.content[0] &&
        movie.content[0].target){
        return movie;
    } else {
        return getMovie(movies);
    }
}

module.exports = router;
