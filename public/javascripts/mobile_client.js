function fileClick( target ){
    var node = document.createElement("DIV");
    node.setAttribute('class',"col-xs-12");

    var img_node = document.createElement("IMG");
    img_node.setAttribute('src', "/thumbnails/" + target + ".png");
    img_node.setAttribute('class',"sm-mobile-file_img");
    node.appendChild(img_node);
    document.getElementById("queue").appendChild(node);
}