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


  // CUSTOM CURSOR (desktop, fine-pointer only)
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");

    document.addEventListener("mousemove", function (e) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      dot.style.transform = "translate(" + (mouseX - 3) + "px, " + (mouseY - 3) + "px)";
      ring.style.transform = "translate(" + (mouseX - ring.offsetWidth / 2) + "px, " + (mouseY - ring.offsetHeight / 2) + "px)";
    });

    document.querySelectorAll("a, button, .skill-card, .lightbox, .accordion-header, .hamburger").forEach(function (el) {
      el.addEventListener("mouseenter", function () { ring.classList.add("is-active"); });
      el.addEventListener("mouseleave", function () { ring.classList.remove("is-active"); });
    });

    // MAGNETIC BUTTONS
    document.querySelectorAll(".visiblo-btn-color, .visiblo-btn-arrow").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + (x * 0.25) + "px, " + (y * 0.25) + "px)";
      });
      btn.addEventListener("mouseleave", function () { btn.style.transform = "translate(0, 0)"; });
    });

    // TILT ON HOVER
    function applyTilt(selector, intensity) {
      document.querySelectorAll(selector).forEach(function (card) {
        card.addEventListener("mousemove", function (e) {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = "perspective(600px) rotateY(" + (x * intensity) + "deg) rotateX(" + (-y * intensity) + "deg)";
        });
        card.addEventListener("mouseleave", function () { card.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg)"; });
      });
    }
    applyTilt(".skill-card", 12);
    applyTilt(".project .lightbox", 6);
  }


  // STAT COUNT-UP
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const duration = 1500;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    const statObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          countUp(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll(".stat-number").forEach(function (el) { statObserver.observe(el); });
  }

});




