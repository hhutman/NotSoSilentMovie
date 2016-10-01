(function () {

    var editedFile = file;

    if(state == undefined ||
        state == null ||
        state != "new"){
        $('#newFileButtons').remove();
    } else {
        $('#updateFileButtons').remove();
    }

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


        $.ajax({
            url: "/editFile",
            type: "POST",
            dataType: 'json',
            data: JSON.stringify(jsonNew),
            contentType: "application/json",
            complete: function() {
                window.location = "/viewFiles";
            }
        });
    }

    function deleteByFile(){
        $.ajax({
            url: "/viewFiles",
            type: "POST",
            dataType: 'json',
            data: JSON.stringify(editedFile),
            contentType: "application/json",
            complete: function() {
                window.location = "/upload";
            }
        });
    }

})();