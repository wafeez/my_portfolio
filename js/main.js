$(document).ready(function() {


  function splitText(){
 
  
    splitLines = new SplitText(".text-anime", {
      type: "lines",
      linesClass: "text-lines"
    });
  
  
    
  
    $(".text-anime .text-lines").wrap('<div class="line-wrapper">');
  
  }
  
  splitText();

        const ua = navigator.userAgent;
    
        // Only Safari (macOS or iOS Safari)
        const isSafari =
          /^((?!chrome|android).)*safari/i.test(ua);
    
        if (isSafari) {
          document.documentElement.classList.add("safari-browser");
        }


    // ACCORDION
    $('.accordion-header').on('click', function(){
      

        $(this).toggleClass('active');
        $(this).next('.accordion-content').slideToggle();

        $('.accordion-header').not($(this)).removeClass('active');
        $('.accordion-content').not($(this).next('.accordion-content')).slideUp();
    });


    if($('commentSlider').length){
      var swiper = new Swiper(".commentSlider", {
        slidesPerView: 2.8,
        spaceBetween: 30,
        autoplay: {
          delay: 1,
          disableOnInteraction: false
        },
        speed: 10000,
        loop: true,
      
        breakpoints: {
          0: {
            slidesPerView: 1.5
          },
          768: {
            slidesPerView: 2.8
          }
        }
      });
    }

    if( $('.lightbox').length ){

      $('.lightbox img').magnificPopup({
            type:'image',
            closeOnContentClick: true,
            gallery:{enabled:true},
            zoom:{enabled: true, duration: 300}
        });
        
    }

    const sidebar = gsap.timeline({yoyo: false,reversed: true});
    sidebar.pause();

      sidebar.to(".sidebar", {
        autoAlpha: 1,
        'pointer-events': 'all',
        duration: .3
      })
      .to(".sidebar .right-bar", {
        x: 0,
        duration: .3
      });

    $('.hamburger').on('click', function(){
        sidebar.reversed() ? sidebar.play(): sidebar.reverse();
    });

    
    $('.sidebar').on('click', function(){
      sidebar.reversed() ? sidebar.play(): sidebar.reverse();
  });


  //SCROLL trigger

  $('.text-anime').each(function(){
    gsap.to( $(this).find('.text-lines'),{ 
      y: 0,
      stagger:.1,
      delay : $(this).data('delay') ? $(this).data('delay') : 0,
      duration:1.1,
        scrollTrigger: {
          trigger: $(this),
          start: "top bottom-=20%",
          end: "center 100px",
          }
    });
  });

  $('.fade-up-anime').each(function(){
    gsap.to( $(this),{ 
      y: 0,
      autoAlpha:1,
      stagger:.1,
      duration:1.1,
        scrollTrigger: {
          trigger: $(this),
          start: "top bottom-=20%",
          end: "center 100px",
          }
    });
  });
  
  $(window).on("scroll", function () {
    let scrollPos = $(window).scrollTop();
    let offset = 150;
  
    $("section").each(function () {
      let top = $(this).offset().top - offset;
      let bottom = top + $(this).outerHeight();
      let id = $(this).attr("id");
  
      if (scrollPos >= top && scrollPos < bottom) {
        $(".icon-bar a.active, .sidebar a.active").removeClass("active");
        $('.icon-bar a[href="#' + id + '"], .sidebar a[href="#' + id + '"]').addClass("active");
        return false; // loop break
      }
    });
  });

});




