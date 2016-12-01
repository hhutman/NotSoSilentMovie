var fileTarget;
var fileExt;

function updateByTarget(){
    var jsonNew = {
        target: fileTarget,
        name: $("input[name=name]").val(),
        useType: $("input[name=type]").val(),
        movieTitle: $("input[name=movie]").val(),
        description: $("input[name=description]").val(),
        useType: $("input[name=useType]").val(),
        tags: $("input[name=tags]").val()
    };

    $.ajax({
        url: "/editFile",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(jsonNew),
        contentType: "application/json",
        success: function() {
            editSuccess();
        },
        error: function(){
            editFail();
        }
    });
}

function editSuccess(){
    window.location = "/viewFiles";
}
function editFail(){
    window.location = "/viewFiles";
}

function deleteByFile(){

    $.ajax({
        url: "/viewFiles",
        type: "POST",
        dataType: "json",
        data: JSON.stringify({
            target: fileTarget,
            extension: fileExt

        }),
        contentType: "application/json",
        success: function(data) {
            window.location = "/upload";
        },
        error: function() {
            editFail();
        }
    });
}