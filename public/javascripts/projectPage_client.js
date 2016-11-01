var counter = 2;

var currentID;

var currentContent;

function projectAddition(objectID){
    var previous = $('#' + objectID);
    previous.after(getAdditionObject());
    previous.after(getNewObject());
}
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
function getAdditionObject(){
    counter++;
    var newID = "add_" + counter;
    var $newObject = $("<button></button>");
    $newObject.text('+');
    $newObject.addClass("project-planner_addition sm-button sm_stretch-in");
    $newObject.attr("id",newID);
    $newObject.on("click", function (event){
        projectAddition(newID);
    });
    return $newObject;
}
function getNewObject(){
    counter++;
    var newID = "add_" + counter;
    var $newObject = $("<button></button>");
    $newObject.text('EMPTY');
    $newObject.addClass("project-planner_object sm-button project-empty sm_stretch-in");
    $newObject.attr('data-toggle',"modal");
    $newObject.attr('data-target', "#objectModal");
    $newObject.attr('id',newID);
    $newObject.on("click", function (event){
        projectEdit(newID);
    });
    return $newObject;
}

function deleteBlock (){
    var $selectedObject = $('#' + currentID);
    $selectedObject.next().remove();
    $selectedObject.remove();
}
function errorLoadingList (err) {
    $('#projectPage-contentBlock').text(err);
}

function loadContentList (list) {
    $('#projectPage-contentBlock').empty();
    for (let content of list){
        $('#projectPage-contentBlock').append(getNewContentButton(content)); //TODO
    }
}
function getNewContentButton( content ) {
    var $newObject = $("<button></button>");
    $newObject.append(getNewContentTile(content));
    $newObject.on('click', function () {
        contentButtonClick(content);
    });
    return $newObject;
}

function contentButtonClick(content){
    currentContent = content;
    $('#projectPage-CurrentSelection')
        .empty()
        .append(getNewContentTile(content));
    if(content.useType == 'card') {
        $('#cardText_input')
            .show();
        $("input[name=content-text]")
            .attr('value',"");
    }
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
    dataRequest("card/all", loadContentList, errorLoadingList);
}

function buttonListClips () {
    dataRequest("video/all", loadContentList, errorLoadingList);
}
//TODO make a button for ListCards
function dataRequest(request, callback, errCallback) {
    $.ajax({
        url: "/dataRequest/" + request,
        type: "GET",
        dataType: "json",
        contentType: "application/json",
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
    //window.location = "/viewProjects";
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
    $('.project-planner_object').each(function(){
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














