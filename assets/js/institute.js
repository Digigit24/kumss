// Institute Header & Mobile Menu Js
(function () {
  "use strict";

  document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById("header");
    const menuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");
    const dropdowns = document.querySelectorAll("[data-dropdown]");

    if (!menuBtn || !navLinks) return;

    // Mobile main menu toggle
    function setMenu(open) {
      navLinks.classList.toggle("is-open", open);
      menuBtn.classList.toggle("active", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? 'hidden' : '';

      if (!open) {
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove("is-open");
          const btn = dropdown.querySelector(".gm-dropbtn");
          btn?.setAttribute("aria-expanded", "false");
        });
      }
    }

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = !navLinks.classList.contains("is-open");
      setMenu(open);
    });

    // Mobile dropdown toggles
    dropdowns.forEach(dropdown => {
      const dropBtn = dropdown.querySelector(".gm-dropbtn");
      if (dropBtn) {
        dropBtn.addEventListener("click", (e) => {
          const isMobile = window.matchMedia("(max-width: 992px)").matches;
          if (!isMobile) return;

          e.preventDefault();
          e.stopPropagation();

          const isOpen = dropdown.classList.contains("is-open");

          // Close other dropdowns
          dropdowns.forEach(d => {
            if (d !== dropdown) {
              d.classList.remove("is-open");
              d.querySelector(".gm-dropbtn")?.setAttribute("aria-expanded", "false");
            }
          });

          dropdown.classList.toggle("is-open", !isOpen);
          dropBtn.setAttribute("aria-expanded", String(!isOpen));
        });
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (navLinks.classList.contains("is-open") && !header.contains(e.target)) {
        setMenu(false);
      }
    });

    // Close menu on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenu(false);
    });

    // Close menu after clicking a sub-link (not a dropdown toggle)
    navLinks.querySelectorAll("a:not(.gm-dropbtn)").forEach(a => {
      a.addEventListener("click", () => {
        const isMobile = window.matchMedia("(max-width: 992px)").matches;
        if (isMobile) setMenu(false);
      });
    });

    // Reset on resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 992 && navLinks.classList.contains("is-open")) {
        setMenu(false);
      }
    });
  });
})();







// Perfect Faculty Section Toggle
document.addEventListener('DOMContentLoaded', function () {
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  const hiddenFacultyGrid = document.getElementById('hiddenFacultyGrid');
  const btnText = document.querySelector('.btn-text');

  if (viewMoreBtn && hiddenFacultyGrid) {
    viewMoreBtn.addEventListener('click', function () {
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
// Redundant utilities removed as they are handled by custom.js

// Dynamically update Last Updated element if present
document.addEventListener('DOMContentLoaded', function () {
  const lastUpdatedEl = document.getElementById("lastUpdated");
  if (lastUpdatedEl) {
    // Try to fetch the latest push/commit time from the GitHub repo, circumventing browser cache
    fetch(`https://api.github.com/repos/Digigit24/kumss/commits/main?_t=${new Date().getTime()}`, {
      cache: "no-store"
    })
      .then(response => response.json())
      .then(data => {
        let d;
        if (data && data.commit && data.commit.committer && data.commit.committer.date) {
          d = new Date(data.commit.committer.date);
        } else {
          d = new Date(document.lastModified);
        }
        formatAndSetDate(d, lastUpdatedEl);
      })
      .catch((error) => {
        console.error('Error fetching last commit:', error);
        formatAndSetDate(new Date(document.lastModified), lastUpdatedEl);
      });
  }

  function formatAndSetDate(d, el) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let hours = d.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutes = d.getMinutes().toString().padStart(2, '0');
    // Format: 27 Feb 2026, 05:26 PM
    el.textContent = `${d.getDate().toString().padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}, ${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  }
});
