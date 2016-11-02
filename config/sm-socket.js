var contentController = require('../controllers/contentcontroller');
var Promise = require("bluebird");

Promise.promisifyAll(contentController);


module.exports.configureIo = function(io) {
    io.on("connection", function(socket) {
        console.log('New Socket Connected');
        configureSocket(socket);
    });
};

function configureSocket (socket) {
    socket.on("playProject", function(project) {
        playProject(project);
    });
}

function playProject ( project ){
    console.log("Project received: " + project.name);
    let videoList = [];
    for(let content of project.content){
        contentController.determineFileExtension(content.target)
            .then(function(extension) {
                console.log(extension);
            })
    }
    //socket.emit('theater-playProject', videoList);

}