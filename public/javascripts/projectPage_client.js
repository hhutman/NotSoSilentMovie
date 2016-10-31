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
        return;
    }

    currentContent = JSON.parse(contentString);
    $('#projectPage-CurrentSelection')
        .empty()
        .append(getNewContentTile(currentContent));

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
        currentContent = content;
        $('#projectPage-CurrentSelection')
            .empty()
            .append(getNewContentTile(content));
    });
    return $newObject;
}

function saveContent( ) {
    if( !currentContent){
        return;
    }

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
















