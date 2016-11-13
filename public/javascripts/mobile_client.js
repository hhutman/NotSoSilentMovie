var socket = io.connect();

function fileClick( target ){
    sendAppendMessage( target );
}

function sendAppendMessage( target ){
    socket.emit("odyssey_mobile_append-clip",target);
    console.log("sending message to server: " + target )
}

socket.on('odyssey_all_append-clip', function(target) {
    appendClip(target);
});

function appendClip( target ) {
    var img_node = document.createElement("IMG");
    img_node.setAttribute('src', "/thumbnails/" + target + ".png");
    img_node.setAttribute('class',"sm-mobile-file_img");

    var node = document.createElement("DIV");
    node.setAttribute('class',"col-xs-12");
    node.appendChild(img_node);

    document.getElementById("queue").appendChild(node);
}
