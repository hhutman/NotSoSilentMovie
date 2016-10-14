(function () {

    var editedFile = file;


    $('#cancelButton').on('click', function () {
        window.location = "/viewFiles";
    });

    $('#deleteButton').on('click', function () {
        deleteByFile();
    });

    $('#saveButton').on('click', function () {
        updateByTarget();
    });

    function updateByTarget(){
        var jsonNew = {
            target: editedFile.target,
            name: $("input[name=name]").val(),
            useType: $("input[name=type]").val(),
            movieTitle: $("input[name=movie]").val(),
            description: $("input[name=description]").val(),
            tags: $("input[name=tags]").val()
        };

        console.log(JSON.stringify(jsonNew));
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
            data: JSON.stringify(editedFile),
            contentType: "application/json",
            success: function(data) {
                window.location = "/upload";
            },
            error: function() {
                console.log("delete failed");
            }
        });
    }
})();