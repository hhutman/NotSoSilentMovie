(function () {

    $('#directorsPageButton').on('click', function () {
        fadeOutContainer();
        window.location = "/directors";
    });

    $('#projectPageButton').on('click', function () {
        fadeOutContainer();
        window.location = "/projectPage";
    });

    $('#aboutButton').on('click', function () {
        fadeOutContainer();
        window.location = "/about";
    });

    $('#viewProjectsButton').on('click', function () {
        fadeOutContainer();
        window.location = "/viewProjects";
    });

    function fadeOutContainer(){
        $('.sm_fade-in').animate({
            opacity: '0'}, 100);
    }

})();