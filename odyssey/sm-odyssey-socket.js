"use strict";
var io;
var videoQueue = require('./sm-odyssey-queue');

module.exports.configureIo = function(newio) {
    io = newio;
    io.on("connection", function(socket) {
        console.log('New Socket Connected');
        initializeTheater(socket);
        configureSocket(socket);
    });
};

function initializeTheater(socket) {
    socket.emit('odyssey_theater_initialize-array', videoQueue.getQueue());
}

function configureSocket (socket) {
    socket.on("odyssey_mobile_append-clip", function(target) {
        console.log("message received from client: " + target);
        appendClipToTheaters(socket, target);
        videoQueue.appendQueue(target);
    });

    socket.on("odyssey_theater_shift-array", function(target) {
        shiftQueueClients(target);
        videoQueue.shiftQueue(target);
    })
}

function appendClipToTheaters (socket, target) {
    io.emit("odyssey_all_append-clip", target);
}

function shiftQueueClients(target) {
    io.emit('odyssey_mobile_shift-queue', target);
}







