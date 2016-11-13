var socket = io.connect();

var standby = false;

var selectedTarget;

function fileClick( target ){
    if(standby){
        return;
    }
    standby = true;
    styleDisabledImages(target);
    if(!checkIfAlreadyInQueue(target)){
        sendAppendMessage( target );
    }
}

function sendAppendMessage( target ){
    socket.emit("odyssey_mobile_append-clip",target);
    console.log("sending message to server: " + target )
}

socket.on('odyssey_all_append-clip', function(target) {
    appendClip(target);
});

socket.on('odyssey_mobile_shift-queue', function(target) {
    shiftQueue(target);
    if( checkIfClipRan(target)){
        reset();
    }
});

socket.on('odyssey_all_empty-queue', function() {
    document.getElementById("queue").innerHTML = "";
    reset();
});

function appendClip( target) {
    var img_node = document.createElement("IMG");
    img_node.setAttribute('src', "/thumbnails/" + target + ".png");
    img_node.setAttribute('class',"sm-mobile-file_img");
    if(target == selectedTarget){
        img_node.className += " sm_mobile_image-enabled";
    }

    var node = document.createElement("DIV");
    node.setAttribute('class',"col-xs-12");
    node.id = 'q_' + target;
    node.appendChild(img_node);

    document.getElementById("queue").appendChild(node);
}

function shiftQueue( target ){
    var node = document.getElementById("queue").firstChild;
    if (node && node.id == "q_" + target){
        node.remove();
    }
}

function styleDisabledImages( target ){
    selectedTarget = target;
    var allImages = document.getElementsByClassName("sm_mobile_mobile-image");
    for( var image of allImages){
        image.className = "sm-mobile-file_img sm_mobile_mobile-image sm_mobile_image-disabled";
    }
    document.getElementById("img_" + target).className = "sm-mobile-file_img sm_mobile_mobile-image sm_mobile_image-enabled";
}

function styleResetImages() {
    var allImages = document.getElementsByClassName("sm_mobile_mobile-image");
    for( var image of allImages){
        image.className = "sm-mobile-file_img sm_mobile_mobile-image";
    }
}

function checkIfClipRan(target) {
    return selectedTarget == target;
}

function reset(){
    selectedTarget = null;
    styleResetImages();
    standby = false;
}

function  checkIfAlreadyInQueue(target ){
    var node = document.getElementById('q_' + target);
    if(node){
        node.firstChild.className += " sm_mobile_image-enabled";
        return true;
    }
    return false;
}






