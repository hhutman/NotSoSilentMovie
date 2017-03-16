"use strict";
var contentController = require('../controllers/contentcontroller');
var database = require('../config/database');
var Promise = require("bluebird");

Promise.promisifyAll(database);
Promise.promisifyAll(contentController);

var io;
var clients = {};

module.exports.configureIo = function(newio) {
    io = newio;
    io.on("connection", function(socket) {
        console.log('New Socket Connected');
        configureSocket(socket);
        clients[socket.id] = socket;

        socket.on('disconnect', function() {
            delete clients[socket.id];
            console.log("Socket Disconnected");
        });
    });
};

function configureSocket (socket) {
    socket.on("playProject", function(project) {
        playProject(socket, project);
    });
    socket.on('theater-request-list', function (movieInteger) {
        database.getProjects()
            .then(function(movies) {
                if(!movies || movies.length == 0){
                    throw "error - movies empty";
                }
                socket.emit('theater-receive-list', movies[movieInteger % movies.length]);
            })
            .catch(function(err) {
                console.log(err);
            });
    });
    socket.on('theater-hide_overlay-socket', function(){
        io.emit('theater-hide_overlay-global');
    });
}

function newMovie () {
    database.getProjects()
        .then(function(movies) {
            if(!movies || movies.length == 0){
                throw "error - movies empty";
            }
            io.emit('theater-receive-list',movies[movies.length - 1]);
        })
        .catch(function(err) {
            console.log(err);
        });
}

module.exports.newMovie = newMovie;


function playProject (socket, project ){
    console.log("Project received: " + project.name);
    let targetList = [];
    for(let content of project.content){
        targetList.push(content.target);
    }
    contentController.filterByExtension(targetList, '.mp4')
        .then(function (videoList ) {
            sendList(socket, videoList);
        })
        .catch(function (err) {

        });
}

function sendList(socket, videoList) {
    for(let video of videoList){
        console.log(video);
    }
    console.log('sending project');
    io.emit("theater-playProject",videoList);
}

