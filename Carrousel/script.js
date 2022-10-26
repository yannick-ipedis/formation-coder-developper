$(document).on('ready', function() {
    $(".slider").slick({
        prevArrow:$(".prev"),
        nextArrow:$(".next"),
        slidesToShow: 1,
        slidesToScroll: 1
    });

    $('.slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
        resetDots();
        window.setTimeout(function(){
            $(".slider .slide-content:eq("+ currentSlide +")").find("a").focus(); //Set link of new slide as next element in tab order
        },500);
        var dot = $("li:eq("+ currentSlide +") .bt-dot"); //Get dot position of new slide
        setDotActive(dot);
    });

    $(".bt-dot").on("click", function(){
        resetDots();
        var index = $(this).parent().index(); //Get index of dot in list of navigation
        $(".slider").slick("slickGoTo", index); //Animate carrousel to selected slide
        setDotActive($(this));
        window.setTimeout(function(){
            $(".status").html("Sélectionné"); //Add sleect state manually for screen readers
        },500)
    });

    // Adding select state to active navigation dot
    function setDotActive(dot){
        dot.append('<span class="sr-only-active"> Sélectionné</span>').addClass("active");
    }

    // Reset values of navigation dots
    function resetDots(){
        $(".bt-dot").removeClass("active");
        $(".sr-only-active").remove();
        $(".status").html("");
    }
});