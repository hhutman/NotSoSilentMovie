(function () {

    $('#uploadPage').on('click', function () {
        fadeOutContainer();
        window.location = "/upload";
    });
    $('#viewFiles').on('click', function () {
        fadeOutContainer();
        window.location = "/viewFiles";
    });
    $('#mainPage').on('click', function () {
        fadeOutContainer();
        window.location = "/";
    });

    function fadeOutContainer(callback){
        $('.sm_fade-in').animate({
            opacity: '0',
        }, 100, function() {
            callback();
        });
    }

})();