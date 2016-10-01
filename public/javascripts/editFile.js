(function () {

    var editedFile = file;

    $('#cancelButton').on('click', function () {
        window.location = "/viewFiles";
    });

    $('#file-name-input').attr('value', editedFile.name);

})();