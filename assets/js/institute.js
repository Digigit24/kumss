// header js
  (function () {
    const header = document.getElementById("header");
    const menuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");
    const dropdown = document.querySelector("[data-dropdown]");
    const dropBtn = dropdown ? dropdown.querySelector(".gm-dropbtn") : null;

    // Sticky scroll effect
    window.addEventListener("scroll", () => {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    });

    // Mobile main menu toggle
    function setMenu(open) {
      navLinks.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");

      if (!open && dropdown) {
        dropdown.classList.remove("is-open");
        dropBtn?.setAttribute("aria-expanded", "false");
      }
    }

    menuBtn.addEventListener("click", () => {
      const open = !navLinks.classList.contains("is-open");
      setMenu(open);
    });

    // Mobile dropdown toggle (only on <= 992px)
    dropBtn?.addEventListener("click", (e) => {
      const isMobile = window.matchMedia("(max-width: 992px)").matches;
      if (!isMobile) return; // desktop uses hover/focus
      e.preventDefault();
      const open = !dropdown.classList.contains("is-open");
      dropdown.classList.toggle("is-open", open);
      dropBtn.setAttribute("aria-expanded", String(open));
    });

    // Close menu when clicking outside (mobile)
    document.addEventListener("click", (e) => {
      const isMobile = window.matchMedia("(max-width: 992px)").matches;
      if (!isMobile) return;

      const clickInside = header.contains(e.target);
      if (!clickInside) setMenu(false);
    });

    // Close menu on ESC (mobile)
    document.addEventListener("keydown", (e) => {
      const isMobile = window.matchMedia("(max-width: 992px)").matches;
      if (!isMobile) return;

      if (e.key === "Escape") setMenu(false);
    });

    // Close menu after clicking a link (mobile)
    navLinks.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        const isMobile = window.matchMedia("(max-width: 992px)").matches;
        if (isMobile) setMenu(false);
      });
    });

    // If resized to desktop, reset mobile states
    window.addEventListener("resize", () => {
      const isMobile = window.matchMedia("(max-width: 992px)").matches;
      if (!isMobile) {
        navLinks.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        dropdown?.classList.remove("is-open");
        dropBtn?.setAttribute("aria-expanded", "false");
      }
    });
  })();






// Perfect Faculty Section Toggle
document.addEventListener('DOMContentLoaded', function() {
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const hiddenFacultyGrid = document.getElementById('hiddenFacultyGrid');
    const btnText = document.querySelector('.btn-text');
    
    if (viewMoreBtn && hiddenFacultyGrid) {
        viewMoreBtn.addEventListener('click', function() {
            if (hiddenFacultyGrid.classList.contains('hidden')) {
                // Show hidden faculty with smooth animation
                hiddenFacultyGrid.classList.remove('hidden');
                hiddenFacultyGrid.style.display = 'grid';
                hiddenFacultyGrid.style.animation = 'fadeInUp 0.6s ease forwards';
                viewMoreBtn.classList.add('active');
                btnText.textContent = 'Show Less';
                
                // Add animation delay for each new card
                const newCards = hiddenFacultyGrid.querySelectorAll('.faculty-card');
                newCards.forEach((card, index) => {
                    card.style.animationDelay = `${(index + 4) * 0.1}s`;
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                });
            } else {
                // Hide faculty with smooth animation
                hiddenFacultyGrid.classList.add('hidden');
                setTimeout(() => {
                    hiddenFacultyGrid.style.display = 'none';
                }, 300);
                viewMoreBtn.classList.remove('active');
                btnText.textContent = 'View All Faculty';
            }
        });
    }
    
    // Lazy loading for images
    const facultyImages = document.querySelectorAll('.card-image img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        facultyImages.forEach(img => imageObserver.observe(img));
    }
});