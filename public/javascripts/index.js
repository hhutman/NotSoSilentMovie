(function () {

    $('#directorsPageButton').on('click', function () {
        fadeOutContainer();
        window.location = "/directors";
    });

    function fadeOutContainer(callback){
        $('.sm_fade-in').animate({
            opacity: '0',
        }, 100, function() {
            callback();
        });
    }

})();