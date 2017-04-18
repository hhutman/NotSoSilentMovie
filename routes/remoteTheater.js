var express = require('express');
var router = express.Router();

const database = require('../config/database');
const Promise = require("bluebird");
Promise.promisifyAll(database);

router.get('/', function(req, res, next) {
    database.getRandomMovies(1)
        .then(function(movies) {
            let list = [];
            movies[0].content.forEach(function(content) {
                list.push('/uploaded/' + content.target + '.mp4');
            });
            res.render('theater_desktop',{
                name: movies[0].name,
                creator: movies[0].creator,
                content: list,
            });
        })
        .catch(function(err) {
            res.render('home');
        });

});

/* GET users listing. */
router.get('/:title', function(req, res, next) {
    database.getByJson(database.projectmodel,{ name : req.params.title })
        .then(function(movies) {
            let list = [];
            movies[0].content.forEach(function(content) {
                list.push('/uploaded/' + content.target + '.mp4');
            });
            res.render('theater_desktop',{
                name: movies[0].name,
                creator: movies[0].creator,
                content: list,
            });
        })
        .catch(function(err) {
            database.getRandomMovies(1)
                .then(function(movies) {
                    let list = [];
                    movies[0].content.forEach(function(content) {
                        list.push('/uploaded/' + content.target + '.mp4');
                    });
                    res.render('theater_desktop',{
                        name: movies[0].name,
                        creator: movies[0].creator,
                        content: list,
                    });
                })
                .catch(function(err) {
                    res.render('home');
                })
        });

});



module.exports = router;
