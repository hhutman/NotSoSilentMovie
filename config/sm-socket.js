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
        playProject(socket, project);
    });
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
    //socket.emit('theater-playProject', videoList);

}

function sendList(socket, videoList) {
    for(let video of videoList){
        console.log(video);
    }
}

