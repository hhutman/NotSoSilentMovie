
(function () {
    // Get Express variables
    if(files == undefined){
        files = {};
    }

    $('#uploadFilesButton').on('click', function () {
        window.location = "/upload";
    });

    function resetFileList(){
        $('#uploadedFileList div').empty();

        for(var i = 0; i < files.length; i++) {
            var file = files[i];
            $('#uploadedFileList').append(
                $("<div></div>").text(file),
                $("<div></div>").text(file)
            );
        }
    } resetFileList();



})();