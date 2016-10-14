(function () {

    $('#directorsPageButton').on('click', function () {
        window.location = "/directors";
    });

    $('#projectPageButton').on('click', function () {
        window.location = "/projectPage/new";
    });

    $('#aboutButton').on('click', function () {
        window.location = "/about";
    });

    $('#viewProjectsButton').on('click', function () {
        window.location = "/viewProjects";
    });

})();