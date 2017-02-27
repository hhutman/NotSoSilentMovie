var socket = io.connect();

function hideOverlay (){
    socket.emit("theater-hide_overlay-socket", "");
}