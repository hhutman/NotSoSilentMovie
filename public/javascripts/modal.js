$(document).ready(function () {
    $(".makeamovie .next").click(function () {
        $(".modal").fadeIn();
        $(".modalbkg").fadeIn();
        $(".makeamovie").addClass("expblur");
    });
    
    $(".modal .exit").click(function () {
        $(".modal").fadeOut();
        $(".modalbkg").fadeOut();
        $(".makeamovie").removeClass("expblur");
    });
  
    $(".modal .cancel").click(function () {
        $(".modal").fadeOut();
        $(".modalbkg").fadeOut();
        $(".makeamovie").removeClass("expblur");
    });
});