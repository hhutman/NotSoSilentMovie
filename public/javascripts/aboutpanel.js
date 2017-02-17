$(document).ready(function () {
    $(".aboutbtn").click(function () {
        $(".aboutpanelbkg").fadeIn();
        $(".makeamovie").addClass("aboutmove");
        $(".aboutpanel").addClass("aboutmove");
        $(this).addClass("aboutmove");
    });

    $(".aboutpanel .close").click(function () {
        $(".aboutpanelbkg").fadeOut();
        $(".makeamovie").removeClass("aboutmove");
        $(".aboutpanel").removeClass("aboutmove");
        $(".aboutbtn").removeClass("aboutmove");
    });

    $(".aboutpanelbkg").click(function () {
        $(".aboutpanelbkg").fadeOut();
        $(".makeamovie").removeClass("aboutmove");
        $(".aboutpanel").removeClass("aboutmove");
        $(".aboutbtn").removeClass("aboutmove");
    });

});
