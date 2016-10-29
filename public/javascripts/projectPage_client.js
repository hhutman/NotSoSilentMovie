var counter = 2;

var currentID;

function projectAddition(objectID){
    var previous = $('#' + objectID);
    previous.after(getAdditionObject());
    previous.after(getNewObject());
}
function projectEdit (objectID){
    currentID = objectID;
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
function errorLoadingList () {
    console.log("Error Loading List"); //TODO
}

function loadContentList (data) {
    $('#projectPage-contentBlock').text("SUCCESS"); //TODO
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
            errCallback();
        }
    });
}
















