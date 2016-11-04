var socket = io.connect(); //TODO: Change socket to AJAX request
var currentProject;

function deletePressed( project ) {
    $('#deleteModalBody').text(project.name);
    currentProject = project;
}


function goToEditProject( project ) {

}

function playProject( project ) {
    socket.emit('playProject', project);
}

function confirmDelete(){
    $.ajax({
        url: "/viewProjects",
        type: "POST",
        dataType: 'json',
        data: JSON.stringify(currentProject),
        contentType: "application/json",
        complete: function () {
            console.log('success');
            removeRowByName(currentProject.name);
        }
    });
}

function removeRowByName(name) {
    $('#projRow_' + name).fadeOut(200, function () {
        $('#projRow_' + name).remove();
    });
}