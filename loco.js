document.addEventListener("DOMContentLoaded", function () {
    // Initialize smooth scrolling using Locomotive Scroll library
    const scroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });

    // Check if boundingelem exists
    console.log(document.querySelectorAll(".boundingelem"));
    var timeout;
    function cursoncircleskew() {
        // Variables to control circle distortion effect
        var xscale = 1;        // Default horizontal scale
        var yscale = 1;        // Default vertical scale
        var xprev = 0;         // Previous X position
        var yprev = 0;         // Previous Y position

        window.addEventListener("mousemove", function (dets) {
            clearTimeout(timeout);

            // Calculate mouse movement distance
            var xdif = dets.clientX - xprev;
            var ydif = dets.clientY - yprev;

            // Update previous positions
            xprev = dets.clientX;
            yprev = dets.clientY;

            // Clamp the scale values between 0.8 and 1.2 based on mouse movement
            xscale = gsap.utils.clamp(.8, 1.2, xdif)
            yscale = gsap.utils.clamp(.8, 1.2, ydif)

            circlefollowfoolower(xscale, yscale);

            // Reset circle scale after 100ms of no movement
            timeout = setTimeout(function () {
                document.querySelector("#mini-circle").style.transform =
                    `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
            }, 100)
        });
    }

    function firstpageanimation() {
        // Create a GSAP timeline for entrance animations
        var tl = gsap.timeline();

        // Animate nav from top with fade in
        tl.from("#nav", {
            y: "-10",
            opacity: 0,
            duration: 1.5,
            ease: "expo.easeinOut"
        });

        // Animate text elements with stagger effect
        tl.from(".boundingelem", {
            y: 0,
            opacity: 0,
            ease: "expo.easeinOut",
            duration: 2,
            stagger: 0.2  // 0.2s delay between each element
        });

        // Animate footer with slight overlap
        tl.from("#herofooter", {
            y: 0,
            opacity: 0,
            ease: "expo.easeinOut",
            duration: 1.5,
            delay: -1,    // Start before previous animation finishes
            stagger: 0.2
        })
    }
    // Circle follow
    function circlefollowfoolower(xscale, yscale) {
        let timeout;
        window.addEventListener("mousemove", function (dets) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                document.querySelector("#mini-circle").style.transform =
                    `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
            }, 10);
        });
    }
    //3 elem ko select kr mousemove lgao or mouse ki x and y posstion pta kr,a dn vo image vha show kr 

    document.querySelectorAll(".elem").forEach(function (elem) {
        var rotate = 0;
        var diff = 0;

        // Show and animate image on hover
        elem.addEventListener("mousemove", function (dets) {
            // Calculate vertical distance from top of element
            var diff = dets.clientY - elem.getBoundingClientRect().top;
            diff = dets.clientX - rotate;
            rotate = dets.clientX;

            // Animate image using GSAP
            gsap.to(elem.querySelector("img"), {
                opacity: 1,
                ease: Power2.easeInOut,
                top: diff,
                left: dets.clientX,
                rotate: gsap.utils.clamp(-20, 20, diff * 0.5)  // Limit rotation between -20 and 20 degrees
            });
        });

        // Hide image when mouse leaves
        elem.addEventListener("mouseleave", function (dets) {
            gsap.to(elem.querySelector("img"), {
                opacity: 0,
                duration: 0.5,
                ease: Power2
            });
        });
    });
    circlefollowfoolower();
    firstpageanimation();
    cursoncircleskew();
});
