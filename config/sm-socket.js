
module.exports.configureIo = function(io) {
    io.on("connection", function(socket) {
        console.log('New Socket Connected');
        configureSocket(socket);
    });
};

function configureSocket (socket) {
    socket.on("test", function(message) {
        console.log("Message received: " + message);
    });
}