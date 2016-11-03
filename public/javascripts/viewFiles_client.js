var playerInstance;
var currentFile;

function goToEditPage(file) {
        window.location = "/editFile/" + file.target;
}

function deletePressed(file) {
        $('#deleteModalBody').text(file.name);
        currentFile = file;
}

function playFile(file) {
    $('#contentfeed').empty();
    $('#viewModalBody').text(file.name);
    currentFile = file;
    switch(currentFile.useType){
        case "video" :
            startPlayer();
            break;
        case "audio":
            //TODO
            break;
        case "card":
            setImage();
            break;
        default:
            break;
    }
}
function setImage(){
    $('#contentfeed').append($('<img src="' + window.location.origin + "/uploaded/" + currentFile.target +  currentFile.extension + '">'));
}


function confirmDelete(){
    $.ajax({
        url: "/viewFiles",
        type: "POST",
        dataType: 'json',
        data: JSON.stringify(currentFile),
        contentType: "application/json",
        complete: function () {
            console.log('success');
            removeRowByTarget(currentFile.target);
        }
    });
}


function removeRowByTarget(target) {
    $('#fileRow_' + target).fadeOut(200, function () {
        $('#fileRow_' + target).remove();
    });
}

function startPlayer() {
    jwplayer.key = "hKr0It8yDiMnKte/Cy3p9KDJ74XfRooWYAiO8A==";
    playerInstance = jwplayer("contentfeed");
    playerInstance.setup({
        file: "/uploaded/" + currentFile.target + currentFile.extension,
        controls: false,
        autostart: true,
        autoplay: true,
        repeat: true,
        width: 598,
        mute: true
    });

}
