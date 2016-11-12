function fileClick( content ){
    var node = document.createElement("div");
    node.innerHTML = content.name;
    document.getElementById("queue").appendChild(node);
}