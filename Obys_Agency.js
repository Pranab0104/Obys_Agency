function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function loadingpage() {
  var tl = gsap.timeline();
  tl.from(".line h1", {
    y: 150,
    stagger: 0.3,
    duration: 0.6,
    delay: 0.5,
  });

  tl.from("#line1, .line h2", {
    opacity: 0,
    onStart: function () {
      var h5tm = document.querySelector("#line1 h5");
      var grow = "";
      setInterval(function () {
        if (grow < 100) {
          h5tm.innerHTML = grow++;
        } else {
          h5tm.innerHTML = grow;
        }
      }, 38);
    },
  });

  tl.to(".line h2", {
    animationName: "anime",
    opacity: 1,
  });

  tl.to("#loader", {
    opacity: 0,
    duration: 0.2,
    delay: 4,
  });

  tl.from("#page1", {
    delay: 0.2,
    y: 1800,
    duration: 0.5,
    ease: Power2,
  });

  tl.to("#loader", {
    display: "none",
  });

  tl.from("#nav", {
    opacity: 0,
  });

  tl.from("#hori1 h1, #hori2 h1, #hori3 h2, #hori4 h1", {
    y: 120,
    stagger: 0.3,
  });

  tl.from(
    "#hori1 #page2",
    {
      opacity: 0,
    },
    "-=1.2"
  );
}

document.addEventListener("mousemove", function (dets) {
  gsap.to("#crsr", {
    left: dets.x,
    top: dets.y,
  });
});

function curanimation() {
  Shery.makeMagnet("#nav svg, #nav1 h4");
}

function sheryani() {
  Shery.imageEffect(".image", {
    style: 5,
    config: {
      a: { value: 0.69, range: [0, 30] },
      b: { value: 0.69, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7272749932567818 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: true },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 0.62, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.12, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.4, range: [0, 2] },
      discard_threshold: { value: 0.54, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.44, range: [0, 2] },
      noise_scale: { value: 5.34, range: [0, 100] },
    },
    gooey: true,
  });
}

function motion(){
  var video = document.querySelector("#videocontainer");

  var vd = document.querySelector("#videocontainer video");

  video.addEventListener("mouseenter", function () {
    video.addEventListener("mousemove", function (dets) {
      gsap.to("#crsr", {
        opacity: 0,
      });
      gsap.to("#video-cursor", {
        left: dets.x - 550,
        y: dets.y - 300,
      });
    });
  });

  videocontainer.addEventListener("mouseleave", function () {
    gsap.to("#crsr", {
      opacity: 1,
    });
    gsap.to("#video-cursor", {
      left: "80%",
      top: "-15%",
    });
  });

  var flag = 0;

  vd.addEventListener("click", function () {
    if (flag == 0) {
      vd.play();
      vd.style.opacity = 1;

      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-pause-fill"></i>`;
      gsap.to("#video-cursor", {
        scale: 0.9,
      })
      flag = 1
    } else {
      vd.pause();
      vd.style.opacity = 0;

      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-play-fill"></i>`;
      gsap.to("#video-cursor", {
        scale: 1,
      })
      flag = 0
    }
  });
}

document.addEventListener("mousemove",function(dets){
  gsap.to("#Flag",{
    x:dets.x,
    y:dets.y
  })
})

document.querySelector("#hori3").addEventListener("mouseenter",function(){
  gsap.to("#Flag",{
    opacity: 1
  })
})

document.querySelector("#hori3").addEventListener("mouseleave",function(){
  gsap.to("#Flag",{
    opacity: 0
  })
})

// function pagelast(){
//   gsap.from("#footer h1",{
//     opacity:0,
//     x:50,
//     delay:0.3,
//     duration:1,
//     onStart:function(){
//       $('#footer h1').textillate({ in: { effect: 'fadeIn' } });
//     }
//   })
// }

locomotive();
loadingpage();
curanimation();
sheryani();
motion();
// pagelast();