(function () {

    var editedFile = file;

    $('#cancelButton').on('click', function () {
        window.location = "/viewFiles";
    });

    $('#info-container').text(editedFile.name);

})();