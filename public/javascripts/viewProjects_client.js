var socket = io.connect();

function deletePressed( project ) {

}


function goToEditProject( project ) {

}

function playProject( project ) {
    socket.emit('playProject', project);
}