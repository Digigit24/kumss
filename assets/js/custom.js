(function () {
    "use strict";
    const yearEl = document.getElementById("yearNow");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    (function initScrollProgressBar() {
        const bar = document.getElementById("scrollProgress");
        if (!bar) return;

        function update() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = Math.min(100, Math.max(0, progress)) + "%";
        }

        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
    })();

    // Header Sticky — fixed: use #header instead of #navbar, with null check
    const navbar = document.querySelector('#header') || document.querySelector('#navbar');
    if (navbar) {
        window.addEventListener('scroll', function (event) {
            const height = 150;
            const scrollTop = event.target.scrollingElement
                ? event.target.scrollingElement.scrollTop
                : 0;
            navbar.classList.toggle('sticky', scrollTop >= height);
        });
    }

    window.onload = function () {

        // Back to Top
        const topbutton = document.getElementById("back-to-top");
        if (topbutton) {
            topbutton.onclick = function () {
                window.scrollTo({ top: 0, behavior: "smooth" });
            };
            window.onscroll = function () {
                if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                    topbutton.style.opacity = "1";
                    topbutton.style.visibility = "visible";
                } else {
                    topbutton.style.opacity = "0";
                    topbutton.style.visibility = "hidden";
                }
            };
        }

        // Counter Js
        if ("IntersectionObserver" in window) {
            let counterObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        let counter = entry.target;
                        let target = parseInt(counter.innerText);
                        let step = target / 200;
                        let current = 0;
                        let timer = setInterval(function () {
                            current += step;
                            counter.innerText = Math.floor(current);
                            if (parseInt(counter.innerText) >= target) {
                                clearInterval(timer);
                            }
                        }, 10);
                        counterObserver.unobserve(counter);
                    }
                });
            });
            let counters = document.querySelectorAll(".counter");
            counters.forEach(function (counter) {
                counterObserver.observe(counter);
            });
        }
    };

    // Timer Js
    try {
        const days1 = document.querySelector("#days");
        const hours1 = document.querySelector("#hours");
        const minutes1 = document.querySelector("#minutes");
        const seconds1 = document.querySelector("#seconds");

        if (days1 && hours1 && minutes1 && seconds1) {
            const newYears = 'Jan 01 2028 00:00:00';
            function countdown() {
                const newYearsDate = new Date(newYears);
                const currentDate = new Date();
                const totalSeconds = (newYearsDate - currentDate) / 1000;
                const days = Math.floor(totalSeconds / 3600 / 24);
                const hours = Math.floor(totalSeconds / 3600) % 24;
                const minutes = Math.floor(totalSeconds / 60) % 60;
                const seconds = Math.floor(totalSeconds % 60);

                days1.innerHTML = formatTime(days);
                hours1.innerHTML = formatTime(hours);
                minutes1.innerHTML = formatTime(minutes);
                seconds1.innerHTML = formatTime(seconds);
            }
            function formatTime(time) {
                return time < 10 ? `0${time}` : time;
            }
            countdown();
            setInterval(countdown, 1000);
        }
    } catch (e) {
        // Timer elements not present on this page
    }

})();

// Offcanvas Responsive Menu
const list = document.querySelectorAll('.responsive-menu-list');
function accordion(e) {
    e.stopPropagation();
    if (this.classList.contains('active')) {
        this.classList.remove('active');
    } else if (this.parentElement.parentElement.classList.contains('active')) {
        this.classList.add('active');
    } else {
        for (let i = 0; i < list.length; i++) {
            list[i].classList.remove('active');
        }
        this.classList.add('active');
    }
}
for (let i = 0; i < list.length; i++) {
    list[i].addEventListener('click', accordion);
}