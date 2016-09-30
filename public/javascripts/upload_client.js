(function () {
    var files;

    $('#selectButton').on('click', function () {
        $('#upload-input').click();
        $('.progress-bar').text('0%').width('0%');
    });

    $('#upload-input').on('change', function () {
        files = $(this).get(0).files;

        resetFileList();
    });

    $('#viewFilesButton').on('click', function () {
        window.location = "/viewFiles";
    });


    function resetFileList(){
        $('#uploadList div').empty();

        for(var i = 0; i < files.length; i++) {
            var file = files[i];

            $('#uploadList').append(
                $("<div></div>").text(file.name)
            );
        }
    }


    $('#submitButton').on('click', function () {
        if (files.length > 0) {
            uploadFiles();
        }
    });

    function uploadFiles() {
        // create a FormData object which will be sent as the data payload in the
        // AJAX request
        var formData = new FormData();

        appendFilesToForm(formData);

        $.ajax({
            url: '/directors',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,

            success: function (data) {
                console.log('upload successful!\n' + data);
            },

            xhr: function () {
                return getXHROperation();
            }
        });
    }

    function appendFilesToForm(formData){
        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            // add the files to formData object for the data payload
            formData.append('uploads[]', file, file.name);
        }
    }

    function getXHROperation(){
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', function (evt) {
            XHRProgressEvent(evt);
        }, false);
        return xhr;
    }

    function XHRProgressEvent(evt){
        if (evt.lengthComputable) {
            // calculate the percentage of upload completed
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);

            // update the Bootstrap progress bar with the new percentage
            $('.progress-bar').text(percentComplete + '%');
            $('.progress-bar').width(percentComplete + '%');

            // once the upload reaches 100%, set the progress bar text to done
            if (percentComplete === 100) {
                $('.progress-bar').html('Done');
            }
        }
    }
})();