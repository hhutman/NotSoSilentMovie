(function () {

    var editedFile = file;

    $('#pageContents_fadeIn').fadeIn(400);


    $('#cancelButton').on('click', function () {
        fadeOutContainer();
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
            success: function() {
                editSuccess();
            },
            error: function(){

            }
        });
    }

    function editSuccess(){
        fadeOutContainer();
        window.location = "/viewFiles";
    }
    function editFail(){
        fadeOutContainer();
        window.location = "/viewFiles";
    }

    function deleteByFile(){
        $.ajax({
            url: "/viewFiles",
            type: "POST",
            dataType: 'json',
            data: JSON.stringify(editedFile),
            contentType: "application/json",
            complete: function() {
                fadeOutContainer();
                window.location = "/upload";
            }
        });
    }

    function fadeOutContainer(callback){
        $('#pageContents_fadeIn').fadeOut(100, callback);
    }

})();