var socket = io.connect(); //TODO: Change socket to AJAX request
var currentProject;

function playProject( project ) {
    socket.emit('playProject', project);
}