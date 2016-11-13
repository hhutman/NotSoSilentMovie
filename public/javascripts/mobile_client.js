function fileClick( target ){
    var node = document.createElement("IMG");
    node.setAttribute('src', "/thumbnails/" + target + ".png");
    document.getElementById("queue").appendChild(node);
}