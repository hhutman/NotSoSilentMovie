
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
                $('<div class="row uploaded-file-row"></div>').append(
                    $('<div id="fileList_title" class="col-md-6"></div>').text(file),
                    $('<div id="fileList_extension" class="col-md-3">ID</div>'),
                    $('<div class="col-md-2"></div>').append(
                        $('<button id="fileList_edit" class="btn btn-lg sm-button edit-btn sm-edit">Edit</button>')
                    ),
                    $('<div class="col-md-1"></div>').append(
                        $('<button id="fileList_delete" class="btn btn-lg sm-button edit-btn sm-delete">X</button>')
                    )
                )
            );
        }
    } resetFileList();



})();