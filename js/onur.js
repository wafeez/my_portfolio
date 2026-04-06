let $ = jQuery;


    $('.accordion-title').on('click', function(){

        $(this).toggleClass('active');
        $(this).next('.accordion-content').slideToggle();


    });

/*----------------------------------------------------------------------*/
/* =  Preloader
/*----------------------------------------------------------------------*/
$(window).on('load', function () {

    gsap.to($('#content-scroll, .rain-holder, header'), 1, {autoAlpha:1, delay:2});
  
  });




/*----------------------------------------------------*/
/*	SMOOTH SCROLL
/*----------------------------------------------------*/
if ($("body").hasClass("smooth-scroll")) {
    var elem = document.querySelector("#content-scroll");
    var scrollbar = Scrollbar.init(elem,
    {
        renderByPixels: true,
        damping:0.1
    });

}

scrollbar.setPosition(0, 0);
scrollbar.track.xAxis.element.remove();

ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) {
        scrollbar.scrollTop = value;
    }
    return scrollbar.scrollTop;
  }
});

if ($('header').length) {
    scrollbar.addListener(({ offset }) => {  
        console.log(offset.y);
        if (offset.y > 100) {
            $('header').addClass('scrolling');
        }else{
            $('header').removeClass('scrolling');
        }
    });
  }
  
      var siteTitle = document.querySelector('.site-title-link.scroll-to-top');
    if(siteTitle){
        siteTitle.addEventListener('click', function(e){
            e.preventDefault();           // prevent default link behavior
            scrollbar.scrollTo(0, 0, 800); // scroll to top in 800ms
        });
    }

/*----------------------------------------------------------------------*/
/*  CURSOR SETTINGS
/*----------------------------------------------------------------------*/
function cursorMoveFunc() {


    var e = $("#cursor");
    function t(t) {
        function n() {
            e.find(".cursor__label").text("");
        }
        gsap.to(e, .1, {
            left: t.clientX - e.width() / 5,
            top: t.clientY - e.height() / 5,
        }), "medium" == $(t.target).data("cursor-type") ? (e.removeClass().addClass("is-medium"), n()) : "big" == $(t.target).data("cursor-type") ? "btn-play" == $(t.target).data("cursor-text") ? (e.removeClass().addClass("is-play").addClass("is-big"), n()) : "btn-pause" == $(t.target).data("cursor-text") ? (e.removeClass().addClass("is-pause").addClass("is-big"), n()) : (e.removeClass().addClass("is-view").addClass("is-big"), e.find(".cursor__label").text($(t.target).data("cursor-text"))) : (e.removeClass(), n());
    
      }
    $("body, main, a").css("cursor", "none");
    var n = function() {
      $(window).on("mousemove", t)
    };
    n(), $(window).resize(n);
    

}

cursorMoveFunc();

$('.image-anime').each(function(){
    gsap.from( $(this).find('img'),{ 
      scale: 1.4,
      duration:0,
        scrollTrigger: {
          trigger: $(this),
          start: "top bottom",
          end: "center 100px",
          onEnter: () =>  $(this).addClass('revealed'),
          }
    });
});

const imagesContainer = document.querySelector('.images');
const imageElements = imagesContainer.querySelectorAll('.portfolio');
const imagesData = [];

imageElements.forEach(img => {
    imagesData.push({
        src: img.src,
        dataText: img.getAttribute('data-text'),
    });
});

console.log(imagesData);

const addedImagesData = [];

function addAnimatedImage() {
    let randomImageInfo;
    do {
        randomImageInfo = imagesData[Math.floor(Math.random() * imagesData.length)];
    } while (addedImagesData.includes(randomImageInfo));

    addedImagesData.push(randomImageInfo);

    if (addedImagesData.length > 4) {
        addedImagesData.shift();
    }
 
    var LineWidth = $('.page-lines.fixed').width();
    const minWidth = 20;
    const maxWidth = LineWidth - 120;

    const randomXPosition = Math.max(minWidth, Math.min(Math.random() * (maxWidth - 20), maxWidth));

    const img = document.createElement('img');
    img.src = randomImageInfo.src;
    img.classList.add('portfolio');
    img.setAttribute('data-text', randomImageInfo.dataText);
    gsap.set(img,{
        x: randomXPosition,
    })

    const imagesContainer = document.querySelector('.portfolio-images');
    imagesContainer.appendChild(img);

    const duration = Math.random() * 1 + 2;

    const tl = gsap.timeline({ repeat: 0 });
    tl.to(img, {
        y: "150vh",
        duration: 12,
        onStart: function(){
            img.style.opacity = 1;
            setTimeout(() => {
                addAnimatedImage();
            }, 2000);
        },
        onComplete: function() {
            img.remove();
        }
    });

     if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        img.addEventListener('click', () => {
            
            gsap.set(img, { 'z-index': 0,'filter':'blur(5px)','display':'none',});
         });
 
    }
    else{
        img.addEventListener('mouseover', () => {
            tl.pause();
            gsap.set(img, { 'z-index': 10,});
         });
 
         img.addEventListener('mouseleave', () => {
             tl.play();
          });
    }
    
}

for (let i = 0; i < 1; i++) {
    addAnimatedImage();
}


// Get page line width
 var LineWidth = $('.page-lines.fixed').width();
 var CenterWidth = $('.page-lines.center').width();

 if($(window).width() > 768){
    $('.portfolio-content').width(LineWidth -  90);
    $('.contact-image').width(LineWidth -  30);
}else{
    $('.portfolio-content').width(Math.round(window.innerWidth * 0.8));
    $('.contact-image').width(LineWidth -  30);
}
 
 $('.rain-holder').width(LineWidth);

 $(window).on('resize', function(){
    var LineWidth = $('.page-lines.fixed').width();
    var CenterWidth = $('.page-lines.center').width();
    $('.rain-holder').width(LineWidth);
    $('.contact-image').width(LineWidth -  30);
    if($(window).width() > 768){
        $('.portfolio-content').width(LineWidth -  60);
    }else{
        $('.portfolio-content').width(Math.round(window.innerWidth * 0.8));
    }
  });

 // Open image
$(document).on('click', '.portfolio-images > img', function(){
    const clonedImage = $(this).clone().removeAttr('style');
    const dataText = $(this).data('text');
    const spanElement = $('<span>').text(dataText);

    $(".portfolio-content").empty().append(clonedImage).append(spanElement);

    $(".portfolio-content").css({ display: 'flex' });
    gsap.to($('.portfolio-content img, .portfolio-content span'), { autoAlpha: 1 });
});

// Close image
$(document).on('click', '.portfolio-content img, .portfolio-content span', function(e){
    e.stopPropagation(); // only close if you want on image itself
    gsap.to($(this), { autoAlpha: 0, onComplete: () => {
        $(".portfolio-content").css({ display: 'none' });
    }});
});



$('.onepage-link a').on('click', function (e) {
    e.preventDefault();
    $(document).off("scroll");                    
    var target = $(this).attr("href");
    target = $(target);
    scrollbar.scrollTo(0, target.position().top + 43, 1000);
});

$('.logo').on('click', function (e) {
    e.preventDefault();
    scrollbar.scrollTo(0, 0, 1000);
});



  if ($.cookie('darkmode') == "yes") {
    $("body").addClass("darkmode");
  }
    $('.dark-white-mode').on('click', function () {
      var clicks = $(this).data('clicks');
      if (clicks || $.cookie('darkmode') == "yes" ) {
        $('body').removeClass('darkmode'), 
        $.cookie('darkmode','no',  {expires: 7, path: '/'});
      } else {
        $('body').addClass('darkmode');
        $.cookie('darkmode','yes',  {expires: 7, path: '/'});
      }

      $(this).data("clicks", !clicks);
  });
