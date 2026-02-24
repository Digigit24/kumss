(function () {
    "use strict";

    document.addEventListener('DOMContentLoaded', () => {
        // Current Year
        const yearEl = document.getElementById("yearNow");
        if (yearEl) yearEl.textContent = String(new Date().getFullYear());

        // Scroll Progress Bar
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

        // Header Sticky
        const header = document.querySelector('#header') || document.querySelector('#navbar');
        if (header) {
            window.addEventListener('scroll', () => {
                header.classList.toggle('sticky', window.scrollY >= 150);
                header.classList.toggle('is-scrolled', window.scrollY > 10);
            }, { passive: true });
        }

        // Back to Top
        const topbutton = document.getElementById("back-to-top");
        if (topbutton) {
            topbutton.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
            window.addEventListener('scroll', () => {
                const show = document.body.scrollTop > 300 || document.documentElement.scrollTop > 300;
                topbutton.style.opacity = show ? "1" : "0";
                topbutton.style.visibility = show ? "visible" : "hidden";
            }, { passive: true });
        }

        // Counter Js
        if ("IntersectionObserver" in window) {
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = parseInt(counter.innerText);
                        if (isNaN(target)) return;

                        let current = 0;
                        const step = target / 50; // Faster animation
                        const timer = setInterval(() => {
                            current += step;
                            counter.innerText = Math.floor(current);
                            if (current >= target) {
                                counter.innerText = target;
                                clearInterval(timer);
                            }
                        }, 20);
                        counterObserver.unobserve(counter);
                    }
                });
            }, { threshold: 0.5 });

            document.querySelectorAll(".counter, .stat-num").forEach(c => counterObserver.observe(c));
        }



        // New Year Timer
        (function initTimer() {
            const daysEl = document.querySelector("#days");
            const hoursEl = document.querySelector("#hours");
            const minsEl = document.querySelector("#minutes");
            const secsEl = document.querySelector("#seconds");

            if (daysEl && hoursEl && minsEl && secsEl) {
                const newYear = new Date(`Jan 01 ${new Date().getFullYear() + 1} 00:00:00`);
                function update() {
                    const now = new Date();
                    const diff = (newYear - now) / 1000;
                    if (diff < 0) return;

                    daysEl.innerText = Math.floor(diff / 3600 / 24);
                    hoursEl.innerText = String(Math.floor(diff / 3600) % 24).padStart(2, '0');
                    minsEl.innerText = String(Math.floor(diff / 60) % 60).padStart(2, '0');
                    secsEl.innerText = String(Math.floor(diff % 60)).padStart(2, '0');
                }
                update();
                setInterval(update, 1000);
            }
        })();

        // Auto-active Navbar Link
        (function initActiveLinks() {
            let path = window.location.pathname;
            let filename = path.split('/').pop() || "index.html";
            if (filename.includes("index")) filename = "index.html";

            const links = document.querySelectorAll('.nav-link, .gm-link');
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (!href || href === "#" || href.startsWith("javascript")) return;

                let linkFile = href.split('/').pop() || "index.html";
                if (linkFile.includes("index")) linkFile = "index.html";

                if (linkFile === filename) {
                    link.classList.add('active');

                    // Parent highlighting
                    const parent = link.closest('.nav-item, .responsive-menu-list, .gm-item');
                    if (parent) parent.classList.add('active');

                    const dropdown = link.closest('.dropdown-menu, .gm-submenu, .responsive-menu-items');
                    if (dropdown) {
                        const btn = dropdown.parentElement.querySelector('.dropdown-toggle, .gm-dropbtn, a');
                        if (btn) btn.classList.add('active');
                    }
                }
            });
        })();
    });
})();


// Offcanvas Responsive Menu
(function () {
    const list = document.querySelectorAll('.responsive-menu-list');
    list.forEach(item => {
        // Identify if it's a dropdown (has sub-items)
        const subItems = item.querySelector('.responsive-menu-items');
        if (subItems) {
            // The first link is our toggle
            const toggle = item.querySelector('a');
            if (toggle) {
                toggle.classList.add('dropdown-toggle'); // Ensure it has the class for styling
                toggle.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    const isActive = item.classList.contains('active');

                    // Close other items at the same level
                    const parent = item.parentElement;
                    const siblings = parent ? parent.querySelectorAll(':scope > .responsive-menu-list') : [];
                    siblings.forEach(sibling => {
                        if (sibling !== item) sibling.classList.remove('active');
                    });

                    // Toggle current
                    item.classList.toggle('active', !isActive);
                });
            }
        }
    });

    // Close mobile menu after clicking actual navigation links
    const mobileLinks = document.querySelectorAll('.responsive-navbar a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // If this link is a toggle (handled above), ignore it
            if (link.classList.contains('dropdown-toggle') || link.nextElementSibling?.classList.contains('responsive-menu-items')) {
                return;
            }

            const offcanvasEl = document.querySelector('#navbarOffcanvas');
            if (offcanvasEl && typeof bootstrap !== 'undefined' && bootstrap.Offcanvas) {
                try {
                    const instance = bootstrap.Offcanvas.getInstance(offcanvasEl);
                    if (instance) instance.hide();
                } catch (err) {
                    console.warn('Bootstrap Offcanvas error:', err);
                }
            }
        });
    });
})();