
var files;

function selectButtonClick () {
    $('#upload-input').click();
    $('.progress-bar').text('0%').width('0%');
}

function submitButtonClick () {
    if (files[0] && checkFileTypeSupported()) {
        disableButtons();
        uploadFiles();
    } else {
        showFileTypeError();
    }
}


$('#upload-input').on('change', function () {
    files = $(this).get(0).files;
    if(files){
        $('#submitButton').prop('disabled', false);
    }
    resetFileList();
});


function resetFileList(){
    $('#uploadList div').empty();

    if(files[0]){
        $('#uploadList').append(
            $("<div></div>").text(files[0].name)
        );
    }
}

function disableButtons(){
    $('button').prop('disabled', true);
}

function enableButtons(){
    $('#selectButton').prop('disabled', false);
    $('#viewFilesButton').prop('disabled', false);
}


function checkFileTypeSupported(){
    var filename = files[0].name;
    var extension = filename.substr( (filename.lastIndexOf('.') +1) );
    return extension == 'mp4';
}

function goToEditPage(target){
    window.location = "/editFile/" + target + "/?state=new";
}

function showUploadError(){
    $('#alertSpace').text('Error Uploading File')
        .show();
}
function showFileTypeError(){
    $('#alertSpace').text('Error: Unsupported File Type')
        .show();
}

function uploadFiles() {
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    var formData = new FormData();

    var radioValue = $("input[name=optradio]:checked").val();
    appendFilesToForm(formData);


    $.ajax({
        url: '/upload/?filetype=' + radioValue,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
            goToEditPage(data);
        },
        error: function(){
            showUploadError();
            enableButtons();
        },

        xhr: function () {
            return getXHROperation();
        }
    });
}

function appendFilesToForm(formData){
    if(files && files[0]){
        var file = files[0];
        formData.append('upload', file, file.name);
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
