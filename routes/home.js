'use strict';
var express = require('express');
var fs = require('fs');
var router = express.Router();

const database = require('../config/database');

const Promise = require("bluebird");
Promise.promisifyAll(database);

/* Get home page. */
router.get('/', function (req, res) {
    database.getRandomMovies(1)
        .then(function(movies) {
            console.log(movies[0].content[0].target);
            res.render('home', {
                movie: {
                    title: movies[0].name,
                    author: movies[0].creator,
                    img: "/thumbnails/" + movies[0].content[0].target + ".png"
                }
            });
        })
        .catch(function() {
            res.render('home', {
                movie: {
                    title: "Horses",
                    author: "Arnav Jhala",
                    img: ""
                }
            });
        });

});


module.exports = router;
