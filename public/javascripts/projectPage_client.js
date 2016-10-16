var counter = 2;

function projectAddition(objectid){
    var previous = $('#' + objectid);
    previous.after(getAdditionObject());
    previous.after(getNewObject());
}
function projectEdit (target){

}
function getAdditionObject(){
    counter++;
    var newID = "add_" + counter;
    var $newObject = $("<button></button>");
    $newObject.text('+');
    $newObject.addClass("project-planner_addition sm-button");
    $newObject.attr("id",newID);
    $newObject.on("click", function (event){
        projectAddition(newID);
    });
    return $newObject;
}
function getNewObject(){
    var $newObject = $("<button></button>");
    $newObject.text('NEW');
    $newObject.addClass("project-planner_object sm-button");

    return $newObject;
}