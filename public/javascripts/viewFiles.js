(function () {

    var TARGET_PREFIX = "fileRow_";

    // Get Express variables
    if(files === undefined){
        files = {};
    }

    $('#uploadFilesButton').on('click', function () {
        fadeOutContainer();
        window.location = "/upload";
    });

    function resetFileList(){
        $('#uploadedFileList div').empty();

        for(var i = 0; i < files.length; i++) {
            var file = files[i];
            $('#uploadedFileList').append(
                $('<div class="row uploaded-file-row"></div>').attr('id',TARGET_PREFIX + file.target)
                    .append(
                        $('<div class="col-xs-2"></div>')
                            .append(
                                $('<button id="fileList_play" class="btn btn-lg sm-button sm-play" data-toggle="modal" data-target="#playModal">Play</button>')
                                    .on('click',{ file: file }, playFile)
                            ),
                        $('<div class="col-xs-4"></div>')
                            .text(file.name)
                            .attr('id', 'fileList_title' + i),
                        $('<div id="fileList_extension" class="col-xs-1"></div>')
                            .text(file.extension),
                        $('<div id="fileList_useType" class="col-xs-1"></div>')
                            .text(file.useType),
                        $('<div class="col-xs-2"></div>')
                            .append(
                                $('<button id="fileList_edit" class="btn btn-lg sm-button sm-edit">Edit</button>')
                                    .on('click',{ file: file }, goToEditPage)
                        ),
                        $('<div class="col-xs-2"></div>')
                            .append(
                                $('<button id="fileList_delete" class="btn btn-lg sm-button sm-delete">X</button>')
                                    .on('click',{ file: file }, deleteByName)
                    )
                )
            );
        }
    } resetFileList();

    function deleteByName(event){
        var file = event.data.file;

        $.ajax({
            url: "/viewFiles",
            type: "POST",
            dataType: 'json',
            data: JSON.stringify(file),
            contentType: "application/json",
            complete: function() {
                console.log('success');
                removeRowByTarget(file.target);
            }
        });
    }

    function goToEditPage(event){
        fadeOutContainer();
        var file = event.data.file;
        window.location = "/editFile/" + file.target;
    }

    function playFile(event){
        var file = event.data.file;
        $('#popupHeader').text(file.name);
    }

    function removeRowByTarget(target){
        $('#' + TARGET_PREFIX + target).fadeOut(200, function(){
            $('#' + TARGET_PREFIX + target).remove();
        });
    }

    function fadeOutContainer(){
        $('.sm_fade-in').animate({ opacity: '0'}, 100);
    }

})();