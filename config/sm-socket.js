"use strict";
var contentController = require('../controllers/contentcontroller');
var database = require('../config/database');
var Promise = require("bluebird");

Promise.promisifyAll(database);
Promise.promisifyAll(contentController);

var io;

module.exports.configureIo = function(newio) {
    io = newio;
    io.on("connection", function(socket) {
        console.log('New Socket Connected');
        configureSocket(socket);
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
                socket.emit('theater-receive-list',movies[movieInteger % movies.length].content);
            })
            .catch(function(err) {
                console.log(err);
            });
    })
}


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

