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
    var contentString = $('#' + objectID).attr('data-content');

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
    let count;
    if(isDeviceDesktop()){
        count = "all";
    } else {
        count = 3
    }

    dataRequest("card/" + count, loadCardList, errorLoadingList);
}

function buttonListClips () {
    let count;
    if(isDeviceDesktop()){
        count = "all";
    } else {
        count = 6
    }
    dataRequest("video/" + count, loadClipList, errorLoadingList);
}

function isDeviceDesktop () {
    return window.screen.width >= 1024;
}


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
        url: "/",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(jsonProject),
        contentType: "application/json",
        success: function(data, code, jqXHR) {
            callback();
        },
        error: function(jqXHR, code, error){
            errCallback(jqXHR.responseText);
        }
    });
}

function saveNewProject() {
    var projectJson = getProjectJSON();
    projectUpload(projectJson, uploadSuccess, uploadError)
}

function uploadSuccess() {
    switchToSuccessModal();
}

function uploadError(err) {
    console.log(err);
    document.getElementById("upload_message").innerHTML = "Error: " + err;
}

function openPublishModal () {
    $("#projectModal").fadeIn();
    $(".modalbkg").fadeIn();
    $(".makeamovie").addClass("expblur");
    document.getElementById("upload_message").innerHTML = "";
}

function exitPublishModal() {
    $("#projectModal").fadeOut();
    $(".modalbkg").fadeOut();
    $(".makeamovie").removeClass("expblur");
}

function switchToSuccessModal() {
    $("#projectModal").fadeOut();
    $("#successModal").fadeIn();
}

function exitSuccessModal() {
    window.location = "/";
}

function getProjectJSON() {
    var projectJson = {
        new: true, //TODO: Placeholder. In future make sure that new represents actual new project
        name: $("input[name=name]").val(),
        creator: $("input[name=creator]").val(),
        description: $("input[name=description]").val(),
        content: [],
        tags: $("input[name=tags]").val()
    };
    $('#projectPlannerContainer').children().each(function(){
        var contentString = this.getAttribute('data-content');
        if(contentString){
            var content = JSON.parse(contentString);
            var addition = {
                target: content.target,
                text: content.text,
            };
            projectJson.content.push(addition);
        }
    });
    return projectJson;
}


buttonListCards();
buttonListClips();

function setImage(content){
    $('#projectPage-CurrentSelection').append($('<img src="' + window.location.origin + "/uploaded/" + content.target +  content.extension + '">'));
}

var videoPlayer = document.getElementById('video');
var videoSource = document.createElement('source');
videoPlayer.appendChild(videoSource);

function playFile( content ) {
    var clip = "../../uploaded/" + content.target + content.extension;
    videoSource.setAttribute('src', clip);

    videoPlayer.load();
    videoPlayer.play();
}




