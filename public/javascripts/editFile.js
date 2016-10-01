(function () {

    var editedFile = file;

    $('#cancelButton').on('click', function () {
        window.location = "/viewFiles";
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
                console.log('success');
                location.reload();
            }
        });
    }

})();