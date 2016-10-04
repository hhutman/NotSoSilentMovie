(function () {

    var editedFile = file;


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
                editFail();
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
        $('.sm_fade-in').animate({
            opacity: '0',
        }, 100, function() {
            callback();
        });
    }

})();