var socket = io.connect();

function emptyQueue (){
    socket.emit("odyssey_directors_empty-queue", "");
}