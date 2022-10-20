$(document).on('ready', function() {
    $(".slider").slick({
        prevArrow:$(".prev"),
        nextArrow:$(".next")
    });

    $('.slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
        $(".slider li:eq("+ currentSlide +")").find("a").focus();
      });
});