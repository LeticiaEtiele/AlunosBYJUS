$(function(){

    /*=========================================================================
     Parallax layers
     =========================================================================*/
     if ($('.parallax').length > 0) { 
      var scene = $('.parallax').get(0);
      var parallax = new Parallax(scene, { 
        relativeInput: true,
      });
    }

     /*=========================================================================
     Text Rotating
     =========================================================================*/
    $(".text-rotating").Morphext({
    
        animation: "bounceIn",

        separator: ",",
      
        speed: 4000,
        complete: function () {
        
        }
    });

    /*=========================================================================
     Counterup JS for facts
     =========================================================================*/
    $('.count').counterUp({
      delay: 10,
      time: 2000
    });

    /*=========================================================================
     Progress bar animation with Waypoint JS
     =========================================================================*/
     
     $('.progress-bar').each(function() {
        var bar_value = $(this).attr('aria-valuenow') + '%';                
        $(this).animate({ width: bar_value }, { easing: 'linear' });
      });

    /*=========================================================================
            Scroll to Top
    =========================================================================*/
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 350) {   
            $('#return-to-top').fadeIn(200); 
        } else {
            $('#return-to-top').fadeOut(200); 
        }
    });
    $('#return-to-top').on('click', function(event) { 
      event.preventDefault();
        $('body,html').animate({
            scrollTop : 0     
        }, 400);
    });

});