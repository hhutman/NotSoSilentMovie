"use strict";
var io;

module.exports.configureIo = function(newio) {
    io = newio;
    io.on("connection", function(socket) {
        console.log('New Socket Connected');
        configureSocket(socket);
    });
};

function configureSocket (socket) {
    socket.on("odyssey_mobile_append-clip", function(target) {
        console.log("message received from client: " + target);
        appendClipToTheaters(socket, target);
    });
}

function appendClipToTheaters (socket, target) {
    io.emit("odyssey_theater_append-clip", target);
}