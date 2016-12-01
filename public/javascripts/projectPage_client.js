var currentID;

var currentContent;
var playerInstance;

window.onload = function () {
    var projectContainer = document.getElementById("projectPlannerContainer");
    Sortable.create(projectContainer, {
        group: "content",
        animation: 150,
    });

    var clipList = document.getElementById("projectPage-clipBlock");
    Sortable.create(clipList, {
        group: "content",
        animation: 150,
    });

    var cardList = document.getElementById("projectPage-cardBlock");
    Sortable.create(cardList, {
        group: "content",
        animation: 150,
    });
};

function projectEdit (objectID){
    currentID = objectID;
    let contentString = $('#' + objectID).attr('data-content');

    if(!contentString) {
        $('#projectPage-CurrentSelection')
            .empty()
            .text("N/A");
        $('#cardText_input')
            .hide();
        $("input[name=content-text]")
            .val("");
        return;
    }

    currentContent = JSON.parse(contentString);
    $('#projectPage-CurrentSelection')
        .empty()
        .append(getNewContentTile(currentContent));

    if(currentContent.useType == 'card'){
        $('#cardText_input')
            .show();
        $("input[name=content-text]")
            .val(currentContent.text);
    } else {
        $('#cardText_input')
            .hide();
        $("input[name=content-text]")
            .val("");
    }

}

function errorLoadingList (err) {
    $('#projectPage-cardBlock').text(err);
}

function loadClipList (list) {
    $('#projectPage-clipBlock').empty();
    for( var i = 0; i < list.length; i++){
        $('#projectPage-clipBlock').append(getNewContentButton(list[i]));
    }
}
function loadCardList (list) {
    $('#projectPage-cardBlock').empty();
    for( var i = 0; i < list.length; i++){
        $('#projectPage-cardBlock').append(getNewContentButton(list[i]));
    }
}

function getNewContentButton( content ) {
    var $newObject = $("<div class='content-draggable'></div>");
    $newObject.append(getNewContentTile(content));
    $newObject.attr('data-content', JSON.stringify(content));
    $newObject.on('click', function () {
        playFile(content);
    });
    return $newObject;
}

function saveContent( ) {
    if( !currentContent){
        return;
    }

    currentContent.text = $("input[name=content-text]").val();

    $('#' + currentID)
        .empty()
        .append(getNewContentTile(currentContent))
        .attr('data-content', JSON.stringify(currentContent));
}


function getNewContentTile (content) {
    var $newObject = $("<img>");
    $newObject.attr('src', window.location.origin + "/thumbnails/" + content.target + ".png");
    return $newObject;
}
function buttonListCards () {
    dataRequest("card/all", loadCardList, errorLoadingList);
}

function buttonListClips () {
    dataRequest("video/all", loadClipList, errorLoadingList);
}
//TODO make a button for ListCards
function dataRequest(request, callback, errCallback) {
    $.ajax({
        url:"/dataRequest/" + request,
        type:"GET",
        dataType:"json",
        contentType:"application/json;charset=UTF-8;",
        success: function(data) {
            callback(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            errCallback(jqXHR.error);
        }
    });
}

function projectUpload(jsonProject, callback, errCallback) {
    $.ajax({
        url: "/projectPage",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(jsonProject),
        contentType: "application/json",
        success: function() {
            callback();
        },
        error: function(err){
            errCallback(err);
        }
    });
}

function saveNewProject() {
    let projectJson = getProjectJSON();
    projectUpload(projectJson, uploadSuccess, uploadError)
}

function uploadSuccess() {
    window.location = "/viewProjects";
}

function uploadError(err) {
    console.log("ERROR: " + err); //TODO also do some sort of display for errors
}

function getProjectJSON() {
    let projectJson = {
        new: true, //TODO: Placeholder. In future make sure that new represents actual new project
        name: $("input[name=name]").val(),
        creator: $("input[name=creator]").val(),
        description: $("input[name=description]").val(),
        content: [],
        tags: $("input[name=tags]").val()
    };
    $('#projectPlannerContainer').children().each(function(){
        let contentString = this.getAttribute('data-content');
        if(contentString){
            let content = JSON.parse(contentString);
            let addition = {
                target: content.target,
                text: content.text,
            };
            projectJson.content.push(addition);
        }
    });
    return projectJson;
}


buttonListClips();



function playFile(content) {
    $('#projectPage-CurrentSelection').empty();
    switch(content.useType){
        case "video" :
            startPlayer(content);
            break;
        case "audio":
            //TODO
            break;
        case "card":
            setImage(content);
            break;
        default:
            break;
    }
}
function setImage(content){
    $('#projectPage-CurrentSelection').append($('<img src="' + window.location.origin + "/uploaded/" + content.target +  content.extension + '">'));
}

function startPlayer(content) {
    jwplayer.key = "hKr0It8yDiMnKte/Cy3p9KDJ74XfRooWYAiO8A==";
    playerInstance = jwplayer("projectPage-CurrentSelection");
    playerInstance.setup({
        file: "../../uploaded/" + content.target + content.extension,
        controls: false,
        autostart: true,
        autoplay: true,
        repeat: true,
        width: 360,
        height: 200,
        mute: true
    });
}










