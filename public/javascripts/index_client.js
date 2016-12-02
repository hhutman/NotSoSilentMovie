var socket = io.connect(); //TODO: Change socket to AJAX request
var currentProject;

window.onload = function () {
    document.getElementById("sm-icon-home").style.color = "#FFD447";
};

function playProject( project ) {
    socket.emit('playProject', project);
}