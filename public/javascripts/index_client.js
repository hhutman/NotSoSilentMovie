var socket = io.connect(); //TODO: Change socket to AJAX request
var currentProject;

window.onload = function () {
    document.getElementById("sm-icon-home").style.color = "#FFD447";
};

function playProject( project ) {
    for(var i = 0; i < project.content.length; i++){
        console.log(project.content[i].target);
    }
    socket.emit('playProject', project);
}